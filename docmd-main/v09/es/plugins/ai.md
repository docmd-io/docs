---
title: "AI Assistant Plugin"
description: "Enable interactive, search-aware AI documentation assistance powered by aiplug multi-provider integration."
---

The `@docmd/plugin-ai` plugin introduces an interactive AI Assistant overlay to your documentation site. It leverages pre-compiled `@docmd/plugin-search` indices to perform Retrieval-Augmented Generation (RAG), querying targeted documentation sections to deliver contextual answers with direct source links.

## Key Capabilities

* **Floating Trigger & Glassmorphic Drawer**: Clean pill trigger (`⌘K` shortcut) that expands into a theme-aware chat panel.
* **Search-Aware RAG**: Queries pre-built `search-index.json` data to ground LLM responses directly in your site's documentation.
* **BYOK Server Security**: API keys are resolved exclusively in server-side environments (`AI_API_KEY`, `OPENAI_API_KEY`), guaranteeing zero credential exposure in client web bundles.
* **Multi-Provider Integration**: Powered by `aiplug` with native support for OpenAI, Anthropic, Gemini, DeepSeek, Groq, and local Ollama instances.
* **Theme Neutrality**: Adapts to light and dark theme modes across all built-in and custom templates.

## Configuration Options

Configure assistant options and provider credentials in `docmd.config.json`:

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

## Options Reference

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Enable or disable the interactive AI Assistant trigger. |
| `captcha` | `boolean` | `false` | Enable open-source Proof-of-Work anti-bot CAPTCHA challenges before query execution. |
| `provider` | `string` | `'openai'` | LLM provider (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Provider default | Specific model ID (e.g. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Screen placement of floating pill trigger (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'How can I help...'` | Initial welcome prompt inside the chat panel. |
| `placeholder` | `string` | `'Ask AI a question...'` | Chat input field placeholder. |
| `suggestions` | `string[]` | Default questions | Recommended quick-prompt buttons. |
| `contextLimit` | `number` | `5` | Maximum RAG documentation chunks passed into the LLM context window. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding window rate limiting to protect LLM models from API overuse. |

## Server-Side Security (Bring-Your-Own-Key)

::: callout warning "Zero Credential Leakage" icon:alert-triangle
`@docmd/plugin-ai` strictly processes API credentials on the server side. Provider API keys are never rendered in client HTML or static JavaScript bundles.
:::

Set provider environment keys prior to launching your documentation server:

```bash
export OPENAI_API_KEY="sk-..."
# or
export ANTHROPIC_API_KEY="sk-ant-..."
# or generic fallback
export AI_API_KEY="your-api-key"
```

## Architecture Execution Flow

1. **Build-Time Action Registration**: During site compilation, `@docmd/plugin-ai` registers server-side RPC action handlers (`ai:chat`) and injects a lightweight client trigger script.
2. **Retrieval-Augmented Generation (RAG)**: When a reader submits a prompt:
   - The RPC endpoint queries the search index compiled by `@docmd/plugin-search`.
   - Matching document headings and prose chunks are selected based on vector/keyword distance.
   - Relevant snippets are compiled into a structured system prompt alongside user conversation history.
3. **Provider Processing & Citations**: The request is routed to the designated provider via `aiplug`. Output responses are returned with markdown links pointing to referenced documentation anchors.