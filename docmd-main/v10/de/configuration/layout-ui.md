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

### Titelformat & Trennzeichen

Konfigurieren Sie, wie Dokumenttitel und Site-Titel in Ihren Dokumentationsvorlagen zusammengesetzt werden:

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  }
}
```

- `titleSeparator`: Das Trennzeichen zwischen Seitentitel und Site-Titel im Browser-Tab `<title>` und in Social-Media-Vorschauen. Der Standardwert ist ein mittelgroßer Bindestrich (`"-"`). Der Compiler fügt automatisch einzelne Leerzeichen um nicht-leere Trennzeichen ein (`" - "`), sodass einfache Zeichen wie `"-"` oder `"|"` genügen.
- `titleAppend`: Bestimmt, ob der Site-Titel an Seitentitel angehängt wird (standardmäßig `true`). Auf `false` setzen, um nur den Seitentitel auszugeben. Kann im Frontmatter pro Seite überschrieben werden (`titleAppend: false`).

### Kontextuelle Kopier- & Druck-Widgets

Direkt über dem Artikelinhalt bietet `docmd` kontextbezogene Lese-Utilities: Ein-Klick-Kopieren des rohen Markdown-Quellcodes, strukturierte KI-Kontext-Prompts (enthält Seiten-URL, Titel, Beschreibung und Fließtext) sowie das Drucken von Seiten:

```json "docmd.config.json"
{
  "layout": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    },
    "print": false
  }
}
```

- `copyWidgets.enabled`: Auf `false` setzen, um die Kopier-Widget-Leiste vollständig zu deaktivieren.
- `copyWidgets.raw`: Auf `false` setzen, um die Schaltfläche „Markdown kopieren" auszublenden.
- `copyWidgets.context`: Auf `false` setzen, um die Schaltfläche „Kontext kopieren" auszublenden.
- `print`: Standardmäßig deaktiviert (`false`). Wenn aktiviert (`true`), wird eine Drucken-Schaltfläche in der Aktionszeile neben den Kopier-Widgets (und in der Fokusmodus-Symbolleiste) gerendert. Die Druckschaltfläche befindet sich niemals im Header oder der Menüleiste.

### Fokusmodus (Ablenkungsfreies Lesen)

Der Fokusmodus blendet Seitenleisten, Header, Inhaltsverzeichnisse und schwebende Elemente aus und bietet eine saubere Leseoberfläche für lange technische Dokumentationen:

```json "docmd.config.json"
{
  "layout": {
    "focusMode": false
  }
}
```

- **Standardstatus**: Standardmäßig deaktiviert (`false`).
- **Wenn aktiviert**: Zeigt einen Fokus-Umschalter im Optionsmenü an und aktiviert das Tastenkürzel <kbd>Alt</kbd>+<kbd>F</kbd>.
- **Bedienelemente im Fokusmodus**: Nur drei essenzielle Steuerelemente erscheinen oben rechts: Drucken (wenn `layout.print` aktiviert ist), Hell/Dunkel-Umschalter und Fokusmodus verlassen (<kbd>Esc</kbd> oder <kbd>Alt</kbd>+<kbd>F</kbd>).

::: callout info title:"Rückwärtskompatibilität" icon:sparkles
Für bestehende Projekte löst docmd frühere Konfigurationen, wie `print`, `focusMode`, `customJs` auf Root-Ebene und `theme.copyWidgets`, automatisch mit vollständiger Rückwärtskompatibilität auf.
:::

### Optionsmenü (Dienstprogramme)

Das `optionsMenu` gruppiert globale Dienstprogramme wie **Suche**, **Theme-Modus-Umschalter**, **Fokusmodus** und **Sponsoring-Links**:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true,
        "focusMode": true,
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info title:"Automatische Verlagerung als Fallback" icon:sparkles
Wenn `optionsMenu` einem Container zugewiesen ist, der deaktiviert ist, verschiebt der Compiler das Optionsmenü automatisch nach `sidebar-top`, um die Barrierefreiheit zu gewährleisten.
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