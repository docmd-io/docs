---
title: docmd-assistant Overview
description: Universal headless AI Assistant engine with multi-provider LLM support and extensible tool execution.
---

**docmd-assistant** is a universal, UI-agnostic headless AI Assistant engine designed for software documentation tools, web applications, and developer platforms. Powered directly by the `aiplug` multi-provider runtime, `docmd-assistant` enables developers to embed sophisticated conversational AI capabilities without locking themselves into a specific user interface or cloud platform.

::: callout info
`docmd-assistant` operates as a pure logic engine. It manages message history, system prompt reinforcement, multi-provider connections, and client tool execution pipelines while leaving user interface rendering entirely to your application.
:::

## Key Features

### 1. Multi-Provider & Multi-Model
Connect seamlessly to leading artificial intelligence providers including OpenAI, Anthropic, Gemini, DeepSeek, Groq, MiniMax, and Ollama. Easily switch models or providers dynamically at runtime.

### 2. Extensible Tool Execution
Register custom client-side or server-side tools with structured schema definitions. When requested by the language model, `docmd-assistant` executes registered tool handlers automatically and appends results to the context stream.

### 3. Headless & Framework Agnostic
Designed to work across React, Vue, Svelte, Angular, Vanilla JavaScript, Node.js backend services, CLI utilities, and desktop applications.

### 4. Dual Connection Modes
Operate in **Direct Mode** using local provider API keys via `aiplug`, or in **Relay Mode** by routing requests securely through Cloud AI Relays.

### 5. Event-Driven Architecture
Subscribe to real-time engine events for message updates, tool call invocations, execution results, and error notifications.

## Ecosystem Integration

`docmd-assistant` functions as an independent library. It also powers conversational AI capabilities across the `docmd` ecosystem:

| Package | Purpose |
| :--- | :--- |
| **`docmd-assistant`** | Universal headless AI engine and tool runtime |
| **`@docmd/plugin-ai`** | Official `docmd` plugin providing embedded chat drawers and documentation search integration |
| **`docmd-search`** | Offline semantic search engine for documentation indexing |

## Next Steps

- **[Getting Started](/getting-started)**: Install the library and run your first conversational turn.
- **[Engine Architecture](/how-it-works)**: Learn how the turn execution pipeline and event bus operate.
- **[Tool System](/tools)**: Create and register custom client-side tools.
- **[Programmatic API](/api)**: Explore full class definitions and method signatures.