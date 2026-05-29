---
title: "代码块"
description: "高保真语法高亮与一键复制按钮，清晰呈现技术实现细节。"
---

`docmd` 使用超快速的 `lite-hl` 引擎，为数百种编程语言和配置格式提供自动、上下文感知的语法高亮。

## 语法高亮

使用标准 Markdown 代码围斜线语法编写技术示例。始终指定语言标识符，确保高亮引擎应用正确的词法规则。

````markdown
```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```
````

```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```

## 块标题

在语言标识符后跟一个带引号的文件名，以在块上方渲染标签头。这对于直接引用配置文件和源路径很有用。

````markdown
```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```
````

```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```

::: callout tip "一键复制"
开启配置中的 `copyCode: true`（默认开启）后，每个代码块右上角悬停时会自动显示复制按鈕，方便用户将代码片段直接复制到 IDE。
:::

## AI 上下文策略

编写面向 LLM 和 AI Agent 的代码文档时，建议遵循以下最佳实践：

1. **严格语言标注**：明确标注为 `typescript`、`bash` 或 `json`，确保 AI 解析器在 `llms-full.txt` 流中准确解析代码块的语法。
2. **嵌入意图**：在代码块中使用内联注释解释复杂逻辑背后的原因。这为 AI 提供了关键的推理上下文，而这是代码块外的简单文本难以传达的。

## 支持的语言

`docmd` 开箱即用地支持最常用的技术生态系统，包括：

*   **逻辑语言**：`javascript`、`typescript`、`python`、`rust`、`go`、`ruby`、`csharp`。
*   **Web**：`html`、`css`、`markdown`。
*   **数据与 Shell**：`json`、`yaml`、`bash`、`powershell`、`dockerfile`。
*   **文档**：`mermaid`、`changelog`。