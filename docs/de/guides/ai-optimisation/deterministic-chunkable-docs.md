---
title: "Erstellung von deterministischer, zerlegbarer Doku für KI"
description: "Zerlegbare Inhalte für KIs."
---

## Problem
RAG-Architekturen zerteilen Texte nach Tokens (Chunks). Falsche Absatzlängen führen zu abgeschnittenem Kontext.

## Warum es wichtig ist
Verliert ein Chunk eine Fehlerwarnung, baut die KI den fehlenden Code fälschlicherweise in Lösungen ein.

## Ansatz
Gruppieren Sie Warnungen und Code direkt hinter Header-Grenzen.

## Implementierung
Nutzen Sie Header (`##`) als Grenzen der Atomarität. Schieben Sie `::: callout`-Warnungen direkt an die zutreffenden Codes.

## Kompromisse
Es zwingt Autoren, modular statt erzählerisch zu schreiben.
