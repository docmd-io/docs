---
title: "Caching-Strategien für statische Dokumentationsseiten"
description: "Ein umfassender Leitfaden zu Caching."
---

## Problem
Ohne sauberes Cache-Control laden Browser dutzende Megabytes bei jedem erneuten Besuch neu.

## Warum es wichtig ist
Kosten und Nutzergeduld. Rückkehrende Nutzer leiden extrem.

## Ansatz
Implementieren Sie **Unveränderliches Caching** für Assets in Kombination mit Etag Revalidation.

## Implementierung
Nutzen Sie `docmd deploy --nginx`. Das exportierte NGINX konfiguriert `expires 1y` für Assets mit deterministischem Finderprinting, und erzwingt HTML zur permanenten Statusprüfung (`must-revalidate`).

## Kompromisse
Wenn Fingerabdruck-Dateinamen falsch konfiguriert werden, sehen Anwender 1 Jahr alte Dateien. docmd übernimmt diese Aufgabe.
