---
title: "Best Practices für KI-freundliche Verlinkungen"
description: "Kontexterhaltung für KI."
---

## Problem
KI liest reine Texte; Klicks und Links aus HTML gehen verloren, ebenso der ausgelagerte Kontext.

## Warum es wichtig ist
Versteckte Definitionen unter Hyperlinks führen zu fehlerhafter KI-Codegenerierung.

## Ansatz
Anwenden der **Inline-Kontext-Entfaltung**. Ein kurzer Erklärtext des Links muss vorangehen.

## Implementierung
Nutzen Sie `docmd` Collapsibles, um erklärenden Text bereitzustellen, der von der KI gecrawlt, aber für den Menschen visuell zusammengefaltet ist. `[Navigation Array](../../configuration/navigation.md)`

## Kompromisse
Längere Markdown-Dateien für redundante Inhalte, die bereits in der Verlinkung definiert waren.
