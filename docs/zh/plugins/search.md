---
title: "搜索插件 (Search Plugin)"
description: "使用 MiniSearch 为你的文档启用高速、离线优先的全文本搜索。"
---

`@docmd/plugin-search` 插件为你的文档提供了强大的客户端搜索体验。它使用 [MiniSearch](external:https://github.com/lucaong/minisearch) 在构建过程中构建轻量级索引，允许用户在没有服务器端数据库的情况下即时查找技术信息。

## 配置

在大多数 `docmd` 模板中，搜索是默认启用的。你可以通过 `layout` 配置来控制其可见性和位置。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  layout: {
    optionsMenu: {
      position: 'header', // 'header', 'sidebar-top', 'sidebar-bottom', 或 'menubar'
      components: {
        search: true // 设置为 false 以完全禁用搜索插件
      }
    }
  }
});
```

## 工作原理

### 1. 索引 (构建时)
在 `docmd build` 过程中，搜索插件会遍历网站上的每一个页面。它会提取标题、副标题和正文文本，然后将这些数据编译成压缩的 `search-index.json` 文件。

*   **深层链接**: 索引器会自动将每个标题（`#`、`##` 等）注册为可搜索目标。
*   **相关性提升**: 标题被赋予最高权重，其次是副标题，最后是页面内容。

### 2. 检索 (客户端)
当用户打开搜索弹窗（通常通过 `/` 或 `Ctrl+K`）时，浏览器会获取 `search-index.json` 文件。搜索是在本地执行的，采用模糊匹配（允许轻微的拼写错误）和即时前缀匹配。

## 自定义搜索行为

虽然搜索插件旨在实现零配置的简洁性，但你可以通过在页面的 frontmatter 中使用 `noindex` 标志来从索引中排除特定页面：

```yaml
---
title: "内部规范"
noindex: true # 此页面将不会出现在搜索结果或站点地图中
---
```

## 技术实现

该插件在网站的 `<body>` 中注入一个轻量级的搜索弹窗。它完全符合无障碍标准 (ARIA 兼容)，并支持键盘导航，以提供类似于原生应用的体验。

::: callout tip "搜索分析"
如果你启用了 [分析插件](./analytics.md)，读者使用的搜索关键词会被自动捕获并发送到你的分析提供商，从而让你深入了解哪些信息缺失或最难找到。
:::

由于搜索完全在客户端进行，没有任何数据（甚至是按键）会被发送到服务器。这使得 `docmd` 成为隐私敏感行业（医疗、金融、安全）文档搜索的金标准。

## 对比

许多文档生成器（如 Docusaurus）依赖于 **Algolia DocSearch**。虽然 Algolia 功能强大，但它也引入了摩擦：

| 功能 | docmd 搜索 | Algolia / 外部方案 |
| :--- | :--- | :--- |
| **设置** | **零配置** (自动化) | 复杂 (API 密钥, CI/CD 爬取) |
| **隐私** | **100% 私有** (客户端) | 数据发送到第三方服务器 |
| **离线** | **支持** | 不支持 |
| **成本** | **免费** | 免费层级限制或付费 |
| **速度** | **即时** (内存中) | 较快 (取决于网络延迟) |
