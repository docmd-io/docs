---
title: "Configuration"
description: "Complete options reference for docmd-assistant engine initialisation and dynamic runtime updates."
---

`docmd-assistant` accepts a flexible `AssistantOptions` configuration object upon initialisation. All settings can also be updated dynamically at runtime.

## Options Schema Reference

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

## Parameter Details

| Field | Type | Description | Default |
| :---- | :--- | :---------- | :------ |
| `provider` | `string` | Target AI provider (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | Dynamic |
| `model` | `string` | Target model identifier (e.g. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | Dynamic |
| `apiKey` | `string` | Provider API key for direct connectivity via `aiplug` | `undefined` |
| `baseURL` | `string` | Custom base API gateway URL | `undefined` |
| `relayUrl` | `string` | Cloud Relay endpoint URL for keyless proxy routing | `undefined` |
| `endpoint` | `string` | Alias for `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Project or site identifier sent with relay requests | `undefined` |
| `systemPrompt` | `string` | Base instructions guiding assistant identity and behaviour | System default prompt |
| `history` | `ChatMessage[]` | Pre-populated conversation history | `[]` |
| `tools` | `AssistantTool[]` | Initial array of registered tools | `[]` |
| `temperature` | `number` | Sampling temperature (0.0 to 1.0) | Provider default |
| `maxTokens` | `number` | Maximum tokens returned per response turn | Provider default |
| `reasoning` | `boolean \| string` | Toggle extended reasoning mode (`false`, `'low'`, `'medium'`, `'high'`) | `false` |
| `headers` | `Record<string, string>` | Custom HTTP headers sent with relay requests | `{}` |

::: callout tip "Default System Prompt"
If no `systemPrompt` is provided, the engine applies a default prompt that enforces docmd assistant identity rules, search-first tool calling, concise Markdown output, and clickable citation links.
:::

## Updating Options at Runtime

Modify configuration options dynamically during an active session using `updateOptions()`:

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  temperature: 0.2
});
```

## System Prompt Management

`docmd-assistant` provides dedicated methods to update or append system instructions:

```typescript
// Replace system prompt completely
assistant.setSystemPrompt('You are a technical support specialist for a cloud developer platform.');

// Append additional context or instructions
assistant.appendSystemPrompt('Always respond using British English spelling and provide step-by-step code snippets.');

// Retrieve current active system prompt
const currentPrompt = assistant.getSystemPrompt();
```

## Reasoning Mode Support

For models supporting extended reasoning (such as DeepSeek-R1 or OpenAI o3-mini), set the `reasoning` option to control reasoning depth:

```typescript
const assistant = new DocmdAssistantEngine({
  provider: 'deepseek',
  model: 'deepseek-reasoner',
  apiKey: process.env.DEEPSEEK_API_KEY,
  reasoning: 'medium'
});
```

## Custom Relay Headers

Pass custom headers when routing turns through enterprise API gateways or authenticated relay endpoints:

```typescript
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://internal-ai-gateway.company.com/v1/chat',
  headers: {
    'Authorization': 'Bearer my_enterprise_token',
    'X-Custom-Tenant-ID': 'tenant_12345'
  }
});
```
