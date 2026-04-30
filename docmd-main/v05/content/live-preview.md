---
title: "Live Preview & Browser Support"
description: "Run docmd entirely in the browser without a server using the new Live architecture."
---

`docmd` features a modular architecture that separates file system operations from core processing logic. This allows the documentation engine to run **entirely in the browser**, enabling live editors and CMS previews without a server.

::: button "Open Live Editor" https://live.docmd.io

## The Live Editor

The built-in Live Editor provides a split-pane interface where you can write Markdown on the left and see the rendered documentation on the right instantly.

### Running Locally
Launch the editor on your machine:
```bash
docmd live
```

### Static Deployment
Generate a standalone version for hosting (e.g., on Vercel or GitHub Pages):
```bash
docmd live --build-only
```
This creates a `dist/` directory containing the `index.html` and `docmd-live.js` engine.

## Embedding docmd in Your Site

Use the browser-compatible bundle to add Markdown preview capabilities to your own applications.

### 1. Include Script and Assets
```html
<link rel="stylesheet" href="/assets/css/docmd-main.css">
<link rel="stylesheet" href="/assets/css/docmd-theme-sky.css">
<script src="/docmd-live.js"></script>
```

### 2. Using the API
The global `docmd` object exposes the `compile` function.

```javascript
const html = docmd.compile(markdown, {
  siteTitle: 'My Live Doc',
  theme: { name: 'sky' }
});

document.getElementById('preview-frame').srcdoc = html;
```

::: callout tip "AI Feedback Loops 🤖"
By leveraging the Live Editor architecture, you can build **AI-Agent sandboxes**. Instead of the AI saving files to disk, it can "post" its suggested edits to a live-compilation buffer, allowing you to preview AI-suggested documentation changes in real-time before approving the commit.
:::