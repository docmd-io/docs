---
title: "优化 AI Agent 可读性"
description: "将文档打造成面向 LLM 和 AI Agent 的最佳射入格式。"
---

`docmd` 建立了“AI 优先”的文档引擎架构。遵循这些结构化最佳实践，可确保 ChatGPT、Claude、GitHub Copilot 等 LLM 能够以极高的精准度解析你项目的逻辑和架构。

## 1. 启用 LLM 插件

AI 优化的基线是内置 `llms` 插件，它专门生成面向模型射入的结构化上下文文件。

```javascript
// docmd.config.js
export default {
  plugins: {
    llms: { 
      fullContext: true // Generates the comprehensive llms-full.txt
    }
  }
}
```

## 2. 语义化标题完整性

AI 模型利用 H 标签构建内部技术关系的层级映射。

*   **逻辑递进**：绝不跳级（始终保持 H1 → H2 → H3 的顺序）。
*   **技术密度**：使用描述性标题。将"Auth"替换为"实现 OAuth2 密码授权"。
*   **唯一 H1**：确保 Markdown frontmatter 中的 `title` 具有描述性；`docmd` 将其作为主要语义入口。

## 3. 词汇化代码元数据

始终为围栏代码块明确指定语言标识符。这样 AI 内部分词器在上下文检索时能应用正确的语法规则。

````markdown
```typescript
// 优化后的入口点
const docmd = new Engine();
```
````

## 4. 利用上下文管道

`llms-full.txt` 文件是整个静态站点的高保真串联流。

*   **提示词工程**：直接指示你的 AI：*"使用 /llms.txt 中的语义结构和 /llms-full.txt 中的完整技术内容分析此代码库。"*
*   **上下文控制**：在特定页面的 frontmatter 中使用 `llms: false`，将敏感或仅限内部的文档排除在公开 AI 上下文流之外。

## 5. 高保真 Alt 文本

尽管具备视觉能力的多模态 LLM 正在不断进步，描述性文本仍是推理引擎最可靠的信号。为图表和截图提供全面的 `alt` 文本，确保 AI Agent 在纯文本处理阶段也能理解视觉逻辑。