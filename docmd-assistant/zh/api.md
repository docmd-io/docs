---
title: "程序化 API"
description: "DocmdAssistantEngine 类、方法与类型的完整参考指南。"
---

`docmd-assistant` 软件包导出了核心 `DocmdAssistantEngine` 类、辅助函数以及 TypeScript 类型定义。

```typescript
import {
  DocmdAssistantEngine,
  createStandardTools,
  DEFAULT_SYSTEM_PROMPT,
  ENGINE_VERSION
} from 'docmd-assistant';
```

## 类: DocmdAssistantEngine

### 构造函数

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

使用指定的配置初始化一个新的引擎实例。

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: '你是 AI 文档指南助手。'
});
```

## 核心消息方法

### sendMessage(content, overrideOptions?)

将用户消息追加到历史记录，发起对话轮次，并返回一个 `ChatResponse` Promise。

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**参数：**

| 参数 | 类型 | 说明 |
| :-------- | :--- | :---------- |
| `content` | `string` | 用户输入的文本消息 |
| `overrideOptions` | `Partial<AssistantOptions>` | 可选的单轮配置覆盖选项 |

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

## 工具管理方法

### registerTool(tool)

在引擎实例上注册一个工具处理函数。

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

按名称注销工具。如果找到并删除了工具，则返回 `true`。

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

返回所有已注册工具的数组。

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

按名称返回特定的工具定义；如果未注册则返回 `undefined`。

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

使用给定的参数手动执行按名称注册的工具。

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## 配置与系统提示词方法

### updateOptions(newOptions)

动态更新引擎选项。

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

替换当前生效的系统提示词。

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

向现有系统提示词追加附加文本。

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

返回当前生效的系统提示词字符串。

```typescript
public getSystemPrompt(): string
```

## 历史记录管理方法

### getHistory()

返回当前对话历史记录数组的副本。

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

替换当前对话历史记录。

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

清除所有历史消息并触发 `'clear'` 事件。

```typescript
public clearHistory(): this
```

### addMessage(message)

直接将消息对象追加到历史记录中。

```typescript
public addMessage(message: ChatMessage): this
```

## 事件订阅方法

### on(event, listener)

为引擎事件（`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`）绑定事件监听器。

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

移除已绑定的事件监听器。

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## 导出类型定义

所有 TypeScript 接口直接从 `docmd-assistant` 导出：

```typescript
import type {
  AssistantOptions,
  AssistantTool,
  AssistantToolParameters,
  AssistantToolParameterProperty,
  ChatMessage,
  ChatResponse,
  SearchResultItem,
  AssistantEventType,
  AssistantEvent,
  AssistantEventListener
} from 'docmd-assistant';
```