---
title: "Favicons und Metadaten anpassen"
description: "Wie Sie die visuelle Identität Ihrer Site im Browser konfigurieren und Social-Media-Previews optimieren."
---

## Problem

Eine Standard-Dokumentations-Site hat oft keine ausgeprägte visuelle Identität im Browser. Sie verwendet generische Favicons und liefert schlechte Vorschauen, wenn Links in sozialen Medien oder Kommunikations-Tools geteilt werden. Das reduziert Markenbekanntheit und Klickraten.

## Warum es wichtig ist

Ihr Favicon ist der primäre visuelle Anker in einem überfüllten Browser-Fenster. Hochwertige OpenGraph- und Twitter-Metadaten stellen sicher, dass Ihre Dokumentation beim Teilen professionell und vertrauenswürdig wirkt. Sie liefern Kontext durch Titel, Beschreibungen und Hero-Bilder.

## Ansatz

docmd bietet eine eingebaute Eigenschaft `favicon` zur einfachen Icon-Konfiguration. Für erweiterte SEO- und Social-Metadaten verwenden Sie das [SEO-Plugin](../../plugins/seo.md). Es automatisiert die Generierung von Meta-Tags basierend auf Ihrer Projektkonfiguration und dem Page-Frontmatter.

## Implementierung

### 1. Favicon konfigurieren

Platzieren Sie Ihre Favicon-Datei (z. B. `favicon.svg` oder `favicon.ico`) in Ihrem Quellverzeichnis und referenzieren Sie sie in Ihrer `docmd.config.json`. docmd übernimmt automatisch die relative Pfad-Auflösung und das Cache-Busting.

```json
  "title": "Mein Projekt",
  "favicon": "/favicon.svg"
```

### 2. Globale SEO-Konfiguration

Aktivieren und konfigurieren Sie das [SEO-Plugin](../../plugins/seo.md), um Standard-Social-Media-Vorschauen für Ihre gesamte Site festzulegen.

```json
  "url": "https://docs.example.com",
  "plugins": {
    "seo": {
      "defaultDescription": "Der ultimative Leitfaden für unsere großartige Software.",
      "openGraph": {
        "defaultImage": "/static/og-banner.png"
      },
      "twitter": {
        "siteUsername": "@meinprojekt",
        "cardType": "summary_large_image"
      }
    }
  }
```

### 3. Seiten-spezifische Überschreibungen

Sie können SEO-Einstellungen für einzelne Seiten über die Eigenschaft `seo` im [Frontmatter](../../content/frontmatter.md) überschreiben.

```yaml
---
title: "Major Release v2.0"
description: "Alles, was Sie über unsere neue Engine wissen müssen."
seo:
  image: "/assets/v2-hero-banner.png"
  keywords: ["release", "v2", "update", "performance"]
---
```

## Abwägungen

Während die Eigenschaft `favicon` praktisch ist, unterstützt sie nur eine einzelne Datei. Für komplexe Multi-Size-Favicon-Sets (Apple Touch Icons, Android-Manifests usw.) müssen Sie möglicherweise ein benutzerdefiniertes Plugin verwenden, um zusätzliche `<link>`-Tags in den `<head>` zu injizieren.
