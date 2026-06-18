---
title: "Templates"
description: "Install alternative site layouts from npm packages. Each template layers a complete HTML/CSS/JS bundle on top of the default theme."
---

# Templates

::: callout info
**New in 0.8.7.** Templates let you ship a complete alternative layout (HTML structure, partials, CSS, JS) as a standalone plugin. They layer on top of the existing `theme` + `customCss` system — they do not replace it.
:::

A **template** is an npm package that declares `capabilities: ['template']` and ships a set of `.ejs` partial overrides plus its own CSS and JS bundle. The resolver in `@docmd/ui` walks a fixed priority chain to find the right partial for each slot, and falls back to the default if anything goes wrong. **The build never fails because of a template issue.**

## Quick start

### 1. Install a template

```bash
# First official template ships with 0.8.7 — install via the docmd add pipeline:
npx @docmd/core add summer
```

### 2. Enable it in your config

Set **one key** — `theme.name`. docmd auto-detects whether the name refers to a reserved CSS theme (`default`, `sky`, `ruby`, `retro`) or to a template package (`summer`, …).

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Every page now uses the `summer` template's `layout.ejs`. Slots you haven't provided (sidebar, footer, etc.) automatically use the default `@docmd/ui` versions.

::: callout info
**Need to layer a template on top of a CSS theme?** Use the explicit `theme.template` key. It always wins over `theme.name`:
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
↑ the **summer** structure with the **sky** colour palette.
:::

### 3. Override per page

A single frontmatter key switches the template for that page only:

```markdown
---
title: "Changelog"
template: "template-changelog"
---

# Changelog
…
```

## Resolution chain

When a page is rendered, the resolver walks this chain top-down and uses the first match:

| # | Source | Example |
|---|---|---|
| 1 | `frontmatter.template` | `template: "template-changelog"` |
| 2 | `config.templates[glob]` | `"blog/*": "template-blog"` |
| 3 | `config.theme.template` *(explicit)* | `"template": "summer"` |
| 4 | `config.theme.name` *(auto-promoted to template if not a known CSS theme)* | `"name": "summer"` |
| 5 | Built-in default | The `.ejs` files shipped with `@docmd/ui` |

The CSS themes `default`, `sky`, `ruby`, and `retro` are reserved — if `theme.name` matches one of those, it stays a CSS theme. Any other value is treated as a template name and the corresponding `@docmd/template-*` package is auto-loaded.

If the resolved file is missing on disk, the resolver logs a single TUI warning and falls back to the default.

## Supported template slots

A template may override any of these 12 slots. Any slot you don't override falls back to the default:

| Slot | Default file | Purpose |
|---|---|---|
| `layout` | `templates/layout.ejs` | The full HTML page |
| `404` | `templates/404.ejs` | Not-found page |
| `toc` | `templates/toc.ejs` | Table of contents sidebar |
| `navigation` | `templates/navigation.ejs` | The sidebar nav tree |
| `footer` | `templates/partials/footer.ejs` | Page footer |
| `menubar` | `templates/partials/menubar.ejs` | Top navigation bar |
| `options-menu` | `templates/partials/options-menu.ejs` | Search/theme/profile menu |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Multi-project switcher |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Version selector |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Locale selector |
| `banner` | `templates/partials/banner.ejs` | Site-wide announcement banner |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie consent dialog |

::: callout alert
`no-style` pages do not have a template-specific copy. They always use the default `templates/no-style.ejs` regardless of the active template.
:::

## Asset priority

When multiple templates and your `customCss` ship CSS or JS, they load in this order (lower loads first, higher wins cascade ties):

| Priority | Layer |
|---|---|
| 0 | Base (`docmd-main.css`, `docmd-main.js`) |
| 5 | Theme colour overlay (e.g. `docmd-theme-sky.css`) |
| 10 | **Template structure** (default for templates) |
| 15 | User `customCss` / `customJs` — always wins |
| 20 | Plugin CSS/JS |
| 25+ | Higher-priority templates (e.g. Summer uses 25) |

If you want to override a template's styles, put them in your project's `customCss` at priority 15. Avoid `!important` in template CSS so users can override without forking.

## Template localisation

The active locale is passed to your template as a normal local. Translations are looked up via the `t(key)` helper as in the default templates — your existing `assets/i18n/<locale>.json` files continue to work.

## What's Next

- [Building Templates](/development/building-templates) — write your own template package.
- [Theming](/theming/custom-css-js) — layer `customCss` over any template.
- [Customising Landing Pages](/theming/landing-pages) — make a template's home page your own.