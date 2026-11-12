---
title: "Sitemap 插件"
description: "自动生成符合标准的 sitemap.xml，以实现更好的搜索引擎发现。"
---

`@docmd/plugin-sitemap` 插件在编译期间于站点输出目录根部生成标准的 `sitemap.xml` 文件。这为网络爬虫和搜索引擎提供了您站点结构的完整地图，确保所有页面与版本路由都能得到高效索引。

## 配置选项

在 `docmd.config.json` 中配置 Sitemap 生成参数：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 Sitemap 生成。 |
| `defaultChangefreq` | `string` | `'weekly'` | 供搜索引擎机器人参考的抓取频率提示。 |
| `defaultPriority` | `number` | `0.8` | 标准文档页面的优先级权重（`0.0` 至 `1.0`）。 |
| `rootPriority` | `number` | `1.0` | 站点首页（`index.md`）的优先级权重。 |

### 全局 Sitemap 配置示例

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## 核心能力

* **规范域名映射**: 根据 `config.url` 将相对页面路由解析为绝对 URL。
* **版本路由索引**: 自动索引所有配置的文档版本（`/v09/`、`/v08/` 等）中的页面。
* **按页面排除**: 跳过 Frontmatter 中包含 `sitemap: false` 或 `noindex: true` 的页面。
* **协议合规性**: 生成符合标准 sitemaps.org 规范的 XML。

## 页面级控制

使用 [页面 Frontmatter](../content/frontmatter.md) 为特定文档覆盖 Sitemap 参数：

```yaml
---
title: "旧版迁移指南"
priority: 0.3          # 针对旧版内容使用较低的抓取权重
changefreq: "monthly"   # 给搜索引擎爬虫的提示
sitemap: false         # 从 sitemap.xml 中排除该页面
---
```

::: callout tip "Sitemap 验证" icon:check-circle
编译完成后，可在 `site/sitemap.xml` 处找到 `sitemap.xml`。将此 URL 直接提交至 Search Console 控制台即可加速页面收录。
:::