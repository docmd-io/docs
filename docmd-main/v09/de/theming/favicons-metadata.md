---
title: "Anpassen von Favicons & Metadaten"
description: "Konfigurieren Sie Website-Favicons, OpenGraph-Karten und Twitter-Metadaten in docmd für Social Sharing und Suchmaschinen."
---

Benutzerdefinierte Favicons und OpenGraph-Metadaten stellen sicher, dass Ihre Dokumentation professionell aussieht, wenn sie in Browser-Tabs als Lesezeichen gespeichert oder über soziale Netzwerke und Kommunikationskanäle geteilt wird.

## Favicon-Konfiguration

Platzieren Sie Ihre Favicon-Datei (z. B. `favicon.svg` oder `favicon.ico`) in Ihrem `assets/`-Verzeichnis und konfigurieren Sie die Eigenschaft `favicon` in `docmd.config.json`:

```json "docmd.config.json"
{
  "title": "Dokumentations-Kern",
  "favicon": "/assets/favicon.svg"
}
```

`docmd` verwaltet die Pfadauflösung und Cache-Busting-Header während der Kompilierung automatisch.

## Globale SEO- & Social-Metadaten

Konfigurieren Sie das integrierte [SEO-Plugin](../plugins/seo.md) in `docmd.config.json`, um website-weite Meta-Tags und Social-Card-Vorschauen zu generieren:

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "seo": {
      "defaultDescription": "Technische Dokumentation für docmd.",
      "openGraph": {
        "defaultImage": "/assets/og-banner.png"
      },
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Metadaten-Überschreibungen auf Seitenebene

Überschreiben Sie website-weite SEO-Standards für bestimmte Seiten mithilfe der Eigenschaft `seo` im [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Ankündigung des Haupt-Releases"
description: "Übersicht über neue Funktionen in docmd."
seo:
  image: "/assets/v09-banner.png"
  keywords: ["release", "v09", "dokumentation", "performance"]
---
```

::: callout tip "Favicons mit mehreren Auflösungen" icon:lightbulb
Die Konfigurationseinstellung `favicon` auf oberster Ebene deckt primäre Browseranforderungen ab. Für Favicon-Sets mit mehreren Auflösungen (wie Apple Touch Icons oder Android-Web-Manifeste) injizieren Sie zusätzliche `<link>`-Header über benutzerdefinierte Plugins oder Template-Head-Slots.
:::