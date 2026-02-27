---
title: "Browser API (Client-Side)"
description: "How to use the docmd engine directly in the browser to render documentation dynamically without a server."
---

# Browser API

`docmd` features an **isomorphic core**. This means the exact same engine that builds your static site in Node.js can also run entirely inside a web browser.

This is powerful for:
*   Building **CMS Previews** (Type markdown, see result instantly).
*   Creating **Playgrounds** (Like [CodePen](https://codepen.io) for docs).
*   Embedding documentation rendering into existing React/Vue/Angular apps.

## Installation via CDN



You don't need to install Node.js. You can simply include the scripts and styles from a CDN like `unpkg` or `jsdelivr`.

```html
<!-- 1. Core Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">
<!-- Optional: Theme -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/themes/src/docmd-theme-sky.css">

<!-- 2. The Engine Bundle -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

## Usage

Once the script loads, it exposes a global `docmd` object.

### `docmd.compile(markdown, config)`

Compiles Markdown text into a complete HTML document string.

**Parameters:**
*   `markdown` (String): The raw Markdown content.
*   `config` (Object): Configuration overrides (same structure as `docmd.config.js`).

**Returns:**
*   `String`: The full HTML string (including `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).

### Example: Live Preview Iframe

The safest way to render the output is inside an `<iframe>` using the `srcdoc` attribute. This ensures styles don't bleed into your main application.

```html
<!DOCTYPE html>
<html>
<body>
    <textarea id="editor"># Hello World</textarea>
    <iframe id="preview" style="width: 100%; height: 500px; border: 1px solid #ccc;"></iframe>

    <!-- Load docmd -->
    <script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>

    <script>
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');

        function update() {
            // 1. Compile
            const html = docmd.compile(editor.value, {
                siteTitle: 'My Preview',
                theme: { name: 'sky', defaultMode: 'light' },
                layout: { 
                    spa: false, // Disable SPA router for previews
                    header: { enabled: false }, // Optional: hide header for clean embed
                    sidebar: { collapsible: false }
                }
            });

            // 2. Render
            preview.srcdoc = html;
        }

        editor.addEventListener('input', update);
        update(); // Initial render
    </script>
</body>
</html>
```

## Advanced: Raw Content (No-Style)

If you only want the HTML content *without* the `docmd` sidebar, header, or footer (for example, to inject into a `div` on your own site), use the `noStyle` frontmatter option in your input.

```javascript
const markdown = `---
noStyle: true
components:
  css: true
---

# Just Content
This will render without the sidebar layout.`;

const html = docmd.compile(markdown, { /* config */ });
```

## Limitations

The Browser API has a few limitations compared to the Node.js CLI:

1.  **No File System Access:** It cannot scan folders to auto-generate navigation. You must provide the `navigation` array explicitly in the config object if you want a sidebar.
2.  **Plugins:** Some Node.js-specific plugins (like Sitemap generation) will not run. However, client-side plugins (like Mermaid diagrams) work perfectly.