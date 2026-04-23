---
title: "Nutzung Git-basierter Workflows"
description: "Git-basiert Beiträge verwalten."
---

## Problem
Direkte Commits in Master brechen Layouts; schwere Strukturen schrecken Mitwirkende ab.

## Warum es wichtig ist
Community-Erweiterungen sterben ab, wenn ein Fehler-Commit 5 Tage Wartezeit bedeutet.

## Ansatz
Fork & PR Modell direkt im Browser.

## Implementierung
Konfigurieren Sie den `editLink` in `docmd.config.js`. Nutzer klicken, Github gabelt und generiert PRs. Kombinieren Sie dies mit `@docmd/plugin-threads` für dezentrale Kommentare.

## Kompromisse
Bei Notfall-Downtime verlangsamen die PR-Regeln unmittelbare Updates.
