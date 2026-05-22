---
title: "Live Preview"
description: "Run the engine entirely in the browser without a backend server using the Live architecture."
---

The compiler features a modular architecture separating filesystem operations from core logic. This enables the engine to run entirely within the browser. It facilitates live editors and CMS previews without a Node.js backend.

<!-- SCREENSHOT: A live preview window embedded in a documentation page, showing a code editor on the left and the rendered HTML output on the right, with the preview updating in real-time. -->

::: button "Open Live Editor" external:https://live.docmd.io

## The Live Editor

The built-in Live Editor provides a high-performance, split-pane interface. Author your Markdown in the left pane. Watch the rendered output update and sync in real-time on the right.

### Local Execution

Launch the Live Editor locally within your project:

```bash
npx @docmd/core live
```

### Static Distribution

Generate a standalone, static version of the editor. Host it on platforms like Vercel or GitHub Pages:

```bash
npx @docmd/core live --build-only
```

This generates a `dist/` directory. It contains the `index.html` entry point and the bundled `docmd-live.js` engine.

## Embedding @docmd/core

Integrate the browser-compatible bundle into your applications. Provide internal Markdown rendering or preview capabilities.

### 1. Resource Integration

Include the required CSS and JavaScript bundles from your assets or a CDN:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphic API

The global `docmd` object provides the `compile` method for instant rendering.

```javascript
const html = await docmd.compile(markdown, {
  "title": "Dynamic Preview",
  "theme": { "appearance": "dark" }
});


document.getElementById("preview-frame").srcdoc = html;
```

::: callout tip "AI Feedback Loops" icon:sparkles
The Live architecture is ideal for building **AI-Agent Sandboxes**. Pipe an agent's suggested changes to a live-compilation buffer. Visually verify AI suggestions before committing changes to your repository.
:::