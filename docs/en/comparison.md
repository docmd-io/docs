---
title: "Comparison"
description: "How docmd stacks up against Docusaurus, VitePress, MkDocs, Starlight, and Mintlify — real numbers, real features."
---

You picked a documentation tool before. You'll pick one again. Here's what actually matters — and where docmd stands.

## Start writing in 3 seconds, not 30 minutes

::: tabs
tab: docmd
```bash
npx @docmd/core dev
```
Done. Your docs are live. No config files, no project scaffolding, no dependency maze.

tab: Docusaurus
```bash
npx create-docusaurus@latest my-site classic
cd my-site
npm install
npm start
```
Four commands, a generated project with ~250MB in `node_modules`, and a `docusaurus.config.js` you'll need to edit before anything useful happens.

tab: VitePress
```bash
npx vitepress init
```
Asks you 5 questions, generates a config file, then you run `vitepress dev`. Clean — but still requires scaffolding.

tab: MkDocs
```bash
pip install mkdocs-material
mkdocs new my-site && cd my-site
mkdocs serve
```
Python ecosystem. You'll need `pip`, a virtual environment, and a `mkdocs.yml` before the first page renders.
:::

## The payload gap is real

Your readers shouldn't download a React app just to read a paragraph. Here's what the browser actually receives on a 50-page site:

| Generator | Total initial load | JS payload | CSS payload |
|:----------|:------------------:|:----------:|:----------:|
| **docmd** | **~18 KB** | ~12 KB | ~6 KB |
| MkDocs Material | ~40 KB | ~25 KB | ~15 KB |
| VitePress | ~50 KB | ~35 KB | ~15 KB |
| Mintlify | ~120 KB | ~80 KB | ~40 KB |
| Docusaurus | ~250 KB | ~200 KB | ~50 KB |

::: callout tip "Why this matters"
Every 100 KB of JavaScript costs ~50ms of parse time on a mid-range phone. docmd's 12 KB JS means your docs load instantly — even on 3G. Docusaurus ships 16× more JavaScript for the same content.
:::

## Build speed

Building the same 50-page site on an M1 MacBook Air:

| Generator | Cold build | Hot rebuild (dev) |
|:----------|:----------:|:-----------------:|
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

docmd rebuilds are fast enough that the page refreshes before you switch windows.

## i18n that actually works

This is where most tools fall apart. You add 6 languages, translate 3 pages in Hindi, and suddenly your users hit 404s on every untranslated page.

| Capability | docmd | VitePress | Docusaurus | Starlight |
|:-----------|:-----:|:---------:|:----------:|:---------:|
| Per-page fallback to default locale | ✅ | ❌ (404) | ❌ (404) | ✅ |
| Localised "not translated" warning | ✅ | ❌ | ❌ | ✅ |
| Auto-disable missing locales in switcher | ✅ | ❌ | ❌ | ❌ |
| Instant page-existence check (no network) | ✅ | ❌ | ❌ | ❌ |
| Versioning + i18n combined | ✅ | ❌ | ❌ | ❌ |
| Zero-config (no custom React/Vue) | ✅ | Partial | ❌ | ✅ |

::: callout warning "What happens in VitePress and Docusaurus"
If a reader switches to Hindi and that page isn't translated, they get a **404 error**. The only workaround is server-side redirects or writing a custom React/Vue component. docmd handles this at build time — unavailable locales show an "N/A" badge, and untranslated pages fall back silently with a localized warning callout.
:::

## Full feature matrix

| Feature | docmd | Docusaurus | VitePress | MkDocs Material | Starlight | Mintlify |
|:--------|:-----:|:----------:|:---------:|:---------------:|:---------:|:--------:|
| **Zero-config start** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Config required** | None | `docusaurus.config.js` | `config.mts` | `mkdocs.yml` | `astro.config.mjs` | `mint.json` |
| **SPA navigation** | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| **Native versioning** | ✅ | ✅ | ❌ | Plugin | ❌ | ✅ |
| **Native i18n** | ✅ | ✅ | Manual | Plugin | ✅ | ✅ |
| **Built-in search** | ✅ | ❌ (Algolia) | ✅ | ✅ | ✅ | Cloud |
| **llms.txt** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Inline discussions** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **PWA support** | ✅ | Community | ❌ | ❌ | ❌ | ❌ |
| **Self-hosted** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Deploy config generator** | ✅ | ❌ | ❌ | ❌ | ❌ | N/A |

## Configuration overhead

Lines of config required for a site with versioning, i18n, search, and sitemap:

| Generator | Config lines | Files required |
|:----------|:------------:|:--------------:|
| **docmd** | **~15 lines** | 1 (`docmd.config.js`) |
| MkDocs Material | ~50 lines | 1 + plugins |
| VitePress | ~80 lines | 1 + theme dir |
| Docusaurus | ~120 lines | 3+ config files |

## Quality assurance

docmd ships with a brute test suite that validates **25 distinct scenarios** across **85 assertions** — covering every feature in isolation and in combination. Every release must pass all 85 assertions and 13 internal failsafe checks before shipping.

::: callout tip "Run the tests yourself"
```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

No other documentation generator in this class publishes a comparable end-to-end feature test suite as part of its source.