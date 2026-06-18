---
title: "Sub-100ms-Navigation"
description: "Wie der native SPA-Router und das Intent-basierte Prefetching von docmd sofortige Seitenübergänge für ein optimales Lese-Erlebnis liefern."
---

## Problem

Traditionelle Multi-Page-Navigation löst bei jedem Klick einen vollständigen Browser-Reload aus. Das erzeugt ein störendes "White-Flash" und unterbricht den Lese-Fluss. Der Browser verwirft den aktuellen Zustand, fordert neues HTML an und parst CSS und JavaScript erneut — selbst wenn sich nur der zentrale Inhaltsbereich ändert.

## Warum es wichtig ist

Benutzer springen häufig zwischen Tutorials, API-Referenzen und konzeptionellen Leitfäden. Wenn Übergänge Sekunden dauern, entsteht kognitive Reibung, die vom Erkunden abhält. Sofortige Navigation lässt Dokumentation wie eine native Anwendung wirken und steigert Benutzerzufriedenheit und Engagement erheblich.

## Ansatz

docmd nutzt einen hochperformanten **Single Page Application (SPA) Router**, der auf vorgenerierten statischen Dateien basiert. Der Browser fängt Link-Klicks ab, ruft nur die nötigen Inhalte im Hintergrund ab und aktualisiert die Seite dynamisch ohne vollständigen Reload. Das bewahrt den Zustand der Sidebar, des Inhaltsverzeichnisses und der Theme-Einstellungen für nahezu sofortige Übergänge.

## Implementierung

Der docmd-SPA-Router verwendet fortschrittliche Techniken, um Sub-100ms-Navigations-Geschwindigkeiten zu erreichen:

### 1. Intent-basiertes Prefetching

Wenn ein Benutzer über einen Navigations-Link hovert, erkennt docmd die Absicht und initiiert einen Background-Fetch der Zielseite. Wenn der Benutzer klickt, befinden sich die Daten oft bereits im Browser-Cache. Übergänge wirken sofortig.

### 2. Partielle DOM-Updates

Statt die gesamte Seite neu zu rendern, aktualisiert docmd intelligent nur die notwendigen Funktionsbereiche:
*   **Hauptinhalt**: Der primäre Markdown-gerenderte Body.
*   **Inhaltsverzeichnis**: Aktualisiert, um zu neuen Headern zu passen.
*   **Navigations-Zustand**: Aktualisiert aktive und aufgeklappte Sidebar-Zustände.

### 3. Lifecycle-Events für benutzerdefinierte Logik

Da der Browser vollständige Reloads vermeidet, feuern Standard-Events wie `DOMContentLoaded` nur einmal. Um benutzerdefiniertes JavaScript nach jeder Navigation auszuführen, hören Sie auf das Event `docmd:page-mounted`.

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const currentPath = event.detail.path;
  console.log(`Erfolgreich navigiert zu: ${currentPath}`);
  
  if (currentPath.includes("/api/")) {
    initApiConsole();
  }
});
```
Weitere Details finden Sie in der Dokumentation zu [Client-seitigen Events](../../api/client-side-events.md).

## Abwägungen

### Skript-Ausführung
Der SPA-Router führt automatisch `<script>`-Tags im Markdown-Body der neuen Seite erneut aus. Globale Skripte, die in Ihrem Theme definiert sind, laufen jedoch nur einmal beim initialen Laden. Verwenden Sie das Event `docmd:page-mounted` für Logik, die auf jeder Seite ausgeführt werden muss.

### SEO und Barrierefreiheit
Trotz SPA-artigem Verhalten generiert docmd für jede Seite eine vollständige `.html`-Datei. Das stellt sicher, dass Suchmaschinen-Crawler vollständige Inhalte sehen und die Site für Benutzer mit deaktiviertem JavaScript funktional bleibt. Das gewährleistet ausgezeichnete SEO- und Accessibility-Standards.