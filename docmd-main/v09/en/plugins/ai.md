---
title: "AI Assistant Plugin"
description: "Enable interactive, search-aware AI documentation assistance powered by aiplug multi-provider integration."
---

The `@docmd/plugin-ai` plugin introduces an interactive AI Assistant overlay to your documentation site. It uses pre-compiled `@docmd/plugin-search` indices to perform Retrieval-Augmented Generation (RAG), querying targeted documentation sections to deliver contextual answers with direct source links.

## Key Capabilities

* **Floating Trigger & Glassmorphic Drawer**: Clean pill trigger (`Ctrl+K` shortcut) that expands into a theme-aware chat panel.
* **Deterministic Search & Grounded Verification**: Enforces a strict two-step retrieval workflow (single targeted search followed by reading the authoritative page) with live existence validation for internal paths and external URLs.
* **External URL Fetching & Cloud Portal Governance**: Fetches remote HTTP/HTTPS reference resources when enabled in `docmd.config.json` and permitted by docmd Cloud Relay governance policies.
* **Conversation History Summarisation**: Invisible background compaction bounds context payloads within relay thresholds across extended dialogues, preventing payload truncation.
* **Free docmd Cloud Relay**: Deploy on static hosts (GitHub Pages, Cloudflare Pages, Netlify, Vercel) without any backend server infrastructure.
* **BYOK Server & KMS Security**: API keys are encrypted at rest via KMS in docmd Cloud or resolved server-side (`AI_API_KEY`, `OPENAI_API_KEY`), guaranteeing zero credential exposure in client web bundles.
* **Multi-Provider Integration**: Powered by `aiplug` with native support for OpenAI, Anthropic, Gemini, DeepSeek, Groq, and local Ollama instances.
* **Theme Neutrality**: Adapts to light and dark theme modes across all built-in and custom templates.

## Configuration Options

Configure assistant options in `docmd.config.json`.

### Option A: Free docmd Cloud Relay (Static Sites)

For static sites (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3), connect to docmd's free Cloud Relay service using your `projectId`:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "How can I help with these docs today?",
      "placeholder": "Ask AI a question...",
      "suggestions": [
        "How do I get started?",
        "Show configuration options",
        "Explain key concepts"
      ]
    }
  }
}
```

### Option B: Self-Hosted Server (BYOK Environment Variables)

For Node.js or Docker hosting where docmd runs as a server, configure the provider and model directly:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "allowExternalUrls": false,
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
| `projectId` | `string` | `undefined` | Project ID from [docmd Cloud](https://cloud.docmd.io) for free serverless relay on static sites. |
| `cloud` | `object` | `undefined` | Cloud relay options object (e.g. `{ "projectId": "docmd_ai..." }`). |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'` (when `projectId` set) | Custom AI chat relay endpoint URL. |
| `allowExternalUrls` | `boolean` | `false` | Permit the assistant tool executor to fetch external HTTP/HTTPS documentation URLs. |
| `captcha` | `boolean` | `false` | Enable open-source Proof-of-Work anti-bot CAPTCHA challenges before query execution. |
| `provider` | `string` | `'openai'` | LLM provider for self-hosted servers (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Provider default | Specific model ID (e.g. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Screen placement of floating pill trigger (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'How can I help...'` | Initial welcome prompt inside the chat panel. |
| `placeholder` | `string` | `'Ask AI a question...'` | Chat input field placeholder. |
| `suggestions` | `string[]` | Default questions | Recommended quick-prompt buttons. |
| `contextLimit` | `number` | `5` | Maximum RAG documentation chunks passed into the LLM context window. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding window rate limiting to protect LLM models from API overuse. |

## External URL Fetching & Cloud Portal Governance

When your project references external standards, specification sheets, or sister documentation repositories, enable external URL reading in `docmd.config.json`:

```json
{
  "plugins": {
    "ai": {
      "allowExternalUrls": true
    }
  }
}
```

### Cloud Relay Priority Rule

::: callout important title:"Cloud Relay Governance Precedence" icon:shield
Security policies configured in the docmd Cloud portal take precedence over client-side `docmd.config.json` options.
:::

If your documentation is routed through docmd Cloud Relay, the cloud project policy strictly governs whether external outbound fetches are executed:

1. Sign in to your project dashboard on [cloud.docmd.io](https://cloud.docmd.io).
2. Navigate to **Project Configuration** &rarr; **Permissions & Capabilities**.
3. Toggle **Allow External URL Fetching**.
4. If disabled at the Cloud Relay level, outbound URL requests will be rejected by the relay policy even if `allowExternalUrls: true` is configured in your local `docmd.config.json`.

### Grounded Document Verification

The assistant strictly verifies document existence prior to generating citations. When the `read_documentation_page` tool executes:
* It tests whether the target markdown file or external HTTP URL is reachable.
* If a 404 or missing file is encountered, the assistant explicitly reports that the resource is unavailable rather than fabricating contents.

## Deterministic Retrieval Pipeline & Conversation Compaction

To ensure immediate response speeds and eliminate tool-calling loops, `@docmd/plugin-ai` implements a deterministic two-step retrieval pipeline:

1. **Targeted Search**: The assistant executes a single, precise `search_documentation` query to identify the top matching page.
2. **Authoritative Page Read**: It invokes `read_documentation_page` on that single highest-ranked document.
3. **Immediate Synthesis**: It synthesises an answer immediately from the retrieved document text, providing verified code blocks and grounded Markdown citations. It only initiates a secondary lookup if the initial page fails to address the user's specific query.

### Invisible History Compaction

For long dialogues extending beyond six conversation turns, the assistant automatically compacts earlier dialogue turns into concise factual context summaries. This keeps overall payload sizes well within relay boundaries (avoiding 50,000-character payload limits) without decapitating the assistant or causing memory loss.

## Free docmd Cloud Relay Setup

If you deploy your documentation as static files on GitHub Pages, Cloudflare Pages, Netlify, or Vercel, running a separate backend server just to proxy AI chat queries is unnecessary. docmd provides a free Cloud Relay service at [cloud.docmd.io](https://cloud.docmd.io):

1. **Create an Account & Project**: Sign in to [cloud.docmd.io](https://cloud.docmd.io) and create a project.
2. **Set Associated Domain**: In **Project Configuration**, specify your documentation domain (e.g. `docs.mycompany.com`). Only requests originating from this domain are authorised to use your relay.
3. **Enable Localhost Testing (Development)**: When testing locally, check **Enable Localhost Testing (127.0.0.1 / localhost)**. Remember to uncheck this before public production launches if you wish to restrict queries strictly to your production domain.
4. **Configure BYOK Model & Key**: In **Assistant Model & BYOK Key Setup**, select your AI provider (OpenAI, Anthropic, Gemini, Groq, DeepSeek, etc.), enter your model name and API key, click **Test Connection**, and then **Save Key & Configuration**. All keys are encrypted at rest using KMS hardware security.
5. **Add Project ID to Config**: Under the **Integration** tab, copy your `projectId` snippet and paste it into `docmd.config.json`:
   ```json
   {
     "plugins": {
       "ai": {
         "assistant": true,
         "projectId": "docmd_aiv77jc8ms8qtpvd"
       }
     }
   }
   ```

## Server-Side Security (Self-Hosted BYOK)

::: callout warning title:"Zero Credential Leakage" icon:alert-triangle
`@docmd/plugin-ai` strictly processes API credentials on the server side or through docmd Cloud's KMS encrypted relay. Provider API keys are never rendered in client HTML or static JavaScript bundles.
:::

When running docmd as a Node.js server, set provider environment keys prior to launching your documentation server:

```bash
export OPENAI_API_KEY="sk-..."
# or
export ANTHROPIC_API_KEY="sk-ant-..."
# or generic fallback
export AI_API_KEY="your-api-key"
```

## Architecture Execution Flow

1. **Build-Time Action Registration**: During site compilation, `@docmd/plugin-ai` registers RPC action handlers (`ai:chat`) or injects the Cloud relay client with your `projectId`.
2. **Retrieval-Augmented Generation (RAG)**: When a reader submits a prompt:
   - The client queries the search index compiled by `@docmd/plugin-search` or the MCP tools.
   - Matching document headings and prose chunks are selected based on vector/keyword distance.
   - Relevant snippets and tool results are passed to the relay or server endpoint.
3. **Provider Processing & Citations**: The request is securely routed to the designated model provider via `aiplug`. Output responses stream in real-time with markdown links pointing to referenced documentation anchors.