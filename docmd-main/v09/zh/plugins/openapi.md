---
title: "OpenAPI 插件"
description: "在构建时直接从 OpenAPI 3.x 规范渲染静态 API 参考文档。"
---

`@docmd/plugin-openapi` 插件将 OpenAPI 3.x 规范文件（JSON 或 YAML）转换为结构化的、可搜索的 API 参考页面。遵循 docmd 的“零 JS”运行时理念，每个端点、参数表格和 Schema 模型都会在构建处理期间被编译为静态 HTML。

## 配置选项

在 `docmd.config.json` 中配置全局 OpenAPI 渲染参数：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | 显示规范 `info` 块中的 API 标题、版本与描述。 |
| `download` | `boolean` | `false` | 添加原始 JSON/YAML 规范文件的直接下载链接。 |
| `summaryOnly` | `boolean` | `false` | 仅渲染高层 HTTP 方法与路径摘要，不展示完整的参数 Schema。 |
| `allowRawHtml` | `boolean` | `false` | 允许在规范描述字符串中使用未转义的原始 HTML。 |

### 全局配置示例

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

## 用法与语法

使用带有 `openapi` 语言标记的围栏代码块嵌入 OpenAPI 规范。请指定源于您文档源码根目录的相对文件路径：

````markdown
```openapi
assets/openapi.json
```
````

### 规范输出解析

插件会解析并渲染：

* **HTTP 方法徽章**: 颜色编码徽章 (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)。
* **端点路径**: 带参数的路径字符串。
* **参数表格**: 名称、位置 (`path`, `query`, `header`, `cookie`)、数据类型、必填标志以及描述。
* **请求与响应模型**: 包含字段类型与默认值的结构化 Schema 表格。
* **弃用警告横幅**: 针对标记有 `deprecated: true` 的端点提供内联警告。

::: callout tip "零-JS 构建期执行" icon:zap
所有 OpenAPI 规范均在编译期间解析为静态 HTML。运行时无需加载任何沉重的客户端 JavaScript 库，确保极简的页面加载时间与完全的搜索索引能力。
:::

## 技术兼容性

| 规范特性 | 兼容性级别 |
| :--- | :--- |
| OpenAPI 3.x (JSON) | 原生支持 |
| OpenAPI 3.x (YAML) | 受支持 (需要 `js-yaml` 依赖项) |
| Swagger 2.0 | 旧版 (构建前需转换为 OpenAPI 3.x) |
| 内部 `$ref` Schemas | 完整解析 |
| 多态 `oneOf` / `anyOf` | 渲染为联合类型 |
| 已弃用的操作 | 原生支持内联标记 |