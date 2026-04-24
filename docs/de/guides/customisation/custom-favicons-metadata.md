---
title: "Anpassen von Favicons und Metadaten"
description: "So konfigurieren Sie die visuelle Identität Ihrer Website im Browser und optimieren die Vorschau in sozialen Medien."
---

## Problem

Eine Standard-Dokumentationsseite hat im Browser oft keine eigene visuelle Identität (sie verwendet ein generisches Favicon) und bietet mangelhafte Vorschauen, wenn Links in sozialen Medien oder Kommunikationstools wie Slack und Discord geteilt werden. Dies verringert den Wiedererkennungswert der Marke und die Klickraten.

## Warum es wichtig ist

Ihr Favicon ist der primäre visuelle Anker in einem überfüllten Browserfenster. Hochwertige OpenGraph- und Twitter-Metadaten stellen sicher, dass Ihre Dokumentation professionell und vertrauenswürdig aussieht, wenn sie geteilt wird, und bieten Kontext durch Titel, Beschreibungen und Hero-Images.

## Ansatz

`docmd` bietet eine integrierte `favicon`-Eigenschaft für die einfache Konfiguration von Icons. Für fortgeschrittene SEO- und soziale Metadaten nutzen Sie das [SEO-Plugin](../../plugins/seo), das die Generierung von Meta-Tags basierend auf Ihrer Projektkonfiguration und dem Seiten-Frontmatter automatisiert.

## Implementierung

### 1. Konfiguration des Favicons

Platzieren Sie Ihre Favicon-Datei (z. B. `favicon.svg` oder `favicon.ico`) in Ihrem Quellverzeichnis und referenzieren Sie diese in Ihrer `docmd.config.js`. `docmd` kümmert sich automatisch um die relativen Pfade und das Cache-Busting.

```javascript
// docmd.config.js
export default {
  title: 'Mein Projekt',
  favicon: '/favicon.svg' // Relativ zum Quellverzeichnis
};
```

### 2. Globale SEO-Konfiguration

Aktivieren und konfigurieren Sie das [SEO-Plugin](../../plugins/seo), um Standard-Vorschauen für Ihre gesamte Website festzulegen.

```javascript
// docmd.config.js
export default {
  url: 'https://docs.example.com',
  plugins: {
    seo: {
      defaultDescription: 'Der ultimative Leitfaden zu unserer fantastischen Software.',
      openGraph: {
        defaultImage: '/static/og-banner.png'
      },
      twitter: {
        siteUsername: '@meinprojekt',
        cardType: 'summary_large_image'
      }
    }
  }
};
```

### 3. Seitenspezifische Overrides

Sie können die SEO-Einstellungen für einzelne Seiten über die Eigenschaft `seo` im [Frontmatter](../../content/frontmatter) überschreiben.

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

Die `favicon`-Eigenschaft ist zwar praktisch, unterstützt jedoch nur eine einzelne Datei. Für komplexe Favicon-Sets mit mehreren Größen (Apple Touch Icons, Android Manifests usw.) müssen Sie möglicherweise ein eigenes Plugin verwenden, um zusätzliche `<link>`-Tags in den `<head>` einzufügen.
