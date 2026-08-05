---
title: "Engine Architecture"
description: "Technical breakdown of the docmd-assistant engine architecture, execution pipeline, and event model."
---

`docmd-assistant` operates as a decoupled, headless execution engine. It separates conversational state management, system prompt synthesis, multi-provider model communication, and client tool execution from user interface rendering.

## Architecture Overview

```
                               ┌─────────────────────────────┐
                               │      Application Layer      │
                               │ (React, Vue, CLI, Custom UI)│
                               └──────────────┬──────────────┘
                                              │ sendMessage()
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DocmdAssistantEngine                                  │
│                                                                                        │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌──────────────────────────┐  │
│  │    History State      │   │ System Prompt Manager │   │      Tool Registry       │  │
│  └───────────────────────┘   └───────────────────────┘   └──────────────────────────┘  │
│                                                                                        │
│                             Turn Processing Pipeline                                   │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
        ┌────────────────────────┐             ┌────────────────────────┐
        │      Direct Mode       │             │       Relay Mode       │
        │  (aiplug LLM Adapter)  │             │   (Cloud Relay API)    │
        └────────────────────────┘             └────────────────────────┘
```

## Conversation Turn Steps

When `sendMessage(text)` is called, the engine processes the turn in five steps:

::: steps

### Step 1  -  User Message Ingestion

The input string is appended to internal history as a user message, and a `'message'` event is emitted.

### Step 2  -  Context Assembly

The engine combines the active system prompt, historical messages, and registered tool definitions into a conversation payload.

### Step 3  -  Execution Routing

- **Direct Mode**: If an `apiKey` or local provider setup is detected, `docmd-assistant` initialises an `aiplug` adapter for direct provider communication.
- **Relay Mode**: If `relayUrl` or `endpoint` is used, the engine POSTs a JSON payload containing the user query, page URL, page title, and conversation history to the relay endpoint.

### Step 4  -  Tool Execution Loop

If the model returns a tool call request (such as `search_documentation`), `docmd-assistant` executes the registered tool handler, emits `'tool_call'` and `'tool_result'` events, and passes the result back to complete the turn.

### Step 5  -  Response Emission

The assistant's reply text is appended to history as an assistant message and emitted via the `'message'` event bus.

:::

## Event Bus Reference

`docmd-assistant` includes a built-in event bus. Attach listeners using `on(event, listener)`:

| Event Type | Triggered When | Data Payload Schema |
| :--------- | :------------- | :------------------ |
| `'message'` | User or assistant message is added to history | `ChatMessage` object |
| `'tool_call'` | Engine starts executing a tool | `{ name: string, args: any }` |
| `'tool_result'`| Tool handler completes execution | `{ name: string, args: any, result: any }` |
| `'error'` | Error or relay failure occurs | Error object or details |
| `'clear'` | Conversation history is reset | `null` |

```typescript
// Subscribing to engine events
assistant.on('message', (event) => {
  console.log(`Message from ${event.data.sender}:`, event.data.content);
});

assistant.on('tool_result', (event) => {
  console.log(`Tool ${event.data.name} returned:`, event.data.result);
});
```

## Context Data Sent in Relay Mode

When running in Relay Mode, `docmd-assistant` automatically captures and includes contextual browser details with every request:

```json
{
  "projectId": "prj_my_docs_site",
  "siteId": "prj_my_docs_site",
  "message": "How do I configure search?",
  "pageUrl": "https://docs.example.com/setup",
  "pageTitle": "Setup & Configuration",
  "history": [
    { "sender": "user", "text": "Hello" },
    { "sender": "assistant", "text": "Hi! How can I help you today?" }
  ],
  "systemPrompt": "You are docmd assistant...",
  "reasoning": false
}
```

::: callout info "Automatic Page Context"
Capturing `pageUrl` and `pageTitle` allows server-side relays to provide page-aware answers without requiring manual context setup in client applications.
:::

## Error Handling & Fallbacks

The engine catches network errors, authentication failures, and tool execution exceptions gracefully:

- **Tool Execution Errors**: Caught and emitted via `'error'` without crashing the turn process. An error object is returned to the model context so the assistant can explain the issue or retry with alternative arguments.
- **Relay Errors**: Handled cleanly with descriptive error messages emitted via `'error'`.
- **Unconfigured Relay Status**: If a cloud relay returns `{ unconfigured: true }`, the engine returns a structured `ChatResponse` object with `unconfigured: true`, allowing client UIs to display guided onboarding setups.