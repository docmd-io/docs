---
title: "Layout- & UI-Zonen"
description: "Konfigurieren Sie Dokumentations-Layoutbereiche, Header-Widgets, Sidebar-Bäume und Footer-Parameter in docmd.config.json."
---

Eine Standard-`docmd`-Seite besteht aus sechs zentralen funktionalen UI-Zonen:

1. **Menubar**: Vollbreite obere Navigationsleiste für globale projektübergreifende Links.
2. **Header**: Persistenter sekundärer Header, der Seitentitel, Brotkrumen und das Optionsmenü anzeigt.
3. **Sidebar**: Primärer Navigationsbaum für die Inhaltsstruktur der Website.
4. **Inhaltsbereich (Content Area)**: Zentraler Markdown-Rendering-Container mit automatisierten Brotkrumen.
5. **Inhaltsverzeichnis (TOC)**: Rechtsseitige Überschriften-Navigation für aktive Artikel.
6. **Footer**: Unterer Bereich zur Anzeige von Copyright-Hinweisen, Branding-Attributierung und Footer-Link-Spalten.

## Komponenten-Layoutoptionen

Konfigurieren Sie Schnittstellenzonen im `layout`-Abschnitt Ihres `docmd.config.json`-Manifests.

### Die Menubar-Zone

Die Menubar bietet eine globale Website-Navigation und unterstützt Logos, Links und verschachtelte Dropdown-Menüs:

- **Platzierung**: Fixiert am absoluten Viewport-`top` oder innerhalb des `header` positioniert.
- **Dokumentation**: Siehe [Menubar-Konfiguration](./menubar.md) für vollständige Eigenschaften und Anpassungsoptionen.

### Die Seiten-Header-Zone

Der Header zeigt aktive Seitentitel, Brotkrumen und Optionsmenüs an:

- **Globaler Umschalter**: Aktivieren oder deaktivieren Sie den Header global über `layout.header.enabled`. Schalten Sie Brotkrumen über `layout.breadcrumbs` um.
- **Überschreibung pro Seite**: Fügen Sie `hideTitle: true` zum [Frontmatter](../content/frontmatter.md) eines Dokuments hinzu, um dessen Header-Titel lokal auszublenden.

### Kontextuelle Kopier-Widgets

Der Header-Bereich enthält kontextuelle Kopierwerkzeuge: Ein-Klick-Kopieren des rohen Markdown-Quellcodes und strukturierter KI-Kontext-Prompts (enthält Seiten-URL, Titel, Beschreibung und Fließtext):

```json "docmd.config.json"
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

- `enabled`: Auf `false` setzen, um die Kopier-Widget-Leiste vollständig zu deaktivieren.
- `raw`: Auf `false` setzen, um die Schaltfläche „Markdown kopieren" auszublenden.
- `context`: Auf `false` setzen, um die Schaltfläche „Kontext kopieren" auszublenden.

### Optionsmenü (Dienstprogramme)

Das `optionsMenu` gruppiert globale Dienstprogramme wie **Suche**, **Theme-Modus-Umschalter** und **Sponsoring-Links**:

```json "docmd.config.json"
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

::: callout info "Automatischer Neupositionierungs-Fallback" icon:sparkles
Wenn `optionsMenu` einem Container zugewiesen ist, der deaktiviert ist, verschiebt der Kompiler das Optionsmenü automatisch nach `sidebar-top`, um die Barrierefreiheit zu gewährleisten.
:::

### Sidebar & Navigation

Die Sidebar dient als primäre Navigationshierarchie:

- **Verhalten**: Unterstützt Desktop-Einklappen, sanfte Zustandsübergänge und verfolgechtes Routing.
- **Dokumentation**: Siehe [Navigationskonfiguration](./navigation.md).

### Footer-Bereich

`docmd` bietet `minimal`- und `complete`-Footer-Layouts:

```json "docmd.config.json"
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "Dokumentation erstellt mit docmd.",
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

::: callout tip "Richtlinien für die visuelle Hierarchie" icon:lightbulb
Reservieren Sie die obere Menubar für domänenübergreifende Navigation und verwenden Sie die Sidebar für eine tiefe Dokumentationsstruktur. Eine klare Trennung hält die Navigation sowohl für Benutzer als auch für Web-Crawler intuitiv.
:::