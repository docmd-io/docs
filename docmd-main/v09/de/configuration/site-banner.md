---
title: "Site-Banner"
description: "Konfigurieren Sie schließbare website-weite Ankündigungsbanner mit Inline-Markdown, Call-to-Action-Schaltflächen und Sitzungspersistenz in docmd."
---

`docmd` bietet einen integrierten, schließbaren Site-Banner, der sich oben im Layout befindet. Verwenden Sie ihn, um Release-Ankündigungen, Wartungsfenster oder werbliche Calls-to-Action auf allen Dokumentationsseiten anzuzeigen.

## Schnelleinrichtung

Aktivieren Sie den Ankündigungsbanner in Ihrem `docmd.config.json`-Manifest:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.0 ist da!** — lesen Sie die vollständige Release-Ankündigung.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Ankündigung lesen", "url": "/blog/v0-9" }
    }
  }
}
```

Der Banner wird oben auf jeder Seite gerendert. Wenn er von einem Leser geschlossen wird, wird der geschlossene Zustand für die Dauer seiner Browsersitzung im `sessionStorage` gespeichert.

## Konfigurationsreferenz

| Feld | Standard | Beschreibung |
| :--- | :--- | :--- |
| `content` | `""` | Inline-Markdown-Zeichenfolge (`**fett**`, `` `code` ``). Schließt sich gegenseitig mit `html` aus. |
| `html` | `""` | Rohe HTML-Zeichenfolge. Hat Vorrang vor `content` für benutzerdefinierte inhaltsreiche Layouts. |
| `type` | `"info"` | Visueller Hintergrund-Farbton (`"info"`, `"success"`, `"warning"`, `"danger"`). |
| `dismissible` | `true` | Wenn `true`, wird eine Schließen-Schaltfläche (X) gerendert. Wenn `false`, bleibt der Banner dauerhaft sichtbar. |
| `link` | `null` | Optionales `{ text, url }`-Objekt, das einen Call-To-Action (CTA)-Link rendert. |
| `icon` | `null` | Name eines beliebigen [Lucide-Icons](external:https://lucide.dev/icons), das links gerendert wird (z. B. `megaphone`, `bell`). |

### Konfigurationsbeispiele

::: tabs
== tab "Standard-Ankündigung" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "Geplante Systemwartung am Sonntag von 02:00 bis 04:00 Uhr UTC.",
      "type": "warning",
      "icon": "alert-triangle"
    }
  }
}
```
== tab "Release-CTA" icon:sparkles
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.0 ist live!** Entdecken Sie neue Suchfunktionen und UI-Komponenten.",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "Release Notes", "url": "/blog/v0-9-0" }
    }
  }
}
```
== tab "Benutzerdefiniertes HTML" icon:code
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>Neu:</strong> Die Rust-Compiler-Engine ist jetzt als Vorschau verfügbar. <a href=\"/blog/rust-engine\">Mehr erfahren →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```
:::

## Layout-Verhalten

- **Positionierung**: Sitzt oben im Viewport über der Menubar und dem Sidebar-Header. Erstellt mit Zero-Layout-Shift-CSS-Regeln, sodass das Schließen des Banners Inhaltszeilen nicht störend verschiebt.
- **Sitzungspersistenz**: Der Schließen-Zustand wird im `sessionStorage` gespeichert. Das Öffnen einer neuen Browsersitzung stellt den Banner wieder her.
- **Anpassung pro Seite**: Um den Banner auf bestimmten Landingpages auszublenden, setzen Sie `layout.banner` im Seiten-Frontmatter auf `null`.

## Benutzerdefiniertes Banner-Styling

Der Banner verwendet BEM-Klassennamen mit dem Präfix `.docmd-banner`. Passen Sie Farben und Typografie über benutzerdefinierte CSS-Regeln an:

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #ffffff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```

## Deaktivieren des Site-Banners

Um den Site-Banner global zu deaktivieren, setzen Sie `layout.banner` auf `null` oder entfernen Sie den Schlüssel `banner` aus `docmd.config.json`.

::: callout tip "Changelog-Integration" icon:history
Kombinieren Sie Site-Banner mit Changelog-Seiten oder Vorlagenpaketen, um eine permanente Aufzeichnung aller angekündigten Produktupdates zu führen.
:::