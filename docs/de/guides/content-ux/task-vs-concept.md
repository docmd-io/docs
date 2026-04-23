---
title: "Aufgabenorientiertes gegen konzeptorientiertes Schreiben"
description: "Diataxis Modell in Documentations."
---

## Problem
Das Vermischen eines tiefgreifenden Erklärers "Wieso Keys wichtig sind" mit dem Tutorial "So erzeugen sie Keys".

## Warum es wichtig ist
Panische Entwickler im Crashdown lesen keine abstrakten Thesen zu Modellen, sie brauchen den CLI Befehl.

## Ansatz
Kapselung via der Diataxis Form. 'How-to' wird strickt von abstrakter 'Explanation' physisch im MD Dateisystem getrennt.

## Implementierung
Schreiben Sie ein "How To Create Key.md" absolut frei von Theologie, versehen Sie dies mit einem finalen Querverweis ("Warum machen wir das?" -> `[Configuration System](../../configuration/general.md)`).

## Kompromisse
Die Anzahl an Markdown Source Dateien verdoppelt sich praktisch in großen Setups.
