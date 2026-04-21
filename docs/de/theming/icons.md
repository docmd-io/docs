---
title: "Icons"
description: "So verwenden und passen Sie Lucide-Icons in Ihrer Dokumentation an."
---

`docmd` bietet integrierte Unterstützung für die [Lucide](https://lucide.dev/)-Icon-Bibliothek. Icons können in Ihrer Navigations-Seitenleiste, Schaltflächen und benutzerdefinierten Komponenten verwendet werden, um visuelle Hinweise zu geben und die Scanbarkeit zu verbessern.

## Navigations-Icons

Weisen Sie jedem Navigationselement in Ihrer `docmd.config.js` ein Icon zu. Verwenden Sie den Kebab-Case-Namen eines beliebigen Icons, das Sie auf der Lucide-Website finden.

```javascript
navigation: [
  { title: 'Start', path: '/', icon: 'home' },
  { title: 'Setup', path: '/setup', icon: 'settings' }
]
```

## Button-Icons

Sie können auch Icons innerhalb Ihrer Button-Beschriftungen verwenden, indem Sie das Icon-Flag nutzen.

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

/* Ein spezifisches Icon ansprechen */
.lucide-rocket {
  color: #ff5733;
}
```

## Icon-Referenz
Wir unterstützen die gesamte Lucide-Bibliothek. Sie können die Tausenden von verfügbaren Icons hier durchsuchen:
::: button "Lucide Icons durchsuchen" external:https://lucide.dev/icons