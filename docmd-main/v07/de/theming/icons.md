---
title: "Icons"
description: "So verwenden und passen Sie Lucide-Icons in Ihrer Dokumentation an."
---

`docmd` verfügt über integrierte Unterstützung für die [Lucide](external:https://lucide.dev/)-Icon-Bibliothek. Icons können in Ihrer Navigations-Seitenleiste, in Buttons und in benutzerdefinierten Komponenten verwendet werden, um visuelle Hinweise zu geben und die Scannbarkeit zu verbessern.

## Navigations-Icons

Weisen Sie jedem Navigationselement in Ihrer `docmd.config.js` ein Icon zu. Verwenden Sie den Kebab-Case-Namen eines beliebigen Icons, das Sie auf der Lucide-Website finden.

```javascript
navigation: [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'Setup', path: '/setup', icon: 'settings' }
]
```

## Icons in Containern

Sie können Icons auch innerhalb Ihrer Buttons, Tags, Tabs und anderen Containern verwenden, indem Sie den rohen HTML-Code einbinden oder das standardmäßige `icon:`-Präfix in docmd nutzen.

```markdown
::: button "Download" /download icon:download
```

## CSS-Styling

Alle Icons werden als Inline-SVGs mit der Klasse `.lucide-icon` gerendert. Sie können deren Größe oder Linienstärke global in Ihrem `customCss` ändern:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Dünnere Icons für einen modernen Look */
  width: 1.2rem;
  height: 1.2rem;
}

/* Gezielte Anpassung eines Icons */
.icon-rocket {
  color: #ff5733;
}
```

## Icon-Referenz

Wir unterstützen die gesamte Lucide-Bibliothek. Sie können die Tausenden von verfügbaren Icons hier durchsuchen:

::: button "Lucide-Icons durchsuchen" external:https://lucide.dev/icons icon:globe