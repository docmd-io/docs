---
title: "Frontmatter-Referenz"
description: "Konfigurieren Sie Metadaten auf Seitenebene, Suchindizierung, Layout-Überschreibungen und Komponentiensteuerungen in docmd."
---

Frontmatter ermöglicht Konfigurationsüberschreibungen auf Seitenebene. Deklarieren Sie YAML-Metadaten ganz oben in Ihren Markdown-Dateien zwischen Dreifach-Bindestrich-Trennzeichen (`---`).

## Kernmetadaten-Eigenschaften

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `title` | `String` | **Empfohlen.** Setzt das HTML-`<title>`-Tag und den primären Seiten-Header. |
| `description` | `String` | Setzt die Meta-Beschreibung für SEO und Suchmaschinen-Vorschauen. |
| `keywords` | `Array` | Liste von Suchschlüsselwörtern, die in `<meta name="keywords">` injiziert werden. |

::: callout tip "Best Practices für Metadaten" icon:sparkles
Die Bereitstellung eines expliziten `title` und einer `description` im Frontmatter stellt sicher, dass Suchmaschinen und KI-Kontextgeneratoren Ihre Dokumentation genau indizieren.
:::

## Steuerung von Indizierung & Sichtbarkeit

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Bei `true` wird die Seite aus der Suchindizierung und Sitemap-Generierung ausgeschlossen. |
| `llms` | `Boolean` | Auf `false` setzen, um das Dokument aus kompilierten KI-Kontextdateien (`llms.txt`) auszuschließen. |
| `hideTitle` | `Boolean` | Bei `true` wird der Haupttitel im Seiten-Headerbereich ausgeblendet. |
| `bodyClass` | `String` | Fügt dem übergeordneten `<body>`-Element benutzerdefinierte CSS-Klassen hinzu. |

## Layout- & Viewport-Konfiguration

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `layout` | `String` | Auf `"full"` setzen, um die Inhaltsbreite zu erweitern und das Inhaltsverzeichnis (TOC) zu deaktivieren. |
| `toc` | `Boolean` | Auf `false` setzen, um die rechtsseitige Inhaltsverzeichnis-Sidebar zu deaktivieren. |
| `noStyle` | `Boolean` | Deaktiviert standardmäßige UI-Elemente (Sidebar, Header, Footer) für benutzerdefinierte HTML-Seiten. |
| `titleAppend` | `Boolean` | Auf `false` setzen, um zu verhindern, dass der globale Site-Titel an Metadaten-Tags angehängt wird. |

### Feingranulare Komponentiensteuerung (`noStyle`)

Wenn `noStyle: true` aktiv ist, geben Sie einzelne zu erhaltende UI-Komponenten an:

```yaml
---
noStyle: true
components:
  meta: true      # Injiziert SEO-Metadaten
  favicon: true   # Injiziert Site-Favicon
  css: true       # Injiziert docmd-main.css
  theme: true     # Injiziert themenspezifisches Styling
  highlight: true # Injiziert Syntaxhervorhebung
  scripts: true   # Injiziert die SPA-Router-Logik
  sidebar: true   # Injiziert die Navigations-Sidebar
  footer: true    # Injiziert den Site-Footer
---
```

## Plugin- & SEO-Überschreibungen

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `image` | `String` | URL für Vorschaukarten beim Teilen in sozialen Netzwerken (`og:image`). |
| `aiBots` | `Boolean` | Auf `false` setzen, um zu verhindern, dass KI-Crawler die Seite auslesen. |
| `canonicalUrl` | `String` | Benutzerdefinierte kanonische URL für die SEO-Indizierung. |