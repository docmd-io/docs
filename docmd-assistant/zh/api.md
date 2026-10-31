---
title: "编程式 API"
description: "DocmdAssistantEngine 核心类、方法与 TypeScript 类型完整参考指南。"
---

`docmd-assistant` 导出核心 `DocmdAssistantEngine` 类、标准辅助工具工厂、版本常量及完整的 TypeScript 类型定义。

```typescript
import {
  DocmdAssistantEngine,
  createStandardTools,
  DEFAULT_SYSTEM_PROMPT,
  ENGINE_VERSION
} from 'docmd-assistant';
```

## 核心类：DocmdAssistantEngine

### 构造函数

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

使用指定配置初始化引擎实例。

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: '您是一个智能技术文档助手。'
});
```

## 消息收发核心方法

### sendMessage(content, overrideOptions?)

将用户输入追加到对话历史中，分发会话轮次，并返回 `ChatResponse` Promise。

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**参数说明：**

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| `content` | `string` | 用户输入的提问文本 |
| `overrideOptions` | `Partial<AssistantOptions>` | 针对单轮调用的临时配置覆盖 |

**返回值：** `Promise<ChatResponse>`

```typescript
interface ChatResponse {
  message: string;
  role: 'assistant';
  unconfigured?: boolean;
  unconfiguredData?: any;
  history: ChatMessage[];
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}
```

### sendMessageStream(content, callbacks, overrideOptions?)

执行流式对话轮次，支持实时 Token 吐字、工具调用通知及中间合成更新。

```typescript
public async sendMessageStream(
  content: string,
  callbacks: StreamCallbacks,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**流式回调接口 StreamCallbacks：**

```typescript
interface StreamCallbacks {
  onChunk: (chunk: string, meta?: { replace?: boolean; turn?: number }) => void;
  onToolCall?: (toolCall: any) => void;
  onToolResult?: (toolResult: any) => void;
  onComplete?: (fullText: string) => void;
  onError?: (error: any) => void;
}
```

### 错误原子回滚机制

如果某轮调用因网络断开、中继不可达或模型接口报错而失败，引擎会自动将该轮处于待定状态的用户消息从 `engine.getHistory()` 中原子剔除，确保会话上下文不被异常状态破坏。

## 扩展生命周期钩子（Lifecycle Hooks）

`docmd-assistant` 提供了一组非侵入式生命周期钩子，允许下游插件（如 `@docmd/plugin-ai`）或独立集成在不改动核心引擎的情况下灵活处理报文：

```typescript
const assistant = new DocmdAssistantEngine({
  // 工具输出精简预处理
  formatToolResult: (toolName, rawResult) => {
    return rawResult;
  },

  // 发送前对话历史压缩
  compactHistory: async (history) => {
    return history.length > 8 ? history.slice(-6) : history;
  },

  // 最终上下文变更钩子
  transformContext: (context) => {
    return context;
  },

  // 发送载荷可观测性钩子
  onPayload: (payload) => {
    console.debug('即将发送载荷:', payload);
  }
});
```

## 工具管理方法

### registerTool(tool)

在当前引擎实例上注册工具处理器。

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

根据名称注销指定工具。

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

返回所有已注册工具的数组。

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

按名称获取单个已注册工具的定义。

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

手动调用指定工具并执行。

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## 配置与系统提示词方法

### updateOptions(newOptions)

在运行时动态更新配置参数。

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

完全替换当前的系统提示词。

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

向现有系统提示词末尾追加指令内容。

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

获取当前生效的系统提示词字符串。

```typescript
public getSystemPrompt(): string
```

## 历史会话管理方法

### getHistory()

返回当前会话历史消息数组的深拷贝。

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

重设当前对话历史数组。

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

清空所有对话消息，并触发 `'clear'` 事件。

```typescript
public clearHistory(): this
```

### addMessage(message)

直接向会话历史追加一条消息。

```typescript
public addMessage(message: ChatMessage): this
```

## 事件总线机制

### on(event, listener)

注册引擎事件监听器（支持 `'message'`、`'tool_call'`、`'tool_result'`、`'error'`、`'clear'`）。

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

移除已绑定的事件监听器。

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## 导出常量与类型定义

导出版本元数据：

```typescript
import { ENGINE_VERSION } from 'docmd-assistant';
```

导出 TypeScript 类型：

```typescript
import type {
  AssistantOptions,
  AssistantTool,
  AssistantToolParameters,
  AssistantToolParameterProperty,
  ChatMessage,
  ChatResponse,
  SearchResultItem,
  StreamCallbacks,
  AssistantEventType,
  AssistantEvent,
  AssistantEventListener
} from 'docmd-assistant';
```