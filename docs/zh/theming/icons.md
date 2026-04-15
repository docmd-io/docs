---
title: "图标"
description: "How to use and customise Lucide icons in your documentation."
---

`docmd` comes with built-in support for the [Lucide](https://lucide.dev/) icon library. Icons can be used in your navigation sidebar, buttons, and custom components to provide visual cues and improve scannability.

## Navigation Icons

Assign an icon to any navigation item in your `docmd.config.js`. Use the kebab-case name of any icon found on the Lucide website.

```javascript
navigation: [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'Setup', path: '/setup', icon: 'settings' }
]
```

## Button Icons

You can also use icons inside your button labels by including the raw HTML or using standard Lucide naming if supported by your theme.

```markdown
::: button "Download" /download icon:download
```

## CSS Styling

All icons are rendered as inline SVGs with the class `.lucide-icon`. You can globally change their size or stroke weight in your `customCss`:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Thinner icons for a modern look */
  width: 1.2rem;
  height: 1.2rem;
}

/* Target a specific icon */
.icon-rocket {
  color: #ff5733;
}
```

## Icon Reference
We support the entire Lucide library. You can browse the thousands of available icons here:
::: button "Browse Lucide Icons" external:https://lucide.dev/icons