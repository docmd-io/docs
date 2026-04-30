---
title: "No-Style Pages"
description: "Create custom landing pages and unique layouts by disabling the default docmd theme."
---

`docmd` allows you to bypass the standard documentation layout (Sidebar, Header, and Footer) on a per-page basis. This is ideal for creating product landing pages, custom dashboards, or marketing splash screens while maintaining access to the documentation engine's components.

## Enabling No-Style Mode

To disable the global UI, add `noStyle: true` to the page's frontmatter.

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true      # Retain SEO and OpenGraph tags
  favicon: true   # Retain site favicon
  css: true       # Inject docmd-main.css for typography
---

<!-- Raw HTML or specialised Markdown goes here -->
<div class="hero">
  <h1>Next-Gen Documentation</h1>
  <p>Zero-config. Isomorphic. AI-Ready.</p>
</div>

::: callout info "Infinite Nesting Support"
Even with `noStyle: true`, all standard `docmd` containers like `::: card`, `::: tabs`, and `::: hero` are fully supported and can be nested at any depth.
:::
```

## Component Opt-In

When `noStyle` is active, you start with a blank canvas. Selectively re-enable core system components as needed:

| Component | Description |
| :--- | :--- |
| `meta` | Injects `<title>`, SEO meta tags, and structured OpenGraph data. |
| `favicon` | Injects the project-wide favicon. |
| `css` | Injects `docmd-main.css`. Highly recommended for foundational grid and typography. |
| `menubar` | Injects the site's top menubar. |
| `theme` | Injects the active theme's CSS variables and appearance overrides. |
| `scripts` | Injects interactive component logic (requires `mainScripts: true`). |
| `spa` | Enables the single-page application router (requires `scripts: true`). |

## Composable Landing Pages

The primary power of `noStyle` is that it allows you to use the entire suite of `docmd` components as high-fidelity "widgets" on a blank canvas. You aren't limited to raw HTML; you can build complex, structural designs purely in Markdown.

### Building a Modern Entry Point

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Use the site's top navigation
  scripts: true    # Enable interactive components
  mainScripts: true
---

::: hero layout:split glow:true
# Build Documentation that Wows.
The zero-config engine for modern engineering teams.

::: button "Get Started" /introduction color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed [https://www.youtube.com/watch?v=dQw4w9WgXcQ]
:::
:::

::: grids
  ::: card "Zero Configuration"
  Just write markdown. No complex React logic or build scripts.
  :::
  ::: card "AI Optimised"
  Structure-aware parsing for the LLM era.
  :::
  ::: card "Fast Without the Framework Tax"
  Static generation with isomorphic SPA navigation.
  :::
:::
```

::: callout tip "AI-Generated Layouts"
Because `noStyle` pages support raw HTML alongside `docmd` containers, they are perfectly suited for **AI-driven UI design**. You can prompt an AI: *"Design a modern hero section using Tailwind-like utility classes and docmd buttons, wrapped in a noStyle: true container."* The AI can iterate on the design within your static site pipeline with zero additional configuration.
:::

## String Replacement (i18n for noStyle)

When your site has [i18n configured](../configuration/localisation/index.md), themed documentation pages get full server-side translations automatically — each locale has its own markdown files in separate directories. But noStyle pages use custom HTML, not markdown, so that approach doesn't apply. Instead, docmd provides **string replacement** — translating your HTML via `data-i18n` attributes and JSON translation files.

::: callout info "Why this only works for noStyle pages"
String replacement finds elements with `data-i18n` attributes in the rendered HTML and swaps their text content. Standard markdown content renders to plain `<p>`, `<h2>`, `<li>` tags — there are no `data-i18n` attributes for the replacer to find. For translating documentation written in markdown, use [directory mode](../configuration/localisation/translated-content.md) — separate markdown files per locale.
:::

### How It Works

There are two modes for string replacement:

- **Server-side (recommended)**: With [`stringMode: true`](../configuration/localisation/index.md#string-mode-nostyle-pages-only) in your i18n config, docmd resolves `data-i18n` attributes **at build time** and generates fully translated HTML in `/{locale}/` directories. Each locale gets its own URL — fully indexable by search engines.
- **Client-side**: The `docmd-i18n-strings.js` script loads translations at runtime via XHR. This is injected automatically on noStyle pages when i18n is configured. Useful for in-place switching without page reload (e.g. SPAs, dashboards).

Both modes use the same `data-i18n` attribute syntax and JSON file format.

1. Place JSON translation files inside `assets/i18n/` — one per locale:

```
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Each JSON file is a flat key-value map:

```json
{
  "hero.title": "Markdown → Production Docs",
  "hero.subtitle": "The zero-config documentation engine.",
  "nav.docs": "Documentation",
  "nav.editor": "Live Editor",
  "cta.getStarted": "Get Started",
  "cta.install": "npm i @docmd/core"
}
```

3. Use `data-i18n` attributes on your HTML elements:

```html
<h1 data-i18n="hero.title">Markdown → Production Docs</h1>
<p data-i18n="hero.subtitle">The zero-config documentation engine.</p>
<a data-i18n="nav.docs" href="/docs">Documentation</a>
```

The default-language text is written directly in the HTML (acts as the fallback). When a non-default locale is active, the script loads the matching JSON and replaces the text.

### Attribute Translation

To translate element attributes like `placeholder`, `title`, or `aria-label`, use `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### HTML Content

For keys that contain HTML markup, use `data-i18n-html` instead of `data-i18n`:

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA for speed.</p>
```

### Switching Locales

The i18n strings module exposes a global API at `window.DOCMD_I18N_STRINGS`:

```js
// Switch to Hindi
DOCMD_I18N_STRINGS.switchLocale('hi');

// Get current locale
console.log(DOCMD_I18N_STRINGS.locale); // 'en'

// Get all configured locales
console.log(DOCMD_I18N_STRINGS.locales);
// [{ id: 'en', label: 'English' }, { id: 'hi', label: 'हिन्दी' }]
```

You can build a custom language switcher using this API:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
</select>
```

### Events

Listen for the `docmd:i18n-applied` event to run custom logic after strings are applied:

```js
document.addEventListener('docmd:i18n-applied', function(e) {
  console.log('Locale:', e.detail.locale);
  console.log('Strings:', e.detail.strings);
});
```

::: callout info "Automatic Detection"
The script detects the active locale from the URL path prefix (e.g. `/hi/` → Hindi). For the default locale (rendered at `/`), it checks `localStorage` for a previously saved preference. The `switchLocale()` function handles URL navigation automatically.
:::

### In-Place Mode

For single-page sites (like landing pages), you don't want locale switching to navigate to a different URL. Set `inPlace: true` in your i18n config to swap strings without any URL redirect:

```js
// docmd.config.js
i18n: {
  defaultLocale: "en",
  locales: [
    { id: "en", label: "English" },
    { id: "zh", label: "中文" }
  ],
  inPlace: true
}
```

With `inPlace: true`, calling `switchLocale()` reloads the JSON for the new locale and replaces all `data-i18n` strings on the current page — no navigation occurs.