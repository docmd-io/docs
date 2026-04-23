---
title: "Erweiterung mit benutzerdefinierten docmd-Plugins"
description: "Benutzerdefinierte Plugins generieren."
---

## Problem
Spezifische Probleme wie das Ersetzen von magischem Regex `TODO-VER` durch exakte API Versionsabrufe im Server erfordern Skriptering - kein MD Framework kann so spezifische Aufgaben abdecken.

## Warum es wichtig ist
Fehlt das Hook-System, müssen Sie bash Wrapper zur Korrektur des End HTMLs bauen (sehr hässlich).

## Ansatz
Aufsetzen lokaler Plugin Javascript Nodes und Registrierung zur Modifikation am AST/Output durch docmd Lifecycle Hooks.

## Implementierung
Schreiben von `onRender(html)` Logiken im custom Plugin, welches via der config Node asynchron eingebettet wird.

## Kompromisse
Jegliche Modifikationen im Render Loop verlängern die Ausführzeit enorm. 200 Millisekunden Delay in `onRender` ruinieren den Build Loop über 1000 Pages drastisch.
