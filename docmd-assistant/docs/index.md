---
title: "docmd-assistant"
description: "Universal headless AI Assistant engine with multi-provider LLM support and extensible tool execution."
---

Universal UI-agnostic AI Assistant engine for documentation tools, web applications, and developer platforms. Powered by the `aiplug` multi-provider runtime, `docmd-assistant` manages message history, tool execution, and provider connections without forcing a specific user interface or cloud backend.

::: callout info "Pure Logic Engine"
`docmd-assistant` contains no rendering code or UI components. It runs conversation logic, tool calls, and event emissions, leaving UI rendering to your web framework or component library.
:::

## Key Features

::: grid

::: card "Multi-Provider Support" icon:cpu
Connect directly to AI providers including OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax, and Ollama, or route requests through custom HTTP gateways.
:::

::: card "Extensible Tool System" icon:wrench
Define client-side and server-side tools using JSON Schema parameter definitions. The engine executes tool handlers automatically when requested by the model.
:::

::: card "Framework Agnostic" icon:layers
Runs anywhere JavaScript or TypeScript executes: React, Vue, Svelte, Angular, Vanilla JS, Node.js services, and desktop apps.
:::

::: card "Dual Connection Modes" icon:refresh-cw
Operate in **Direct Mode** using local provider API keys, or **Relay Mode** by routing requests through a secure Cloud Relay API.
:::

:::

## Overview

```
Application Layer (React, Vue, Svelte, CLI, Custom UI)
                           │
                           │ sendMessage("How do I setup search?")
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 DocmdAssistantEngine                    │
│                                                         │
│  History Manager   •   System Prompt   •   Tool Registry│
│                                                         │
│             Turn Execution & Event Emitter              │
└──────────────────────────┬──────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
      Direct Mode (aiplug)        Relay Mode (HTTP)
    ┌──────────────────────┐    ┌───────────────────┐
    │ OpenAI, Anthropic,   │    │ Cloud Relay API   │
    │ Gemini, Ollama, etc. │    │ /v1/ai/chat       │
    └──────────────────────┘    └───────────────────┘
```

## Quick Start

::: tabs
== tab "Direct Mode (aiplug)" icon:zap
```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

// Initialise assistant engine with direct provider API key
const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'You are an expert technical guide for this documentation site.'
});

const res = await assistant.sendMessage('How do I install dependencies?');
console.log(res.message);
```
== tab "Cloud Relay Mode" icon:cloud
```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

// Initialise assistant engine using Cloud Relay endpoint
const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site'
});

const res = await assistant.sendMessage('What is the default port?');
console.log(res.message);
```
:::

## Ecosystem Integration

`docmd-assistant` functions as a standalone library and powers conversational AI across the `docmd` ecosystem:

| Package | Role in Ecosystem |
| :------ | :---------------- |
| **`docmd-assistant`** | Universal headless AI engine and tool execution runtime |
| **`@docmd/plugin-ai`** | Official `docmd` plugin providing embedded chat UI drawers and documentation search integration |
| **`docmd-search`** | Offline semantic search engine providing local indexing for documentation sites |

## Documentation Index

| Page | Description |
| :--- | :---------- |
| [Getting Started](getting-started) | Installation, setup, and first conversation turn |
| [Engine Architecture](how-it-works) | Turn execution pipeline, context assembly, and event bus |
| [Configuration](configuration) | Initialisation parameters, runtime updates, and system prompts |
| [Tool System](tools) | Creating custom tools, standard tools, and page readers |
| [Programmatic API](api) | `DocmdAssistantEngine` class reference and type definitions |