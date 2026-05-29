---
title: "OpenAPI 插件"
description: "直接在 Markdown 页面中从 JSON 或 YAML 规范文件渲染 OpenAPI 3.x API 参考文档。"
---

**OpenAPI 插件**将 OpenAPI 3.x 规范文件转换为结构化的 API 参考页面——在构建时渲染，无需客户端 JavaScript，无需第三方依赖。每个端点、参数、请求体和响应都转换为语义化 HTML 表格。

::: callout info "核心插件"
OpenAPI 插件已**内置**于 `@docmd/core` 中，无需单独安装。它遵循 docmd 的构建时渲染理念——插件在构建时读取你的规范并输出干净、可访问的 HTML 表格，无需客户端 JavaScript。
:::

## 启用

在 `docmd.config.json` 中启用：

```json
{
  "plugins": {
    "openapi": {}
  }
}
```

## 使用方法

在任何 Markdown 页面中使用带 `openapi` 语言标签的围栏代码块嵌入 OpenAPI 规范：

````markdown
```openapi
assets/docmd-api.json
```
````

路径相对于你的 `src` 目录解析。支持 **JSON** 和 **YAML** 格式。

## 渲染内容

对于规范中的每个路径和 HTTP 方法，插件渲染：

*   **方法徽章** — 颜色编码（`GET`、`POST`、`PUT`、`PATCH`、`DELETE`）
*   **路径** — 完整端点路径
*   **摘要和描述** — 来自操作对象
*   **参数** — 路径、查询、请求头参数，包含类型和必填标记
*   **请求体** — 包含 JSON Schema 示例
*   **响应** — 按状态码列出，包含描述和 Schema

::: callout tip "AI 上下文"
OpenAPI 规范提供了精确的机器可读 API 合约。当与 `llms-full.txt` 结合使用时，AI 代理可以直接从你的文档中理解你的 API 结构，无需额外说明。
:::
