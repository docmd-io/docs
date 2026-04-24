---
title: "Optimierung für Low-End-Geräte"
description: "So erstellen Sie leistungsstarke, barrierefreie Dokumentationen, die auf schwächerer Hardware und bei langsamen Netzwerkverbindungen nahtlos funktionieren."
---

## Problem

Moderne Dokumentations-Websites verlassen sich oft auf schwere JavaScript-Runtimes, nur um statischen Text anzuzeigen. Für Benutzer mit älteren Mobiltelefonen, günstigen Laptops oder langsamen 3G/4G-Verbindungen kann das Laden dieser Seiten mehrere Sekunden dauern. Der Prozessor des Geräts hat Mühe, große JS-Bundles zu verarbeiten, was zu "Input-Lag", ruckelnden Animationen und einem insgesamt schlechten Leseerlebnis führt.

## Warum es wichtig ist

Technische Dokumentationen sollten universell zugänglich sein. Wenn Benutzer in Schwellenländern oder mit eingeschränkter Hardware gezwungen sind, ein schweres Framework herunterzuladen und auszuführen, nur um ein Tutorial zu lesen, schafft dies eine unnötige Hürde beim Lernen. Eine leichtgewichtige Website stellt sicher, dass Ihre Produktinformationen für jeden verfügbar sind, unabhängig von der Hardware oder Internetgeschwindigkeit.

## Ansatz

Setzen Sie auf eine **HTML-First-Strategie**. `docmd` ist mit einer Zero-Framework-Architektur konzipiert, die sicherstellt, dass der primäre Inhalt während des Build-Prozesses in Standard-HTML gerendert wird. Dies hält den Hauptthread des Browsers frei und gewährleistet flüssiges Scrollen sowie eine schnelle Navigation, selbst auf Budget-Geräten.

## Implementierung

### 1. Minimaler Runtime-Footprint

Standardmäßig verwendet `docmd` weder React, Vue noch ein anderes schweres clientseitiges Framework für seine Kern-UI. Dieser vorgerenderte Ansatz stellt sicher, dass der erste "First Contentful Paint" fast sofort erfolgt. Um diese Performance beizubehalten:
*   **Eigene Skripte begrenzen**: Vermeiden Sie das Hinzufügen großer Drittanbieter-Bibliotheken in Ihrer `customJs`-Konfiguration.
*   **Native Browser-Funktionen nutzen**: Verlassen Sie sich auf Standard-CSS und HTML5-Elemente, die von allen modernen Browsern hochgradig optimiert sind.

### 2. Strategisches Plugin-Management

Während [Plugins](../../plugins/usage) leistungsstarke Funktionen hinzufügen, können sie einen erheblichen Performance-Overhead verursachen. Zum Beispiel benötigt das [Mermaid-Plugin](../../plugins/mermaid) eine große Engine, um Diagramme zu rendern. Wenn Ihre Benutzer hauptsächlich Low-End-Geräte verwenden, sollten Sie statische Bilder für Diagramme anstelle von clientseitigem Rendering in Betracht ziehen.

### 3. Responsive und optimierte Medien

Vermeiden Sie es, übergroße Bilder an mobile Benutzer auszuliefern. Verwenden Sie moderne Formate wie WebP und nutzen Sie das `<picture>`-Tag für eine granulare Kontrolle über responsive Assets.

```html
<picture>
  <source srcset="/assets/mobile-hero.webp" media="(max-width: 600px)">
  <img src="/assets/desktop-hero.webp" alt="Feature-Übersicht" loading="lazy">
</picture>
```
Die Verwendung des Attributs `loading="lazy"` stellt sicher, dass Bilder erst heruntergeladen werden, wenn sie in den Viewport des Benutzers gelangen, was Bandbreite bei langsamen Verbindungen spart.

### 4. Effiziente Suchindexierung

`docmd` generiert "gescopte" Suchindizes, um den Speicherbedarf gering zu halten. Bei extrem großen Websites kann das [Search-Plugin](../../plugins/search) jedoch weiterhin speicherintensiv sein. Ermutigen Sie mobile Benutzer, die Suchleiste nur bei Bedarf zu verwenden, oder optimieren Sie Ihren Index, wie im [Local-First Suchleitfaden](../search/local-first-search) beschrieben.

## Abwägungen

Die Priorisierung der Performance für Low-End-Geräte bedeutet oft, auf "schwere" interaktive Funktionen wie komplexe 3D-Visualisierungen oder große clientseitige Datenverarbeitung zu verzichten. Dies ist eine bewusste Designentscheidung, die **Inklusivität und Geschwindigkeit** über visuelle Komplexität stellt und sicherstellt, dass Ihre Dokumentation für ein möglichst breites Publikum eine nützliche Ressource bleibt.
