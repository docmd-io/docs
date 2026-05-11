---
title: "OpenAPI 生成"
description: "如何将 OpenAPI/Swagger 架构集成到你的 docmd 工作流中，以实现自动化且同步的 API 参考文档。"
---

## 问题

手动维护 REST API 文档是一项重大的运营风险。一旦工程师修改了端点或更新了代码中的架构，文档就会过时。手动保持这些内容的同步既枯燥又容易出错，并且经常导致 API 使用者的集成失败。

## 为什么这很重要

不准确的 API 参考是导致开发人员沮丧和支持工单增加的主要原因。自动化可确保你的文档保持为“事实来源”，实时（或在每次构建时）反映 API 的实际状态。这使工程师能够专注于构建功能，而不是手动更新文档表格。

## 方法

实施一个异步构建流水线，将你的 `openapi.json` 或 `swagger.yaml` 架构转换为标准的 Markdown 文件。由于 `docmd` 擅长渲染带有复杂 [容器](../../content/containers/index.md) 的 Markdown，因此生成的 API 参考将与文档的其余部分在视觉上保持一致且融为一体。

## 实现

### 1. 构建流水线集成

你可以使用 `widdershins` 等工具或自定义脚本，在 CI/CD 流水线中作为一个预构建步骤从 OpenAPI 架构生成 Markdown。

```json
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

### 2. 优化 API 布局

API 参考通常内容密集，具有用于参数的大型表格和嵌套架构。使用 [Frontmatter](../../content/frontmatter.md) 优化页面布局以提高可读性。

```markdown
---
title: "REST API 参考"
layout: "full"  # 为密集表格最大化水平空间
---
```

设置 `layout: "full"` 会移除右侧的目录侧边栏，从而为宽代码块和响应示例提供更多空间。

### 3. 使用 docmd 容器进行增强

你可以对生成的 Markdown 进行后处理，以注入 `docmd` 功能，例如用于多语言代码示例的 [选项卡 (Tabs)](../../content/containers/tabs.md) 或用于身份验证警告的 [标注 (Callouts)](../../content/containers/callouts.md)。

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

## 权衡

机器生成的文档在技术准确性方面非常出色，但往往缺乏有效学习所需的“人文关怀”。我们建议将 OpenAPI 生成用于 **技术参考 (Technical Reference)**（端点、参数、架构），同时提供手写的 **教程 (Tutorials)** 和 **概念指南 (Conceptual Guides)** 来解释 API 的背景和用例。
