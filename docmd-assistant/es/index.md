---
title: "docmd-assistant"
description: "具有多 Provider LLM 支持和可扩展工具执行的通用 Headless AI 助手引擎。"
---

面向文档工具、Web 应用程序和开发者平台的通用 UI 无关 AI 助手引擎。由 `aiplug` 多 Provider 运行时驱动，`docmd-assistant` 管理消息历史记录、工具执行和 Provider 连接，而无需强制绑定特定的用户界面或云端后端。

::: callout info "纯逻辑引擎"
`docmd-assistant` 不包含任何渲染代码或 UI 组件。它运行对话逻辑、工具调用和事件广播，将 UI 渲染交由你的 Web 框架或组件库处理。
:::

## 核心特性

::: grid

::: card "多 Provider 支持" icon:cpu
直接连接到 AI Provider（包括 OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax 和 Ollama），或通过自定义 HTTP 网关路由请求。
:::

::: card "可扩展的Sistema de Herramientas" icon:wrench
使用 JSON Schema 参数定义客户端和服务器端工具。当模型请求时，引擎会自动执行工具处理程序。
:::

::: card "框架无关" icon:layers
运行在支持 JavaScript 或 TypeScript 的任何地方：React, Vue, Svelte, Angular, Vanilla JS, Node.js 服务和桌面应用。
:::

::: card "双连接模式" icon:refresh-cw
在**直接模式**下使用本地 Provider API 密钥，或在**中继模式**下通过安全的 Cloud Relay API 路由请求。
:::

:::

## 架构概览

```
应用层 (React, Vue, Svelte, CLI, 自定义 UI)
                           │
                           │ sendMessage("如何配置搜索？")
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 DocmdAssistantEngine                    │
│                                                         │
│  历史管理器   •   系统 Prompt   •   工具注册表        │
│                                                         │
│             轮次执行与事件广播器                        │
└──────────────────────────┬──────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
       直接模式 (aiplug)           中继模式 (HTTP)
    ┌──────────────────────┐    ┌───────────────────┐
    │ OpenAI, Anthropic,   │    │ Cloud Relay API   │
    │ Gemini, Ollama 等    │    │ /v1/ai/chat       │
    └──────────────────────┘    └───────────────────┘
```

## Primeros Pasos

::: tabs
== tab "直接模式 (aiplug)" icon:zap
```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

// 使用直接 Provider API 密钥初始化助手引擎
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: '你是本文档站点的专家技术指南。'
});

const res = await assistant.sendMessage('如何安装依赖项？');
console.log(res.message);
```
== tab "云端中继模式" icon:cloud
```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

// 使用 Cloud Relay 端点初始化助手引擎
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site'
});

const res = await assistant.sendMessage('默认端口是什么？');
console.log(res.message);
```
:::

## 生态系统集成

`docmd-assistant` 既作为一个独立的库使用，又为整个 `docmd` 生态系统中的对话式 AI 提供动力：

| 软件包 | 生态系统中的角色 |
| :------ | :---------------- |
| **`docmd-assistant`** | 通用 Headless AI 引擎和工具执行运行时 |
| **`@docmd/plugin-ai`** | 官方 `docmd` 插件，提供嵌入式聊天 UI 抽屉和文档搜索集成 |
| **`docmd-search`** | 离线语义搜索引擎，为文档站点提供本地索引 |

## 文档目录索引

| 页面 | 说明 |
| :--- | :---------- |
| [Primeros Pasos](getting-started) | 安装、设置与首次对话轮次 |
| [Arquitectura del Motor](how-it-works) | 轮次执行管道、上下文组装与事件总线 |
| [Configuración](configuration) | 初始化参数、运行时更新与系统 Prompt |
| [Sistema de Herramientas](tools) | 创建自定义工具、标准工具与页面读取器 |
| [API Programable](api) | `DocmdAssistantEngine` 类参考与类型定义 |
