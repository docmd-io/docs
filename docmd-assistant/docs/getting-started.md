---
title: Getting Started with docmd-assistant
description: Quick start guide for installing and initialising the docmd-assistant engine in your project.
---

This guide explains how to install `docmd-assistant` and build your first conversational AI assistant turn.

## Installation

Install `docmd-assistant` using your preferred package manager:

```bash
npm install docmd-assistant
```

Or using `pnpm` or `yarn`:

```bash
pnpm add docmd-assistant
# or
yarn add docmd-assistant
```

## Basic Usage

Initialise the `DocmdAssistantEngine` with your target AI provider and credentials:

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'You are a helpful documentation assistant for a developer platform.'
});

async function main() {
  const response = await assistant.sendMessage('How do I configure authentication?');
  console.log('Assistant reply:', response.message);
}

main();
```

## Using Cloud Relay Mode

If you prefer not to expose API keys directly or wish to route requests through a secure proxy relay, configure `relayUrl` or `endpoint`:

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site',
  systemPrompt: 'Assist users with queries regarding API endpoints.'
});

const response = await assistant.sendMessage('What is the rate limit for search?');
console.log('Relay response:', response.message);
```

## Listening to Engine Events

You can attach event listeners to handle incoming messages, tool executions, and errors reactively:

```typescript
assistant.on('message', (event) => {
  const msg = event.data;
  console.log(`[${msg.sender.toUpperCase()}]: ${msg.content}`);
});

assistant.on('error', (event) => {
  console.error('Engine error:', event.data);
});
```

## What's Next?

- Explore **[Engine Architecture](/how-it-works)** to understand turn execution mechanics.
- Learn about **[Configuration](/configuration)** options.
- Read how to define custom tools in **[Tool System](/tools)**.