---
title: "Hinzufügen unternehmenseigener Fonts"
description: "Eigene Schriften und Marken in docmd integrieren."
---

## Problem
Der Default Font "inter/sans-serif" ist performant, jedoch fehlt ihm das Flair einer bestimmten Marke.

## Warum es wichtig ist
Wenn die Homepage Corporate Identity Lila nutzt, sollte die Dokumentation dies gleichermaßen strahlen.

## Ansatz
Nutzung der CSS Variable Definitions Datei, um das docmd Root Rendering farblich und typografisch zu erdrücken.

## Implementierung
Ein `theme.css` auf den `assets/` bereitstellen. `--color-primary` sowie `--font-family-sans` mit Werten bespicken. Binden Sie das in der Konfiguration als Array der `customCss` ein.

## Kompromisse
Schriften verursachen spürbare Renderdelays durch WOFF2 Netzwerklasten beim Page Request (FCP).
