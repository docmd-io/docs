---
title: "Layout & UI-Zonen"
description: "Steuern Sie die Schnittstellenstruktur durch die Verwaltung von Headern, Seitenleisten und funktionalen UI-Slots."
---

Eine Standard-`docmd`-Seite ist in sechs primäre Funktionsbereiche unterteilt:

1.  **Menüleiste (Menubar)**: Eine horizontale Navigationsleiste am oberen Rand für globale Website-Links.
2.  **Header**: Die permanente sekundäre Leiste, die den Seitentitel und Werkzeug-Schaltflächen enthält.
3.  **Seitenleiste (Sidebar)**: Der primäre Navigationsbaum (normalerweise auf der linken Seite).
4.  **Inhaltsbereich (Content Area)**: Der zentrale Bereich für die Markdown-Anzeige, einschließlich **Breadcrumbs**.
5.  **Inhaltsverzeichnis (TOC)**: Navigationsmenü auf der rechten Seite für die Überschriften der aktuellen Seite.
6.  **Fußzeile (Footer)**: Bereich am unteren Rand für Urheberrecht, Branding und website-weite Links.

## Globale Komponenten

Die meisten UI-Zonen werden im Bereich `layout` Ihrer `docmd.config.js` konfiguriert.

### Menüleiste

Die Menüleiste bietet eine übergeordnete Navigationsebene über Ihrer Dokumentation.

```javascript
layout: {
  menubar: {
    enabled: true,
    position: 'top', // 'top' (fixiert) oder 'header' (im Inhaltsfluss)
    left: [
      { type: 'title', text: 'Marke', url: '/', icon: 'home' },
      { text: 'Funktionen', url: '/features' }
    ],
    right: [
      { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', icon: 'github' }
    ]
  }
}
```

### Der Seiten-Header

Der Header ist standardmäßig aktiviert. Sie können ihn website-weit deaktivieren oder bestimmte Elemente über das Frontmatter auf Seitenebene ausblenden.

```javascript
// docmd.config.js
layout: {
  header: {
    enabled: true // Auf false setzen, um den gesamten oberen Header website-weit auszublenden
  },
  breadcrumbs: true // Auf false setzen, um den Breadcrumb-Pfad website-weit auszublenden
}
```

**Überschreibung auf Seitenebene (Frontmatter):**
```yaml
---
title: "Spezialseite"
hideTitle: true # Blendet den Titel im fixierten Header für diese spezifische Seite aus
---
```

## Werkzeugmenüs (Optionsmenü)

Das `optionsMenu` fasst Kernfunktionen wie **Suche**, **Theme-Umschalter** und **Sponsoring** zusammen.

```javascript
layout: {
  optionsMenu: {
    position: 'header', // Optionen: 'header', 'sidebar-top', 'sidebar-bottom', 'menubar'
    components: {
      search: true,      // Volltextsuche aktivieren
      themeSwitch: true, // Hell-/Dunkelmodus-Umschalter aktivieren
      sponsor: 'https://github.com/sponsors/dein-profil'
    }
  }
}
```

::: callout info "Container-Fallback"
Wenn die gewählte Position auf einen Container zielt, der deaktiviert ist, rendert `docmd` das Optionsmenü automatisch im Slot `sidebar-top`, um sicherzustellen, dass die Kernfunktionen zugänglich bleiben.
:::

## Seitenleisten- & Fußzeilen-Steuerung

### Verhalten der Seitenleiste
```javascript
layout: {
  sidebar: {
    enabled: true,
    collapsible: true,       // Ermöglicht die Ein-/Ausklapp-Animation
    defaultCollapsed: false,  // Legt den initialen Status der Seitenleiste fest
    position: 'left'
  }
}
```

### Footer-Branding
`docmd` bietet sowohl **minimale** als auch **vollständige** Layouts für den Footer Ihrer Website.

```javascript
layout: {
  footer: {
    style: 'complete',
    description: 'Dokumentation erstellt mit docmd.',
    branding: true, // Steuert das "Build with docmd"-Badge
    columns: [
      {
        title: 'Community',
        links: [{ text: 'GitHub', url: '...' }]
      }
    ]
  }
}
```

::: callout tip "KI-optimierte Schnittstelle"
Stellen Sie beim Entwerfen benutzerdefinierter Layouts sicher, dass die **Suche** in Ihrem `optionsMenu` prominent platziert ist. KI-Agenten nutzen die Suche häufig als primären Anker, wenn sie Ihre Dokumentation erkunden, um spezifischen technischen Kontext zu lokalisieren.
:::
