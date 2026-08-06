---
title: "docmd-assistant"
description: "面向文档站点的轻量级、无依赖 Headless AI 对话引擎。"
---

`docmd-assistant` 是一个零依赖、解耦的 Headless AI 执行引擎，专为文档站点与开发者应用打造。

::: callout tip "Headless 架构"
`docmd-assistant` 处理状态、系统 Prompt、工具调用与多 Provider 通信，你可以完全自由地使用 React、Vue 或原生 JS 构建任何 UI。
:::

## 核心特性

::: grid

::: card "多 AI Provider" icon:cpu
支持 OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax 与本地 Ollama 实例。
:::

::: card "标准文档工具" icon:search
内置开箱即用的全文搜索、页面解析、锚点跳转与代码复制工具。
:::

::: card "云端中继模式" icon:shield
可选支持中继模式，保护客户端 API 密钥，实现无密钥的前端交互。
:::

::: card "实时事件总线" icon:activity
监听 `message`、`tool_call`、`tool_result` 与 `error` 事件，轻松打造流式 UI 体验。
:::

:::

## 快速入门

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY
});

const response = await assistant.sendMessage('如何配置搜索？');
console.log(response.message);
```

## 文档目录

| 页面 | 说明 |
| :--- | :---------- |
| [快速开始](getting-started) | 安装指南、系统要求与首次调用 |
| [配置说明](configuration) | 完整选项参考、运行时更新与中继配置 |
| [引擎架构](how-it-works) | 对话轮次流程、事件总线与中继 Payload 格式 |
| [工具系统](tools) | 自定义工具定义、标准文档工具与 DOM 降级机制 |
| [程序化 API](api) | `DocmdAssistantEngine` 完整类方法与类型参考 |
