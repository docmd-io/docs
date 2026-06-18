---
title: "Icons"
description: "So verwenden und anpassen Sie Lucide-Icons in Ihrer Dokumentation."
---

`docmd` bietet eingebaute Unterstützung für die [Lucide](external:https://lucide.dev/)-Icon-Bibliothek. Icons können in Ihrer Navigations-Sidebar, in Buttons und in benutzerdefinierten Komponenten verwendet werden, um visuelle Hinweise zu liefern und die Scanbarkeit zu verbessern.

## Navigations-Icons

Weisen Sie in Ihrer `docmd.config.json` jedem Navigationselement ein Icon zu. Verwenden Sie den kebab-case-Namen eines Icons, das Sie auf der Lucide-Website finden.

```json
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" }
  ]
}
```

## Icons in Containern

Sie können Icons auch in Buttons, Tags, Tabs und anderen Containern verwenden, indem Sie rohen HTML-Code einfügen oder den Standard-`icon:`-Präfix docmd-übergreifend nutzen.

```markdown
::: button "Download" /download icon:download
```

## CSS-Styling

Alle Icons werden als Inline-SVGs mit der Klasse `.lucide-icon` gerendert. Sie können deren Größe oder Strichstärke global in Ihrem `customCss` ändern:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Dünnere Icons für einen modernen Look */
  width: 1.2rem;
  height: 1.2rem;
}

/* Ein bestimmtes Icon ansprechen */
.icon-rocket {
  color: #ff5733;
}
```

## Icon-Referenz

Wir unterstützen die gesamte Lucide-Bibliothek. Sie können hier durch die tausenden verfügbaren Icons stöbern:

::: button "Lucide-Icons durchstöbern" external:https://lucide.dev/icons icon:globe
