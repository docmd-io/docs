---
title: "OpenAPI 插件"
description: "在构建时直接从 OpenAPI 3.x 规范渲染静态 API 参考文档。"
---

`@docmd/plugin-openapi` 插件将 OpenAPI 3.x 规范文件转换为结构化的、可搜索的 API 参考页面。它遵循 docmd 的"零 JavaScript"理念 —— 在构建过程中将每个端点、参数和响应渲染到语义化 HTML 表格中，确保最佳性能和 SEO。

## 配置

OpenAPI 插件默认包含在 `@docmd/core` 中。您可以在 `docmd.config.json` 中配置全局渲染选项。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | 显示规范中 `info` 对象的 API 标题、版本和描述。 |
| `download` | `boolean` | `false` | 若为 true，则在规范头部添加一个下载原始 JSON/YAML 文件的链接。 |
| `summaryOnly` | `boolean` | `false` | 若为 true，则仅渲染方法、路径和摘要。适用于大型 API 索引。 |
| `allowRawHtml` | `boolean` | `false` | 若为 true，则阻止对描述中 HTML 标签的转义。 |

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "info": true,
      "download": true,
      "summaryOnly": false
    }
  }
}
```

## 用法

在 Markdown 中使用带有 `openapi` 标记的围栏代码块嵌入 OpenAPI 规范。路径相对于您的项目源解析。

````markdown
```openapi
assets/openapi.json
```
````

### 渲染结果

```openapi
assets/docmd-api.json
```

## 渲染内容

对于规范中的每个路径和 HTTP 方法，插件会渲染：

- **方法徽章** - 颜色编码（`GET`、`POST`、`PUT`、`PATCH`、`DELETE`）
- **路径** - 带高亮参数的完整端点路径
- **摘要和描述** - 来自 operation 对象
- **参数表格** - 名称、位置（`path`、`query`、`header`、`cookie`）、类型、必需标志、描述
- **请求体表格** - 带类型和默认值的 schema 属性
- **响应表格** - 带描述和响应 schema 类型的状态码
- **已弃用通知** - 标记为 `deprecated: true` 的操作会被内联标记

::: callout tip "构建时渲染"
所有渲染都在构建时进行。生成的页面是静态的，无需客户端 JavaScript 即可显示。这为您带来快速的页面加载、完整的搜索索引和对 SEO 友好的 HTML。
:::

## 能力支持

| 特性 | 支持 |
| :--- | :--- |
| OpenAPI 3.x | ✓ (JSON & YAML*) |
| Swagger 2.x | ✗ (请先转换为 3.x) |
| `$ref` 解析 | ✓ (内部 schemas) |
| `oneOf` / `anyOf` | ✓ (显示为联合类型) |
| `deprecated` 标记 | ✓ |

*\*YAML 支持需要在项目中安装 `js-yaml` 包。*