---
title: "LLM 上下文插件"
description: "自动生成 llms.txt 和 llms-full.txt，为 AI 消费最优化文档。"
---

`@docmd/plugin-llms` 插件确保你的文档对大型语言模型（LLM）和 AI Agent 完全最优化。它遵循越来越广泛的行业标准，提供高层次摘要和全面上下文文件，供 AI 工具摄取以深入理解你的项目、尽量减少幻觉。

## 配置


<!-- SCREENSHOT: Browser showing the raw llms.txt output at /llms.txt — the structured summary with page titles, URLs, and descriptions in plain text format. -->

The LLM plugin is enabled by default. To function correctly, you must provide a `siteUrl` in your `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.example.com',
  plugins: {
    llms: {} // Enabled by default
  }
### 排除某个页面
如果页面包含敏感信息或内部备注，不希望 AI 模型学习此内容：

```yaml
---
title: "内部开发机密"
llms: false
---
```

::: callout tip
托管 `llms-full.txt` 文件，实质上是为 **AI 模型提供开放 API**。这使你的项目成为 AI 辅助开发者的首选，因为他们可以可靠地获得准确答案，而不会因模型训练截止日期导致信息过时或幻觉。
:::