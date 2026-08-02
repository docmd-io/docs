---
title: "LLM 上下文插件"
description: "通过自动生成 llms.txt、llms-full.txt 和 llms.json 来优化您的文档以供 AI 消费。"
---

`@docmd/plugin-llms` 插件遵循 `llms.txt` 标准。它在构建时生成结构化摘要（`llms.txt`）和完整连接上下文（`llms-full.txt`）。理解该标准的 AI 助手和工具可以直接使用这些文件来摄取您的文档。

该插件在 0.8.8 中**默认启用**。要生成绝对链接，请在 `docmd.config.json` 中设置 `url`。

## 生成的输出

插件会在站点根目录生成三个文件：

- `llms.txt` — 所有页面的结构化列表，包含标题、描述和 URL
- `llms-full.txt` — 与上面相同的列表，但每个条目的下方附加了该页面的完整 Markdown 正文
- `llms.json` — 每个页面的机器可读清单（标题、URL、描述、优先级）

这些文件在页面的 `<head>` 中链接，供 AI 工具自动发现。

## 配置

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 LLM 上下文生成。 |
| `fullContext` | `boolean` | `true` | 若为 true，则生成包含所有页面完整 Markdown 的 `llms-full.txt` 文件。 |
| `maxTokenLimit` | `number` | `null` | 可选，限制上下文文件的总字符数/token 数。 |
| `i18n` | `boolean` | `false` | 设为 `true` 时，除了默认语言版本，还会按语言分别写入 `llms.<locale>.txt` 等文件。详见下方 [多语言输出](#多语言输出)。 |

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

## 默认行为（0.8.8）

插件**只为默认语言**写入文件。这是对早期版本的刻意变更——早期版本默认按语言分别输出。原因在于：无后缀的 `llms.txt` / `llms-full.txt` / `llms.json` 文件名是下游消费者（Cursor、Claude、GPT 等）查找的标准名称。如果把它们拆成 `llms.en.txt` + `llms.hi.txt` + `llms.fr.txt`，将会破坏所有现有的集成。

对于单语言项目（无 `config.i18n` 配置块），这一点是不可见的——插件仍像以前一样在站点根目录写入一组文件。对于多语言项目，bundle 中只包含默认语言的页面。

## 多语言输出（opt-in）

要按语言分别输出文件，请设置 `i18n: true`：

```json "docmd.config.json"
{
  "plugins": {
    "llms": { "i18n": true }
  }
}
```

插件随后会写入：

```text
site/llms.txt          ← 默认语言（en）— 无后缀
site/llms-full.txt     ← 默认语言（en）— 无后缀
site/llms.json         ← 默认语言（en）— 无后缀
site/llms.ja.txt       ← 日语 — 带后缀
site/llms-full.ja.txt  ← 日语 — 带后缀
site/llms.ja.json      ← 日语 — 带后缀
site/llms.fr.txt       ← 法语 — 带后缀
site/llms-full.fr.txt  ← 法语 — 带后缀
site/llms.fr.json      ← 法语 — 带后缀
```

请注意这一模式：**默认语言永远不会带后缀**——它的文件保持无后缀的名称，这样现有的消费者不会受到影响。只有非默认语言才会获得 `.<locale>` 后缀。

对于只配置了一种语言的项目，无论 `i18n` 标志如何设置，都不会写入按语言分别的文件（后缀只会增加噪声）。

## 排除某个页面

如果某个页面包含敏感信息或您不希望 AI 模型学习的内部备注，请在 frontmatter 中使用 `llms: false` 标志：

```markdown
---
title: "内部开发机密"
llms: false
---
```

这将从 LLMS 文件中排除该页面。该页面仍会在常规站点 HTML 中渲染，并仍包含在搜索结果中。

## 另请参阅

- [OKF Bundle 插件](./okf.md) — 互补的 AI 智能体消费 bundle 格式（类型化清单、图形查看器、按页面概念文件）。LLMS 是平面列表；OKF 是结构化图形。
- [构建 AI 就绪文档](../guides/ai-optimisation/generating-ai-ready-docs.md)
- [为 LLM 构建结构](../guides/ai-optimisation/structure-for-llms.md)

::: callout tip "最大化 AI 准确性"
有关如何构建 Markdown（语义化标题、替代文本等）的详细最佳实践，请参阅我们的 [为 AI 智能体优化](../guides/ai-optimisation/generating-ai-ready-docs.md) 指南。
:::