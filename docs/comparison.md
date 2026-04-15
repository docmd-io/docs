---
title: "Comparison"
description: "A functional comparison between docmd and alternative documentation generators."
---

`docmd` occupies the space between simple Markdown parsers and heavy framework applications (like Docusaurus). It delivers the speed and SEO of a static site with the interactive feel of a modern Single Page Application (SPA).

## Feature Matrix

| Feature | docmd | Docusaurus | MkDocs | Mintlify |
| :--- | :--- | :--- | :--- | :--- |
| **Ecosystem** | **Node.js** | React.js | Python | SaaS |
| **Navigation** | **Instant SPA** | React SPA | Full Reloads | Hosted SPA |
| **Base Payload** | **< 20kb** | > 200kb | Minimal | Medium |
| **Versioning** | **Native** | Complex FS | Plugin-based | Native |
| **i18n Support** | **Native** | Native | Plugin-based | Native |
| **Search** | **Built-in (Offline)** | Algolia (Cloud) | Built-in | Cloud-based |
| **Collaboration** | **Native (Threads)** | None | None | None |
| **PWA** | **Built-in (Plugin)** | Plugin | None | Hosted |
| **AI Optimisation** | **Built-in (llms.txt)** | Manual | None | Proprietary |
| **Setup** | **Instant (Zero-Config)** | ~15 mins | ~10 mins | ~5 mins |

## Where docmd Stands Out

### 1. AI-First Architecture
Unlike traditional generators, `docmd` recognises that AI agents are now primary consumers of technical documentation. The built-in **LLM Plugin** automatically generates `llms.txt` and `llms-full.txt` files, providing structured context for LLM-driven development tools.

### 2. Zero-Config PWA
Transform your documentation into an installable mobile and desktop application with a single plugin. `docmd` handles the service worker logic, manifest generation, and offline caching automatically.

### 3. Balanced Performance
By generating pure, semantic HTML and handling subsequent navigations via a micro-SPA router, `docmd` ensures peak SEO performance without sacrificing the fluidity of a modern web application.

## Choosing the Right Tool

- **Docusaurus**: Best if you require high-complexity React components within your Markdown (MDX).
- **MkDocs**: Best if your environment is strictly Python-based and you prefer full page reloads.
- **docmd**: Best if you value speed, developer experience, a modern SPA feel, and want your documentation to be digestible by both humans and AI agents.