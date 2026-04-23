---
title: "Versionierung und Release-Workflows für Dokumentationssysteme"
description: "Arbeitsabläufe bei Veröffentlichungen."
---

## Problem
v2 Dokumentationen werden oft auf Live geschoben, bevor v2 Software ausgerollt ist.

## Warum es wichtig ist
Desynchronisation verärgert Nutzer massiv. Die Fakten müssen stimmen.

## Ansatz
Lagern Sie die Entwicklung in Versionen (`docs-next/`) aus und stufen Sie beim Deployment herauf.

## Implementierung
Erstellen Sie in `api.config.js` eine `versions` mit Label `v1.0 (Stable)` auf dem `docs`-Ordner und `v2.0 (Beta)`. Benennen Sie die Ordner bei Release Day synchron zu ihrer Git-Branch-Fusion um.

## Kompromisse
Ein Fix im Text auf `docs` muss gezielt via Cherry-Pick auch im Beta-Ordner `docs-next/` nachgeführt werden.
