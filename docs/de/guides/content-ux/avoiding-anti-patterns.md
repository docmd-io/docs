---
title: "Vermeidung gewöhnlicher Doku Anti-Pattern"
description: "Typische Antipattern beim Schreiben."
---

## Problem
Teams lösen Probleme, die das SEO und die Erfahrung auf ewig zerstören (z.B. Click Here Text).

## Warum es wichtig ist
Screen-Reader und Bots zerkauen an blinden Verweisen oder FAQ-Mülldeponien irrelevante Tokens.

## Ansatz
Eliminieren dieser Patterns in den PR Review Zyklen über Tools wie Vale.

## Implementierung
Verbieten Sie "Wall of Imports" als Code in Tutorial Beginn. Vernichten Sie die globale "FAQ.md" Abfallseite. Führen Sie den Inhalt exakt in dem Tutorial zusammen, woran die Frage auftauchte `[General Configuration](../../configuration/general.md)`.

## Kompromisse
Ohne FAQ Page muss die Originaldokumentation dauerhaft aktualisiert und neu verlinkt werden.
