---
title: "Entwurf eigener Startseiten-Landschaften in docmd"
description: "Erstellen eigener Landing Pages."
---

## Problem
Die `index.md` mit Standard-Text sieht beim ersten Blick als reines Text-PDF und nicht als edles Premium Backend aus.

## Warum es wichtig ist
Der Ersteindruck vermittelt Qualität. Eine schlechte Homepage suggeriert miese Codebase.

## Ansatz
Ausbruch aus dem Standard CSS. `noStyle: true` im Yaml oder Grid basierte Landing Setups.

## Implementierung
Tippen Sie das `::: hero` Feature, bauen Sie dreier Karten Grids via `::: grids {cols=3}` und packen Sie die User Welcome Optionen mit Icons darauf ab. 

## Kompromisse
Bei extrem modifizierter Homepage obliegt das responsives CSS Media Verhalten im Dark-Mode dem Schreiberling der Styles.
