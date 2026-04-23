---
title: "Migration der Dokumentation von MkDocs zu docmd"
description: "Migration von Mkdocs."
---

## Problem
Python-basierte Abhängigkeiten auf reinen Web-Umgebungen in Nodes stören CI Pipelines.

## Warum es wichtig ist
Synergien zwischen Front-End-Architekten (JS) und Doku (Python) herzustellen bereitet Schmerzen.

## Ansatz
Umstellung zum Node-basierten docmd unter Verlust von Jinja-Templates.

## Implementierung
`mkdocs.yml` YAML Strukturen werden nativ js in `docmd.config.js`. Callouts (`!!! warning`) ändern sich in `::: callout warning`. Veraltene Mike-Plugins entfallen, da Versionsunterstützung in docmd enthalten ist.

## Kompromisse
MkDocs-Material ist extrem ausgebaut; docmd mag auf ganz ferne Spezial-Plugins noch verzichten.
