---
title: "自定义 Favicon 和元数据"
description: "如何配置您网站在浏览器中的视觉标识并优化社交媒体预览。"
---

## 问题

默认的文档网站在浏览器中往往缺乏独特的视觉标识（使用通用的 favicon），并且在链接被分享到社交媒体或 Slack、Discord 等沟通工具时，提供的预览效果较差。这会降低品牌识别度和点击率。

## 为什么重要

Favicon 是浏览器窗口中主要的视觉锚点。高质量的 OpenGraph 和 Twitter 元数据可以确保您的文档在分享时看起来专业且值得信赖，通过标题、描述和英雄图提供必要的上下文。

## 方法

`docmd` 提供了一个内置的 `favicon` 属性，用于轻松配置图标。对于高级 SEO 和社交元数据，请利用 [SEO 插件](../../plugins/seo)，它可以根据您的项目配置和页面 Frontmatter 自动生成元标签。

## 实施

### 1. 配置 Favicon

将您的 Favicon 文件（例如 `favicon.svg` 或 `favicon.ico`）放在源目录中，并在 `docmd.config.js` 中引用它。`docmd` 会自动处理相对路径和缓存失效。

```javascript
// docmd.config.js
export default {
  title: '我的项目',
  favicon: '/favicon.svg' // 相对于源目录
};
```

### 2. 全局 SEO 配置

启用并配置 [SEO 插件](../../plugins/seo)，为整个网站设置默认的社交媒体预览。

```javascript
// docmd.config.js
export default {
  url: 'https://docs.example.com',
  plugins: {
    seo: {
      defaultDescription: '关于我们神奇软件的终极指南。',
      openGraph: {
        defaultImage: '/static/og-banner.png'
      },
      twitter: {
        siteUsername: '@myproject',
        cardType: 'summary_large_image'
      }
    }
  }
};
```

### 3. 页面级覆盖

您可以使用 [Frontmatter](../../content/frontmatter) 中的 `seo` 属性覆盖单个页面的 SEO 设置。

```yaml
---
title: "重大发布 v2.0"
description: "关于我们新引擎您需要了解的一切。"
seo:
  image: "/assets/v2-hero-banner.png"
  keywords: ["发布", "v2", "更新", "性能"]
---
```

## 权衡

虽然 `favicon` 属性很方便，但它仅支持单个文件。对于复杂的多尺寸 Favicon 集（Apple Touch 图标、Android manifest 等），您可能需要使用自定义插件将额外的 `<link>` 标签注入 `<head>` 中。
