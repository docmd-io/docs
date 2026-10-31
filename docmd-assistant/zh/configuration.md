---
title: "配置参考"
description: "DocmdAssistantEngine 引擎初始化、生命周期钩子及动态运行时选项完整参考。"
---

`docmd-assistant` 在初始化时接收灵活的 `AssistantOptions` 配置对象。所有参数亦可在运行时动态更新。

## 配置结构定义

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
  contextWindow?: number;
  formatToolResult?: (toolName: string, rawResult: any) => any;
  compactHistory?: (history: ChatMessage[]) => ChatMessage[] | Promise<ChatMessage[]>;
  transformContext?: (context: { systemPrompt: string; history: ChatMessage[]; tools?: any[]; payload?: any }) => any;
  onPayload?: (payload: any) => void;
}
```

## 参数详细说明

| 字段 | 类型 | 说明 | 默认值 |
| :--- | :--- | :--- | :----- |
| `provider` | `string` | 目标 AI 提供商（`'openai'`、`'anthropic'`、`'gemini'`、`'deepseek'`、`'groq'`、`'minimax'`、`'ollama'`） | 动态适配 |
| `model` | `string` | 模型标识符（如 `'gpt-4o-mini'`、`'claude-3-5-haiku-20241022'`） | 动态适配 |
| `apiKey` | `string` | 直接通过 `aiplug` 访问提供商接口所需的 API 密钥 | `undefined` |
| `baseURL` | `string` | 自定义基础 API 网关 URL | `undefined` |
| `relayUrl` | `string` | 免密钥代理路由的 Cloud Relay 云中继端点 | `undefined` |
| `endpoint` | `string` | `relayUrl` 的等价别名 | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | 发送给中继接口的项目或站点标识符 | `undefined` |
| `systemPrompt` | `string` | 指导助手角色设定与交互行为的基础提示词 | 系统默认提示词 |
| `history` | `ChatMessage[]` | 预先加载的对话历史消息 | `[]` |
| `tools` | `AssistantTool[]` | 初始注册的工具列表 | `[]` |
| `temperature` | `number` | 采样温度（0.0 至 1.0） | 提供商默认 |
| `maxTokens` | `number` | 每轮回答返回的最大 Token 数 | 提供商默认 |
| `reasoning` | `boolean \| string` | 深度思考模式控制（`false`、`'low'`、`'medium'`、`'high'`） | `false` |
| `headers` | `Record<string, string>` | 发往中继接口的自定义 HTTP 请求头 | `{}` |
| `contextWindow` | `number` | 传入模型单轮文档上下文最大字符上限。`0` 表示不截断。 | `0`（不截断） |
| `formatToolResult` | `function` | 工具执行结果注入 Prompt 前的格式化与过滤钩子。 | `undefined` |
| `compactHistory` | `function` | 报文发送前的历史轮次自动压缩钩子。 | `undefined` |
| `transformContext` | `function` | 最终请求分发前的上下文变更钩子。 | `undefined` |
| `onPayload` | `function` | 只读观测钩子，用于监视即将发送的请求载荷结构。 | `undefined` |

::: callout tip "默认系统提示词"
若未指定 `systemPrompt`，引擎将自动载入内置系统提示词，强制要求遵循搜索优先原则与输出精准的 Markdown 引用。
:::

## 生命周期钩子应用示例

下游插件（如 `@docmd/plugin-ai`）或独立项目可注册生命周期钩子：

```typescript
const assistant = new DocmdAssistantEngine({
  formatToolResult: (toolName, rawResult) => {
    return rawResult;
  },
  compactHistory: async (history) => {
    return history.length > 8 ? history.slice(-6) : history;
  },
  transformContext: (context) => {
    return context;
  },
  onPayload: (payload) => {
    console.debug('即将发送载荷:', payload);
  }
});
```

## 运行时动态更新配置

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## 系统提示词管理

```typescript
// 完全重写提示词
assistant.setSystemPrompt('您是专业的技术支持专家。');

// 追加补充指令
assistant.appendSystemPrompt('请始终使用简洁的语言并提供代码示例。');

// 获取当前生效提示词
const currentPrompt = assistant.getSystemPrompt();
```

## 深度推理模式支持

针对支持推理思考的模型（如 DeepSeek-R1 或 OpenAI o3-mini）：

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## 自定义中继请求头

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
