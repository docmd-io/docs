---
title: "Sitemap-Plugin"
description: "Generieren Sie automatisch standardkonforme sitemap.xml-Dateien für mehrversionige Dokumentationsseiten in docmd."
---

Das `@docmd/plugin-sitemap`-Plugin generiert während der Kompilierung eine Standard-`sitemap.xml`-Datei im Stammverzeichnis Ihres Site-Ausgabeverzeichnisses. Dies bietet Web-Crawlern und Suchmaschinen eine Karte Ihrer Site-Struktur und stellt sicher, dass alle Seiten und Versionsrouten effizient indiziert werden.

## Konfigurationsoptionen

Konfigurieren Sie Parameter für die Sitemap-Generierung in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die Sitemap-Generierung. |
| `defaultChangefreq` | `string` | `'weekly'` | Crawl-Frequenzhinweis für Suchmaschinen-Bots. |
| `defaultPriority` | `number` | `0.8` | Prioritätsgewichtung für Standard-Dokumentationsseiten (`0.0` bis `1.0`). |
| `rootPriority` | `number` | `1.0` | Prioritätsgewichtung für die Startseite der Website (`index.md`). |

### Globales Sitemap-Beispiel

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## Hauptfunktionen

* **Kanonische Domain-Zuordnung**: Löst relative Seitenrouten basierend auf `config.url` in absolute URLs auf.
* **Indizierung von Versionsrouten**: Indiziert automatisch Seiten über alle konfigurierten Dokumentationsversionen hinweg (`/v09/`, `/v08/` usw.).
* **Ausschluss pro Seite**: Überspringt Seiten, die `sitemap: false` oder `noindex: true` im Frontmatter enthalten.
* **Protokoll-Compliance**: Erzeugt XML, das gemäß der Standard-Spezifikation von sitemaps.org formatiert ist.

## Steuerung auf Seitenebene

Überschreiben Sie Sitemap-Parameter für bestimmte Dokumente über [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Legacy-Migrationsleitfaden"
priority: 0.3          # Niedrigeres Crawl-Gewicht für Legacy-Inhalte
changefreq: "monthly"   # Hinweis an Suchmaschinen-Crawler
sitemap: false         # Seite aus sitemap.xml ausschließen
---
```

::: callout tip "Sitemap-Überprüfung" icon:check-circle
Suchen Sie `sitemap.xml` nach der Kompilierung unter `site/sitemap.xml`. Reichen Sie diese URL direkt in Search-Console-Dashboards ein, um die Seitenentdeckung zu beschleunigen.
:::