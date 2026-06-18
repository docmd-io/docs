---
title: "No-Style Pages"
description: "Create custom landing pages and unique layouts by disabling the default docmd theme."
---

docmd allows you to bypass the standard documentation layout (Sidebar, Header, Footer) on a per-page basis. This is ideal for creating landing pages or custom dashboards while retaining access to the engine's components.

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

::: callout info "Infinite Nesting Support" icon:info
Even with `noStyle: true`, all standard docmd containers like `::: card`, `::: tabs`, and `::: hero` are fully supported and can be nested infinitely.
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

The primary power of `noStyle` is using docmd components as high-fidelity "widgets" on a blank canvas. You aren't limited to raw HTML; you can build complex structural designs purely in Markdown.

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

::: button "Get Started" ../getting-started/quick-start.md color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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

::: callout tip "AI-Generated Layouts" icon:lightbulb
Because `noStyle` pages support raw HTML alongside docmd containers, they are perfectly suited for **AI-driven UI design**. Prompt an AI: *"Design a modern hero section using utility classes and docmd buttons, wrapped in a noStyle container."* The AI can iterate within your static site pipeline with zero configuration.
:::

## String Replacement (i18n for noStyle)

When your site has [i18n configured](../configuration/localisation/index.md), themed documentation pages get full server-side translations automatically. However, `noStyle` pages use custom HTML. docmd provides **string replacement** to translate HTML via `data-i18n` attributes and JSON translation files.

::: callout info "Why this only works for noStyle pages" icon:info
String replacement finds elements with `data-i18n` attributes and swaps their text content. Standard Markdown content renders to plain `<p>`, `<h2>`, `<li>` tags without these attributes. For standard Markdown, use [Directory Mode](../configuration/localisation/translated-content.md).
:::

### How It Works

There are two modes for string replacement:

- **Server-side (recommended)**: With `stringMode: true` in your i18n config, docmd resolves `data-i18n` attributes **at build time**. It generates fully translated HTML in `/{locale}/` directories for search engines.
- **Client-side**: The `docmd-i18n-strings.js` script loads translations at runtime via XHR. This is useful for in-place switching without page reloads.

Both modes use the same `data-i18n` attribute syntax and JSON file format.

1. Place JSON translation files inside `assets/i18n/` - one per locale:

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Each JSON file is a flat key-value map:

```json "assets/i18n/en.json"
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

The default language text serves as the fallback. When a non-default locale is active, the engine replaces the text.

### Attribute Translation

To translate attributes like `placeholder`, `title`, or `aria-label`, use `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### HTML Content

For keys containing HTML markup, use `data-i18n-html` instead of `data-i18n`:

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA for speed.</p>
```

### Switching Locales

The i18n strings module exposes a global API at `window.DOCMD_I18N_STRINGS`:

```javascript
// Switch language
DOCMD_I18N_STRINGS.switchLocale("hi");

// Get active language
console.log(DOCMD_I18N_STRINGS.locale); 

// Get all languages
console.log(DOCMD_I18N_STRINGS.locales);
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

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Locale:", e.detail.locale);
  console.log("Strings:", e.detail.strings);
});
```

::: callout info "Automatic Detection" icon:info
The script detects the active locale from the URL path prefix. For the default locale, it checks `localStorage` for a previously saved preference. The `switchLocale()` function handles URL navigation automatically.
:::

### In-Place Mode

For single-page sites, set `inPlace: true` in your i18n config to swap strings without URL redirects:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

With `inPlace: true`, calling `switchLocale()` reloads the JSON for the new locale and replaces all `data-i18n` strings instantly. No navigation occurs.