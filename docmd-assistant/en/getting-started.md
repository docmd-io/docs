---
title: "Getting Started"
description: "Quick start guide for installing and initialising docmd-assistant in your application."
---

Install `docmd-assistant` and build your first conversational turn in under two minutes.

## System Requirements

::: callout info "Prerequisites"
- **Node.js 20.0.0+**
- Browser support: Modern web browsers (Chrome, Firefox, Safari, Edge)
- Works on macOS, Linux, and Windows
:::

## Installation

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

## Initialising the Engine

::: steps

### Step 1  -  Create Engine Instance

Import `DocmdAssistantEngine` and pass configuration options:

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'You are an expert guide for this documentation site.'
});
```

### Step 2  -  Send User Message

Invoke `sendMessage()` to execute a conversation turn:

```typescript
const response = await assistant.sendMessage('How do I configure search?');

console.log('Assistant response:', response.message);
```

### Step 3  -  Inspect Response Object

The returned response object contains the reply text and updated conversation history:

```typescript
console.log('Message:', response.message);
console.log('History length:', response.history.length);
```

:::

## Connection Modes

`docmd-assistant` supports two connection modes:

::: grid

::: card "Direct Mode (aiplug)" icon:zap
Pass a provider API key (`apiKey`) or local provider options (`provider: 'ollama'`). The engine uses `aiplug` to communicate directly with the LLM provider API.
:::

::: card "Cloud Relay Mode" icon:cloud
Pass `relayUrl` or `endpoint` (e.g. `https://api.docmd.io/v1/ai/chat`) along with a `projectId`. The engine sends conversation payloads to your backend relay endpoint, keeping API keys hidden from client devices.
:::

:::

### Cloud Relay Mode Example

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site',
  systemPrompt: 'Assist users with questions about configuration files.'
});

const response = await assistant.sendMessage('What is the default output folder?');
console.log(response.message);
```

## Subscribing to Events

Listen to real-time events for message updates, tool execution, and errors:

```typescript
// Triggered whenever a user or assistant message is added
assistant.on('message', (event) => {
  const msg = event.data;
  console.log(`[${msg.sender.toUpperCase()}]: ${msg.content}`);
});

// Triggered when a tool begins executing
assistant.on('tool_call', (event) => {
  console.log('Executing tool:', event.data.name, event.data.args);
});

// Triggered when tool execution finishes
assistant.on('tool_result', (event) => {
  console.log('Tool result:', event.data.result);
});

// Triggered when an error occurs
assistant.on('error', (event) => {
  console.error('Engine error:', event.data);
});
```

## Next Steps

- [Engine Architecture](how-it-works)  -  Learn about the turn execution loop and context assembly
- [Configuration](configuration)  -  Explore all options, model choices, and runtime updates
- [Tool System](tools)  -  Register custom tools and documentation search helpers