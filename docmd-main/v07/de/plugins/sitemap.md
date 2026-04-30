---
title: "Sitemap-Plugin"
description: "Generieren Sie automatisch eine standardkonforme sitemap.xml für eine bessere Sichtbarkeit in Suchmaschinen."
---

Das Plugin `@docmd/plugin-sitemap` generiert automatisch eine `sitemap.xml`-Datei im Stammverzeichnis Ihres Build-Ordners. Diese Datei bietet Suchmaschinen wie Google und Bing eine umfassende Karte der Architektur Ihrer Website und stellt sicher, dass alle Seiten — einschließlich Deep-Links innerhalb versionierter Dokumentationen — gecrawlt und indexiert werden.

## Konfiguration

Aktivieren Sie die Sitemap-Generierung, indem Sie Ihre `siteUrl` in der Hauptkonfiguration angeben. Sie können die Crawling-Gewichtung verschiedener Abschnitte innerhalb des `plugins`-Objekts anpassen.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.beispiel.de', // Erforderlich für die Sitemap-Generierung
  plugins: {
    sitemap: {
      defaultChangefreq: 'weekly', // 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
      defaultPriority: 0.8,        // Standardgewichtung für normale Seiten
      rootPriority: 1.0            // Gewichtung für die Startseite (index.md)
    }
  }
});
```

## Steuerungen auf Seitenebene

Sie können das Sitemap-Verhalten für spezifische Seiten über das Frontmatter überschreiben.

```yaml
---
title: "Archiv-Seite"
priority: 0.3          # Niedrigere Gewichtung für alte Inhalte
changefreq: "monthly"   # Hinweis an Crawler, dass sich diese Seite selten ändert
lastmod: "2024-03-15"   # Explizites Setzen des letzten Änderungsdatums
sitemap: false         # Diese spezifische Seite aus der sitemap.xml ausschließen
---
```

## Kernfunktionen

### 1. Automatische URL-Konstruktion
Das Plugin löst Seitenpfade intelligent in ihre kanonischen öffentlichen URLs auf. Es verarbeitet Verzeichnis-Indizes automatisch und stellt sicher, dass `guide/index.html` als `https://meineseite.de/guide/` aufgeführt wird, um eine saubere URL-Struktur beizubehalten.

### 2. Entdeckung von Versionen
Wenn Ihr Projekt [Versionierung](../configuration/versioning) verwendet, schließt das Sitemap-Plugin automatisch alle Seiten aus allen Versionen ein (z. B. `/v1/erste-schritte`, `/v2/erste-schritte`). Dies ermöglicht es Suchmaschinen, Ihre archivierten Dokumentationen ohne manuelle Konfiguration zu entdecken.

### 3. Intelligente Ausschlüsse
Seiten, die in ihrem Frontmatter mit `noindex: true` oder `sitemap: false` markiert sind, werden automatisch von der generierten `sitemap.xml` ausgeschlossen. Dies gibt Ihnen eine granulare Kontrolle darüber, was den Suchmaschinen präsentiert wird.

::: callout tip "Validierung"
Nach dem Build Ihrer Website finden Sie die Sitemap normalerweise unter `ihr-ausgabe-ordner/sitemap.xml`. Die meisten Search-Engine-Konsolen ermöglichen es Ihnen, diese Datei direkt einzureichen, um die Indexierung zu beschleunigen.
:::