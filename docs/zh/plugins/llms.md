---
title: "LLM 上下文插件"
description: "自动生成 llms.txt 和 llms-full.txt，为 AI 消费最优化文档。"
---

`@docmd/plugin-llms` 插件确保你的文档对大型语言模型（LLM）和 AI Agent 完全最优化。它遵循不断发展的行业标准，提供高层次摘要（`llms.txt`）和全面上下文文件（`llms-full.txt`），供 AI 工具摄取以深入理解你的项目，尽量减少幻觉。

## 配置

LLM 插件默认开启。为确保其正常运行，你必须在 `docmd.config.js` 中提供 `url`。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.example.com',
  plugins: {
    llms: {
      fullContext: true // 生成 llms-full.txt (强烈推荐)
    }
  }
});
```

### 排除某个页面

如果页面包含敏感信息或内部备注，不希望 AI 模型学习此内容，请在 Frontmatter 中使用 `llms: false` 标记：

```yaml
---
title: "内部开发机密"
llms: false
---
```

::: callout tip "最大化 AI 准确度"
关于构建 Markdown（语义化标题、替代文本等）以提高 AI 摄取效果的详细最佳实践，请参阅 [为 AI Agent 优化](../recipes/ai-optimization) 秘籍。
:::