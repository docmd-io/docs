---
title: "搜索插件"
description: "使用 MiniSearch 为文档启用高速、离线优先的全文搜索。"
---

`@docmd/plugin-search` 插件为文档提供强大的客户端搜索体验。它使用 [MiniSearch](https://github.com/lucaong/minisearch) 在构建时生成轻量级索引，让用户无需服务器数据库即可即时定位技术信息。

## 配置

大多数 `docmd` 模板中搜索默认开启。可通过 `layout` 配置控制其可见性和位置。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  layout: {
    optionsMenu: {
      position: 'header', // 'header', 'sidebar-top', 'sidebar-bottom', or 'menubar'
      components: {
        search: true // Set to false to disable the search plugin entirely
      }
    }
  }
});
```

## 工作原理

### 1. 索引构建（构建时）
在 `docmd build` 过程中，搜索插件遗历站点上的每个页面。它提取标题、标题和纯文本正文，然后将这些数据编译成压缩的 `search-index.json` 文件。

*   **深度链接**：索引器自动将每个标题（`#`、`##` 等）注册为可搜索目标。
*   **相关性加权**：标题权重最高，其次是标题，然后是页面正文。

### 2. 检索（客户端）
用户打开搜索模态框（通常通过 `/` 或 `Ctrl+K`）时，浏览器取回 `search-index.json`。搜索在本地使用模糊匹配和即时前缀匹配进行。

## 自定义搜索行为

在页面 frontmatter 中使用 `noindex` 标志将特定页面排除在搜索索引之外：

```yaml
---
title: "内部规格"
noindex: true # 此页面不会出现在搜索结果或站点地图中
---
```

## 技术实现

插件将一个轻量级搜索模态框注入站点的 `<body>` 中。它完全支持无障碍（符合 ARIA 标准），并支持键盘导航，带来原生应用级别的体验。

::: callout tip "搜索分析"
如果你已启用 [分析插件](./analytics)，读者使用的搜索关键词会自动捕获并发送到你的分析提供商。
:::
由于搜索完全在客户端进行，没有任何数据——甚至键盘输入——会发送到服务器。

## 对比

| 功能 | docmd 搜索 | Algolia / 外部服务 |
| :--- | :--- | :--- |
| **安装** | **零配置**（自动） | 复杂（API 密鑰、CI/CD 爬取） |
| **隐私** | **100% 私密**（客户端） | 数据发送到第三方服务器 |
| **离线** | **支持** | 不支持 |
| **费用** | **免费** | 免费层有限制或收费 |
| **速度** | **即时**（内存内） | 较快（取决于网络延迟） |
