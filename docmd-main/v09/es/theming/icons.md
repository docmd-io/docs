---
title: "Icons"
description: "Integrate Lucide icons into navigation sidebars, buttons, tags, and custom components in docmd."
---

`docmd` includes native support for the [Lucide](external:https://lucide.dev/) icon library. Assign icons to navigation items, buttons, tags, and tabs to enhance visual scannability across your site.

## Sidebar Navigation Icons

Assign Lucide icon names to navigation nodes in `docmd.config.json`. Use the kebab-case identifier of any icon from the Lucide collection:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" }
  ]
}
```

## Icons in UI Containers

Pass the `icon:` property to containers such as buttons, tags, tabs, or cards:

```markdown
::: button "Download Release" /download icon:download
::: tag "Verified" icon:check-circle color:green
:::
```

## Custom CSS Styling

All icons render as inline SVGs with the `.lucide-icon` CSS class. Adjust icon dimensions or stroke weights in `customCss`:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Thinner stroke weight for modern aesthetics */
  width: 1.2rem;
  height: 1.2rem;
}

/* Target specific icon identifiers */
.icon-rocket {
  color: #ff5733;
}
```

## Icon Explorer Reference

Browse thousands of vector icons available in the built-in Lucide library:

::: button "Browse Lucide Icon Directory" external:https://lucide.dev/icons icon:globe