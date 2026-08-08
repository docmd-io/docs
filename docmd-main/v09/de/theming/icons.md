---
title: "Icons"
description: "Integrieren Sie Lucide-Icons in Navigations-Seitenleisten, Buttons, Tags und benutzerdefinierte Komponenten in docmd."
---

`docmd` bietet native Unterstützung für die [Lucide](external:https://lucide.dev/)-Icon-Bibliothek. Weisen Sie Navigationselementen, Buttons, Tags und Tabs Icons zu, um die visuelle Erfassbarkeit auf Ihrer gesamten Website zu verbessern.

## Seitenleisten-Navigations-Icons

Weisen Sie Navigationsknoten in `docmd.config.json` Lucide-Icon-Namen zu. Verwenden Sie den Kebab-Case-Bezeichner jedes beliebigen Icons aus der Lucide-Sammlung:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" }
  ]
}
```

## Icons in UI-Containern

Übergeben Sie die Eigenschaft `icon:` an Container wie Buttons, Tags, Tabs oder Karten:

```markdown
::: button "Release herunterladen" /download icon:download
::: tag "Verifiziert" icon:check-circle color:green
:::
```

## Benutzerdefiniertes CSS-Styling

Alle Icons werden als Inline-SVGs mit der CSS-Klasse `.lucide-icon` gerendert. Passen Sie Icon-Abmessungen oder Strichstärken in `customCss` an:

```css
.lucide-icon {
  stroke-width: 1.5px; /* Dünnere Strichstärke für moderne Ästhetik */
  width: 1.2rem;
  height: 1.2rem;
}

/* Bestimmte Icon-Bezeichner ansprechen */
.icon-rocket {
  color: #ff5733;
}
```

## Icon-Explorer-Referenz

Durchsuchen Sie Tausende von Vektoricons, die in der integrierten Lucide-Bibliothek verfügbar sind:

::: button "Lucide-Icon-Verzeichnis durchstöbern" external:https://lucide.dev/icons icon:globe