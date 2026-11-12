---
title: "OpenAPI 生成"
description: "将 OpenAPI 和 Swagger REST Schema 集成到 docmd 工作流中，实现自动化 API 文档渲染。"
---

手动维护 REST API 文档随着代码端点的演进极易发生偏差。自动化可确保你的文档保持为唯一的事实来源，在构建步骤中自动更新。

docmd 通过 `@docmd/plugin-openapi` 或自动化的构建前 Markdown 生成为 OpenAPI / Swagger 规范提供原生渲染。

## 配置

在 `docmd.config.json` 中启用 OpenAPI 渲染：

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "spec": "./schemas/openapi.json",
      "route": "/api/reference"
    }
  }
}
```

## 自动化的构建前 Markdown 管道

或者，在运行 `docmd build` 之前将 Schema 编译为 Markdown：

```json "package.json"
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

## 优化 API 布局

API 参考包含较宽的参数表格和响应载荷。在页面 frontmatter 中使用 `layout: "full"` 以赋予最大水平宽度：

```markdown
---
title: "REST API 参考"
layout: "full"
---
```

::: callout tip "多语言请求示例" icon:code
通过将多语言代码片段封装在 [标签页容器](../../content/containers/tabs.md) 中，为 cURL、JavaScript、Python 和 Go 请求示例增强生成的端点页面。
:::
