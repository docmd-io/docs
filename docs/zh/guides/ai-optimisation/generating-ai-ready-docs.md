---
title: "使用 docmd 生成 AI 就绪的文档"
description: "如何使用 llms.txt 标准和 docmd 的内置工具为 AI 助手提供优化的上下文。"
---

## 问题

开发者越来越依赖 AI 编程助手（如 Cursor、GitHub Copilot 和 ChatGPT）来代表他们阅读和解释文档。如果您的文档只能通过浏览器访问，并且充斥着导航元素、追踪器和复杂的 HTML，AI 代理将在无关数据上消耗过多的 token，从而迅速耗尽其上下文窗口。

## 为什么重要

提供文档的纯净、经过 token 优化的文本版本，相当于现代的提供高质量 REST API。它确保 AI 代理可以快速摄取您的整个文档集，从而提供更准确的代码建议，并为使用您产品的开发者提供更好的支持。

## 方法

利用 `docmd` 内置的 **LLMs 插件**。该插件原生支持新兴的 `llms.txt` 标准，在每次构建过程中自动生成经过 token 优化的摘要文件和全上下文文件。

## 实施

`llms` 插件可在 `docmd >= 0.7.0` 中使用，并可以在您的 [插件配置](../../plugins/usage) 中进行配置。

### 1. 配置网站 URL

确保在 `docmd.config.js` 中正确设置了 `url` 属性。这允许插件为 `llms.txt` 文件中的所有页面生成绝对 URL。

```javascript
// docmd.config.js
export default {
  title: '我的项目文档',
  url: 'https://docs.example.com',
  plugins: ['llms']
};
```

### 2. 输出文件

在构建过程中，`docmd` 会在您的网站根目录下生成两个关键文件：

-   **`llms.txt`**：所有页面的简明、结构化的 Markdown 摘要，包括标题、描述和完整 URL。
-   **`llms-full.txt`**：包含整个网站原始 Markdown 内容的综合文件，使用标准分隔符 (`---`) 进行串联。这为 AI 模型提供了终极的“事实来源”。

### 3. 控制摄取

您可以使用 [页面 Frontmatter](../../content/frontmatter) 中的 `llms` 属性将特定页面排除在 AI 就绪输出之外。

```yaml
---
title: "内部调试指南"
llms: false
---
```

## 权衡

生成 `llms-full.txt` 会创建一个巨大的单一文件。对于异常庞大的文档网站，该文件可能会超过几兆字节。虽然这对于具有大上下文窗口的现代 LLM（如 Gemini 1.5 Pro 或 Claude 3.5 Sonnet）来说是理想的，但对于较小的模型来说可能过大。请确保逻辑清晰地组织您的 [导航](../../configuration/navigation)，以便 AI 可以优先处理最重要的部分。
