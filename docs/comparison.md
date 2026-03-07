---
title: "Comparing Documentation Tools"
description: "See how docmd stacks up against Docusaurus, MkDocs, Mintlify, and other documentation generators."
---

`docmd` was engineered to fill a specific gap: the space between "too simple" (basic Markdown parsers) and "too heavy" (full React/framework applications).

## Feature Matrix

| Feature | docmd | Docusaurus | MkDocs | Mintlify |
| :--- | :--- | :--- | :--- | :--- |
| **Language** | **Node.js** | React.js | Python | Proprietary |
| **Navigation** | **Instant SPA** | React SPA | Page Reloads | Hosted SPA |
| **Output** | **Static HTML** | React Hydration | Static HTML | Hosted |
| **JS Payload** | **Tiny (< 20kb)** | Heavy (> 200kb) | Minimal | Medium |
| **Versioning** | **Easy (Config + Auto)** | Complex (FS) | Plugin (Mike) | Native |
| **i18n Support** | **In Pipeline** | Native | Theme-based | Beta |
| **Search** | **Built-in (Offline)** | Algolia (Cloud) | Built-in (Lunr) | Built-in (Cloud) |
| **PWA** | **Built-in (Plugin)** | Plugin | None | Hosted |
| **AI Context** | **Built-in (llms.txt)** | Plugin | None | Proprietary |
| **Setup** | **Instant (-z)** | ~15 mins | ~10 mins | ~5 mins |
| **Cost** | **Free OSS** | Free OSS | Free OSS | Freemium |

## The docmd Advantage

### 1. AI-Centric Architecture
Unlike traditional generators, `docmd` understands that humans aren't the only ones reading your docs. With the **LLM Plugin**, your site automatically generates `llms.txt` and `llms-full.txt` files. These provide instantly ingestible context for AI agents (like GitHub Copilot, ChatGPT, or custom RAG pipelines), making your project significantly easier for AI to support.

### 2. Native PWA Logic
While other tools require complex Service Worker configurations, `docmd` offers a **one-line PWA plugin**. This turns your documentation into an installable mobile/desktop app with intelligent offline caching and background auto-updates out of the box.

### 3. Balanced Speed (SPA + Static)
We generate pure static HTML for perfect SEO and initial load speed. However, once loaded, our lightweight SPA router handles all further navigations. This gives you the speed of a React app with the simplicity and SEO of a static site.

## When to choose something else

*   **Choose Docusaurus if:** You need highly interactive, custom React components embedded directly inside your Markdown (MDX), or have extreme multi-language requirements.
*   **Choose MkDocs if:** Your team is strictly Python-based and you want to use the existing Python plugin ecosystem (though you'll miss out on SPA features).