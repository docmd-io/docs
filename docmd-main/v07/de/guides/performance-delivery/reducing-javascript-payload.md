---
title: "JS-Payload reduzieren"
description: "So erhalten Sie eine leistungsstarke Dokumentations-Website, indem Sie Ihre JavaScript-Abhängigkeiten optimieren und die Zero-Framework-Architektur von docmd nutzen."
---

## Problem

Viele moderne Dokumentationswerkzeuge verlassen sich auf schwere JavaScript-Frameworks (wie React oder Vue), nur um statischen Text zu rendern. Diese Frameworks können mehrere hundert Kilobyte zu Ihrer initialen Seitenlast hinzufügen und zwingen den Browser dazu, große Mengen an Code herunterzuladen, zu parsen und auszuführen, bevor die Seite vollständig interaktiv wird. Dies führt zu langsamen Ladezeiten und "Ghost-Clicks" auf leistungsschwächeren Geräten.

## Warum es wichtig ist

Ein großer JavaScript-Payload beeinflusst direkt die "Time to Interactive" (TTI). In der technischen Dokumentation, wo Benutzer schnell Antworten benötigen, ist jede Verzögerung durch eine schwere Framework-Initialisierung eine erhebliche Hürde für die Benutzerfreundlichkeit. Wenn Sie Ihren Payload klein halten, stellen Sie sicher, dass Suche, Navigation und Theme-Wechsel von dem Moment an, in dem die Seite erscheint, augenblicklich funktionieren.

## Ansatz

`docmd` verwendet eine **Zero-Framework-Architektur** für seine Kern-Client-Logik. Durch die Nutzung von Vanilla JavaScript und nativen Browser-APIs anstelle eines schweren virtuellen DOM halten wir den gesamten JS-Payload für eine Standard-Website unter **20 KB**. Dieses leichtgewichtige Fundament gewährleistet maximale Performance auf allen Geräten und unter allen Netzwerkbedingungen.

## Implementierung

### 1. Native Browser-APIs nutzen

Vermeiden Sie den Import schwerer Bibliotheken wie jQuery oder Lodash für einfache Aufgaben. Moderne Browser verfügen über robuste native APIs, die fast jede dokumentationsbezogene Anforderung ohne Overhead bewältigen können.

```javascript
// docmd.config.js
export default {
  // ✅ Nutzen Sie ein kleines, zweckgebundenes Skript anstelle einer schweren Bibliothek
  customJs: ['/static/js/meine-eigene-logik.js']
};
```

### 2. Strategisches Plugin-Management

Während [Plugins](../../plugins/usage) leistungsstarke Funktionen hinzufügen, können einige Ihren JavaScript-Payload erheblich vergrößern. Zum Beispiel benötigt das [Mermaid-Plugin](../../plugins/mermaid) eine große clientseitige Bibliothek, um Diagramme zu rendern. Aktivieren Sie schwere Plugins nur, wenn sie für Ihren Inhalt essenziell sind, und berücksichtigen Sie deren Auswirkungen auf das Gesamtgewicht der Seite.

### 3. Nicht-kritische Skripte verzögert laden

Wenn Sie Drittanbieter-Dienste wie Analytics oder Feedback-Widgets einbinden müssen, stellen Sie sicher, dass diese asynchron oder verzögert geladen werden, damit sie das Rendering Ihrer Dokumentation nicht blockieren.

```html
<!-- In Ihrer benutzerdefinierten Head-Injektion -->
<script src="https://analytics.com/script.js" async defer></script>
```

### 4. Assets optimieren

Stellen Sie sicher, dass jedes von Ihnen bereitgestellte benutzerdefinierte JavaScript minifiziert und komprimiert ist. `docmd` übernimmt die Minifizierung seiner Kern-Assets, aber Sie sind für die Optimierung aller Dateien verantwortlich, die Sie Ihrem `static/`-Verzeichnis hinzufügen.

## Abwägungen

Das Erstellen komplexer interaktiver Funktionen mit Vanilla JavaScript kann mehr manuellen Aufwand erfordern als die Verwendung eines deklarativen Frameworks. Für die Dokumentation jedoch – wo 95 % des Inhalts aus statischem Text und Bildern bestehen – überwiegen die Performance-Vorteile eines Zero-Framework-Ansatzes bei weitem die Bequemlichkeit eines schweren Frameworks.
