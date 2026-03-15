---
title: "Browser API (Client-Side)"
description: "Render docmd sites directly in the browser with the isomorphic core engine."
---

`docmd` features an **isomorphic core**. This means the same engine that generates static sites in Noce.js can run entirely within a web browser. This is ideal for building CMS previews, interactive playgrounds, or embedding documentation into existing web applications.

## Installation via CDN

You can include the `docmd` engine and default styles directly from a CDN like `unpkg`.

```html
<!-- Core Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- The Isomorphic Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

## Basic Usage

The engine exposes a global `docmd` object. The primary method is `docmd.compile()`.

### `docmd.compile(markdown, config)`

Compiles raw Markdown into a full HTML document string using the default `docmd` layout.

**Parameters:**
- `markdown` (String): The raw Markdown content.
- `config` (Object): Configuration overrides (same schema as `docmd.config.js`).

**Returns:** `Promise<String>`: The complete HTML document.

### Example: Live Preview

To ensure style isolation, it is recommended to render the output inside an `<iframe>` using the `srcdoc` attribute.

```javascript
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: 'Preview',
    theme: { appearance: 'light' }
  });
  preview.srcdoc = html;
}

editor.addEventListener('input', updatePreview);
```

## Advanced: Fragment Rendering

If you only need the HTML content without the `docmd` layout (sidebar, header, footer), use the `noStyle` frontmatter option.

```javascript
const markdown = `---
noStyle: true
---
# Content Only
This will render without the sidebar.`;

const html = await docmd.compile(markdown);
```

## Considerations

- **No File System**: The browser engine cannot scan folders. You must provide the `navigation` array explicitly in the config object if you need a sidebar.
- **Node-Only Plugins**: Plugins that rely on Node.js APIs (like Sitemap or LLM text generation) are disabled in the browser environment.