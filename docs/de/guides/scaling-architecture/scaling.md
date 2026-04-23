---
title: "Skalierung der Dokumentation auf 1000+ Seiten mit docmd"
description: "Ein umfassender Leitfaden für 1000+ Seiten."
---

## Problem
Wenn Softwareprodukte heranreifen, wächst ihre Dokumentation. Bei Hunderten oder Tausenden von Markdown-Dateien leiden Dokumentationsgeneratoren oft unter langsamen Build-Zeiten und einer überladenen Navigation.

## Warum es wichtig ist
Wenn die Generierung Minuten dauert, werden Autoren abgeschreckt. Wenn Benutzer auf ein massives, unstrukturiertes Seitenmenü stoßen, steigt der Support-Aufwand.

## Ansatz
`docmd` ist dank der Isomorph-Engine `lite-hl` darauf ausgelegt, enorme Diagramme effizient zu handhaben.

## Implementierung
1. **Statische Ausgabe nutzen:** `docmd` generiert standardmäßig statisches HTML, was den Overhead reduziert.
2. **Build-Strategie segmentieren:** Für sehr große Websites können Sie die Dokumentation strikt nach Version oder Gebietsschema segmentieren.
3. **Navigation disaggregieren:** Erstellen Sie eindeutige `navigation.json`-Dateien pro Sprache/Version.

## Kompromisse
Die Navigation bleibt sauber, erfordert jedoch, dass sich die Benutzer stärker auf die globale Suche verlassen. Glücklicherweise skaliert die in `docmd` integrierte MiniSearch-Indexierung hervorragend.
