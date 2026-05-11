---
title: "Frontmatter-Referenz"
description: "Der vollständige Leitfaden zu Metadaten und Konfiguration auf Seitenebene in docmd."
---

Frontmatter ermöglicht es Ihnen, globale Einstellungen auf einer pro-Seite-Basis zu überschreiben. Es muss im YAML-Format ganz oben in Ihrer Markdown-Datei stehen.

## Kern-Metadaten

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `title` | `String` | **Erforderlich.** Legt den HTML-`<title>` und die Hauptüberschrift des Abschnitts fest. |
| `description` | `String` | Legt die Meta-Beschreibung für SEO und Suchergebnisse fest. |
| `keywords` | `Array` | Eine Liste von Schlüsselwörtern für den `<meta name="keywords">`-Tag. |

::: callout warning "Der Titel ist wichtig"
Obwohl nicht strikt erforderlich, wird das Feld `title` dringend empfohlen. Ohne diesen greift docmd auf die erste `# H1`-Überschrift oder den Dateinamen zurück — was zu weniger idealen `<title>`-Tags und Suchergebnissen führen kann.
:::

## Sichtbarkeit & Indexierung

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Schließt die Seite aus dem internen Suchindex aus. |
| `llms` | `Boolean` | Auf `false` setzen, um diese Seite aus den KI-Kontextdateien (`llms.txt`) auszuschließen. |
| `hideTitle` | `Boolean` | Blendet den Titel im fixierten Header aus (nützlich bei Verwendung einer benutzerdefinierten H1). |
| `bodyClass` | `String` | Fügt dem `<body>`-Tag dieser Seite eine benutzerdefinierte CSS-Klasse hinzu. |

## Layout-Steuerung

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `layout` | `String` | Auf `full` setzen, um die volle Inhaltsbreite zu nutzen und die Inhaltsverzeichnis-Sidebar (TOC) auszublenden. |
| `toc` | `Boolean` | Auf `false` setzen, um das Inhaltsverzeichnis vollständig zu deaktivieren. |
| `noStyle` | `Boolean` | Deaktiviert die gesamte `docmd`-Benutzeroberfläche (Sidebar, Header, Footer) für benutzerdefinierte Seiten. |
| `titleAppend` | `Boolean` | Auf `false` setzen, um zu verhindern, dass der Seitentitel an den HTML-`<title>`, OpenGraph (`og:title`) und Twitter-Metadaten-Tags angehängt wird. Standard: `true`. |

### `noStyle`-Komponentensteuerung

Wenn `noStyle: true` aktiv ist, müssen Sie sich explizit für die Komponenten entscheiden, die Sie beibehalten möchten:

```yaml
---
noStyle: true
components:
  meta: true      # Fügt SEO-Metadaten ein
  favicon: true   # Fügt das Website-Favicon ein
  css: true       # Fügt docmd-main.css ein
  theme: true     # Fügt Theme-spezifisches Styling ein
  highlight: true # Fügt Syntax-Highlighting ein
  scripts: true   # Fügt die SPA-Router-Logik ein
  sidebar: true   # Fügt die Navigations-Sidebar ein
  footer: true    # Fügt den Website-Footer ein
---
```

## Plugin-Überschreibungen

### SEO (`seo`)
*   `image`: Benutzerdefinierte URL für das Vorschaubild in sozialen Medien für diese Seite.
*   `aiBots`: Auf `false` setzen, um speziell KI-Crawler von dieser Seite zu blockieren.
*   `canonicalUrl`: Legt einen benutzerdefinierten kanonischen Link für SEO fest.