---
title: "快速开始"
description: "在应用中安装并初始化 docmd-assistant 的快速入门指南。"
---

在不到两分钟内安装 `docmd-assistant` 并构建你的第一个对话交互。

## 系统要求

::: callout info "前置条件"
- **Node.js 20.0.0+**
- 浏览器支持：现代 Web 浏览器 (Chrome, Firefox, Safari, Edge)
- 支持 macOS, Linux 与 Windows
:::

## 安装

::: tabs
== tab "npm" icon:package
```bash
npm install docmd-assistant
```
== tab "pnpm" icon:zap
```bash
pnpm add docmd-assistant
```
== tab "yarn" icon:package
```bash
yarn add docmd-assistant
```
:::

## 初始化引擎

::: steps

### 第 1 步  -  创建引擎实例

导入 `DocmdAssistantEngine` 并传入配置选项：

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: '你是本文档站点的专家指南。'
});
```

### 第 2 步  -  发送用户消息

调用 `sendMessage()` 执行对话交互：

```typescript
const response = await assistant.sendMessage('如何配置搜索？');

console.log('助手回答:', response.message);
```

### 第 3 步  -  检查响应对象

返回的响应对象包含回复文本和更新后的对话历史：

```typescript
console.log('消息:', response.message);
console.log('历史长度:', response.history.length);
```

:::

## 连接模式

`docmd-assistant` 支持两种连接模式：

::: grid

::: card "直接模式 (aiplug)" icon:zap
传入 provider API 密钥 (`apiKey`) 或本地 provider 选项 (`provider: 'ollama'`)。引擎使用 `aiplug` 直接与 LLM API 通信。
:::

::: card "云端中继模式" icon:cloud
传入 `relayUrl` 或 `endpoint`（例如 `https://api.docmd.io/v1/ai/chat`）以及 `projectId`。引擎将对话载荷发送到你的后端中继端点，保持 API 密钥在客户端隐藏。
:::

:::

### 云端中继模式示例

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site',
  systemPrompt: '协助用户回答有关配置文件的问题。'
});

const response = await assistant.sendMessage('默认的输出文件夹是什么？');
console.log(response.message);
```

## 订阅事件

监听实时事件以获取消息更新、工具执行和错误处理：

```typescript
// 每当添加用户或助手消息时触发
assistant.on('message', (event) => {
  const msg = event.data;
  console.log(`[${msg.sender.toUpperCase()}]: ${msg.content}`);
});

// 当工具开始执行时触发
assistant.on('tool_call', (event) => {
  console.log('正在执行工具:', event.data.name, event.data.args);
});

// 当工具执行完成时触发
assistant.on('tool_result', (event) => {
  console.log('工具结果:', event.data.result);
});

// 当发生错误时触发
assistant.on('error', (event) => {
  console.error('引擎错误:', event.data);
});
```

## 后续步骤

- [引擎架构](how-it-works)  -  了解轮次执行循环与上下文组装
- [配置说明](configuration)  -  探索所有选项、模型选择与运行时更新
- [工具系统](tools)  -  注册自定义工具与文档搜索辅助函数
