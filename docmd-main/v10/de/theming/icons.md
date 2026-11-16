---
title: "Icons"
description: "Integrieren Sie Lucide-Icons und über 200.000+ Iconify-Vektor-Icons in Navigation, Buttons, Tags und Container in docmd."
---

`docmd` bietet ein flexibles Icon-System ohne Laufzeit-Overhead. Die [Lucide](external:https://lucide.dev/)-Icon-Bibliothek steht standardmäßig ohne zusätzliche Konfiguration zur Verfügung. Für umfassendere Design-Systeme bietet das offizielle Plugin [`@docmd/plugin-iconify`](../plugins/iconify.md) On-Demand-Zugriff auf über 200.000+ Vektor-Icons aus mehr als 100 Open-Source-Icon-Sets (Material Design, Carbon, Tabler, FontAwesome, Solar, Simple Icons und mehr).

Alle Icons werden während der Kompilierung direkt als saubere SVGs inline eingebettet, wodurch weder zusätzlicher JavaScript-Overhead noch Ladezeiten für Webfonts anfallen.

## Konfiguration in `docmd.config.json`

### Seitenleisten-Navigations-Icons

Weisen Sie Navigationsknoten in `docmd.config.json` integrierte Lucide-Icon-Namen zu. Verwenden Sie den Kebab-Case-Bezeichner des gewünschten Icons aus der Lucide-Sammlung:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" },
    { "title": "Deploy", "path": "/deployment", "icon": "rocket" }
  ]
}
```

### Iconify aktivieren (100+ Icon-Sets)

Um über 200.000+ Icons aus Material Design, Carbon, Tabler, Solar und weiteren Sets freizuschalten, aktivieren Sie das `@docmd/plugin-iconify`-Plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

Installieren Sie das Plugin über die CLI:

```bash
npx @docmd/core add iconify
```

::: callout tip title:"Automatische Installation" icon:sparkles
Wenn `"iconify": {}` in `docmd.config.json` deklariert ist, lädt `docmd` das `@docmd/plugin-iconify`-Paket beim nächsten Build automatisch herunter und installiert es, falls es noch nicht vorhanden ist.
:::

## Icons in UI-Containern

Übergeben Sie die Eigenschaft `icon:` an Container wie Buttons, Callouts, Karten, Tabs oder Tags.

### Integrierte Lucide-Syntax

Übergeben Sie beliebige Kebab-Case-Bezeichner von Lucide direkt:

```markdown
::: button "Release herunterladen" /download icon:download
::: tag "Verifiziert" icon:check-circle color:green
::: callout info title:"Tipp" icon:lightbulb
Lucide-Icons funktionieren sofort ohne zusätzliche Plugin-Konfiguration.
:::
```

### Erweiterte Iconify-Syntax

Wenn `@docmd/plugin-iconify` aktiviert ist, können Sie Icons aus jeder beliebigen Sammlung über `iconify:<sammlung>:<name>` oder `iconify-<sammlung>-<name>` referenzieren:

```markdown
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: callout icon:iconify:mdi:home title:"Dokumentationsportal"
Willkommen auf unserem einheitlichen Entwickler-Dokumentationsportal.
:::
::: card title:"Cloud-Architektur" icon:iconify:simple-icons:googlecloud
Containerisierte Dokumentation auf Google Cloud Run und Cloud Storage betreiben.
:::
::: tag "Sicher" icon:iconify-solar:shield-check-bold color:green
```

Vollständige Syntax-Optionen, unterstützte Sammlungen und Container-Beispiele finden Sie in der **[Iconify-Plugin-Referenz](../plugins/iconify.md)**.

## Benutzerdefiniertes CSS-Styling

* Integrierte Lucide-Icons werden mit den Klassen `.lucide-icon` und `.icon-<name>` gerendert.
* Iconify-Icons werden mit den Klassen `.iconify-icon` und `.icon-<sammlung>-<name>` gerendert.

Passen Sie Abmessungen, Ausrichtung oder Linienstärken in `customCss` an:

```css
/* Integrierte Lucide-Icons anpassen */
.lucide-icon {
  stroke-width: 1.5px;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}

/* Iconify-Icons anpassen */
.iconify-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Bestimmte Icon-Bezeichner ansprechen */
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

## Icon-Referenz & Verzeichnisse

* **[Lucide-Icon-Verzeichnis](external:https://lucide.dev/icons)**: Tausende integrierte Vektor-Icons durchsuchen.
* **[Iconify-Explorer](external:https://icon-sets.iconify.design/)**: Über 200.000 Vektor-Icons aus mehr als 100 Open-Source-Sets durchstöbern.
* **[Iconify-Plugin-Dokumentation](../plugins/iconify.md)**: Vollständige Konfiguration, Caching und Container-Referenz für `@docmd/plugin-iconify`.

::: button "Integrierte Lucide-Icons durchstöbern" external:https://lucide.dev/icons icon:globe
::: button "Über 200.000 Iconify-Sets erkunden" external:https://icon-sets.iconify.design/ icon:external-link
