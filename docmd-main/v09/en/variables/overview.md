---
title: Variables & Dynamic Runtime Overview
description: Learn how the docmd Variables & Personalisation Engine enables dynamic, maintainable, and interactive documentation across build-time and client runtime.
---

# Variables & Dynamic Runtime

docmd features a **Variables and Personalisation Engine** that unifies static build-time interpolation with client-side reactive personalisation.

Instead of hardcoding company names, API URLs, release years, or versions across dozens of markdown files, you can reference dynamic variables using clean template expressions.

```markdown
Welcome to the documentation for **{{ site.title }}** v{{ docmd.version }}!
Current copyright: © {{ docmd.buildYear }}.
```

## Template Syntax

The Variables Engine uses curly-brace syntax:

```markdown
{{ variableName }}
```

### Fallback Defaults

If a variable might not always be defined (such as in local preview environments or optional configurations), provide a fallback default using the `||` operator:

```markdown
Connect to our server at `{{ server.endpoint || "https://api.example.com" }}`.
Welcome back, {{ user.name || 'Guest' }}!
Built for version {{ targetVersion || 2.0 }}.
```

The fallback can be:
* Single-quoted string: `'example'`
* Double-quoted string: `"example"`
* Number: `42` or `2.0`
* Identifier: `default`

### Whitespace Tolerant

Expressions tolerate spaces around variable names and fallback operators:

```markdown
{{   myVar   }}
{{ env.PORT || "8080" }}
```

## Variable Lifecycles: Build-time vs. Runtime

docmd cleanly separates the variable lifecycle into two distinct stages:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BUILD-TIME RESOLUTION                           │
│  - Built-in dynamic variables (docmd.version, docmd.buildYear, git)    │
│  - System environment variables (env.NAME, DOCMD_VAR_*)               │
│  - docmd.config.json variables (static strings, config fields)         │
│  - Rendered directly into final HTML during docmd build                │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT-SIDE RUNTIME                             │
│  - Powered by docmd-runtime.js (window.docmd)                         │
│  - Rehydrates dynamic markers (<span data-docmd-var="...">)            │
│  - Interactive personalisation: live API keys, username sessions       │
│  - Cross-frame postMessage & event dispatching                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Static Build-Time Variables

Variables resolved during `docmd build` are compiled directly into static HTML. There is zero client-side JavaScript overhead or layout shift for these values.

### Reactive Dynamic Variables

Variables marked as dynamic or containing user session attributes (such as `user.name` or `user.apiKey`) are wrapped in non-intrusive DOM markers:

```html
<span data-docmd-var="user.name" class="docmd-var">Guest</span>
```

At runtime, `docmd-runtime.js` automatically populates and synchronises these values across the page, code snippets, and SPA navigation transitions without reloading.

## Architecture: Engine vs. UI Separation

To guarantee maximum speed and stability, docmd maintains a strict boundary between UI presentation and the headless dynamic runtime:

* **`docmd-runtime.js`**: Headless dynamic engine loaded across all templates (`default`, `summer`, etc.). It manages variable registries, subscriptions, client storage, and cross-window events. It never interferes with DOM animations or styling.
* **`docmd-main.js`**: The UI presentation script responsible for theme switches, mobile menus, SPA navigation, and DOM interactions. Upon each SPA page transition, it triggers `window.docmd.sync()` to ensure dynamic variables remain fully hydrated.

## Next Steps

Explore the complete guide across all variable topics:

* [Built-in Variables](./built-in-variables.md) — Built-in system variables for build years, dates, versions, and Git metadata.
* [Config & Custom Variables](./config-variables.md) — Declaring variables in `docmd.config.json` and using variables inside footer, banners, and docs.
* [Environment Variables](./environment-variables.md) — CI/CD environment variables and `DOCMD_VAR_*` promotion.
* [Client Runtime & Personalisation](./runtime-personalisation.md) — Client-side runtime SDK (`window.docmd`), reactive sessions, and interactive code blocks.