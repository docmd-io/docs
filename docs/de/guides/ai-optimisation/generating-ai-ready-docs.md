---
title: "KI-bereite Dokumentation generieren (llms.txt und mehr)"
description: "KI-bereite Ausgabe generieren."
---

## Problem
Ohne reine Text-APIs scrapen KI-Agenten unsauberes HTML und sprengen Kontextfenster.

## Warum es wichtig ist
Token-optimierte Dokumente sind das KI-Äquivalent von REST-APIs.

## Ansatz
Das `@docmd/plugin-llms` generiert nativ den `llms.txt` Standard.

## Implementierung
Setzen Sie in `docmd.config.js` `plugins: { llms: { fullContext: true } }`. Dies generiert Zusammenfassungen und Volltexte. Setzen Sie `llms: false` im Frontmatter für interne Seiten.

## Kompromisse
Große Sites erzeugen Dateien (>10MB), die KIs überlasten können.
