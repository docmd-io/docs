---
title: "JS-Payload reduzieren"
description: "Wie Sie durch Optimierung Ihrer JavaScript-Abhängigkeiten und Nutzung der Zero-Framework-Architektur von docmd eine performante Dokumentations-Site erhalten."
---

## Problem

Viele moderne Dokumentations-Tools verlassen sich auf schwere JavaScript-Frameworks (wie React oder Vue), um statischen Text zu rendern. Diese Frameworks fügen der initialen Seite mehrere hundert Kilobytes hinzu. Der Browser muss große Code-Mengen herunterladen, parsen und ausführen, bevor die Site vollständig interaktiv ist. Das führt zu langen Ladezeiten und "Ghost-Clicks" auf Low-End-Geräten.

## Warum es wichtig ist

Ein großes JavaScript-Payload wirkt sich direkt auf die "Time to Interactive" (TTI) aus. In technischer Dokumentation brauchen Benutzer schnell Antworten. Jede durch schwere Framework-Initialisierung verursachte Verzögerung ist eine erhebliche Usability-Barriere. Ein kleines Payload zu halten stellt sicher, dass Suche, Navigation und Theme-Wechsel sofort erfolgen.

## Ansatz

docmd verwendet eine **Zero-Framework**-Architektur für seine clientseitige Kernlogik. Durch den Einsatz von Vanilla JavaScript und nativen Browser-APIs statt eines schweren Virtual DOM halten wir das gesamte JS-Payload für eine Standard-Site unter **20KB**. Diese leichtgewichtige Grundlage gewährleistet maximale Performance auf allen Geräten.

## Implementierung

### 1. Native Browser-APIs verwenden

Vermeiden Sie den Import schwerer Libraries wie jQuery oder Lodash für einfache Aufgaben. Moderne Browser verfügen über zuverlässige native APIs, die nahezu jede dokumentationsbezogene Anforderung ohne Overhead erfüllen.

```javascript
  // Eigene Skripte in docmd.config.json hinzufügen
  customJs: ["/static/js/my-custom-logic.js"]
```

### 2. Strategisches Plugin-Management

Während [Plugins](../../plugins/usage.md) leistungsstarke Features hinzufügen, erhöhen einige Ihr JavaScript-Payload erheblich. Beispielsweise benötigt das [Mermaid-Plugin](../../plugins/mermaid.md) eine große clientseitige Library, um Diagramme zu rendern. Aktivieren Sie schwere Plugins nur, wenn sie für Ihre Inhalte unerlässlich sind.

### 3. Nicht-kritische Skripte deferieren

Wenn Sie Drittanbieter-Services wie Analytics oder Feedback-Widgets einbinden, stellen Sie sicher, dass sie asynchron oder deferred geladen werden. Das verhindert, dass sie das Rendering Ihrer Dokumentation blockieren.

```html
<!-- In Ihrer benutzerdefinierten Head-Injektion -->
<script src="https://analytics.com/script.js" async defer></script>
```

### 4. Assets optimieren

Stellen Sie sicher, dass jedes von Ihnen bereitgestellte JavaScript minifiziert und komprimiert ist. docmd übernimmt die Minification seiner Kern-Assets, aber Sie sind für die Optimierung aller Dateien verantwortlich, die Sie in Ihrem `static/`-Verzeichnis hinzufügen.

## Abwägungen

Komplexe interaktive Features mit Vanilla JavaScript zu bauen erfordert mehr manuellen Aufwand als die Verwendung eines deklarativen Frameworks. Für Dokumentation jedoch — wo 95 % der Inhalte statischer Text und Bilder sind — überwiegen die Performance-Gewinne eines Zero-Framework-Ansatzes bei Weitem den Komfort eines schweren Frameworks.