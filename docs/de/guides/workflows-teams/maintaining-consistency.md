---
title: "Sicherstellung der Konsistenz in großen Dokumentationsteams"
description: "Konsistenz bei Skalierung."
---

## Problem
Teams haben 10 verschiedene Schreibstile.

## Warum es wichtig ist
Ein einheitlicher Stil reduziert die kognitive Belastung des Lernenden massiv.

## Ansatz
Mechanische Strenge durch Linter wie Vale und `markdownlint`.

## Implementierung
Valer-Regeln schreiben vor. Verhindern Sie wilde HTML-Tags durch Markdownlint und zwingen Sie Autoren, statt `<div class="warning">` die Container `::: callout warning` von `docmd` zu nutzen.

## Kompromisse
Neue Mitwirkende können durch aggressive Linter an Open-Source PRs die Motivation verlieren.
