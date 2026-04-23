---
title: "Verbessserung von Lesbarkeit und Hierarchie"
description: "Text-Hierarchien herstellen."
---

## Problem
Das Jargon strotzt von Satzzeichen ohne Whitespaces, Redakteure schreiben Dokumentation blind wie Code.

## Warum es wichtig ist
Visuelle Textwüsten verursachen "Skimming" und fatale Überlese-Fehler bei Befehlen.

## Ansatz
Strikt mechanische Regeln, z.B. die "3 Sätze Regal", durchzogen von docmd-Farbcodes.

## Implementierung
Nutzen Sie `::: callout`, und `::: steps` Nummerierungen konsequent, um das Layout aus dem Text zu brechen und Augenanker für schnelle Scans zu ermöglichen.

## Kompromisse
Die Optik kann gelegentlich wie ein Werbeprospekt wirken, wenn man bunte Warnungen zu häufig repetitiv anwendet.
