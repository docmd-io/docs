---
title: "Comparison"
description: "See how docmd stacks up against Docusaurus, MkDocs, Mintlify, and other documentation generators."
---

# Comparing Documentation Tools

Choosing the right tool depends on your team's workflow and your project's scale. `docmd` was engineered to fill a specific gap: the space between "too simple" (basic Markdown parsers) and "too heavy" (full React/framework applications).

## Feature Matrix

Here is how `docmd` compares to the industry standards across key metrics.

| Feature | docmd | Docusaurus | MkDocs (Material) | Mintlify |
| :--- | :--- | :--- | :--- | :--- |
| **Core Architecture** | Node.js (Isomorphic) | React.js | Python | Proprietary |
| **Navigation** | **Instant SPA** | React SPA | Page Reloads | Hosted SPA |
| **Client JS Payload** | **Tiny (< 20kb)** | Heavy (> 200kb) | Minimal | Medium |
| **Search Engine** | **Built-in (Offline)** | Algolia (Cloud) | Built-in (Lunr) | Built-in (Cloud) |
| **Custom Containers** | **Deep Nesting** | MDX / React | Admonitions | MDX |
| **Setup Time** | **< 1 minute** | ~15 mins | ~10 mins | Instant |
| **Browser API**| **Yes (Live Editor)** | No | No | No |
| **Cost** | **Free OSS** | Free OSS | Free OSS | Freemium |

## The docmd Advantage

If you are trying to decide if `docmd` is right for you, here are the three areas where it truly shines.

### 1. The "Isomorphic" Engine
Unlike Docusaurus or MkDocs, which are strictly "Build Tools" that must run on a server or CI/CD pipeline, `docmd` has a modular core. 
You can run the exact same `docmd` compilation engine directly inside a web browser. This enables features like our Live Editor, allowing you to build CMS interfaces or live preview tools for your users without needing a backend server.

### 2. Privacy-First, Offline Search
Most documentation generators push you toward third-party services like Algolia DocSearch. While Algolia is fantastic for enterprise scale, it requires API keys, crawler configurations, and sends user search data to external servers.

`docmd` includes a production-grade search engine out of the box. It generates a highly optimized local index during the build. This means your documentation is searchable even if the user loses their internet connection, and respects user privacy completely.

### 3. Pure HTML + SPA Speed
We believe reading documentation shouldn't require downloading a massive JavaScript framework. 

When you build a `docmd` site, it generates pure, semantic HTML. This results in perfect SEO and instant initial page loads. However, once the page is open, our lightweight client-side router takes over. Clicking links feels exactly like a modern React or Next.js app-content swaps instantly without the browser ever flashing or reloading.

## When to choose something else

We are proud of what `docmd` does, but it isn't for everyone.

* **Choose Docusaurus if:** You need to embed highly interactive, custom React components directly inside your Markdown files, or if you are building a massive corporate portal with extreme internationalization needs.
* **Choose MkDocs if:** Your entire engineering team strictly works in Python and you want to utilize the existing Python plugin ecosystem.