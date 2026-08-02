---
title: "自定义 Favicon 与元数据"
description: "如何配置您的站点在浏览器中的视觉身份，并优化社交媒体预览。"
---

## 问题

默认的文档站点在浏览器中往往缺乏鲜明的视觉身份：使用通用的 favicon，且在被分享到社交媒体或沟通工具时，预览效果也不理想。这会削弱品牌识别度与点击率。

## 为什么重要

Favicon 是在拥挤浏览器窗口中的首要视觉锚点。高质量的 OpenGraph 与 Twitter 元数据，能让您的文档在被分享时显得专业可信；它们通过标题、描述与 Hero 图来传递上下文。

## 方法

docmd 内置 `favicon` 属性以方便图标配置。如需更高级的 SEO 与社交元数据，请使用 [SEO 插件](../../plugins/seo.md)。它会根据您的项目配置与页面 Frontmatter，自动生成 meta 标签。

## 实现

### 1. 配置 Favicon

将 favicon 文件（例如 `favicon.svg` 或 `favicon.ico`）放到源目录中，并在 `docmd.config.json` 中引用它。docmd 会自动处理相对路径与缓存破坏 (cache-busting)。

```json "docmd.config.json"
{
  "title": "我的项目",
  "favicon": "/favicon.svg"
}
```

### 2. 全局 SEO 配置

启用并配置 [SEO 插件](../../plugins/seo.md)，为整个站点设置默认的社交媒体预览。

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "seo": {
      "defaultDescription": "关于我们这款出色软件的终极指南。",
      "openGraph": {
        "defaultImage": "/static/og-banner.png"
      },
      "twitter": {
        "siteUsername": "@myproject",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

### 3. 针对单个页面覆盖

您也可以通过 [Frontmatter](../../content/frontmatter.md) 中的 `seo` 属性为单个页面覆盖 SEO 设置。

```yaml
---
title: "重大发布 v2.0"
description: "您需要了解的关于我们新引擎的一切。"
seo:
  image: "/assets/v2-hero-banner.png"
  keywords: ["release", "v2", "update", "performance"]
---
```

## 取舍

`favicon` 属性虽然方便，但仅支持单文件。若需要复杂的多尺寸 favicon 套装（Apple Touch Icon、Android manifest 等），您可能需要借助自定义插件，向 `<head>` 注入额外的 `<link>` 标签。