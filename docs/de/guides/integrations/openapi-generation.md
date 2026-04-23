---
title: "API-Referenz von OpenAPI mit docmd generieren"
description: "Anleitung zur OpenAPI Integration."
---

## Problem
Manuelle API Definitionen enden binnen Wochen als Veraltungsobjekte, welche nicht mehr zur Backend-Codierung passen.

## Warum es wichtig ist
Fehlerhafte APIs führen unweigerlich zu fehlschlagenden Endnutzer-Integrationen.

## Ansatz
Konvertieren Sie via Pipeline `swagger.json` asynchron in docmd Markdown. 

## Implementierung
Ergänzen Sie `package.json` um einen Widdershins-Befehl vor dem Build, um Markdown zu erzeugen (`prebuild: npx widdershins ...`). Versehen Sie Endseiten idealerweise via Frontmatter mit `layout: "fullscreen"`, da tabellarische JSON Daten Breite benötigen.

## Kompromisse
Generiertes Markdown liest sich starr; es ersetzt Referenzen, aber keine handgeschriebenen "Getting Started" Tutorials.
