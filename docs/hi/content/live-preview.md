---
title: "लाइव प्रीव्यू"
description: "Run docmd entirely in the browser without a backend server using the Live architecture."
---

`docmd` features a modular architecture that separates filesystem operations from core processing logic. This enables the documentation engine to run **entirely within the browser**, facilitating live editors and CMS previews without the need for a Node.js backend.

<!-- SCREENSHOT: A live preview window embedded in a documentation page, showing a code editor on the left and the rendered HTML output on the right, with the preview updating in real-time. -->


::: button "Open Live Editor" https://live.docmd.io

## The Live Editor

The built-in Live Editor provides a high-performance, split-pane interface. Author your Markdown in the left pane and observe the rendered output navigate and synchronise in real-time on the right.

### Local Execution

To launch the Live Editor locally within your project:

```bash
docmd live
```

### Static Distribution

Generate a standalone, static version of the editor for hosting on platforms like Vercel or GitHub Pages:

```bash
docmd live --build-only
```

This generates a `dist/` directory containing the `index.html` entry point and the bundled `docmd-live.js` isomorphic engine.

## Embedding docmd

You can integrate the browser-compatible bundle into your own applications to provide internal Markdown rendering or preview capabilities.

### 1. Resource Integration

Include the required CSS and JavaScript bundles from your assets or a CDN:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphic API

The global `docmd` object provides the `compile` method for instantaneous rendering.

```javascript
const html = await docmd.compile(markdown, {
  siteTitle: 'Dynamic Preview',
  theme: { appearance: 'dark' }
});

// Inject into an iframe for style isolation
document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "AI Feedback Loops"
The Live architecture is ideal for building **AI-Agent Sandboxes**. Instead of providing an agent with filesystem write access, you can pipe its suggested documentation changes to a live-compilation buffer. This allows you to visually verify AI suggestions in a "ghost" environment before committing changes to your repository.
:::