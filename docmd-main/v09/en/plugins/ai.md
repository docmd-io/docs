---
title: "AI Assistant Plugin"
description: "Enable interactive, search-aware AI documentation assistance powered by aiplug multi-provider integration."
---

The `@docmd/plugin-ai` plugin introduces an interactive AI Assistant to your documentation site. It leverages `@docmd/plugin-search` index outputs to perform Retrieval-Augmented Generation (RAG), querying targeted documentation sections to deliver accurate answers with clickable source citations.

## Features

*   **Floating Bar & Overlay**: Clean, minimal floating pill bar (`⌘K` shortcut) that expands into an ambient glassmorphic chat overlay.
*   **Search-Aware RAG**: Queries pre-compiled `_docmd-search/search-index.json` data to ground LLM responses in your site's documentation.
*   **BYOK Security Policy**: API keys are resolved exclusively on the server side (`AI_API_KEY`, `OPENAI_API_KEY`, etc.), guaranteeing zero credential leaks in client bundles.
*   **Multi-Provider Integration**: Powered by `aiplug` with native support for OpenAI, Anthropic, Gemini, DeepSeek, Groq, and local Ollama.
*   **Theme Neutrality**: Automatically adapts to light and dark theme variations across all standard and custom templates.

## Configuration

The AI plugin is enabled by default as a core plugin in `v0.9.0`. You can customize its appearance and provider settings in your `docmd.config.json`.

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "How can I help with these docs today?",
      "placeholder": "Ask AI a question...",
      "suggestions": [
        "How do I get started?",
        "Show configuration options",
        "Explain key concepts"
      ],
      "contextLimit": 5,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Enable or disable the interactive AI Assistant overlay. |
| `captcha` | `boolean` | `false` | Enable open-source Proof-of-Work anti-bot CAPTCHA challenge before processing user queries. |
| `provider` | `string` | `'openai'` | LLM provider: `'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, or `'ollama'`. |
| `model` | `string` | Provider default | Specific model ID (e.g. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Placement of floating pill trigger: `'bottom-center'`, `'bottom-right'`, or `'bottom-left'`. |
| `greeting` | `string` | `'How can I help with these docs today?'` | Initial welcome prompt inside the chat panel. |
| `placeholder` | `string` | `'Ask AI a question...'` | Text input placeholder. |
| `suggestions` | `string[]` | Default questions | Quick prompt recommendation pills. |
| `contextLimit` | `number` | `5` | Maximum RAG documentation chunks provided to the LLM context window. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding window rate limiting to protect LLM models from spam and overuse. |

## Server-Side Security (BYOK)

::: callout warning "Zero Credential Exposure"
`@docmd/plugin-ai` strictly keeps API credentials on the server. Provider API keys are never written to client HTML or bundled JavaScript.
:::

Set your provider key in your build environment before launching:

```bash
export OPENAI_API_KEY="sk-..."
# or
export ANTHROPIC_API_KEY="sk-ant-..."
# or generic fallback
export AI_API_KEY="your-api-key"
```

## How It Works

### 1. Build-Time Registration
During site generation, `@docmd/plugin-ai` registers server-side RPC action handlers (`ai:chat`) and injects a lightweight client trigger bundle into page layouts.

### 2. Retrieval-Augmented Generation (RAG)
When a user asks a question:
1. The RPC endpoint reads the search index compiled by `@docmd/plugin-search`.
2. Matching document headings and prose chunks are selected based on query terms.
3. Relevant snippets are compiled into a structured system prompt alongside user conversation history.

### 3. Provider Processing & Citations
The request is routed to the configured provider via `aiplug`. The generated answer is sent back with source links pointing directly to the referenced documentation sections.