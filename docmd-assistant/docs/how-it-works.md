---
title: How docmd-assistant Works
description: Technical breakdown of the docmd-assistant engine architecture, execution pipeline, and event model.
---

`docmd-assistant` operates as a decoupled, headless execution engine. It decouples conversational AI state management, dynamic system prompt synthesis, multi-provider model communication, and client tool execution from user interface presentation.

## High-Level Architecture

```
                               ┌─────────────────────────────┐
                               │     Application Layer       │
                               │ (React, Vue, CLI, Custom UI)│
                               └──────────────┬──────────────┘
                                              │ sendMessage()
                                              ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DocmdAssistantEngine                                  │
│                                                                                        │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌──────────────────────────┐  │
│  │   History Manager     │   │ System Prompt Manager │   │    Tool Registry         │  │
│  └───────────────────────┘   └───────────────────────┘   └──────────────────────────┘  │
│                                                                                        │
│                             Turn Processing Pipeline                                   │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
        ┌────────────────────────┐             ┌────────────────────────┐
        │     Direct Mode        │             │      Relay Mode        │
        │ (aiplug LLM Adapter)   │             │   (Cloud Relay API)    │
        └────────────────────────┘             └────────────────────────┘
```

## Conversation Turn Execution Flow

When `sendMessage(text)` is invoked:

1. **User Message Ingestion**: The input string is appended to internal history as a user message and a `'message'` event is emitted.
2. **Context Assembly**: The engine combines system instructions, historical messages, and available tool definitions into a unified conversation context.
3. **Execution Routing**:
   - If an `apiKey` is provided, `docmd-assistant` dynamically initialises an `aiplug` adapter for direct LLM communication.
   - If `relayUrl` or `endpoint` is provided, requests are dispatched as JSON payloads to the configured relay backend.
4. **Tool Calling Loop**: If the LLM requests a tool execution (such as `search_documentation`), `docmd-assistant` executes the registered tool handler, appends the result to context, and completes the turn.
5. **Response Emission**: The assistant's final response is appended to history and emitted via the `'message'` event bus.

## Event Bus System

`docmd-assistant` includes a built-in event emitter surface:

| Event Type | Triggered When | Data Payload |
| :--- | :--- | :--- |
| `'message'` | User or Assistant message is added to history | `ChatMessage` object |
| `'tool_call'` | Engine begins executing a tool | `{ name: string, args: any }` |
| `'tool_result'`| Tool execution completes successfully | `{ name: string, args: any, result: any }` |
| `'error'` | An unexpected error or relay failure occurs | Error object or failure detail |
| `'clear'` | Conversation history is reset | `null` |

## Error Handling & Fallbacks

`docmd-assistant` gracefully catches network timeouts, authentication failures, and tool execution errors. When a tool fails during execution, an error payload is returned to the model context, allowing the assistant to inform the user or attempt alternative strategies.