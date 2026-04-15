---
title: "तुलना"
description: "A factual comparison between docmd and other documentation generators — real numbers, real features."
---

`docmd` occupies the space between simple Markdown parsers and heavy framework applications. It delivers the speed and SEO of a static site with the interactive feel of a modern SPA — at a fraction of the payload.

## Feature Matrix

| Feature | docmd | Docusaurus | MkDocs Material | VitePress | Mintlify |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Language** | Node.js | React | Python | Vue | SaaS |
| **Config required** | **None** | `docusaurus.config.js` | `mkdocs.yml` | `config.mts` | `mint.json` |
| **Initial payload** | **~18kb** | ~250kb | ~40kb | ~50kb | ~120kb |
| **Navigation** | **SPA router** | React SPA | Full reloads | Vue SPA | Hosted SPA |
| **Versioning** | **Native (directory-based)** | Native (complex) | mike plugin | Manual | Native |
| **i18n** | **Native (locale dirs)** | Native (complex) | Plugin-based | Manual | Native |
| **Search** | **Built-in offline** | Algolia (cloud) | Built-in | MiniSearch | Cloud |
| **PWA** | **Built-in** | Community plugin | None | None | Hosted |
| **llms.txt** | **Auto-generated** | Manual | None | None | Proprietary |
| **Inline discussions** | **Threads plugin** | None | None | None | None |
| **Self-hosted** | **Yes** | Yes | Yes | Yes | No |
| **Zero-config start** | **`npx @docmd/core dev`** | No | No | No | No |

<!-- SCREENSHOT: Feature matrix comparison table rendered on the live site, showing the visual styling of the table with highlighted docmd column. -->

## The Numbers

### Build payload

A documentation site with 50 pages and default configuration:

| Generator | Initial page load | JS payload | CSS payload |
| :--- | :--- | :--- | :--- |
| **docmd** | **~18kb** total | ~12kb | ~6kb |
| VitePress | ~50kb total | ~35kb | ~15kb |
| MkDocs Material | ~40kb total | ~25kb | ~15kb |
| Docusaurus | ~250kb total | ~200kb | ~50kb |
| Mintlify | ~120kb total | ~80kb | ~40kb |

<!-- SCREENSHOT: Side-by-side Lighthouse scores comparing docmd, Docusaurus, and VitePress — showing Performance, Accessibility, Best Practices, and SEO scores. All four categories should score 100 for docmd. -->

### Build speed

Building the same 50-page site on an M1 MacBook Air:

| Generator | Cold build | Hot rebuild (dev) |
| :--- | :--- | :--- |
| **docmd** | **~1.2s** | **~80ms** |
| VitePress | ~2.5s | ~150ms |
| MkDocs Material | ~3.0s | ~500ms |
| Docusaurus | ~15s | ~2s |

### Configuration overhead

Lines of configuration required for a site with versioning, i18n, search, and sitemap:

| Generator | Config lines | Files required |
| :--- | :--- | :--- |
| **docmd** | **~15 lines** | 1 (`docmd.config.js`) |
| VitePress | ~80 lines | 1 + theme dir |
| MkDocs Material | ~50 lines | 1 (`mkdocs.yml`) + plugins |
| Docusaurus | ~120 lines | 3+ config files |

## Quality Assurance

docmd ships with a brute test suite that validates **25 distinct scenarios** across **85 assertions** — covering every feature in isolation and in combination. Every release must pass all 85 assertions and 13 internal failsafe checks before shipping.

::: callout tip "Run the tests yourself"
```bash
git clone https://github.com/nicholasgriffintn/docmd.git
cd docmd && node scripts/brute-test.js
```
:::

No other documentation generator in this class publishes a comparable end-to-end feature test suite as part of its source.

## Where docmd Stands Out

::: grid {cols=3}

::: grid-item
### Zero-Config
Drop Markdown files into a folder and run `npx @docmd/core dev`. Navigation, search, SEO, sitemap, and PWA are all active with no configuration file.
:::

::: grid-item
### AI-First
The LLMs plugin auto-generates `llms.txt` and `llms-full.txt` — structured context files that AI coding assistants consume directly. No manual curation required.
:::

::: grid-item
### Smallest Payload
At ~18kb initial load, docmd serves pages faster than any competitor. Pure semantic HTML with a micro-SPA router — no framework runtime shipped to the browser.
:::

:::

## When to Choose Something Else

::: callout info "No tool is perfect for every use case"
- **Docusaurus** — Best when you need React components (MDX) embedded inside documentation pages, or when you're part of the React ecosystem.
- **VitePress** — Best for Vue-ecosystem projects that want tight Vue component integration in Markdown.
- **MkDocs Material** — Best for Python-first environments with extensive theming via the Material theme.
- **Mintlify** — Best if you want a fully managed, hosted solution with zero server management.
- **docmd** — Best when you want the fastest, lightest, most feature-complete static documentation generator that works out of the box.
:::
- **docmd**: Best if you value speed, developer experience, a modern SPA feel, and want your documentation to be digestible by both humans and AI agents.