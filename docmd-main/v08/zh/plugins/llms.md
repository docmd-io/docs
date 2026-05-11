---
title: "LLM 上下文插件"
description: "通过自动生成 llms.txt 和 llms-full.txt，为 AI 消费优化你的文档。"
---

`@docmd/plugin-llms` 插件确保你的文档针对大型语言模型 (LLMs) 和 AI 代理进行了完美优化。它遵循不断增长的行业标准，即提供高层摘要和全面的上下文文件，AI 工具可以提取这些文件，以在产生极少幻觉的情况下理解你的项目。

## 配置

LLM 插件默认启用。为了使其正常运行，你必须在 `docmd.config.js` 中提供一个 `url`。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.example.com',
  plugins: {
    llms: {
      fullContext: true // 生成 llms-full.txt
    }
  }
});
```

### 排除页面

如果页面包含敏感信息或你不希望 AI 模型学习的内部笔记，请在 frontmatter 中使用 `llms: false` 标志：

```yaml
---
title: "内部开发机密"
llms: false
---
```

::: callout tip "最大化 AI 准确性 :robot:"
有关构建 Markdown（语义标题、替代文本等）的详细最佳实践，请参阅我们的 [针对 AI 代理进行优化](../guides/ai-optimisation/generating-ai-ready-docs.md) 指南。
:::