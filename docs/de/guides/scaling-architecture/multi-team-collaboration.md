---
title: "Strukturierung der Dokumentation für Team-Zusammenarbeit"
description: "Ein Leitfaden zur Team-Zusammenarbeit."
---

## Problem
Unterschiedliche Teams (Frontend, Backend) überschreiben oftmals gegenseitig Navigationsstrukturen und Link-Pfade.

## Warum es wichtig ist
Reibung führt zu isolierten Wikis und zerstört das Nutzererlebnis.

## Ansatz
Nutzen Sie das dezentrale `navigation.json` von `docmd`, sodass jedes Team seinen eigenen Bereich steuert.

## Implementierung
Teilen Sie die Besitzverhältnisse durch Unterordner, die jeweils ihr eigenes `navigation.json` enthalten, und steuern Sie nur die Menüleiste über `docmd.config.js` `[Configuration](../../configuration/general.md)`.

## Kompromisse
Relative Links über Domänengrenzen hinweg sind gefährlich, nutzen Sie absolute Root-Links.
