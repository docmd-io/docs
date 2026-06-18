---
title: "Sitemap-Plugin"
description: "Generieren Sie automatisch eine standardkonforme sitemap.xml für eine bessere Suchmaschinen-Entdeckung."
---

Das `@docmd/plugin-sitemap`-Plugin erzeugt eine `sitemap.xml`-Datei im Stammverzeichnis Ihres Build-Verzeichnisses. Dies bietet Suchmaschinen eine umfassende Karte der Architektur Ihrer Site und stellt sicher, dass alle Seiten — einschließlich versionierter Dokumentation — gecrawlt und indiziert werden.

## Konfiguration

Aktivieren Sie die Sitemap-Generierung, indem Sie Ihre `siteUrl` in der Root-Konfiguration angeben. Sie können das Crawl-Gewicht im `plugins`-Objekt anpassen.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert/deaktiviert die Sitemap-Generierung. |
| `defaultChangefreq` | `string` | `'weekly'` | Hinweis an Crawler, wie oft sich Seiten ändern. |
| `defaultPriority` | `number` | `0.8` | Standardgewicht für Standardseiten (0.0 bis 1.0). |
| `rootPriority` | `number` | `1.0` | Gewicht für die Startseite (`index.md`). |

### Beispiel

```json "docmd.config.json"
{
  "url": "https://docs.example.com",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## Funktionen

- **Kanonische URLs**: löst Seitenpfade zu sauberen öffentlichen URLs basierend auf Ihrer `url`-Konfiguration auf.
- **Versionierte Entdeckung**: enthält Seiten aus jeder konfigurierten Version (`/v1/`, `/v2/` usw.).
- **Pro-Seite-Ausschlüsse**: überspringt Seiten mit `sitemap: false` im Frontmatter.
- **Standard-XML**: die Ausgabe folgt dem sitemaps.org-Protokoll, das von jeder großen Suchmaschine unterstützt wird.

## Steuerung auf Seitenebene

Überschreiben Sie das Sitemap-Verhalten für bestimmte Seiten über das Frontmatter:

```markdown
---
title: "Archivseite"
priority: 0.3          # Niedrigeres Gewicht für Legacy-Inhalte
changefreq: "monthly"   # Hinweis an Crawler
sitemap: false         # Diese spezifische Seite ausschließen
---
```

::: callout tip "Validierung"
Nach dem Build Ihrer Site finden Sie die Sitemap unter `site/sitemap.xml`. Sie können diese URL direkt in Suchmaschinen-Konsolen einreichen, um die Indizierung zu beschleunigen.
:::
