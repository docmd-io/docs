---
title: "Programmatic API"
description: "Complete class, method, and type reference for DocmdAssistantEngine."
---

The `docmd-assistant` package exports the core `DocmdAssistantEngine` class, helper functions, and TypeScript type definitions.

```typescript
import {
  DocmdAssistantEngine,
  createStandardTools,
  DEFAULT_SYSTEM_PROMPT,
  ENGINE_VERSION
} from 'docmd-assistant';
```

## Class: DocmdAssistantEngine

### Constructor

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

Initialises a new engine instance with the specified configuration.

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'You are an AI documentation guide.'
});
```

## Core Messaging Methods

### sendMessage(content, overrideOptions?)

Appends a user message to history, dispatches the conversation turn, and returns a `ChatResponse` promise.

```typescript
public async sendMessage(
  content: string,
  overrideOptions?: Partial<AssistantOptions>
): Promise<ChatResponse>
```

**Parameters:**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `content` | `string` | User message input string |
| `overrideOptions` | `Partial<AssistantOptions>` | Optional one-turn configuration overrides |

**Return Value:** `Promise<ChatResponse>`

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

## Tool Management Methods

### registerTool(tool)

Registers a tool handler on the engine instance.

```typescript
public registerTool(tool: AssistantTool): this
```

### unregisterTool(name)

Unregisters a tool by name. Returns `true` if the tool was found and deleted.

```typescript
public unregisterTool(name: string): boolean
```

### getTools()

Returns an array of all registered tools.

```typescript
public getTools(): AssistantTool[]
```

### getTool(name)

Returns a specific tool definition by name, or `undefined` if not registered.

```typescript
public getTool(name: string): AssistantTool | undefined
```

### executeTool(name, args)

Manually executes a registered tool by name with arguments.

```typescript
public async executeTool(name: string, args: any): Promise<any>
```

## Configuration & System Prompt Methods

### updateOptions(newOptions)

Updates engine options dynamically.

```typescript
public updateOptions(newOptions: Partial<AssistantOptions>): this
```

### setSystemPrompt(prompt)

Replaces the active system prompt.

```typescript
public setSystemPrompt(prompt: string): this
```

### appendSystemPrompt(additionalPrompt)

Appends additional text to the existing system prompt.

```typescript
public appendSystemPrompt(additionalPrompt: string): this
```

### getSystemPrompt()

Returns the active system prompt string.

```typescript
public getSystemPrompt(): string
```

## History Management Methods

### getHistory()

Returns a copy of the current conversation history array.

```typescript
public getHistory(): ChatMessage[]
```

### setHistory(history)

Replaces the current conversation history.

```typescript
public setHistory(history: ChatMessage[]): this
```

### clearHistory()

Clears all history messages and emits a `'clear'` event.

```typescript
public clearHistory(): this
```

### addMessage(message)

Appends a message object directly to history.

```typescript
public addMessage(message: ChatMessage): this
```

## Event Subscription Methods

### on(event, listener)

Attaches an event listener for engine events (`'message'`, `'tool_call'`, `'tool_result'`, `'error'`, `'clear'`).

```typescript
public on(event: AssistantEventType, listener: AssistantEventListener): this
```

### off(event, listener)

Removes a registered event listener.

```typescript
public off(event: AssistantEventType, listener: AssistantEventListener): this
```

## Exported Type Definitions

All TypeScript interfaces are exported directly from `docmd-assistant`:

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