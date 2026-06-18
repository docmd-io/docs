---
title: "LLM 上下文插件"
description: "通过自动生成 llms.txt 和 llms-full.txt 来优化您的文档以供 AI 消费。"
---

`@docmd/plugin-llms` 插件遵循 `llms.txt` 标准。它在构建时生成两个文件：结构化摘要（`llms.txt`）和完整连接上下文（`llms-full.txt`）。理解该标准的 AI 助手和工具可以直接使用这些文件来摄取您的文档。

## 配置

该插件默认启用。要生成绝对链接，请在 `docmd.config.json` 中设置 `url`。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 LLM 上下文生成。 |
| `fullContext` | `boolean` | `true` | 若为 true，则生成包含所有页面内容的 `llms-full.txt` 文件。 |
| `maxTokenLimit` | `number` | `null` | 可选，限制上下文文件的总字符数/token 数。 |

### 示例

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "llms": {
      "fullContext": true
    }
  }
}
```

## 生成的输出

配置完成后，插件会在每次构建期间自动在站点根目录生成 `llms.txt` 和 `llms-full.txt`。这些文件在页面的 `<head>` 中链接，供 AI 工具自动发现。

### 排除某个页面

如果某个页面包含敏感信息或您不希望 AI 模型学习的内部备注，请在 frontmatter 中使用 `llms: false` 标志：

```markdown
---
title: "内部开发机密"
llms: false
---
```

::: callout tip "最大化 AI 准确性"
有关如何构建 Markdown（语义化标题、替代文本等）的详细最佳实践，请参阅我们的 [为 AI 智能体优化](../guides/ai-optimisation/generating-ai-ready-docs.md) 指南。
:::