---
title: "SEO-Plugin"
description: "Optimieren Sie Ihre Dokumentationsseite für Suchmaschinen-Indizierung, Social-Card-Vorschauen und KI-Crawler-Governance."
---

Das `@docmd/plugin-seo`-Plugin generiert semantische HTML-Metadaten und Social-Media-Vorschau-Tags für jede Seite Ihrer Website. Es stellt sicher, dass Ihre Dokumentation von Suchmaschinen entdeckt werden kann, für soziale Plattformen korrekt strukturiert ist und den Richtlinien von KI-Crawlern entspricht.

## Konfigurationsoptionen

Konfigurieren Sie website-weite SEO-Standardwerte in `docmd.config.json`. Frontmatter-Einstellungen auf Seitenebene überschreiben globale Standardwerte.

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | Fallback-Beschreibung für Seiten, denen explizite Frontmatter-Beschreibungen fehlen. |
| `aiBots` | `boolean` | `true` | Erlauben (`true`) oder blockieren (`false`) von KI-Trainings-Web-Crawlern (GPTBot, ChatGPT-User, Google-Extended, CCBot). |
| `openGraph` | `object` | `null` | Open Graph-Social-Media-Metadaten (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card-Einstellungen einschließlich Handle und Card-Typ. |

### Globales SEO-Konfigurationsbeispiel

```json "docmd.config.json"
{
  "plugins": {
    "seo": {
      "defaultDescription": "Umfassende technische Dokumentation für die docmd-Plattform.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Hauptfunktionen

* **Automatisierte `robots.txt`**: Generiert eine Standard-`robots.txt` im Ausgabestammverzeichnis, einschließlich Sitemap-Speicherorten und KI-Bot-Regeln.
* **Intelligente Auszug-Generierung**: Extrahiert automatisch die ersten 150 Zeichen des Fließtextes, wenn keine Seitenbeschreibung definiert ist.
* **KI-Bot-Governance**: Setzen Sie `aiBots: false`, um KI-Trainings-Scraper zu blockieren, während Suchmaschinen-Crawler weiterhin zugelassen werden.
* **Ausgabe kanonischer URLs**: Injiziert `<link rel="canonical">`-Elemente, um Probleme mit doppelter Indizierung zu verhindern.
* **Social-Preview-Cards**: Generiert Open Graph- und Twitter Card-Tags.
* **Strukturierte Daten (JSON-LD)**: Injiziert Article-Schema-JSON-LD-Blöcke für umfangreiche Suchmaschinen-Snippets.

## `robots.txt`-Auflösungsreihenfolge

Das SEO-Plugin wertet `robots.txt` in Prioritätsreihenfolge von oben nach unten aus:

1. **Site-Stammverzeichnis** (`site/robots.txt`) - Zuerst geprüft; falls vorhanden, werden bestehende Inhalte beibehalten.
2. **Quell-Assets-Ordner** (`assets/robots.txt`) - Falls in Ihrem Quell-Assets-Verzeichnis vorhanden, wird es automatisch in das Site-Ausgabestammverzeichnis (`site/robots.txt`) kopiert.
3. **Automatisch generierter Standardwert** - Falls keine benutzerdefinierte Datei gefunden wird, generiert `docmd` dynamisch eine `robots.txt` basierend auf Ihrer Plugin-Konfiguration.

Empfohlene Dateiorganisation:

```text
my-docs/
├── assets/
│   └── robots.txt    ← Schreiben Sie hier benutzerdefinierte Regeln
├── index.md
└── docmd.config.json
```

## SEO-Überschreibungen auf Seitenebene

Überschreiben Sie website-weite SEO-Standardwerte für bestimmte Dokumente über [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Erweiterte Engine-Architektur"
noindex: true # Seite vor Suchmaschinenindizes verbergen
seo:
  keywords: ["docmd", "architektur", "engine"]
  aiBots: true # KI-Scraper auf dieser Seite erlauben
  ldJson: true # Article Schema injizieren
---
```

::: callout tip "Basis-URL-Konfiguration" icon:link
Definieren Sie die Eigenschaft `url` in `docmd.config.json` (z. B. `https://docs.docmd.io`), um gültige absolute kanonische Links und Bild-URLs für Social Previews zu aktivieren.
:::