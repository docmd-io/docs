---
title: "使用 docmd 生成 AI 就绪的文档"
description: "如何利用 llms.txt 标准与 docmd 内置工具，为 AI 助手提供经过优化的上下文。"
---

## 问题

开发者越来越依赖 AI 编程助手来阅读和解读文档。如果您的文档只能通过网页浏览器访问 —— 充斥着导航元素、追踪脚本与复杂的 HTML —— AI Agent 会消耗大量 token 在无关数据上。这会迅速耗尽它们的上下文窗口。

## 为什么重要

提供一份简洁、面向 token 优化的文档文本版本，相当于提供一份高质量的 REST API。它能确保 AI Agent 快速摄取您的整个文档集，从而带来更准确的代码建议与更好的支持。

## 方法

使用 docmd 内置的 **LLMs 插件**。该插件原生实现了新兴的 `llms.txt` 标准。它会在每次构建过程中自动生成经过 token 优化的摘要与全上下文文件。

## 实现

在您的 [插件配置](../../plugins/llms.md) 中配置 `llms` 插件。

### 1. 配置站点 URL

请确保在 `docmd.config.json` 中正确设置了 `url` 属性。这样插件才能在 `llms.txt` 文件中为所有页面生成绝对 URL。

```json "docmd.config.json"
{
  "title": "我的项目文档",
  "url": "https://docs.example.com",
  "plugins": {
    "llms": {}
  }
}
```

### 2. 输出文件

在构建过程中，docmd 会在站点根目录生成两个关键文件：

-   **`llms.txt`**：一份简洁、结构化的 Markdown 摘要，涵盖所有页面的标题、描述与完整 URL。
-   **`llms-full.txt`**：一份全面的文件，汇集您整个站点的原始 Markdown 内容，并以标准分隔符 (`---`) 拼接。它是 AI 模型的终极"事实来源"。

### 3. 控制摄取

您可以使用 [页面 Frontmatter](../../content/frontmatter.md) 中的 `llms` 属性，将指定页面排除在 AI 就绪输出之外。

```yaml
---
title: "内部调试指南"
llms: false
---
```

## 取舍

生成 `llms-full.txt` 会产生一个庞大的单文件。对于特别庞大的文档站点，该文件可能超过数 MB。对于拥有大上下文窗口的现代 LLM（如 Gemini 1.5 Pro 或 Claude 3.5 Sonnet）来说很理想，但对较小的模型可能过大。请确保对您的 [导航](../../configuration/navigation.md) 进行合理组织，以便 AI 能够优先关注重要章节。
