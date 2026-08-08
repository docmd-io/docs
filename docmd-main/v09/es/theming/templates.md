---
title: "Templates & Themes"
description: "Configure site layout templates and built-in CSS color schemes in docmd. Layer HTML structures, EJS partials, and visual palettes."
---

In `docmd`, **Templates** define the foundational HTML structure, layout architecture, EJS partials, and component slots of your documentation site. 

::: callout info "Structural Layouts vs. Colour Schemes" icon:info
* **Templates**: Control structural HTML architecture (header, sidebar, TOC, footer, banner, EJS partials).
* **Color Schemes**: Provide CSS visual themes (`default`, `sky`, `ruby`, `retro`) that layer directly on top of templates.
:::

A **template** is an npm package declaring `capabilities: ['template']` that ships custom `.ejs` layout files and asset bundles. The `@docmd/ui` resolver uses a fallback priority chain, ensuring missing slots fall back to default layouts seamlessly.

## Quickstart Guide

### 1. Install a Template Package

```bash
npx @docmd/core add summer
```

### 2. Enable Template in Config

Set `theme.name` in `docmd.config.json`. `docmd` automatically detects whether the name corresponds to a built-in CSS color scheme (`default`, `sky`, `ruby`, `retro`) or a structural template package (`summer`, etc.):

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Every page now renders using the `summer` structural layout. Unspecified slots fall back automatically to standard `@docmd/ui` partials.

## Built-in Colour Schemes (Default Template)

The default built-in template includes four curated CSS color palettes that can be activated by setting `theme.name`:

| Color Scheme | Best For | Visual Aesthetic |
| :--- | :--- | :--- |
| `default` | Low-profile documentation | Clean, lightweight, neutral palette |
| `sky` | Product Documentation | Modern, high-contrast, corporate standard |
| `ruby` | Brand Identity | Sophisticated, serif headers, vibrant accents |
| `retro` | Developer Tools | Monospace typography, green phosphor accents |

::: callout info "Layering Color Schemes on External Templates" icon:info
To apply a specific CSS color scheme (`sky`, `ruby`, `retro`) onto a custom structural template, set `theme.template` alongside `theme.name`:
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
This renders the **summer** structural layout styled with the **sky** color palette.
:::

### 3. Page-Level Template Overrides

Switch templates for individual pages using page frontmatter:

```markdown
---
title: "Release History"
template: "template-changelog"
---

# Release History
```

## Resolution Priority Chain

When rendering a page, `docmd` evaluates template paths in top-down order:

| Priority | Source | Syntax Example |
| :--- | :--- | :--- |
| **1** | `frontmatter.template` | `template: "template-changelog"` |
| **2** | `config.templates[glob]` | `"blog/*": "template-blog"` |
| **3** | `config.theme.template` *(Explicit)* | `"template": "summer"` |
| **4** | `config.theme.name` *(Auto-Promoted)* | `"name": "summer"` |
| **5** | Built-in Fallback | Default `.ejs` templates shipped with `@docmd/ui` |

The CSS theme names `default`, `sky`, `ruby`, and `retro` are reserved color schemes. Any other identifier in `theme.name` is treated as a template package name.

## Supported Layout Slots

Templates can override any of the 12 UI layout slots:

| Slot | Default Partial Path | Technical Purpose |
| :--- | :--- | :--- |
| `layout` | `templates/layout.ejs` | Main HTML document shell |
| `404` | `templates/404.ejs` | Not-Found error page |
| `toc` | `templates/toc.ejs` | Table of contents sidebar navigation |
| `navigation` | `templates/navigation.ejs` | Main sidebar navigation tree |
| `footer` | `templates/partials/footer.ejs` | Site footer partial |
| `menubar` | `templates/partials/menubar.ejs` | Top navigation menubar |
| `options-menu` | `templates/partials/options-menu.ejs` | Search, theme, and profile control menu |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Multi-project monorepo switcher |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Version selector dropdown |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Locale language selector |
| `banner` | `templates/partials/banner.ejs` | Site-wide announcement banner |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Cookie consent privacy dialog |

::: callout alert "No-Style Page Isolation" icon:alert-circle
Pages configured with `noStyle: true` bypass active templates completely and render using the default `templates/no-style.ejs` layout.
:::

## Asset Priority Order

When multiple templates and user stylesheets inject CSS or JS assets, the engine orders them by priority weight:

| Priority Weight | Layer | Behaviour |
| :--- | :--- | :--- |
| `0` | Base Core (`docmd-main.css`, `docmd-main.js`) | Foundational styles |
| `5` | Theme Palette (`docmd-theme-sky.css`, etc.) | Visual color scheme |
| `10` | Template Structural Styles | Structural layout rules |
| `15` | User `customCss` / `customJs` | **Always takes priority** over templates |
| `20` | Plugin Assets | Lightbox, search, and analytics assets |
| `25+` | Specialized Template Overrides | Custom template extensions |

To override a template's default CSS rules, add custom declarations to `theme.customCss` (Priority `15`).

## Template Localisation

Templates receive the active locale string during rendering. Localised text strings are resolved via the `t(key)` helper function using existing `assets/i18n/<locale>.json` translation maps.

## Related Resources

- [Custom Styles & Scripts](custom-css-js.md)—Layer custom CSS over active templates.
- [Designing Custom Landing Pages](landing-pages.md)—Customize home page layouts using Markdown containers.
- [Configuration Reference](../configuration/overview.md)—Overview of global site options.