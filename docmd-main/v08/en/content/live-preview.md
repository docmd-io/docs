---
title: "Live Preview"
description: "Run the engine entirely in the browser without a backend server using the Live architecture."
---

The compiler separates filesystem operations from core logic. The core engine can therefore run entirely in the browser, powering live editors and CMS previews without a Node.js backend.

<img width="720" class="with-border" src="/assets/previews/live-editor-preview.webp">

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

Add the browser-compatible bundle to a third-party app to render Markdown on the client.

### 1. Resource Integration

Include the CSS and JavaScript bundles from your assets or a CDN:

```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<script src="/docmd-live.js"></script>
```

### 2. Isomorphic API

The global `docmd` object exposes a `compile` method for instant rendering.

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