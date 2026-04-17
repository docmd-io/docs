---
title: "SEO 插件"
description: "通过原生元标签生成优化文档搜索排名，并控制 AI 爬虫访问权限。"
---

`@docmd/plugin-seo` 插件负责为每个页面生成高质量元数据。它确保你的文档不仅能被搜索引擎发现，还能被 AI 模型和社交媒体平台正确解读。

## 全局配置

在 `docmd.config.js` 中配置全站 SEO 默认值。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    seo: {
      defaultDescription: 'Comprehensive documentation for the docmd ecosystem.',
      aiBots: false, // Set to false to block common AI crawlers (GPTBot, etc.)
      openGraph: {
        defaultImage: '/assets/og-image.png'
      },
      twitter: {
        siteUsername: '@docmd_io',
        cardType: 'summary_large_image'
      }
    }
  }
});
```

## 页面级覆盖

可利用 frontmatter 对单个页面精细调整 SEO 设置。页面级设置始终优先于全局默认值。

```yaml
---
title: "高级配置"
description: "掌握 docmd 内部引擎的各项设置。"
noindex: true # 屏蔽此页面，不被任何搜索引擎索引
seo:
  keywords: ["docmd", "javascript", "ssg"]
  ogType: "article"
  canonicalUrl: "https://mysite.com/canonical-path"
  aiBots: true # 覆盖全局屏蔽，允许 AI 访问此页面
---
```

## 核心功能

### 1. 智能描述回退
如果 frontmatter 或全局配置中未提供描述，插件将自动提取页面正文的前 150 个字符作为 `<meta name="description">`，确保每个页面均具备基本元数据以于搜索结果摘要。

### 2. AI 爬虫权限管理
通过设置 `aiBots: false`，插件会专门借助 `noindex` 指令屏蔽主流 AI 爬虫（包括 `GPTBot`、`Claude-Web` 和 `Google-Extended`）。这样可以设定传统搜索引擎索引与 LLM 训练的差异化策略。

### 3. Canonical URL 解析
插件基于 `siteUrl` 自动生成 `<link rel="canonical">` 标签。它能智能处理目录索引，将 `guide/index.html` 转化为干凁的 `/guide/` canonical URL，防止内容重复。

### 4. 丰富社交分享预览
内置支持 Open Graph 和 Twitter Cards，确保文档链接在 X（Twitter）、LinkedIn 和 Discord 等平台上分享时呈现专业外观。

::: callout tip "搜索发现"
获得最佳 SEO 效果，请确保在配置根目录中定义 `siteUrl`。没有基本 URL，插件无法生成绝对 canonical 链接或 Open Graph 图片路径。
:::

## 结构化数据（LD+JSON）
`docmd` 可自动生成 [Article Schema](https://developers.google.com/search/docs/appearance/structured-data/article)，帮助搜索引擎展示丰富摘要。

```yaml
---
title: "如何构建 docmd 插件"
seo:
  ldJson: true
---
```

::: callout tip "结构化数据"
配置完善的 SEO 插件有助于 AI 驱动的搜索引擎（如 SearchGPT 或 Perplexity）准确摘要你的网站内容。通过提供清晰的描述并屏蔽特定爬虫，可完全控制 AI 模型如何在线感知和引用你的内容。
:::