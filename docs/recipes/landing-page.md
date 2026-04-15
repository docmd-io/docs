---
title: "Recipe: Designing Custom Landing Pages"
description: "Master the noStyle mode to create high-impact marketing pages and product entries."
---

While `docmd` excels at structured technical documentation, you can easily bypass the default UI logic to create bespoke landing pages, product showcases, or marketing splash screens using **No-Style Pages**.

## The Architectural Concept

By activating `noStyle: true` in a page's frontmatter, the engine strips away the standard Sidebar, Header, and default CSS framework. This provides a "Blank Canvas" while maintaining access to the documentation engine's SEO meta tags and Markdown parsing capabilities.

## Implementation Workflow

Create or refine your project's root entry point at `docs/index.md`.

```html
---
title: "Next-Gen Documentation"
description: "The zero-config, isomorphic, AI-ready documentation engine."
noStyle: true
components:
  meta: true      # Retain structured SEO and OpenGraph tags
  favicon: true   # Retain project branding
  scripts: false  # Opt-out of the default SPA router for this page
customHead: |
  <style>
    body { font-family: 'Inter', sans-serif; margin: 0; background: #000; color: #fff; }
    .hero { height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .btn { background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
  </style>
---

<div class="hero">
  <h1>Architecture Meets Documentation.</h1>
  <p>Isomorphic execution. AI-optimised context. Zero-reload navigation.</p>
  <br>
  <a href="/getting-started/" class="btn">Launch Documentation →</a>
</div>

<div class="feature-grid">
   <!-- Inject custom landing page HTML or specialised Markdown Cards here -->
</div>
```

## Technical Outcomes

When the project is compiled via `docmd build`, the root `index.html` will render as a bespoke landing page. This page serves as a high-fidelity entry point that seamlessly directs users into the standardized documentation environment.