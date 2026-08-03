---
title: Programmatic API Reference
description: Complete API reference for the DocmdAssistantEngine class, types, and event interfaces.
---

`docmd-assistant` provides a clean TypeScript API surface.

## Class: `DocmdAssistantEngine`

Primary class representing a headless AI assistant instance.

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';
```

### Constructor

```typescript
new DocmdAssistantEngine(options?: AssistantOptions)
```

Initialises a new assistant engine instance.

### Core Methods

#### `sendMessage(content: string, overrideOptions?: Partial<AssistantOptions>): Promise<ChatResponse>`
Appends a user message to history, triggers LLM reasoning, executes any requested tool calls, and returns the assistant's response.

#### `registerTool(tool: AssistantTool): this`
Registers a new tool handler on the engine instance.

#### `unregisterTool(name: string): boolean`
Unregisters a tool by name.

#### `getTools(): AssistantTool[]`
Returns an array of all registered tools.

#### `getTool(name: string): AssistantTool | undefined`
Retrieves a specific tool definition by name.

#### `setSystemPrompt(prompt: string): this`
Replaces the active system prompt string.

#### `appendSystemPrompt(additionalPrompt: string): this`
Appends additional instructions to the existing system prompt.

#### `getSystemPrompt(): string`
Returns the active system prompt.

#### `getHistory(): ChatMessage[]`
Returns a copy of the current conversation history.

#### `setHistory(history: ChatMessage[]): this`
Replaces current conversation history.

#### `clearHistory(): this`
Resets internal conversation history.

#### `on(event: AssistantEventType, listener: AssistantEventListener): this`
Subscribes an event listener function.

#### `off(event: AssistantEventType, listener: AssistantEventListener): this`
Unsubscribes an event listener.

## Interfaces & Types

### `ChatMessage`
```typescript
interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  sender?: 'user' | 'assistant' | 'system';
  timestamp?: number;
}
```

### `ChatResponse`
```typescript
interface ChatResponse {
  message: string;
  role: 'assistant';
  history: ChatMessage[];
}
```

### `AssistantTool`
```typescript
interface AssistantTool {
  name: string;
  description: string;
  parameters?: AssistantToolParameters | Record<string, any>;
  handler?: (args: any, context?: any) => Promise<any> | any;
  execute?: (args: any, context?: any) => Promise<any> | any;
}
```