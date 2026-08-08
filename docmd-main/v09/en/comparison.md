---
title: "Comparison"
description: "How docmd stacks up against Docusaurus, VitePress, MkDocs, Starlight, and Mintlify - real numbers, real features."
---

Here is how `docmd` compares against the alternatives, with measurements taken from a 50-page documentation site built on identical hardware.

## Start writing in 3 seconds, not 30 minutes

::: tabs
== tab "docmd" icon:rocket
```bash
npx @docmd/core dev
```
Done. Your documentation is live. No configuration files, no project scaffolding, no dependency bloat.

== tab "Docusaurus" icon:box
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
Four commands, a generated project consuming roughly 250 MB in `node_modules`, and a configuration file requiring modification before anything useful renders.

== tab "VitePress" icon:zap
```bash
npx vitepress init
```
Prompts for 5 interactive questions, generates configuration files, then executes `vitepress dev`. Clean, but still requires project scaffolding.

== tab "MkDocs" icon:terminal
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python ecosystem dependency. Requires `pip`, a virtual environment, and a `mkdocs.yml` before the first page renders.
:::

## The payload gap is real

Readers should not download a multi-megabyte JavaScript framework bundle to read technical text. Here is the actual browser network payload on a 50-page site:

| Generator | Total Initial Load | JS Payload | CSS Payload |
| :--- | :---: | :---: | :---: |
| **docmd** | **~18 KB** | **~12 KB** | **~6 KB** |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Why payload size matters" icon:lightbulb
Every 100 KB of JavaScript costs ~50ms of parse and execution time on a mid-range mobile processor. `docmd`'s 12 KB JavaScript footprint ensures instant page rendering even on constrained mobile connections. Docusaurus transfers 16× more JavaScript for identical content.
:::

## Build performance

Cold build and hot rebuild benchmarks for a 50-page site on an M1 MacBook Air:

| Generator | Cold Build | Hot Rebuild (Dev) |
| :--- | :---: | :---: |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

`docmd` rebuilds occur instantly, updating the browser before window focus shifts.

## i18n that handles missing translations gracefully

Most documentation generators fail when a user switches to a language where specific pages lack translations. `docmd` resolves fallbacks to the default locale automatically at build time.

| Capability | docmd | VitePress | Docusaurus | Starlight |
| :--- | :---: | :---: | :---: | :---: |
| Per-page fallback to default locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Localised "not translated" warning | ✅ | ❌ | ❌ | ✅ |
| Auto-disable missing locales in switcher | ✅ | ❌ | ❌ | ❌ |
| Instant page-existence check (no network) | ✅ | ❌ | ❌ | ❌ |
| Versioning + i18n combined | ✅ | ❌ | ❌ | ❌ |
| Zero-config (no custom React/Vue) | ✅ | Partial | ❌ | ✅ |

::: callout warning "404 Errors in VitePress and Docusaurus" icon:info
If a reader switches to a locale where a specific page has not been translated, VitePress and Docusaurus trigger a **404 error**. Preventing this requires custom server redirects or custom framework components. `docmd` handles missing translations at build time — untranslated pages fall back seamlessly with a localized notification callout.
:::

## Multi-project workspace support

Teams maintaining multiple products under a single domain (such as a platform core, SDKs, and CLI tools) require independent navigation, distinct configurations, and separate release cycles.

| Capability | docmd | Docusaurus | VitePress | MkDocs | Starlight |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Native workspace support | ✅ | Plugin | ❌ | Plugin | ❌ |
| Single config line per project | ✅ | ❌ | ❌ | ❌ | ❌ |
| Independent versioning per project | ✅ | ✅ | ❌ | ❌ | ❌ |
| Independent i18n per project | ✅ | ❌ | ❌ | ❌ | ❌ |
| Shared assets across projects | ✅ | ❌ | ❌ | ❌ | ❌ |
| Single `site/` output (no proxy needed) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Zero-config detection | ✅ | ❌ | ❌ | ❌ | ❌ |

::: callout info "Native Workspace Configuration" icon:info
```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs", "title": "SDK" }
    ]
  }
}
```
Each workspace project folder retains its own `docmd.config.json` for project-level overrides. Running `npx @docmd/core build` compiles a unified, consolidated distribution directory without reverse proxies or multi-stage CI pipelines.
:::

Docusaurus requires complex multi-instance plugin setups with duplicated configuration files. MkDocs depends on `mkdocs-monorepo-plugin`. VitePress, Starlight, and Mintlify provide no native workspace support.

## Native AI Assistant & BYOK Architecture

Unlike legacy documentation tools that rely on expensive proprietary SaaS extensions or third-party cloud widgets, `docmd` includes a native RAG-powered AI Assistant (`@docmd/plugin-ai`) directly in the open-source engine.

| AI & Knowledge Capability | docmd | Docusaurus | VitePress | MkDocs Material | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Interactive AI Widget** | ✅ (Built-in) | ❌ (3rd Party) | ❌ (3rd Party) | ❌ | ✅ (Cloud) |
| **BYOK (Bring Your Own Key)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Local Model Support (Ollama / LocalAI)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Zero-Config Cloud Relay** | ✅ | ❌ | ❌ | ❌ | ✅ (SaaS only) |
| **Domain Origin Security Guard** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Open Knowledge Format (OKF)** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Native MCP Server (`docmd mcp`)** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Context files (`llms.txt`)** | ✅ | ❌ | ❌ | ❌ | ✅ |

::: callout tip "Why BYOK Matters for Documentation Teams" icon:shield
Cloud documentation SaaS providers lock teams into per-query subscription fees and proprietary AI models. `docmd` gives teams complete freedom with **BYOK (Bring Your Own Key)**: connect to OpenAI, Anthropic, Gemini, DeepSeek, Groq, or self-hosted Ollama models while retaining total control over API budgets and data privacy.
:::

## Comprehensive feature matrix

| Feature | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Zero-config start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Config required** | None | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **Workspace monorepos** | ✅ | Plugin | ❌ | Plugin | ❌ | ❌ |
| **SPA navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native versioning** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Native i18n** | ✅ | ✅ | Manual | Plugin | ✅ | ✅ |
| **Built-in search** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **Interactive AI Assistant** | ✅ (BYOK) | ❌ | ❌ | ❌ | ❌ | ✅ (Cloud) |
| **BYOK (Bring Your Own Key)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **llms.txt support** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **OKF Bundles (Knowledge)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Native MCP Server** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Agent Skills** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Docker Image** | ✅ | ❌ | ✅ | ❌ | ❌ | N/A |
| **Inline discussions** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA support** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Self-hosted** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deploy config generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Configuration overhead

Lines of configuration required for a site with versioning, i18n, search, and sitemap generation:

| Generator | Config Lines | Files Required |
| :--- | :---: | :---: |
| **docmd** | **~15 lines** | 1 (`docmd.config.json`) |
| MkDocs Material | ~50 lines | 1 + plugins |
| VitePress | ~80 lines | 1 + theme dir |
| Docusaurus | ~120 lines | 3+ config files |

## Automated quality assurance

`docmd` ships with a comprehensive integration test suite validating **25 distinct scenarios** across **85 assertions** — covering every core feature and plugin in isolation and combination. Every release must pass all 85 assertions and 13 internal failsafe checks prior to publication.

::: callout tip "Run the test suite locally" icon:lightbulb
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::