---
title: "Sub-100ms Navigation"
description: "Wie der native SPA-Router von docmd und das intentionsbasierte Prefetching sofortige Seitenübergänge für ein optimales Leseerlebnis ermöglichen."
---

## Problem

Herkömmliche Multi-Page-Navigation, bei der jeder Klick auf einen Link ein vollständiges Neuladen des Browsers auslöst, erzeugt ein störendes "weißes Blinken" und unterbricht den Lesefluss. Der Browser muss den aktuellen Status verwerfen, neues HTML anfordern und CSS sowie JavaScript neu parsen – selbst wenn sich nur der zentrale Inhaltsbereich geändert hat.

## Warum es wichtig ist

Dokumentationsbenutzer springen häufig zwischen verschiedenen Abschnitten wie Tutorials, API-Referenzen und konzeptionellen Anleitungen hin und her. Wenn jeder Übergang eine Sekunde oder länger dauert, führt dies zu kognitiver Reibung und entmutigt eine gründliche Exploration. Eine sofortige Navigation sorgt dafür, dass sich die Dokumentation wie eine native Anwendung anfühlt, was die Benutzerzufriedenheit und das Engagement erheblich steigert.

## Ansatz

`docmd` nutzt einen leistungsstarken **Single Page Application (SPA) Router**, der auf vorab generierten statischen Dateien aufbaut. Dies ermöglicht es dem Browser, Klicks auf Links abzufangen, nur die notwendigen Inhalte im Hintergrund abzurufen und die Seite dynamisch zu aktualisieren, ohne sie vollständig neu zu laden. Dieser Ansatz bewahrt den Status der Sidebar, des Inhaltsverzeichnisses und der Theme-Einstellungen, was zu nahezu sofortigen Übergängen führt.

## Implementierung

Der `docmd` SPA-Router ist standardmäßig aktiviert und nutzt mehrere fortschrittliche Techniken, um Navigationsgeschwindigkeiten unter 100 ms zu erreichen:

### 1. Intentionsbasiertes Prefetching

Wenn ein Benutzer mit der Maus über einen Navigationslink fährt, erkennt `docmd` die Absicht zur Navigation und startet im Hintergrund das Abrufen der Inhalte der Zielseite. Bis der Benutzer den Link tatsächlich klickt, sind die Daten oft schon im Browser-Cache verfügbar, wodurch sich der Übergang augenblicklich anfühlt.

### 2. Partielle DOM-Updates

Anstatt die gesamte Seite neu zu rendern, aktualisiert `docmd` intelligent nur die notwendigen Funktionszonen:
*   **Hauptinhalt (Main Content)**: Der primäre, per Markdown gerenderte Textkörper.
*   **Inhaltsverzeichnis (TOC)**: Wird aktualisiert, um den Überschriften der neuen Seite zu entsprechen.
*   **Navigationsstatus**: Aktualisiert die aktiven und ausgeklappten Zustände in der Sidebar.

### 3. Lifecycle-Events für eigene Logik

Da der Browser kein vollständiges Neuladen durchführt, werden Standard-Events wie `DOMContentLoaded` nur einmal ausgelöst. Um nach jeder Navigation eigenen JavaScript-Code auszuführen – wie das Neuinitialisieren eines Drittanbieter-Widgets oder das Tracking von Seitenaufrufen – sollten Sie auf das Event `docmd:page-mounted` hören.

```javascript
// Beispiel: Neuinitialisierung einer eigenen Komponente nach der Navigation
document.addEventListener('docmd:page-mounted', (event) => {
  const currentPath = event.detail.path;
  console.log(`Erfolgreich navigiert zu: ${currentPath}`);
  
  // Eigene Logik hier
  if (currentPath.includes('/api/')) {
    initApiConsole();
  }
});
```
Weitere Details finden Sie in der Dokumentation zu [Client-seitigen Events](../../api/client-side-events).

## Abwägungen

### Skript-Ausführung
Der SPA-Router führt `<script>`-Tags, die sich im Markdown-Textkörper der neuen Seite befinden, automatisch neu aus. Globale Skripte, die in Ihrem Theme oder Layout definiert sind, laufen jedoch nur einmal beim ersten Laden. Verwenden Sie immer das Event `docmd:page-mounted` für Logik, die auf jeder Seite ausgeführt werden muss.

### SEO und Barrierefreiheit
Trotz des SPA-ähnlichen Verhaltens generiert `docmd` weiterhin eine vollständige, eigenständige `.html`-Datei für jede Seite. Dies stellt sicher, dass Suchmaschinen-Crawler den vollständigen Inhalt sehen können und die Website auch für Benutzer mit deaktiviertem JavaScript funktionsfähig bleibt, was exzellente SEO- und Barrierefreiheitsstandards gewährleistet.
