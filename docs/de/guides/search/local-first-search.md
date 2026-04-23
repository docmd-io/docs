---
title: "Optimierung von Dokumentationsinhalten für Local-First Suchmaschinen"
description: "Local-First Optimierung."
---

## Problem
Local-first Wasm/Javascript Suchmaschinen im Browser leiden an Speicherlimits. Riesige Markdown Code-Blöcke führen zu RAM-Abstürzen.

## Warum es wichtig ist
Abstürze bei Mobile-Nutzungen ruinieren das Vertrauen in die Dokumentation.

## Ansatz
Bereinigen Sie den Index vor der Kompilierung. Beschränken Sie das Indexieren dicker JSON-Graphen.

## Implementierung
`docmd` bereinigt HTML, Verlinkungen und Callouts vollautomatisch vor dem Indizieren. Begrenzen Sie per Konfiguration Code-Elemente (`excludeSelectors`).

## Kompromisse
Genaue API-Suchbegriffe verschwinden teilweise aus dem Index zugunsten von Stabilität und Leistung.
