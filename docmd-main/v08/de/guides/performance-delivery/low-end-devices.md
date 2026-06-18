---
title: "Low-End-Device-Optimierung"
description: "Wie Sie leistungsstarke, zugängliche Dokumentation erstellen, die auf schwacher Hardware und langsamen Verbindungen reibungslos funktioniert."
---

## Problem

Moderne Dokumentations-Sites verlassen sich häufig auf schwere JavaScript-Runtimes, um statischen Text anzuzeigen. Für Benutzer mit älteren Mobiltelefonen oder langsamen Verbindungen brauchen diese Sites mehrere Sekunden zum Laden. Der Prozessor hat Mühe, große JS-Bundles zu parsen, was zu "Input-Lag" und einer schlechten Lese-Erfahrung führt.

## Warum es wichtig ist

Technische Dokumentation sollte universell zugänglich sein. Benutzer mit eingeschränkter Hardware zum Download eines schweren Frameworks zu zwingen, stellt eine unnötige Lernbarriere dar. Eine leichtgewichtige Site stellt sicher, dass Produktinformationen für alle verfügbar sind — unabhängig von Hardware oder Internet-Geschwindigkeit.

## Ansatz

Übernehmen Sie eine **HTML-First**-Strategie. docmd verwendet eine Zero-Framework-Architektur. Die primären Inhalte werden während des Build-Prozesses in Standard-HTML gerendert. Das hält den Main-Thread des Browsers frei und sorgt selbst auf günstigen Geräten für flüssiges Scrollen und snappy Navigation.

## Implementierung

### 1. Minimaler Runtime-Footprint

Standardmäßig verwendet docmd weder React noch Vue für seine Kern-UI. Dieser vorgerenderte Ansatz stellt sicher, dass das initiale "First Contentful Paint" nahezu sofort erfolgt. Um diese Performance zu erhalten:
*   **Beschränken Sie benutzerdefinierte Skripte**: Vermeiden Sie das Hinzufügen großer Drittanbieter-Libraries in Ihrer `customJs`-Konfiguration.
*   **Nutzen Sie native Browser-Features**: Verlassen Sie sich auf Standard-CSS und HTML5-Elemente.

### 2. Strategisches Plugin-Management

Während [Plugins](../../plugins/usage.md) leistungsstarke Features hinzufügen, bringen sie Performance-Overhead mit sich. Beispielsweise benötigt das [Mermaid-Plugin](../../plugins/mermaid.md) eine große Engine, um Diagramme zu rendern. Wenn Ihre Benutzer Low-End-Geräte verwenden, nutzen Sie statische Bilder statt clientseitigem Rendering.

### 3. Responsive und optimierte Medien

Vermeiden Sie es, mobilen Benutzern überdimensionierte Bilder auszuliefern. Verwenden Sie moderne Formate wie WebP und ziehen Sie das `<picture>`-Tag in Betracht, um responsiven Assets granulare Kontrolle zu geben.

```html
<picture>
  <source srcset="/assets/mobile-hero.webp" media="(max-width: 600px)">
  <img src="/assets/desktop-hero.webp" alt="Funktionsübersicht" loading="lazy">
</picture>
```
Die Verwendung des Attributs `loading="lazy"` stellt sicher, dass Bilder erst dann heruntergeladen werden, wenn sie im Viewport des Benutzers erscheinen — das spart Bandbreite.

### 4. Effiziente Such-Indexierung

docmd generiert gescopte Suchindizes, um den Speicher-Footprint niedrig zu halten. Für extrem große Sites kann das [Search-Plugin](../../plugins/search.md) jedoch speicherintensiv sein. Optimieren Sie Ihren Index wie im [Local-First-Search-Leitfaden](../search/local-first-search.md) beschrieben.

## Abwägungen

Performance für Low-End-Geräte zu priorisieren bedeutet, auf "schwere" interaktive Features wie komplexe 3D-Visualisierungen zu verzichten. Dies ist eine bewusste Designentscheidung, die Inklusivität und Geschwindigkeit über visuelle Komplexität stellt. Sie stellt sicher, dass Ihre Dokumentation für den größtmöglichen Kreis an Benutzern nützlich bleibt.
