---
title: "Dokumentation für Sub-100ms-Navigationsgeschwindigkeiten optimieren"
description: "Sub-100ms Navigationsgeschwindigkeit."
---

## Problem
Vollständige Seiten-Neuaufbauten (White Flash) unterbrechen den Lesefluss enorm.

## Warum es wichtig ist
Entwickler springen permanent zwischen APIs und Erläuterungen. Kognitive Unterbrechungen schwächen die Erfahrung ab.

## Ansatz
Nutzen Sie den `docmd` Client-Side SPA Router auf Grundlage vorgerenderter Dateien.

## Implementierung
`docmd` leitet durch prefetching im Hintergrund das nächste HTML Dokument ein (`prefetchHTML`), wenn der Hovering-Status der Sidebar anliegt, so dass der Link instantan verfügbar ist.

## Kompromisse
Ein SPA-Router führt Skripte im Head beim Routewechsel nicht zwangsläufig neu aus. Sie müssen Lifecycle Events einbinden (wie `docmd:page-mounted`).
