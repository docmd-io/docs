---
title: "SEO 插件"
description: "通过原生的元标签生成功能，为搜索引擎优化你的文档并控制 AI 爬虫的访问。"
---

`@docmd/plugin-seo` 插件负责为每个页面生成高质量的元数据。它确保你的文档不仅能被搜索引擎上的人类读者发现，而且能被 AI 模型和社交媒体平台正确解读。

## 全局配置

在 `docmd.config.js` 中配置全站的 SEO 默认设置。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    seo: {
      defaultDescription: 'docmd 生态系统的全面文档。',
      aiBots: false, // 设置为 false 以阻止常见的 AI 爬虫 (GPTBot 等)
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

你可以使用 frontmatter 为单个页面微调 SEO 设置。页面级设置始终优先于全局默认设置。

```yaml
---
title: "高级配置"
description: "学习如何精通 docmd 的内部引擎。"
noindex: true # 从所有搜索引擎中隐藏此特定页面
seo:
  keywords: ["docmd", "javascript", "ssg"]
  ogType: "article"
  canonicalUrl: "https://mysite.com/canonical-path"
  aiBots: true # 覆盖全局阻止设置，允许 AI 访问此页面
---
```

## 核心功能

### 1. 智能描述降级
如果在 frontmatter 或全局配置中未提供描述，插件会自动提取页面正文的前 150 个字符作为 `<meta name="description">`，确保每个页面都有用于搜索摘要的基础元数据。

### 2. AI 机器人治理
通过设置 `aiBots: false`，插件会专门针对主要的 AI 爬虫（包括 `GPTBot`、`Claude-Web` 和 `Google-Extended`）注入 `noindex` 指令。这允许你区分传统的搜索引擎索引与 LLM 训练会话。

### 3. 规范化 URL 解析
插件会根据你的 `siteUrl` 自动生成 `<link rel="canonical">` 标签。它可以智能地处理目录索引，将 `guide/index.html` 转换为干净的 `/guide/` 规范 URL，以防止重复内容问题。

### 4. 丰富的社交预览
对 Open Graph 和 Twitter Cards 的原生支持确保了指向你文档的链接在 X (Twitter)、LinkedIn 和 Discord 等平台上分享时显得非常专业。

::: callout tip "搜索发现"
为了获得最佳的 SEO 效果，请确保在配置根目录中定义了 `siteUrl`。如果没有基准 URL，插件将无法生成绝对规范链接或 Open Graph 图像路径。
:::

## 结构化数据 (LD+JSON)
`docmd` 可以自动生成 [Article Schema](external:https://developers.google.com/search/docs/appearance/structured-data/article)，以帮助搜索引擎显示丰富摘要。

```yaml
---
title: "如何构建 docmd 插件"
seo:
  ldJson: true
---
```

::: callout tip "结构化数据"
配置良好的 SEO 插件有助于 AI 驱动的搜索引擎（如 SearchGPT 或 Perplexity）准确总结你的网站。通过提供清晰的描述和阻止特定的机器人，你可以准确控制 AI 模型在网上感知和获取你的内容的方式。
:::