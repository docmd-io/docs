---
title: "Sitemap 插件"
description: "自动生成符合标准的 sitemap.xml，以实现更好的搜索引擎发现。"
---

`@docmd/plugin-sitemap` 插件在构建目录的根目录生成一个 `sitemap.xml` 文件。这为搜索引擎提供了您站点架构的综合地图，确保所有页面（包括版本化文档）都会被抓取和索引。

## 配置

通过在根配置中提供您的 `siteUrl` 来启用 sitemap 生成。您可以在 `plugins` 对象中自定义抓取权重。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 sitemap 生成。 |
| `defaultChangefreq` | `string` | `'weekly'` | 提示爬虫页面更改的频率。 |
| `defaultPriority` | `number` | `0.8` | 标准页面的默认权重（0.0 至 1.0）。 |
| `rootPriority` | `number` | `1.0` | 首页（`index.md`）的权重。 |

### 示例

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## 功能

- **规范 URL**：根据您的 `url` 配置，将页面路径解析为干净的公开 URL。
- **版本化发现**：包含来自每个已配置版本（`/v1/`、`/v2/` 等）的页面。
- **按页面排除**：跳过在 frontmatter 中带有 `sitemap: false` 的页面。
- **标准 XML**：输出遵循每个主要搜索引擎都支持的 sitemaps.org 协议。

## 页面级控制

使用 frontmatter 覆盖特定页面的 sitemap 行为：

```markdown
---
title: "归档页面"
priority: 0.3          # 旧内容的较低权重
changefreq: "monthly"   # 提示爬虫
sitemap: false         # 排除此特定页面
---
```

::: callout tip "验证"
构建站点后，您可以在 `site/sitemap.xml` 找到 sitemap。您可以将此 URL 直接提交到搜索引擎控制台以加速索引。
:::