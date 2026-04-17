---
title: "Sitemap 插件"
description: "自动生成符合标准的 sitemap.xml，提升搜索引擎发现效率。"
---

`@docmd/plugin-sitemap` 插件在构建目录根目录自动生成 `sitemap.xml` 文件。该文件为 Google、Bing 等搜索引擎提供完整的站点架构地图，确保包括版本化文档中深层链接在内的所有页面都能被爬取和索引。

## 配置

提供站点的 `siteUrl` 即可开启站点地图生成。可在 `plugins` 对象中自定义各章节的爬取权重。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.example.com', // Required for sitemap generation
  plugins: {
    sitemap: {
      defaultChangefreq: 'weekly', // 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
      defaultPriority: 0.8,        // Default weight for standard pages
      rootPriority: 1.0            // Weight for the homepage (index.md)
    }
  }
});
```

## 页面级控制

可使用 frontmatter 覆盖特定页面的站点地图行为。

```yaml
---
title: "归档页面"
priority: 0.3          # 旧版内容的较低权重
changefreq: "monthly"   # 提示爬虫此页面变更频率较低
lastmod: "2024-03-15"   # 明确设置最后修改日期
sitemap: false         # 将此页面从 sitemap.xml 中排除
---
```

## 核心功能

### 1. 自动 URL 构建
插件智能地将页面路径解析为规范的公开 URL。它自动处理目录索引，确保 `guide/index.html` 列为 `https://yoursite.com/guide/`，以维护简洁的 URL 结构。

### 2. 版本化发现
如果你的项目使用[版本控制](../configuration/versioning)，站点地图插件会自动включать所有版本的所有页面（如 `/v1/getting-started`、`/v2/getting-started`），无需手动配置即可让搜索引擎发现你的归档文档。

### 3. 智能排除
在 frontmatter 中标记 `noindex: true` 或 `sitemap: false` 的页面会自动从生成的 `sitemap.xml` 中排除，让你精细控制呈现给搜索引擎的内容。

::: callout tip "验证"
构建站点后，通常可在 `your-output-dir/sitemap.xml` 找到站点地图。大多数搜索引擎控制台允许你直接提交此文件以加速索引。
:::
