---
title: "OpenAPI 生成"
description: "如何将 OpenAPI/Swagger 模式集成到您的 docmd 工作流中，以实现自动化且同步的 API 参考文档。"
---

## 问题

手动维护 REST API 文档是一项重大的运营风险。一旦工程师修改了代码中的端点或更新了模式，文档就会立即过时。手动保持同步既繁琐又容易出错，并且经常导致 API 使用者的集成失败。

## 为什么重要

不准确的 API 参考是导致开发者沮丧和支持工单增加的主要原因。自动化可确保您的文档始终是“单一事实来源”，实时（或在每次构建时）反映 API 的实际状态。这使工程师能够专注于构建功能，而不是手动更新文档表格。

## 方法

实施一个异步构建流水线，将您的 `openapi.json` 或 `swagger.yaml` 模式转换为标准的 Markdown 文件。由于 `docmd` 擅长渲染带有复杂 [容器](../../content/containers) 的 Markdown，生成的 API 参考在视觉上与文档的其余部分保持一致且集成。

## 实施

### 1. 构建流水线集成

您可以使用 `widdershins` 等工具或自定义脚本，在 CI/CD 流水线的预构建步骤中从 OpenAPI 模式生成 Markdown。

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

API 参考通常内容密集，包含用于参数和嵌套模式的大型表格。使用 [Frontmatter](../../content/frontmatter) 优化页面布局以提高可读性。

```markdown
---
title: "REST API 参考"
layout: "full"  # 最大化水平空间以容纳密集表格
---
```

设置 `layout: "full"` 会移除右侧的目录 (TOC) 侧边栏，为宽代码块和响应示例提供更多空间。

### 3. 使用 docmd 容器进行增强

您可以对生成的 Markdown 进行后处理，以注入 `docmd` 功能，例如用于多语言代码示例的 [选项卡](../../content/containers/tabs) 或用于身份验证警告的 [标注](../../content/containers/callouts)。

```markdown
::: tabs
::: tab "cURL"
```bash
curl -X GET "https://api.example.com/v1/users"
```
:::
::: tab "Node.js"
```javascript
const users = await client.getUsers();
```
:::
:::
```

## 权衡

机器生成的文档在技术准确性方面表现出色，但往往缺乏有效学习所需的“人文关怀”。我们建议将 OpenAPI 生成用于 **技术参考**（端点、参数、模式），同时提供手写的 **教程** 和 **概念指南** 来解释 API 的上下文和使用场景。
