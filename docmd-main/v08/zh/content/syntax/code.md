---
title: "代码块"
description: "通过语法高亮、文件标题与一键复制功能记录技术实现。"
---

docmd 使用超快的 `lite-hl` 引擎实现自动、上下文感知的语法高亮。在每个围栏代码块上指定语言标识符，以确保应用正确的词法规则。

## 语法高亮

始终在开头的围栏后指定语言。高亮器会应用该生态系统特有的语法规则。

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

在语言标识符后跟一个带引号的文件名，即可在块上方渲染一个带标签的标题栏。这对于直接引用配置文件与源路径非常有用。

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

## 语言支持

docmd 开箱即支持常见的技术生态系统：

*   **逻辑：** `javascript`、`typescript`、`python`、`rust`、`go`、`ruby`、`csharp`
*   **Web：** `html`、`css`、`markdown`
*   **数据与 Shell：** `json`、`yaml`、`bash`、`powershell`、`dockerfile`
*   **文档：** `mermaid`、`changelog`

## AI 上下文策略

为 AI 智能体记录代码时，请遵循以下实践：

1.  **明确标注每个块** —— 使用 `typescript`、`bash`、`json`，而不是依赖自动检测。这确保解析器为 `llms.txt` 流应用正确的语法。
2.  **在注释中嵌入意图** —— 内联注释解释复杂逻辑，并直接在代码内部提供关键的推理上下文。

::: callout tip "一键可移植性"
在配置中设置 `copyCode: true` 以启用一个简洁的复制按钮。它会在悬停时出现在每个块的右上角，让读者能够即时复制代码片段。
:::
