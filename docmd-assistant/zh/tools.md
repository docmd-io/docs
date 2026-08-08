---
title: "工具系统"
description: "在 docmd-assistant 中创建、注册和执行自定义及标准工具。"
---

`docmd-assistant` 包含一个工具执行系统。工具允许助手执行全文搜索、读取文档页面、跳转 URL、复制代码片段或调用应用中的自定义函数。

## 定义工具

工具定义需要 `name`、`description`、`parameters` 模式以及 `execute`（或 `handler`）函数：

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: '获取指定城市的当前天气预报。',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '城市名称' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: '温度单位' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // 执行 API 调用或应用逻辑
    return { city, temperature: 22, unit, condition: 'Sunny' };
  }
};
```

## 注册工具

在初始化时或通过 `registerTool()` 动态注册工具：

::: tabs
== tab "初始化时注册" icon:settings
```typescript
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});
```
== tab "动态注册" icon:plus-circle
```typescript
assistant.registerTool({
  name: 'open_modal',
  description: '打开用户界面模态对话框',
  parameters: {
    type: 'object',
    properties: {
      modalId: { type: 'string' }
    },
    required: ['modalId']
  },
  execute: async ({ modalId }) => {
    document.getElementById(modalId)?.classList.add('visible');
    return { success: true };
  }
});
```
:::

## 标准文档工具

`docmd-assistant` 导出 `createStandardTools()` 工厂函数，提供四个标准文档工具：

| 工具名称 | 参数 | 说明 |
| :-------- | :--------- | :---------- |
| `search_documentation` | `{ query: string }` | 搜索文档索引或当前 DOM 标题章节 |
| `read_documentation_page` | `{ path: string }` | 获取并提取页面全文与代码块 |
| `navigate_to_page` | `{ path: string }` | 引导浏览器跳转至 URL 或锚点 (`#section`) |
| `copy_code_snippet` | `{ code: string }` | 将代码片段直接复制到用户的系统剪贴板 |

### 初始化标准工具

```typescript
import { DocmdAssistantEngine, createStandardTools } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  tools: createStandardTools(
    // 1. 自定义搜索回调（例如 docmd-search, Algolia, Fuse.js 或后端 API）
    async (query) => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
    },
    // 2. 自定义页面读取回调（CMS API、原始 Markdown 端点或后端数据库）
    async (path) => {
      const res = await fetch(`/api/page?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      return { title: data.title, content: data.markdown };
    }
  )
});
```

## 搜索集成模式

`createStandardTools()` 支持三种搜索集成模式：

::: grid

::: card "docmd 插件模式" icon:puzzle
当通过 `@docmd/plugin-ai` 在 `docmd` 站点中使用时，搜索直接委托给 `docmd-search` (`window.docmdSearch`)，搜索预构建的静态索引批次。
:::

::: card "自定义搜索回调" icon:search
提供一个 `customSearch` 函数，以连接 Algolia、Fuse.js 或服务器端点等外部搜索引擎。
:::

::: card "DOM 标题抓取器" icon:code
如果没有提供自定义搜索回调，`search_documentation` 将降级使用浏览器内部的 DOM 抓取器，搜索活动页面上的 `<h1>`–`<h4>` 标题和 `<section>` 标签。
:::

:::

## 页面全文读取机制 (`read_documentation_page`)

当搜索结果片段不足以解答时，助手会自动调用 `read_documentation_page({ path })`：

1. **自定义读取回调 (`customReader`)**: 如果提供了该回调，引擎会将页面获取委托给你的自定义加载器。
2. **DOM 解析器降级**: 如果未提供回调，该工具使用 `fetch()` 获取 `window.location.origin + path`，并使用 `DOMParser()` 从 `<main>`、`<article>` 或 `[role="main"]` 元素中提取文本。
3. **超链接引用**: 返回的页面内容被纳入上下文，允许模型在其最终回答中生成可点击的 Markdown 链接 `[页面标题](path)`。
