---
title: "No-Style Pages"
description: "Create custom landing pages and unique layouts by bypassing default documentation chrome in docmd."
---

`docmd` allows you to bypass the standard documentation layout chrome (Sidebar, Header, Footer) on a per-page basis. This is ideal for creating high-impact landing pages or custom dashboards while retaining access to the engine's container parser.

## Enabling No-Style Mode

To disable global UI components, set `noStyle: true` in your page frontmatter:

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true      # Retain SEO and OpenGraph metadata tags
  favicon: true   # Retain site favicon
  css: true       # Inject docmd-main.css for typography and grid systems
---

<!-- Custom HTML or specialized Markdown containers -->
<div class="hero">
  <h1>Next-Gen Documentation Engine</h1>
  <p>Zero-config. Isomorphic execution. AI-optimised.</p>
</div>

::: callout info "Infinite Nesting Support" icon:info
Even with `noStyle: true`, all standard docmd containers (such as `::: card`, `::: tabs`, and `::: hero`) are fully supported and can be composed freely.
:::
```

## Component Opt-In Controls

When `noStyle: true` is active, you start with a blank canvas. Selectively re-enable core system components as required:

| Component | Technical Description |
| :--- | :--- |
| `meta` | Injects `<title>`, SEO meta tags, and structured OpenGraph metadata. |
| `favicon` | Injects the project-wide favicon link. |
| `css` | Injects `docmd-main.css`. Recommended for core grid utilities and typography rules. |
| `menubar` | Injects the top navigation menubar. |
| `theme` | Injects active theme CSS variables and appearance overrides. |
| `scripts` | Injects interactive container client scripts (requires `mainScripts: true`). |
| `spa` | Enables single-page application router navigation (requires `scripts: true`). |

## Composable Landing Pages

The primary advantage of `noStyle` is using `docmd` containers as building blocks on a blank canvas. Rather than writing verbose raw HTML, you can build landing page layouts using pure Markdown:

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Retain site navigation bar
  scripts: true    # Enable interactive container scripts
  mainScripts: true
---

::: hero layout:split glow:true
# Build Documentation that Wows.
The zero-config documentation engine for modern engineering teams.

::: button "Get Started" ../getting-started/quick-start.md color:blue
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd color:gray

== side
::: embed "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
:::
:::

::: grids
  ::: card "Zero Configuration"
  Author content in Markdown without complex frontend build scripts.
  :::
  ::: card "AI Optimised"
  Structure-aware parsing for the LLM ecosystem.
  :::
  ::: card "Isomorphic Performance"
  Static compilation with fast SPA navigation.
  :::
:::
```

::: callout tip "AI-Generated Layouts" icon:sparkles
Because `noStyle` pages accept HTML alongside `docmd` containers, they are ideally suited for **AI-driven UI prototyping**. Prompt an AI agent: *"Design a modern landing section using utility classes and docmd button containers."*
:::

## String Replacement (i18n for noStyle Pages)

When your site has [i18n configured](../configuration/localisation/index.md), standard documentation pages receive server-side translations automatically. However, `noStyle` pages often use custom HTML elements. `docmd` provides **string replacement** to translate HTML via `data-i18n` attributes and JSON translation maps.

::: callout info "Scope of String Replacement" icon:info
String replacement matches elements with `data-i18n` attributes and swaps their text content. Standard Markdown content compiles to plain `<p>`, `<h2>`, `<li>` tags without these attributes. For standard Markdown content, use [Directory Mode](../configuration/localisation/translated-content.md).
:::

### Operational Modes

String replacement supports two execution models:

- **Server-side (recommended)**: With `stringMode: true` in your i18n configuration, `docmd` resolves `data-i18n` attributes **at build time**. It generates fully translated static HTML in `/{locale}/` directories for search engines.
- **Client-side**: The `docmd-i18n-strings.js` script loads translation maps at runtime via XHR. This enables instant in-place locale switching without full page reloads.

Both modes share identical `data-i18n` attribute notation and JSON translation schemas.

1. Store JSON translation maps inside `assets/i18n/` (one file per locale):

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Format each JSON file as a flat key-value map:

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

3. Attach `data-i18n` attributes to your HTML elements:

```html
<h1 data-i18n="hero.title">Markdown → Production Docs</h1>
<p data-i18n="hero.subtitle">The zero-config documentation engine.</p>
<a data-i18n="nav.docs" href="/docs">Documentation</a>
```

### Attribute Translation

To translate attributes such as `placeholder`, `title`, or `aria-label`, use `data-i18n-{attr}` notation:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Search...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Open menu">☰</button>
<a data-i18n-title="nav.tooltip" title="Go to docs">Docs</a>
```

### Raw HTML Content Translation

For keys containing HTML markup, use `data-i18n-html` instead of `data-i18n`:

```html
<p data-i18n-html="hero.desc">Static HTML for SEO. <br>SPA router for speed.</p>
```

### Global i18n API

The i18n strings module exposes a global API at `window.DOCMD_I18N_STRINGS`:

```javascript
// Switch active locale
DOCMD_I18N_STRINGS.switchLocale("de");

// Access active locale string
console.log(DOCMD_I18N_STRINGS.locale); 

// Retrieve supported locale array
console.log(DOCMD_I18N_STRINGS.locales);
```

Build a custom locale selector using this API:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="de">Deutsch</option>
  <option value="zh">中文</option>
</select>
```

### Event Lifecycle

Listen for the `docmd:i18n-applied` event to run custom logic after string substitution completes:

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Locale:", e.detail.locale);
  console.log("Strings:", e.detail.strings);
});
```

::: callout info "Automatic Locale Detection" icon:info
The client script detects active locales from the URL path prefix. For the default locale, it inspects `localStorage` for saved preferences. The `switchLocale()` function handles URL navigation automatically.
:::

### In-Place Mode Configuration

For single-page applications or landing portals, set `inPlace: true` in your i18n configuration to swap string values without URL navigation:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "de", "label": "Deutsch" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

With `inPlace: true`, calling `switchLocale()` fetches the translation map for the requested locale and replaces all `data-i18n` values in place without triggering page reloads.