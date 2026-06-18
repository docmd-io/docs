---
title: "Site-Banner"
description: "Seitenweite Ankündigungsleiste. Sitzt über der Menubar, unterstützt Inline-Markdown, optionales Icon, CTA-Link und pro Sitzung gemerktes Schließen."
---

# Site-Banner

> **Neu in 0.8.7.** Eine schließbare Ankündigungsleiste im Standard-UI. Sitzt über der Menubar und unter dem Seiten-Header. **Opt-in** — es wird nichts gerendert, sofern Sie nicht `config.layout.banner` setzen.

Verwenden Sie sie für Release-Ankündigungen, Wartungsfenster, Beta-Calls-to-Action oder jede andere seitenweite Nachricht.

## In 30 Sekunden aktivieren

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9 erscheint am Freitag** — lesen Sie die Ankündigung.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Mehr lesen", "url": "/blog/v0-9" }
    }
  }
}
```

Der Banner erscheint auf jeder Seite. Nutzer, die ihn einmal schließen, sehen ihn bis zur nächsten Browser-Sitzung nicht erneut.

## Konfigurationsreferenz

| Feld | Standard | Beschreibung |
|---|---|---|
| `content` | `""` | Inline-Markdown-Text (`**fett**`, `` `code``). Schließt sich gegenseitig mit `html` aus. |
| `html` | `""` | Roher HTML-Code. Hat Vorrang vor `content`. Für umfangreichere Layouts. |
| `type` | `"info"` | `"info"` \| `"success"` \| `"warning"` \| `"danger"` — beeinflusst die Hintergrundfarbe. |
| `dismissible` | `true` | Schließen-Schaltfläche (X) anzeigen. Bei `false` ist der Banner dauerhaft sichtbar. |
| `link` | `null` | `{ text, url }` für einen optionalen CTA-Link, der nach dem Inhalt gerendert wird. |
| `icon` | `null` | Lucide-Iconname, der links angezeigt wird. Häufige Werte: `megaphone`, `info`, `bell`. |

### Beispiele

Einfache Ankündigung:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "Site-Wartung Sonntag 02:00–04:00 UTC.",
      "type": "warning"
    }
  }
}
```

Erfolg / Release:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v1.0 ist da!** Lesen Sie die Release Notes.",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "Release Notes", "url": "/blog/v1-0" }
    }
  }
}
```

Reichhaltiges HTML (sorgfältig escapen):

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>Neu:</strong> KI-gestützte Suche ist da. <a href=\"/blog/ai-search\">Mehr erfahren →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```

## Verhalten

- **Position** — Sitzt ganz oben auf der Seite, über der Menubar und der Sidebar-Logo-Leiste. Reine CSS-Positionierung, kein Layout-Shift beim Schließen.
- **Schließen-Persistenz** — Der "geschlossen"-Zustand wird in `sessionStorage` gespeichert. Eine neue Browser-Sitzung zeigt den Banner erneut. Für längerfristige Persistenz schreiben Sie in `localStorage` aus einem kleinen Plugin (das `data-docmd-banner`-Attribut erleichtert das Auffinden).
- **Pro-Seite-Override** — In 0.8.7 noch nicht unterstützt. Um den Banner auf einer einzelnen Seite auszublenden, setzen Sie `layout.banner: null` in einem `config.templates[page]`-Eintrag (für ein Folge-Release geplant).

## Neu stylen

Der Banner verwendet BEM-Klassen auf dem Wurzelelement `.docmd-banner`. Skinen Sie ihn über `customCss` neu:

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #fff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```

Templates können den Banner ersetzen, indem sie ein eigenes `templates/partials/banner.ejs` mitliefern. Die Standardversion wird mit `@docmd/ui` ausgeliefert.

## Deaktivieren

Um den Banner global zu entfernen, setzen Sie `layout.banner` zurück auf `null` (oder entfernen Sie den Schlüssel). Um ihn auf einer einzelnen Seite auszublenden, verwenden Sie das geplante Pro-Seite-Override oder rendern Sie `null` im Frontmatter (post-0.8.7).

::: callout tip "Mit einem Changelog-Template kombinieren"
Kombinieren Sie den Banner mit einem `template-changelog`-Paket, um Ihren Nutzern eine permanente Aufzeichnung jedes angekündigten Releases zu bieten.
:::