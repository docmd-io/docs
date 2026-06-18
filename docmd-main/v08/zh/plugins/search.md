---
title: "搜索插件"
description: "使用 MiniSearch 为您的文档启用高速、离线优先的全文搜索。"
---

`@docmd/plugin-search` 插件为您的文档提供强大的客户端搜索体验。它使用 [MiniSearch](external:https://github.com/lucaong/minisearch) 在构建过程中构建轻量级索引，允许用户在不依赖服务端数据库的情况下即时查找技术信息。

## 配置

搜索在大多数 `docmd` 模板中默认启用。您可以通过 `layout` 配置控制其可见性和位置。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用全文搜索索引器。 |
| `placeholder` | `string` | `'Search...'` | 搜索输入的自定义占位符文字。 |
| `maxResults` | `number` | `10` | 模态框中显示的最大结果数。 |

### 示例

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true
      }
    }
  }
}
```

## 工作原理

<img width="720" class="with-border" src="/assets/previews/search-ui-default.webp">

### 1. 索引（构建时）
在 `npx @docmd/core build` 过程中，搜索插件遍历您站点上的每个页面。它提取标题、各级标题和纯文本正文，然后将这些数据编译成压缩的 `search-index.json` 文件。

*   **深度链接**：索引器自动将每个标题（`#`、`##` 等）注册为可搜索的目标。
*   **相关性提升**：标题获得最高权重，其次是各级标题，然后是页面内容。

### 2. 检索（客户端）
当用户打开搜索模态框（通常通过 `/` 或 `Ctrl+K`）时，浏览器会获取 `search-index.json`。搜索使用模糊匹配（允许小的拼写错误）和即时前缀匹配在本地执行。

## 自定义搜索行为

搜索插件设计为零配置简单性，但您可以通过使用 `noindex` 标记在其 frontmatter 中从索引中排除特定页面：

```yaml
---
title: "Internal Specification"
noindex: true # This page will not appear in search results or sitemaps
---
```

## 技术实现

该插件将轻量级搜索模态框注入到您站点的 `<body>` 中。它完全可访问（符合 ARIA），并支持键盘导航以提供类似原生应用的体验。

::: callout tip "搜索分析"
如果您启用了 [Analytics 插件](./analytics.md)，则会自动捕获您的读者使用的搜索关键词并发送给您的分析提供商，让您深入了解哪些信息缺失或最难查找。
:::
由于搜索完全在客户端运行，没有任何数据，甚至按键也会离开浏览器。这使其适用于隐私敏感的行业（医疗保健、金融、安全）。

## 对比

许多文档生成器（如 Docusaurus）依赖 **Algolia DocSearch**。虽然 Algolia 很强大，但它带来了摩擦：

| 功能 | docmd Search | Algolia / 外部 |
| :--- | :--- | :--- |
| 设置 | 零配置（自动） | API 密钥、CI 抓取 |
| 隐私 | 客户端，不发送数据 | 数据发送到第三方服务器 |
| 离线 | 是 | 否 |
| 成本 | 免费 | 免费层限制或付费 |
| 速度 | 内存中，即时 | 取决于网络延迟 |

## 语义搜索（Alpha 预览）

::: callout tip "推出 docmd-search"
`docmd-search` 是用于文档的完全离线语义搜索引擎。它完全在浏览器中运行，不需要服务器，不需要 API 密钥，也不会向任何人发送任何内容。它不依赖于 docmd：您可以将其插入任何文档引擎或静态站点。

这是早期 alpha 版本。API 和行为将会变化。基础（私有、离线、真正智能的搜索）已经存在。

[→ 在 GitHub 上查看](https://github.com/docmd-io/docmd-search)
:::

> **实验性功能** —— 语义搜索目前处于 alpha 预览阶段。默认的关键字搜索仍然是生产使用的推荐选项。

<img width="720" class="with-border" src="/assets/previews/search-ui-semantic.webp">

语义搜索使用本地嵌入来理解查询背后的含义，从而实现超越简单关键字匹配的更智能结果。

### 启用语义搜索

首先，安装 `docmd-search` 包：

```bash
npm install docmd-search
```

然后在您的配置中启用它：

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### 语义搜索的工作原理

与匹配精确术语的关键字搜索不同，语义搜索：

*   **理解上下文** —— "authentication" 的查询会找到相关页面，即使它们使用不同的术语，如 "login" 或 "sign-in"
*   **自然处理拼写错误** —— 不需要模糊匹配；模型理解意图
*   **找到相关概念** —— 搜索 "API" 返回相关的端点文档，而不仅仅是包含 "API" 的页面

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | 启用语义搜索（需要 `docmd-search` 包） |
| `showConfidence` | `boolean` | `false` | 在语义搜索结果中显示相似度置信度分数徽章 |
| `showFilters` | `boolean` | `true` | 在搜索结果上方显示版本筛选条（设为 `false` 隐藏） |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | 要使用的嵌入模型 |
| `chunkSize` | `number` | `512` | 最大块大小（字符） |
| `chunkOverlap` | `number` | `50` | 块之间的重叠（字符） |
| `indexDir` | `string` | - | 预构建语义索引的路径 |

### 对比：语义 vs 关键字

| 功能 | 语义搜索 | 关键字搜索 |
| :--- | :--- | :--- |
| **理解** | 上下文感知 | 仅精确匹配 |
| **拼写错误容忍** | 高 | 有限（模糊匹配） |
| **同义词** | 是 | 否 |
| **设置** | 需要 `docmd-search` | 内置 |
| **索引大小** | 较大（每 100 个文件 1–2 MB） | 较小 |
| **隐私** | 100% 私有（客户端） | 100% 私有（客户端） |
| **离线** | 是 | 是 |

### 自动安装

启用 `semantic: true` 后，如果插件和其对等依赖项（`@huggingface/transformers`、`onnxruntime-node`）尚不可用，插件会自动安装它们。这适用于 npm、pnpm、yarn 和 bun —— 自动检测您项目的包管理器。

如果自动安装失败（例如在受限的 CI 环境中），插件会优雅地回退到关键字搜索。

### 可用模型

`model` 选项让您选择嵌入模型。模型下载一次并在本地缓存。

| 模型 | 大小 | 语言 | 最适合 |
| :---- | :--- | :-------- | :------- |
| `Xenova/all-MiniLM-L6-v2` *(默认)* | ~23 MB | 仅英语 | 快速、仅英文文档 |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 50+ 语言 | **i18n 文档**（中文、德语、法语等） |
| `Xenova/multilingual-e5-small` | ~118 MB | 100+ 语言 | 广泛的语言覆盖 |
| `Xenova/paraphrase-multilingual-mpnet-base-v2` | ~270 MB | 50+ 语言 | 最佳多语言质量 |

::: callout info "自定义模型"
您可以使用任何与 Transformers.js 兼容的 HuggingFace 模型。在 [huggingface.co/models](https://huggingface.co/models?pipeline_tag=feature-extraction&library=transformers.js) 浏览并按 `transformers.js` 库筛选。
:::

### 回退行为

如果启用了语义搜索但无法安装或找不到 `docmd-search`，插件会自动回退到关键字搜索。这确保您的文档无论如何配置都保持可搜索。

::: callout warning "Alpha 限制"
语义搜索是实验性的。当前的限制包括：

*   仅限英文模型（多语言模型可用但测试较少）
*   没有增量更新（需要完整重建）
*   较高的内存使用量（浏览器中约 50–100 MB）
*   首次加载可能较慢，因为需要获取嵌入
:::

### 最佳实践

为获得最佳语义搜索性能：

1.  **排除噪音** —— 不要索引 changelog 或草稿内容：
    ```json "docmd.config.json"
    {
      "plugins": {
        "search": {
          "semantic": true,
          "exclude": ["**/release-notes/**", "**/drafts/**"]
        }
      }
    }
    ```

2.  **为 CI/CD 预构建** —— 使用 `indexDir` 选项预生成索引：
    ```bash
    npx docmd-search --ui
    ```

3.  **监控索引大小** —— 定期检查 `.docmd-search/` 目录大小

4.  **彻底测试** —— 在部署到生产环境之前验证搜索结果质量