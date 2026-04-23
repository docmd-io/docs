---
title: "Entwurf von Dokumentation für schnelle und genaue Suchergebnisse"
description: "Geschwindigkeit und Genauigkeit bei Suchen."
---

## Problem
Ein monströser JSON-Suchindex blockiert den Browser-Thread beim Download.

## Warum es wichtig ist
"Time to Answer" ist entscheidend. 4 Sekunden warten auf einen JSON-Index ruiniert die Erfahrung.

## Ansatz
Die Indexgröße muss klein gehalten werden, durch Scoping und gezielte Eliminierung nutzloser Felder.

## Implementierung
Nutzen Sie `docmd`s MiniSearch. Schließen Sie Dateien mit `search: false` per Frontmatter aus und verlasen Sie sich auf Lazy-Loading beim Drücken von `Cmd+K`.

## Kompromisse
Ausgeschlossene Seiten sind gar nicht auffindbar. Lazy-Loading kann im Bruchteil einer Sekunde stottern.
