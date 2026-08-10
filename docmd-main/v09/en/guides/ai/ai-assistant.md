---
title: "AI Assistant Setup & Integration"
description: "How to configure and deploy docmd's interactive AI Assistant for RAG-powered documentation support."
---

The docmd AI Assistant provides readers with real-time, context-aware answers derived directly from your Markdown documentation. Powered by `@docmd/plugin-ai` and `aiplug`, the assistant performs Retrieval-Augmented Generation (RAG) using your site's pre-compiled search index while keeping API keys securely on the server side.

## Prerequisites

Before configuring the AI Assistant, ensure:
1. `@docmd/plugin-search` is enabled in `docmd.config.json` (required for RAG context extraction).
2. You have an API key for your preferred provider (OpenAI, Anthropic, Gemini, DeepSeek, Groq, or Ollama).

## Configuration

Add the `ai` plugin block to `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "How can I help with these docs today?",
      "suggestions": [
        "How do I get started?",
        "Show configuration options",
        "Explain key concepts"
      ],
      "contextLimit": 5,
      "captcha": false
    }
  }
}
```

::: callout tip title:"Recommended Models" icon:sparkles
For optimal balance between response speed and cost, we recommend using fast reasoning models such as `gpt-4o-mini` (OpenAI), `claude-3-5-haiku-20241022` (Anthropic), or `gemini-1.5-flash` (Google).
::: /callout

## Setting Provider Credentials

To maintain zero credential leakage, provider API keys are read exclusively from environment variables:

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google Gemini
export GEMINI_API_KEY="AIzaSy..."

# Generic fallback key
export AI_API_KEY="your-api-key"
```

Start your development or production web server after exporting the keys. The client-side assistant drawer communicates with the server via secure RPC action handlers.

## Fine-Tuning RAG & Search Context

The AI Assistant uses `@docmd/plugin-search` data to extract ground-truth documentation snippets before executing prompts.

### 1. Increasing Context Depth

Adjust `contextLimit` to control how many Markdown chunks are passed to the model:

```json
{
  "plugins": {
    "ai": {
      "contextLimit": 8
    }
  }
}
```

Higher `contextLimit` values improve response accuracy for complex questions spanning multiple pages, but increase prompt token consumption.

### 2. Protecting Against Bot Overuse

Prevent automated script abuse by configuring sliding window rate limits or enabling built-in Proof-of-Work CAPTCHA challenges:

```json
{
  "plugins": {
    "ai": {
      "captcha": true,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Local LLM Deployment (Ollama)

For air-gapped environments or local testing, configure `@docmd/plugin-ai` to target a local Ollama instance:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "provider": "ollama",
      "model": "llama3.2:3b",
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

Ensure Ollama is running locally (`ollama serve`) before building or launching docmd.

::: callout info "Theme Integration" icon:palette
The AI Assistant floating trigger and glassmorphic drawer automatically adapt to your active theme appearance (light or dark mode) and respect menubar layout bounds.
:::