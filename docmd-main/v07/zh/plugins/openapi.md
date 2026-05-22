---
title: "OpenAPI 插件"
description: "直接在 Markdown 页面中从 JSON 或 YAML 规范文件渲染 OpenAPI 3.x API 参考文档。"
---

**OpenAPI 插件**将 OpenAPI 3.x 规范文件转换为结构化的 API 参考页面 -  - 在构建时渲染，无需客户端 JavaScript，无需第三方依赖。每个端点、参数、请求体和响应都转换为语义化 HTML 表格。

::: callout info "核心插件"
OpenAPI 插件现在已**内置**于 `@docmd/core` 中，无需单独安装。它遵循 Docmd 的构建时渲染理念 -  - 插件在构建时读取您的规范并输出干净、可访问的 HTML 表格，无需客户端 JavaScript。
:::

## 安装

```bash
docmd add openapi
# 或手动安装：
npm install @docmd/plugin-openapi
```

在您的配置中启用：

```javascript
export default defineConfig({
  plugins: {
    openapi: {}
  }
});
```

## 使用方法

在任何 Markdown 页面中使用带 `openapi` 语言标签的围栏代码块嵌入 OpenAPI 规范：

````markdown
### 实时示例

```openapi
assets/docmd-api.json
```
````

### 渲染结果

```openapi
assets/docmd-api.json
```

路径相对于您的 `src` 目录解析。支持 **JSON** 和 **YAML** 格式。YAML 需要安装 `js-yaml`：

```bash
npm install js-yaml
```

## 渲染内容

对于规范中的每个路径和 HTTP 方法，插件渲染：

- **方法徽章** - 颜色编码（`GET`、`POST`、`PUT`、`PATCH`、`DELETE`）
- **路径** - 完整端点路径
- **摘要和描述** - 来自操作对象
- **参数表格** - 名称、位置（`path`、`query`、`header`、`cookie`）、类型、必填标志、描述
- **请求体表格** - 带类型和默认值的模式属性
- **响应表格** - 带描述和响应模式类型的状态码
- **已弃用通知** - 标记为 `deprecated: true` 的操作内联标注

::: callout tip "构建时渲染"
所有渲染在构建时发生。生成的页面是完全静态的 -  - 无需 JavaScript 即可显示 API 文档，意味着快速页面加载和完整的搜索索引。
:::

## 支持的 OpenAPI 功能

| 功能 | 支持 |
| :--- | :--- |
| OpenAPI 3.x | ✓ |
| Swagger 2.x | ✗（请先转换为 3.x）|
| JSON 格式 | ✓ |
| YAML 格式 | ✓（需要 `js-yaml`）|
| `$ref` 解析 | ✓（内部 `#/components/schemas/` 引用）|
| `oneOf` / `anyOf` 类型 | ✓（显示为联合类型字符串）|
| 嵌套模式表格 | ✓ |
| `deprecated` 标志 | ✓ |
| 外部 `$ref`（远程 URL）| ✗（仅本地引用）|

## 配置

OpenAPI 插件可以在您的 `docmd.config.js` 中配置：

```javascript
export default defineConfig({
  plugins: {
    openapi: {
      info: true,           // 显示 API 标题和版本标题
      download: true,       // 在 UI 中提供“下载 JSON/YAML”链接
      summaryOnly: false,    // 仅显示摘要，隐藏参数/响应
      allowRawHtml: false    // 允许在描述中使用 HTML（请谨慎使用）
    }
  }
});
```

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | 显示规范中 `info` 对象的 API 标题、版本和描述。 |
| `download` | `boolean` | `false` | 如果为 true，则在规范页眉添加下载/查看原始 JSON/YAML 文件的链接。**推荐用于 AI 辅助。** |
| `summaryOnly` | `boolean` | `false` | 如果为 true，则仅渲染方法、路径和摘要。对大型 API 索引很有用。 |
| `allowRawHtml` | `boolean` | `false` | 如果为 true，则不转义描述中的 HTML 标签。 |

## 页面级控制

通过 frontmatter 为特定页面禁用插件：

```markdown
---
title: "内部说明"
plugins:
  openapi: false
---
```
