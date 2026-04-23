---
title: "Nutzung von docmd mit bestehenden Markdown-Repositories"
description: "Vorhandene Repos verwenden."
---

## Problem
Die Umstellung alter Obsidian Vaults auf ein neues Doku-Konstrukt benötigt sonst hunderte Skript-Arbeitsstunden.

## Warum es wichtig ist
Tool-Lock-in verhindert Innovationen. Die Maschine sollte sich Ihren Daten anpassen.

## Ansatz
Keine Konfiguration. `docmd` iteriert ohne weiteres Setup.

## Implementierung
Wechseln Sie in das Verzeichnis. rufen Sie `npx @docmd/core dev` auf. Fehlende `navigation.json` bedingen eine automatische Erfassung aller Markdown Dateien auf Basis alphabetischer Sortierungen. 

## Kompromisse
Automatische Sidebars sind alphabetisch und starr. Für professionellen Einsatz wird eine manuelle Steuerung stets empfohlen.
