---
title: "AI Assistant Setup & Integration"
description: "How to configure and deploy docmd's interactive AI Assistant for RAG-powered documentation support."
---

The docmd AI Assistant provides readers with real-time, context-aware answers derived directly from your Markdown documentation. Powered by `@docmd/plugin-ai` and `aiplug`, the assistant performs Retrieval-Augmented Generation (RAG) using your site's pre-compiled search index while keeping API keys securely on the server side.

## Prerequisites

Before configuring the AI Assistant, ensure:
1. `@docmd/plugin-search` is enabled in `docmd.config.json` (required for RAG context extraction).
2. You have an API key for your preferred provider (OpenAI, Anthropic, Gemini, DeepSeek, Groq, or Ollama).

## Deployment Architecture: Choose Your Strategy

The docmd AI Assistant supports two primary deployment models:

| Architecture | Best For | Backend Infrastructure | API Key Security |
| :--- | :--- | :--- | :--- |
| **Free docmd Cloud Relay** | Static sites (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3) | Zero servers — powered by docmd's managed serverless relay | Hardware KMS encrypted at rest |
| **Self-Hosted Server** | Dynamic Node.js apps, Docker containers, private enterprise intranets | Your own Node.js server (`docmd dev` / `docmd serve`) | Environment variables on server |
| **Local LLM (Ollama)** | Air-gapped networks, local development, zero cloud dependencies | Local workstation running `ollama` | Local localhost endpoint |

---

## Strategy 1: Free docmd Cloud Relay (Zero Infrastructure)

For static Jamstack hosting, docmd provides a free Cloud Relay platform at [cloud.docmd.io](https://cloud.docmd.io) that proxies requests securely without exposing your API keys or requiring you to maintain a Node.js backend.

### 1. Create a Cloud Project
1. Go to [cloud.docmd.io](https://cloud.docmd.io) and log in.
2. Click **Create New Project**, provide a name (e.g. `Developer Docs`), and enter your **Associated Domain Address** (e.g. `docs.mycompany.com`).
3. If developing locally, check **Enable Localhost Testing (127.0.0.1 / localhost)**.

### 2. Configure Your BYOK Provider Key
1. In your project dashboard, navigate to **Model & BYOK Key Setup**.
2. Select your AI provider (OpenAI, Anthropic, Google Gemini, Groq, DeepSeek, etc.).
3. Choose your model name (e.g., `gpt-4o-mini`, `claude-3-5-haiku-20241022`, `gemini-1.5-flash`).
4. Enter your provider API key, click **Test Connection**, and click **Save Key & Configuration**.

### 3. Add Project ID to `docmd.config.json`
Navigate to the **Integration** tab, copy your project configuration, and update `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "How can I help with these docs today?",
      "suggestions": [
        "How do I get started?",
        "Show configuration options",
        "Explain key concepts"
      ]
    }
  }
}
```

Now build and deploy your static files anywhere (GitHub Pages, S3, Cloudflare Pages). The client assistant automatically establishes a secure session via the relay.

---

## Strategy 2: Self-Hosted Server (Environment BYOK)

If you run docmd on a Node.js server or inside Docker:

### 1. Configuration

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

### 2. Setting Provider Credentials

To maintain zero credential leakage, provider API keys are read exclusively from environment variables on your server:

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

Start your server with `docmd dev` or `docmd serve`. The client communicates with your server using secure RPC action handlers.

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