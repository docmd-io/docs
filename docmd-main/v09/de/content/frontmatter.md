---
title: "Frontmatter-Referenz"
description: "Der vollständige Leitfaden zu Seitenmetadaten und Konfiguration."
---

Frontmatter überschreibt globale Einstellungen für bestimmte Seiten. Schreiben Sie es im YAML-Format oben in Ihre Markdown-Dateien.

## Kernmetadaten

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `title` | `String` | **Erforderlich.** Setzt das HTML-`<title>` und die primäre Abschnittsüberschrift. |
| `description` | `String` | Setzt die Meta-Beschreibung für SEO und Suchergebnisse. |
| `keywords` | `Array` | Eine Liste von Schlüsselwörtern für das `<meta name="keywords">`-Tag. |

::: callout warning "Titel ist wichtig" icon:triangle-alert
Das Feld `title` wird dringend empfohlen. Ohne es fällt die Engine auf die erste `# H1`-Überschrift oder den Dateinamen zurück. Dies kann zu suboptimalen Suchergebnissen führen.
:::

## Sichtbarkeit & Indizierung

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Schließt die Seite aus dem internen Suchindex aus. |
| `llms` | `Boolean` | Auf `false` setzen, um diese Seite aus KI-Kontextdateien (`llms.txt`) auszuschließen. |
| `hideTitle` | `Boolean` | Blendet den Titel im Sticky-Header aus. Nützlich für benutzerdefinierte H1s. |
| `bodyClass` | `String` | Fügt dem `<body>`-Tag eine benutzerdefinierte CSS-Klasse hinzu. |

## Layout-Steuerung

| Schlüssel | Typ | Beschreibung |
| :--- | :--- | :--- |
| `layout` | `String` | Auf `full` setzen, um maximale Breite zu nutzen und die TOC-Sidebar auszublenden. |
| `toc` | `Boolean` | Auf `false` setzen, um das Inhaltsverzeichnis vollständig zu deaktivieren. |
| `noStyle` | `Boolean` | Deaktiviert die gesamte UI (Sidebar, Header, Footer) für benutzerdefinierte Seiten. |
| `titleAppend` | `Boolean` | Auf `false` setzen, um zu verhindern, dass der Site-Titel an Metatags angehängt wird. Standard ist `true`. |

### `noStyle`-Komponentensteuerung

Wenn `noStyle: true` aktiv ist, müssen Sie sich für die Komponenten entscheiden, die Sie behalten möchten.

```yaml
---
noStyle: true
components:
  meta: true      # SEO-Metadaten einfügen
  favicon: true   # Site-Favicon einfügen
  css: true       # docmd-main.css einfügen
  theme: true     # Themenspezifisches Styling einfügen
  highlight: true # Syntax-Highlighting einfügen
  scripts: true   # SPA-Router-Logik einfügen
  sidebar: true   # Navigations-Sidebar einfügen
  footer: true    # Site-Footer einfügen
---
```

## Plugin-Überschreibungen

### SEO (`seo`)
*   `image`: Benutzerdefinierte Social-Share-Bild-URL für die Seite.
*   `aiBots`: Auf `false` setzen, um KI-Crawler für diese Seite zu blockieren.
*   `canonicalUrl`: Setzt einen benutzerdefinierten kanonischen Link für SEO.