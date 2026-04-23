---
title: "Migration der Dokumentation von Docusaurus zu docmd"
description: "Migration von Docusaurus."
---

## Problem
Aufgeblähte Webpacks, lahmes Building und harte React Runtime-Sperren stören den effizienten Workflow in Docusaurus.

## Warum es wichtig ist
Die Beibehaltung der alten Markup Notation sichert Textbestand.

## Ansatz
Ersetzen Sie Admonitions und löschen Sie explizite React-Injektionen aus *.mdx zu reinem Markdown.

## Implementierung
Das `:::note` Konstrukt in Docusaurus wandert in `docmd` als `::: callout info`. Führen Sie `find/replace` aus. Menüs konvertieren Sie vom JS Object aus zu `navigation.json`.

## Kompromisse
Vollständiger Verlust dynamischer JS Logs und Logic Loops im reinen `.md` Modus.
