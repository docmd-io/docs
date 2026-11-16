---
title: "Icons"
description: "Integrate Lucide icons and over 200,000+ Iconify vector icons into navigation, buttons, tags, and containers in docmd."
---

`docmd` provides a flexible, zero-overhead icon system. The [Lucide](external:https://lucide.dev/) icon library is available natively out of the box with zero setup. For broader design systems, the official [`@docmd/plugin-iconify`](../plugins/iconify.md) plugin provides on-demand access to over 200,000+ vector icons across 100+ open-source icon sets (Material Design, Carbon, Tabler, FontAwesome, Solar, Simple Icons, and more).

All icons are inlined directly as clean SVGs during compilation, incurring zero runtime client JavaScript or font bundle bloat.

## Configuration in `docmd.config.json`

### Sidebar Navigation Icons

Assign built-in Lucide icon names to navigation nodes in `docmd.config.json`. Use the kebab-case identifier of any icon from the Lucide collection:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" },
    { "title": "Deploy", "path": "/deployment", "icon": "rocket" }
  ]
}
```

### Enabling Iconify (100+ Icon Sets)

To unlock 200,000+ icons from Material Design, Carbon, Tabler, Solar, and more, enable the `@docmd/plugin-iconify` plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

Install the plugin package via the CLI:

```bash
npx @docmd/core add iconify
```

::: callout tip title:"Auto-Installation" icon:sparkles
When `"iconify": {}` is declared in `docmd.config.json`, `docmd` will automatically download and install `@docmd/plugin-iconify` during your next build run if it is not already installed.
:::

## Icons in UI Containers

Pass the `icon:` property to containers such as buttons, callouts, cards, tabs, or tags.

### Built-in Lucide Syntax

Pass any kebab-case Lucide identifier directly:

```markdown
::: button "Download Release" /download icon:download
::: tag "Verified" icon:check-circle color:green
::: callout info title:"Pro Tip" icon:lightbulb
Lucide icons render out of the box with zero plugin configuration required.
:::
```

### Extended Iconify Syntax

When `@docmd/plugin-iconify` is enabled, reference icons from any collection using `iconify:<collection>:<name>` or `iconify-<collection>-<name>`:

```markdown
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: callout icon:iconify:mdi:home title:"Home Portal"
Welcome to our unified developer documentation portal.
:::
::: card title:"Cloud Architecture" icon:iconify:simple-icons:googlecloud
Run containerised documentation on Google Cloud Run and Cloud Storage.
:::
::: tag "Secure" icon:iconify-solar:shield-check-bold color:green
```

For complete syntax options, supported collections, and container examples, refer to the **[Iconify Plugin Reference](../plugins/iconify.md)**.

## Custom CSS Styling

* Built-in Lucide icons render with the `.lucide-icon` and `.icon-<name>` classes.
* Iconify icons render with the `.iconify-icon` and `.icon-<collection>-<name>` classes.

Adjust icon sizing, alignment, or stroke weights in `customCss`:

```css
/* Style built-in Lucide icons */
.lucide-icon {
  stroke-width: 1.5px;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}

/* Style Iconify icons */
.iconify-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Target specific icon identifiers */
.icon-rocket {
  color: #ff5733;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}

.icon-simple-icons-googlecloud {
  color: #4285f4;
}
```

## Icon Reference & Directories

* **[Lucide Icon Directory](external:https://lucide.dev/icons)**: Browse thousands of built-in vector icons.
* **[Iconify Icon Sets Explorer](external:https://icon-sets.iconify.design/)**: Search 200,000+ vector icons across 100+ open-source collections.
* **[Iconify Plugin Documentation](../plugins/iconify.md)**: Full configuration, caching, and container reference for `@docmd/plugin-iconify`.

::: button "Browse Built-in Lucide Icons" external:https://lucide.dev/icons icon:globe
::: button "Explore 200,000+ Iconify Sets" external:https://icon-sets.iconify.design/ icon:external-link
