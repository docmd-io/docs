---
title: "SEO-Plugin"
description: "Optimieren Sie Ihre Dokumentation für Suchmaschinen und steuern Sie den Zugriff von KI-Crawlern mit nativer Generierung von Meta-Tags."
---

Das Plugin `@docmd/plugin-seo` ist für die Generierung hochwertiger Metadaten für jede Seite verantwortlich. Es stellt sicher, dass Ihre Dokumentation nicht nur von menschlichen Lesern in Suchmaschinen gefunden wird, sondern auch von KI-Modellen und Social-Media-Plattformen korrekt interpretiert wird.

## Globale Konfiguration

Konfigurieren Sie website-weite SEO-Standardwerte in Ihrer `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    seo: {
      defaultDescription: 'Umfassende Dokumentation für das docmd-Ökosystem.',
      aiBots: false, // Auf false setzen, um gängige KI-Crawler (GPTBot etc.) zu blockieren
      openGraph: {
        defaultImage: '/assets/og-image.png'
      },
      twitter: {
        siteUsername: '@docmd_io',
        cardType: 'summary_large_image'
      }
    }
  }
});
```

## Überschreibungen auf Seitenebene

Sie können SEO-Einstellungen für einzelne Seiten über das Frontmatter feinjustieren. Einstellungen auf Seitenebene haben immer Vorrang vor globalen Standardwerten.

```yaml
---
title: "Fortgeschrittene Konfiguration"
description: "Erfahren Sie, wie Sie die interne Engine von docmd meistern."
noindex: true # Diese spezifische Seite vor allen Suchmaschinen verbergen
seo:
  keywords: ["docmd", "javascript", "ssg"]
  ogType: "article"
  canonicalUrl: "https://meineseite.de/canonical-path"
  aiBots: true # Globalen Block überschreiben, um KI-Zugriff auf diese Seite zu erlauben
---
```

## Kernfunktionen

### 1. Intelligenter Beschreibungs-Fallback
Wenn im Frontmatter oder in der globalen Konfiguration keine Beschreibung angegeben ist, extrahiert das Plugin automatisch die ersten 150 Zeichen des Fließtexts der Seite, um sie als `<meta name="description">` zu verwenden. So wird sichergestellt, dass jede Seite über grundlegende Metadaten für Suchergebnis-Schnipsel verfügt.

### 2. KI-Bot-Governance
Durch das Setzen von `aiBots: false` fügt das Plugin speziell für die wichtigsten KI-Crawler (einschließlich `GPTBot`, `Claude-Web` und `Google-Extended`) `noindex`-Anweisungen ein. Dies ermöglicht es Ihnen, zwischen traditioneller Suchmaschinen-Indexierung und LLM-Trainingssitzungen zu unterscheiden.

### 3. Kanonische Auflösung
Das Plugin generiert basierend auf Ihrer `siteUrl` automatisch `<link rel="canonical">`-Tags. Es verarbeitet Verzeichnis-Indizes intelligent und wandelt `guide/index.html` in eine saubere `/guide/` kanonische URL um, um Probleme mit doppeltem Inhalt (Duplicate Content) zu vermeiden.

### 4. Reichhaltige soziale Vorschauen
Die native Unterstützung für Open Graph und Twitter Cards stellt sicher, dass Links zu Ihrer Dokumentation professionell aussehen, wenn sie auf Plattformen wie X (Twitter), LinkedIn und Discord geteilt werden.

::: callout tip "Such-Entdeckung"
Für beste SEO-Ergebnisse stellen Sie sicher, dass Ihre `siteUrl` im Stammverzeichnis Ihrer Konfiguration definiert ist. Ohne eine Basis-URL kann das Plugin keine absoluten kanonischen Links oder Pfade für Open Graph-Bilder generieren.
:::

## Strukturierte Daten (LD+JSON)
`docmd` kann automatisch das [Article Schema](https://developers.google.com/search/docs/appearance/structured-data/article) generieren, um Suchmaschinen dabei zu helfen, Rich Snippets anzuzeigen.

```yaml
---
title: "Wie man ein docmd-Plugin erstellt"
seo:
  ldJson: true
---
```

::: callout tip "Strukturierte Daten"
Ein gut konfiguriertes SEO-Plugin hilft KI-gestützten Suchmaschinen (wie SearchGPT oder Perplexity), Ihre Website präzise zusammenzufassen. Durch die Bereitstellung klarer Beschreibungen und das Blockieren von Bots steuern Sie genau, wie KI-Modelle Ihre Inhalte online wahrnehmen und als Quelle nutzen.
:::