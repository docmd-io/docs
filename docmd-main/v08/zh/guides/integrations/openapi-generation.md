---
title: "OpenAPI 生成"
description: "如何把 OpenAPI/Swagger 模式接入 docmd 工作流，获得自动化、保持同步的 API 参考文档。"
---

## 问题

手工维护 REST API 文档是一项运营风险。当工程师在代码里修改了端点或更新了 Schema，文档就会过时。靠人同步既繁琐又易错，常常让 API 使用者踩到集成故障。

## 为什么重要

不准确的 API 参考会让开发者失望，并推高支持工单量。自动化能让文档始终是"事实来源 (source of truth)"，每次构建都真实反映 API 当前状态。工程师便能专心构建功能，而不必手动更新表格。

## 方法

搭建一条异步构建流水线，将您的 `openapi.json` 或 `swagger.yaml` 模式转换为标准 Markdown 文件。由于 docmd 在渲染带复杂 [容器](../../content/containers/index.md) 的 Markdown 方面表现卓越，最终生成的 API 参考会与站点其他文档融为一体，视觉上也保持一致。

## 实现

### 1. 接入构建流水线

在 CI/CD 流水线中，使用 `widdershins` 或自写脚本，把 OpenAPI 模式生成 Markdown 作为构建前置步骤。

```json "package.json"
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

### 2. 优化 API 页面布局

API 参考通常内容密集，包含大量参数表与嵌套 Schema。可借助 [Frontmatter](../../content/frontmatter.md) 优化页面布局，以提升可读性。

```markdown
---
title: "REST API 参考"
layout: "full"  # 最大化水平空间，容纳密集的表格
---
```

设置 `layout: "full"` 可以去掉右侧的目录侧边栏，为宽代码块和响应示例腾出更多空间。

### 3. 通过 docmd 容器增强

对生成的 Markdown 进行后处理，注入 docmd 特性，例如使用 [Tabs](../../content/containers/tabs.md) 承载多语言代码示例，或使用 [标注 (Callout)](../../content/containers/callouts.md) 承载鉴权警告。

````markdown
::: tabs

  == tab "cURL"
    ```bash
    curl -X GET "https://api.example.com/v1/users"
    ```

  == tab "Node.js"
    ```javascript
    const users = await client.getUsers();
    ```

:::
````

## 取舍

机器生成的文档在技术准确性上表现优异，但缺少有效学习所需的那种"人味"。我们建议把 OpenAPI 生成用于**技术参考**（端点、参数、Schema），同时手写**教程**与**概念指南**来解释上下文与使用场景。
