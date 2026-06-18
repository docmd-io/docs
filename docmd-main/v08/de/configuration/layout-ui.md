---
title: "Layout- und UI-Zonen"
description: "Steuern Sie die Interface-Struktur durch die Verwaltung von Headern, Sidebars und funktionalen UI-Slots."
---

Eine Standardseite enthält sechs primäre Funktionszonen:

1.  **Menubar**: Eine vollbreite obere Navigationsleiste für globale Site-Links.
2.  **Header**: Eine persistente sekundäre Leiste. Enthält den Seitentitel und Utility-Schaltflächen.
3.  **Sidebar**: Der primäre Navigationsbaum, meist auf der linken Seite.
4.  **Content Area**: Der zentrale Markdown-Renderbereich. Enthält **Brotkrumen**.
5.  **Table of Contents (TOC)**: Rechtsseitige Überschriften-Navigation der aktuellen Seite.
6.  **Footer**: Unterer Bereich für Copyright, Branding und Site-weite Links.

## Globale Komponentenkonfiguration

Die Engine verwendet ein modulares Layout-System. Konfigurieren Sie die meisten UI-Zonen im `layout`-Abschnitt Ihrer `docmd.config.json`.

### Menubar
Die Menubar stellt eine hochrangige Navigationsebene bereit. Sie unterstützt Markentitel, reguläre Links und verschachtelte Dropdowns.

*   **Position**: Fest fixiert am `top` oder inline innerhalb des `header`.
*   **Dokumentation**: Schemas und Styling finden Sie unter [Menubar-Konfiguration](menubar.md).

### Der Seiten-Header
Der Header zeigt den Seitentitel, Brotkrumen und Utility-Menüs.

*   **Steuerung**: Aktivieren oder deaktivieren Sie den Header global über `layout.header`. Schalten Sie Brotkrumen über `layout.breadcrumbs` um.
*   **Überschreiben**: Verwenden Sie `hideTitle: true` in Ihrem [Seiten-Frontmatter](../content/frontmatter.md), um den Titelbereich lokal auszublenden.

### Copy-Widgets
Die Brotkrumen-Leiste enthält zwei Kopierschaltflächen. Eine kopiert das rohe Markdown der Seite, die andere einen strukturierten Kontextblock, der URL, Titel und Beschreibung enthält. Nützlich zum Einfügen in KI-Chatfenster oder Support-Tickets.

Konfigurieren Sie diese Schaltflächen unter `theme.copyWidgets` in Ihrer `docmd.config.json`:

```json
{
  "theme": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

*   `enabled`: Auf `false` setzen, um die Leiste vollständig zu deaktivieren.
*   `raw`: Auf `false` setzen, um die Schaltfläche „Markdown kopieren" auszublenden.
*   `context`: Auf `false` setzen, um die Schaltfläche „Kontext kopieren" auszublenden.

### Utility-Menüs (Optionsmenü)
Das `optionsMenu` gruppiert zentrale Utilities wie **Globale Suche**, **Theme-Umschalter** und **Sponsoring-Links**.

```json
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true, 
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info "Automatischer Fallback" icon:sparkles
Wenn die gewählte Position auf einen deaktivierten Container verweist, verschiebt die Engine das Optionsmenü auf `sidebar-top`. So bleiben die Utilities stets erreichbar.
:::

### Sidebar & Navigation
Die Sidebar ist der primäre Navigationsbaum. Definieren Sie ihre Struktur in Ihrer Konfiguration oder in externen JSON-Dateien.

*   **Verhalten**: Unterstützt Animationen, einklappbare Gruppen und automatische Pfad-Erhaltung.
*   **Dokumentation**: Siehe [Navigationskonfiguration](navigation.md).

### Footer
Die Engine bietet **minimal**- und **complete**-Layouts für Ihren Site-Footer.

```json
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "Documentation built with docmd.",
      "branding": true,
      "columns": [
        {
          "title": "Community",
          "links": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" }
          ]
        }
      ]
    }
  }
}
```

::: callout tip "Interface-Hierarchie" icon:lightbulb
Verwenden Sie die Menubar für globale Links und die Sidebar für die Dokumentationsstruktur. Diese Trennung hält die Navigation sowohl für menschliche Leser als auch für Crawler vorhersagbar.
:::
