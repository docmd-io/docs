---
title: "Erstellung ressourcenschonender Doku für Low-End Geräte"
description: "Performance in Emerging Markets."
---

## Problem
Die Nutzung von React-Frameworks zum Darstellen von reiner Dokumentation zerstört Verbindungen in 3G-Netzwerken in Entwicklungsländern.

## Warum es wichtig ist
Wissen sollte barrierefrei verfügbar sein.

## Ansatz
HTML-First Architekturen, ohne Single-Thread Blockierungen im Java-Script-Umfeld.

## Implementierung
Verwenden Sie `docmd`s isomorphe Architektur ohne Javascript-Overhead. Deaktivieren Sie schwere dynamische Libraries (`plugins: { mermaid: false }`), wenn sie für die Seite nicht relevant sind. Tauschen Sie Bilder mit HTML5 `<picture>`-Tags.

## Kompromisse
Sie verlieren optisch beeindruckende Hintergrund-Canvas und Echtzeit-React-Komponenten im Textfluss.
