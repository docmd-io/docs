---
title: "配置说明"
description: "docmd-assistant 引擎初始化与动态运行时更新的完整选项参考。"
---

`docmd-assistant` 在初始化时接受一个灵活的 `AssistantOptions` 配置对象。所有设置也可以在运行时动态更新。

## 选项模式参考

```typescript
interface AssistantOptions {
  provider?: string;
  model?: string;
  apiKey?: string;
  baseURL?: string;
  relayUrl?: string;
  endpoint?: string;
  projectId?: string;
  systemPrompt?: string;
  history?: ChatMessage[];
  tools?: AssistantTool[];
  temperature?: number;
  maxTokens?: number;
  reasoning?: boolean | 'none' | 'low' | 'medium' | 'high';
  headers?: Record<string, string>;
}
```

## 参数详细信息

| 字段 | 类型 | 说明 | 默认值 |
| :---- | :--- | :---------- | :------ |
| `provider` | `string` | 目标 AI 提供商 (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | 动态 |
| `model` | `string` | 目标模型标识符（例如 `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`） | 动态 |
| `apiKey` | `string` | 用于通过 `aiplug` 直接连接的 Provider API 密钥 | `undefined` |
| `baseURL` | `string` | 自定义基础 API 网关 URL | `undefined` |
| `relayUrl` | `string` | 用于无密钥代理路由的云中继端点 URL | `undefined` |
| `endpoint` | `string` | `relayUrl` 的别名 | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | 与中继请求一起发送的项目或站点标识符 | `undefined` |
| `systemPrompt` | `string` | 指导助手身份和行为的基础指令 | 系统默认提示词 |
| `history` | `ChatMessage[]` | 预填充的对话历史记录 | `[]` |
| `tools` | `AssistantTool[]` | 已注册工具的初始数组 | `[]` |
| `temperature` | `number` | 采样温度 (0.0 到 1.0) | Provider 默认值 |
| `maxTokens` | `number` | 每轮响应返回的最大 Token 数 | Provider 默认值 |
| `reasoning` | `boolean \| string` | 切换深度推理模式 (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | 与中继请求一起发送的自定义 HTTP 报头 | `{}` |

::: callout tip "默认系统提示词"
如果没有提供 `systemPrompt`，引擎将应用默认提示词，强制执行 docmd 助手身份规则、优先搜索的工具调用、简明 Markdown 输出和可点击的引用链接。
:::

## 在运行时更新选项

使用 `updateOptions()` 在活动会话期间动态修改配置选项：

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## 系统提示词管理

`docmd-assistant` 提供了用于更新或追加系统指令的专用方法：

```typescript
// 完全替换系统提示词
assistant.setSystemPrompt('你是云开发平台的技术支持专家。');

// 追加附加上下文或指令
assistant.appendSystemPrompt('始终使用中文回答，并提供分步代码片段。');

// 获取当前生效的系统提示词
const currentPrompt = assistant.getSystemPrompt();
```

## 推理模式支持

对于支持扩展推理的模型（如 DeepSeek-R1 或 OpenAI o3-mini），设置 `reasoning` 选项以控制推理深度：

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## 自定义中继请求头

通过企业 API 网关或已认证的中继端点路由对话时，传递自定义请求头：

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
