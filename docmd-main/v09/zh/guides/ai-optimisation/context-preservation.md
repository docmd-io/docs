---
title: "为 AI 友好的文档保留上下文"
description: "如何确保 AI 模型能够理解并利用您文档不同部分之间的关系。"
---

## 问题

人类读者可以点击超链接来了解更多信息。AI 模型通常以孤立的"块 (chunks)"来处理文档。当 AI 遇到超链接时，它无法"点击"该链接来获取上下文。如果关键信息隐藏在链接之后，AI 可能无法给出准确的回答。这会导致幻觉 (hallucination)。

## 为什么重要

AI 模型依赖紧邻的文本来确定含义。如果您的文档高度碎片化且上下文保留不佳，AI 驱动的搜索工具（如 RAG 系统）将难以提供高质量的响应。

## 方法

使用 **内联上下文展开 (Inline Context Unrolling)** 在每个主要链接旁提供最小可行的上下文。使用 docmd 的 [LLMs 插件](../../plugins/llms.md) 来提供整个文档集的统一的、机器可读的视图。

## 实现

### 1. 描述性链接与摘要

避免使用通用链接文本。在链接旁提供对所链接概念的简短、单句摘要。

-   **❌ 不好（上下文丢失）**：要配置超时，请参考 [通用配置](../../configuration/overview.md)。
-   **✅ 更好（保留上下文）**：您可以在 [通用配置](../../configuration/overview.md) 中配置 `timeoutMs` 参数，该参数定义了引擎在网络请求失败前的等待时长。

### 2. 使用可折叠区域承载细节

[可折叠容器](../../content/containers/collapsible.md) 非常适合 AI 优化。其内容仍然是 AI 所读取的原始 Markdown 源的一部分，但对人类读者来说会被视觉上折叠起来。

```markdown
### 数据库连接

通过主 URI 建立连接。

::: collapsible "URI 格式是什么？"
URI 采用标准的 PostgreSQL 格式：`postgresql://user:password@host:port/database`。
:::
```

### 3. 启用 LLMs 插件

在 `docmd.config.json` 中启用 [LLMs 插件](../../plugins/llms.md)。该插件在每次构建后都会生成一个 `llms-full.txt` 文件，将您的整个文档集合并到一个高上下文的单一文件中，便于 LLM 轻松消费。

## 取舍

内联上下文展开会让文档略显冗长并引入少量重复。但这是确保文档"为 AI 就绪"并能驱动高质量自动化支持所付出的微小代价。