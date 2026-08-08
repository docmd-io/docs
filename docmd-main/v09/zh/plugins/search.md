---
title: "搜索插件"
description: "使用 MiniSearch 为您的文档启用高速、离线优先的全文搜索。"
---

`@docmd/plugin-search` 插件为您的文档网站提供客户端搜索体验。它在编译期间使用 [MiniSearch](external:https://github.com/lucaong/minisearch) 构建压缩索引，使读者能够即时搜索技术文档，无需服务端数据库或第三方爬虫服务。

## 配置选项

搜索在标准 `docmd` 模板中默认启用。在 `docmd.config.json` 中配置索引器参数和标头位置：

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用全文搜索索引生成。 |
| `placeholder` | `string` | `'Search...'` | 搜索对话框中的输入占位符文本。 |
| `maxResults` | `number` | `10` | 模态框中返回的最大搜索结果数量。 |

### 标头集成示例

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

## 关键词搜索的工作原理

### 1. 构建期索引
在站点编译期间（`npx @docmd/core build`），`@docmd/plugin-search` 遍历站点上的每个页面。它提取标题、各级标题和正文文本，生成压缩的 `search-index.json` 包：

* **深度链接**: 将标题锚点（`#`、`##`）注册为直接搜索跳转目标。
* **相关性权重**: 页面标题获得最高权重，其次是章节标题，然后是正文段落。

### 2. 客户端检索
当用户打开搜索模态框（按 `Ctrl+K` 或 `/`）时，浏览器会获取 `search-index.json`。查询在本地执行，支持前缀匹配和模糊字符串距离匹配，以适应轻微的拼写错误。

## 自定义搜索范围

要从搜索索引中排除特定页面，请在 [页面 Frontmatter](../content/frontmatter.md) 中添加 `noindex: true`：

```yaml
---
title: "内部草案规范"
noindex: true
---
```

::: callout tip "隐私与合规" icon:shield-check
由于搜索查询完全在客户端内存中执行，没有任何搜索输入或按键遥测数据离开用户的浏览器。
:::

## 离线本地语义搜索

`@docmd/plugin-search` 原生支持由 `docmd-search` 驱动的本地语义搜索。语义搜索使用客户端嵌入模型从概念上处理查询，而不是单纯匹配字面关键词。

### 启用语义搜索

1. 在文档工作区中安装 `docmd-search`：

```bash
npm install docmd-search
```

2. 在 `docmd.config.json` 中启用语义索引：

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### 语义搜索选项

| 选项 | 类型 | 默认值 | 技术用途 |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | 启用向量嵌入搜索。 |
| `showConfidence` | `boolean` | `false` | 在搜索结果中显示相似度百分比徽章。 |
| `showFilters` | `boolean` | `true` | 在搜索对话框中显示版本筛选控制条。 |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | HuggingFace 嵌入模型 ID。 |
| `chunkSize` | `number` | `512` | 每个文档章节的 Token 切片限制。 |

### 支持的嵌入模型

| 模型 ID | 下载大小 | 最适合 |
| :--- | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` *(默认)* | ~23 MB | 英文技术文档 |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 多语言站点（德语、中文、法语等） |
| `Xenova/multilingual-e5-small` | ~118 MB | 广泛的国际语言覆盖 |

::: callout info "自动回退" icon:info
如果启用了 `docmd-search` 但无法加载向量嵌入依赖项，搜索插件会优雅地回退到标准的 MiniSearch 关键词索引。
:::