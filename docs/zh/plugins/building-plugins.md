---
title: "构建插件"
description: "通过自定义逻辑和交互功能扩展 docmd 的全面指南。"
---

插件是 `docmd` 的主要扩展机制。它们允许你注入自定义 HTML、修改 Markdown 解析逻辑并自动化构建后任务。本指南介绍插件 API 以及创建可共享组件的最佳实践。

## 插件 API 参考

`docmd` 插件是一个标准 JavaScript 对象（或以默认导出的模块），实现一个或多个下列异步钩子。

| 钩子 | 说明 |
| :--- | :--- |
| `markdownSetup(md, opts)` | 扩展 `markdown-it` 实例。同步。 |
| `generateMetaTags(config, page, root)` | 向 `<head>` 注入 `<meta>` 或 `<link>` 标签。 |
| `generateScripts(config, opts)` | 返回包含 `headScriptsHtml` 和 `bodyScriptsHtml` 的对象。 |
| `getAssets(opts)` | 定义要注入的外部文件或 CDN 脚本。 |
| `onPostBuild(ctx)` | 所有 HTML 文件生成完毕后运行逻辑。 |
| `translations(localeId)` | 返回指定语言的翻译字符串对象。 |
| `actions` | 名称-处理函数映射，可从浏览器通过 WebSocket RPC 调用。 |
| `events` | 命名事件处理函数对象，用于处理浏览器发来的即发即忘消息。 |

## 创建本地插件

创建插件只需定义一个 JavaScript 文件。例如 `my-plugin.js`：

```javascript
// my-plugin.js
import path from 'path';

export default {
  // 1. 扩展 Markdown 解析器
  markdownSetup: (md, options) => {
    // 示例：添加规则或使用 markdown-it 插件
  },

  // 2. 注入页面元数据
  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  // 3. 构建后自动化
  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`自定义插件：已验证 ${pages.length} 个页面。`);
    // 示例：生成自定义清单或通知
  }
};
```

要启用你的插件，在 `docmd.config.js` 中引用其**完整包名**：

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    'my-awesome-plugin': {
      // 你的自定义选项
    }
  }
});
```

> **注意：** 简写名称（如 `math`、`search`）专门保留给官方 `@docmd/plugin-*` 包。第三方插件必须始终使用其完整 npm 包名。

### 插件解析
`docmd` 引擎按如下方式解析插件名称：
- **官方简写**（`math`、`search`、`seo` 等）自动展开为 `@docmd/plugin-<name>`。由于 `@docmd` npm scope 归项目所有，只有官方包才能在该 scope 下存在。
- **第三方插件**必须使用其完整包名（如 `my-awesome-plugin`、`@myorg/docmd-extras`）。外部插件没有别名或简写系统——这防止了混淆并完全消除了供应链攻击向量。

### 插件作用域（`noStyle`）
默认情况下，插件会全局注入 CSS/JS。但开发者可以通过导出 `noStyle` 布尔值，明确阻止插件在 `noStyle` 页面（如最简落地页模板）上渲染：

```javascript
export default {
  noStyle: false, // 阻止 generateMetaTags 和 generateScripts 在 noStyle 页面上运行

  generateScripts: () => { ... }
}
```
用户也可以通过配置（`plugins: { math: { noStyle: false } }`）或在 Markdown frontmatter 中动态覆盖（`plugins: { math: true }`）。

## 深入了解：资源注入

`getAssets()` 钩子允许你的插件安全地打包客户端逻辑。

```javascript
getAssets: (options) => {
  return [
    {
      url: 'https://cdn.example.com/lib.js', // 外部 CDN 脚本
      type: 'js',
      location: 'head'
    },
    {
      src: path.join(__dirname, 'plugin-init.js'), // 本地源文件
      dest: 'assets/js/plugin-init.js',            // 构建目录中的目标路径
      type: 'js',
      location: 'body'
    }
  ];
}
```

## 插件国际化（i18n）

渲染客户端 UI 的插件应通过 `translations(localeId)` 钩子暴露可翻译字符串。docmd 引擎会在构建过程中调用此钩子，将结果与核心系统字符串和用户覆盖合并后传递下去。

标准做法是在插件内部的 `i18n/` 目录中为每种语言存储一个 JSON 文件：

```javascript
// my-plugin.js
import fs from 'fs';
import path from 'path';

export default {
  translations: (localeId) => {
    // 1. 尝试加载特定语言
    try {
      const p = path.join(__dirname, 'i18n', `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }

    // 2. 回退到英语
    try {
      const p = path.join(__dirname, 'i18n', 'en.json');
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }

    return {};
  }
}
```

然后可以通过 `generateScripts` 注入这些字符串（使用 `config._activeLocale.id` 确定当前语言），或依赖引擎将它们合并到全局注册表中。

## WebSocket RPC Actions

从 `0.6.8` 开始，插件可以注册**动作处理程序**和**事件处理程序**，它们运行在开发服务器上，可通过 `window.docmd` API 从浏览器调用。

```javascript
// my-live-plugin.js
export default {
  // 服务器端动作——浏览器通过 docmd.call() 调用
  actions: {
    'my-plugin:save-note': async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + '\n\n> ' + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { saved: true };
    }
  },

  // 服务器端事件——浏览器通过 docmd.send() 发送
  events: {
    'my-plugin:page-viewed': (data, ctx) => {
      console.log(`页面已浏览：${data.path}`);
    }
  }
};
```

`ctx`（ActionContext）对象提供：

The `ctx` (ActionContext) object provides:

| Method | Description |
| :--- | :--- |
| `ctx.readFile(path)` | 读取相对于项目根目录的文件。 |
| `ctx.writeFile(path, content)` | 写入文件（触发重新构建 + 重载）。 |
| `ctx.readFileLines(path)` | 将文件读取为行数组。 |
| `ctx.broadcast(event, data)` | 向所有已连接浏览器推送事件。 |
| `ctx.source` | 用于块级 Markdown 操作的源码编辑工具。 |
| `ctx.projectRoot` | 项目根目录的绝对路径。 |
| `ctx.config` | 当前 docmd 站点配置。 |

所有文件操作均沙盒隔离在项目根目录内——路径遍历尝试将被自动拒绝。

::: callout info "仅开发模式 🛡️"
WebSocket RPC 系统仅在 `docmd dev` 期间活跃。生产构建不包含 API 客户端或任何服务端动作处理。
:::

## 最佳实践

1.  **Async/Await**：`onPostBuild` 和动作处理程序始终使用 `async` 函数，防止在 I/O 操作期间阻塞构建引擎。
2.  **无状态设计**：避免在插件对象内维护状态，因为 `docmd` 在开发"热重载"期间可能会重新初始化插件。
3.  **命名惯例**：对社区插件，请在包名前添加 `docmd-plugin-` 前缀（如 `docmd-plugin-analytics`）。
4.  **Action 命名空间**：在动作名称前加上你的插件名（如 `my-plugin:save-note`），以避免冲突。
5.  **日志记录**：在 `onPostBuild` 中使用提供的 `log()` 辅助函数，确保你的消息遵循用户的 `--verbose` 设置。

::: callout tip "AI 就绪设计 🤖"
`docmd` 插件 API 设计为**对 LLM 最优**。由于钩子使用标准 JavaScript 对象和类型，没有隐藏的复杂类层次结构，AI Agent 只需极少的指令即可为你生成无错误的自定义插件。
:::