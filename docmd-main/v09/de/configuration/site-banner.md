---
title: "Site-Banner"
description: "Konfigurieren Sie Ankündigungs- und Werbebanner an mehreren Positionen mit Markdown, Bildern, Call-to-Action-Buttons und Sitzungspersistenz in docmd."
---

`docmd` bietet ein flexibles, mehrpositioniges Bannersystem, das sowohl Ankündigungsleisten in voller Breite als auch dedizierte Karten für die Seitenleiste und das Inhaltsverzeichnis (TOC) unterstützt. Verwenden Sie Banner, um Release-Ankündigungen, Wartungshinweise, Sponsoren-Widgets oder Werbekampagnen in Ihrer gesamten Dokumentation anzuzeigen.

## Schnelleinrichtung

Sie können einen einzelnen oberen Ankündigungsbanner über `layout.banner` konfigurieren oder Banner an mehreren Positionen über `layout.banners` in Ihrer `docmd.config.json` festlegen:

::: tabs
== tab "Einzelner oberer Banner" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.6 ist live!** Entdecken Sie den neuen Fokusmodus und die Banner-Funktionen.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Release Notes", "url": "/release-notes/0-9-6" }
    }
  }
}
```
== tab "Banner an mehreren Positionen" icon:layout
```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": {
        "content": "**v0.9.6 ist live!** Entdecken Sie die neuesten Verbesserungen.",
        "type": "announcement",
        "dismissible": true,
        "link": { "text": "Neuigkeiten", "url": "/release-notes/0-9-6" }
      },
      "toc-top": {
        "image": "/assets/sponsor-badge.png",
        "alt": "Docmd sponsern",
        "content": "**Unterstützen Sie Open-Source-Dokumentation**",
        "link": { "text": "Sponsor werden", "url": "https://github.com/sponsors" }
      },
      "sidebar-bottom": {
        "icon": "book-open",
        "content": "Benötigen Sie Enterprise-Support oder individuelle Themes?",
        "link": { "text": "Kontaktieren Sie uns", "url": "https://docmd.io/contact" }
      }
    }
  }
}
```
:::

---

## Unterstützte Banner-Positionen

`docmd` unterstützt 7 unterschiedliche Banner-Positionen:

| Position | Anzeigetyp | Standard-Persistenz | Beschreibung |
| :--- | :--- | :--- | :--- |
| `top` | Leiste | Schließbar (`dismissible: true`) | Ankündigungsleiste in voller Breite ganz oben im Viewport. |
| `header` | Leiste | Schließbar (`dismissible: true`) | Ankündigungsbanner direkt in oder unter der Kopfleiste. |
| `sidebar-top` | Karte | Dauerhaft (`dismissible: false`) | Karten-Banner oben in der Navigationsseitenleiste. |
| `sidebar-bottom` | Karte | Dauerhaft (`dismissible: false`) | Karten-Banner unten in der Navigationsseitenleiste. |
| `toc-top` | Karte | Dauerhaft (`dismissible: false`) | Karten-Banner oben in der Leiste des Inhaltsverzeichnisses (TOC). |
| `toc-bottom` | Karte | Dauerhaft (`dismissible: false`) | Karten-Banner unten in der Leiste des Inhaltsverzeichnisses (TOC). |
| `footer` | Leiste | Dauerhaft (`dismissible: false`) | Breiter Banner direkt über dem Seiten-Footer. |

---

## Konfigurationsreferenz

Jedes Banner-Objekt in `layout.banners[position]` (oder `layout.banner` für die obere Leiste) unterstützt folgende Optionen:

| Feld | Standard | Beschreibung |
| :--- | :--- | :--- |
| `content` | `""` | Inline-Markdown-Text (`**fett**`, `` `code` ``). Schließt sich mit `html` gegenseitig aus. |
| `html` | `""` | Roher HTML-String. Hat Vorrang vor `content` für Rich-Layouts. |
| `image` | `null` | URL oder relativer Pfad zu einer Kartengrafik (auf Kartenpositionen wie `sidebar-*` und `toc-*`; auf `top` ignoriert). |
| `alt` | `""` | Barrierefreier Alternativtext für das `image`. |
| `type` | `"info"` | Visuelle Farbvariante: `"info"`, `"success"`, `"warning"`, `"danger"` oder `"announcement"`. |
| `dismissible` | *Je nach Position* | Gibt an, ob ein Schließen-Button (X) gerendert wird. Standard ist `true` auf `top`/`header` und `false` (dauerhaft) auf Kartenpositionen. Aliase: `dismissable`, `closable`. |
| `link` | `null` | Call-To-Action-Link als `{ text, url }` oder direkter URL-String. |
| `icon` | `null` | Name eines beliebigen [Lucide-Icons](external:https://lucide.dev/icons), das neben dem Inhalt gerendert wird (z. B. `sparkles`, `bell`, `heart`). |

---

## Karten-Banner (Seitenleiste & Inhaltsverzeichnis)

Karten-Banner (`sidebar-top`, `sidebar-bottom`, `toc-top`, `toc-bottom`) sind als kompakte Widgets konzipiert, ideal für ergänzende Inhalte, Sponsorenhinweise oder Entwicklerressourcen.

### Karten-Standards & Persistenz

Im Gegensatz zur oberen Ankündigungsleiste sind **Karten-Banner standardmäßig dauerhaft sichtbar** (`dismissible: false`). Sie bleiben seitenübergreifend erhalten.

Wenn ein Karten-Banner schließbar sein soll, setzen Sie explizit `dismissible: true` (oder `dismissable: true`):

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "toc-top": {
        "image": "/assets/survey-banner.png",
        "content": "Nehmen Sie an unserer 2-Minuten-Entwicklerumfrage teil!",
        "dismissible": true,
        "link": { "text": "Umfrage starten", "url": "https://example.com/survey" }
      }
    }
  }
}
```

Nach dem Schließen wird der Status für die Dauer der Browsersitzung im `sessionStorage` gespeichert.

---

## Versionsvererbung & Überschreibungen

Bei mehrsprachigen oder versionierten Projekten (`versions.all`) erben Versionskonfigurationen automatisch die Banner der Stammkonfiguration. Eine Version kann eine bestimmte Position gezielt überschreiben:

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": { "content": "Willkommen in unserer Dokumentation!" },
      "toc-top": { "image": "/assets/sponsor.png", "link": "https://docmd.io" }
    }
  },
  "versions": {
    "current": "v2",
    "all": [
      {
        "id": "v1",
        "dir": "docs-v1",
        "label": "v1.0",
        "banners": {
          "top": {
            "content": "⚠️ Sie betrachten die ältere Dokumentation v1. Wechseln Sie für neue Funktionen zu v2.",
            "type": "warning",
            "dismissible": false
          }
        }
      },
      {
        "id": "v2",
        "dir": "docs-v2",
        "label": "v2.0"
      }
    ]
  }
}
```

---

## Benutzerdefiniertes Styling

Banner verwenden standardisierte BEM-Klassennamen:
- Banner: `.docmd-banner` (oder `.summer-banner` im Summer-Theme)
- Positionen: `.docmd-banner--pos-top`, `.docmd-banner--pos-sidebar-top`, `.docmd-banner--pos-toc-top`, etc.
- Karten-Stil: `.docmd-banner--card`
- Typ-Varianten: `.docmd-banner--info`, `.docmd-banner--warning`, `.docmd-banner--success`, `.docmd-banner--danger`

```css "custom.css"
.docmd-banner--pos-toc-top {
  border-radius: 8px;
  border: 1px solid var(--docmd-color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.docmd-banner--announcement {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
}
```

## Banner deaktivieren

Um Banner zu deaktivieren:
- Setzen Sie `layout.banner` auf `null` oder entfernen Sie es.
- In `layout.banners` entfernen Sie die gewünschte Position oder setzen sie auf `null`.
- Auf Einzelseiten setzen Sie im Frontmatter `banner: null`.