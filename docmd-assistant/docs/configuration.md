---
title: Configuration Reference
description: Complete configuration options for docmd-assistant engine initialisation and runtime updates.
---

# Configuration

`docmd-assistant` accepts a flexible `AssistantOptions` configuration object upon initialisation. All settings can also be updated dynamically at runtime.

---

## Options Reference

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
  headers?: Record<string, string>;
}
```

### Parameter Details

| Field | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `provider` | `string` | Target AI provider (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'minimax'`, `'ollama'`) | `'openai'` |
| `model` | `string` | Target model name (e.g. `'gpt-4o-mini'`, `'claude-3-5-haiku-20241022'`) | `'gpt-4o-mini'` |
| `apiKey` | `string` | Provider API key for direct client/server connectivity | `undefined` |
| `baseURL` | `string` | Custom base API gateway URL | `undefined` |
| `relayUrl` | `string` | Cloud Relay endpoint URL for keyless proxy routing | `undefined` |
| `endpoint` | `string` | Alias for `relayUrl` | `'https://api.docmd.io/v1/ai/chat'` |
| `projectId` | `string` | Project or site identifier for Cloud Relay requests | `undefined` |
| `systemPrompt` | `string` | Base system instructions provided to the model | `'You are a helpful AI Documentation Assistant.'` |
| `history` | `ChatMessage[]` | Pre-populated conversation turn history | `[]` |
| `tools` | `AssistantTool[]` | Initial array of registered tools | `[]` |

---

## Updating Configuration at Runtime

You can modify options dynamically using `updateOptions()`:

```typescript
assistant.updateOptions({
  provider: 'anthropic',
  model: 'claude-3-5-haiku-20241022',
  systemPrompt: 'You are now an expert in TypeScript debugging.'
});
```

---

## System Prompt Reinforcement

`docmd-assistant` allows you to set or append system instructions dynamically:

```typescript
// Replace system prompt completely
assistant.setSystemPrompt('You are a technical editor.');

// Append additional instructions
assistant.appendSystemPrompt('Always respond using British English spelling and concise code examples.');
```
