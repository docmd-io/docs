---
title: "Entwurf einer skalierbaren Ordnerstruktur für große Projekte"
description: "Ein umfassender Leitfaden zur Ordnerstruktur."
---

## Problem
Eine flache oder willkürlich verschachtelte Ordnerstruktur wird mit der Zeit unmöglich zu pflegen.

## Warum es wichtig ist
Eine unorganisierte Ordnerstruktur überträgt sich direkt auf die Benutzererfahrung und das Routing.

## Ansatz
Verwenden Sie ein Informationsarchitektur-Framework wie Diátaxis, das streng auf Ihr Dateisystem abgebildet ist, kombiniert mit dem dateibasierten Routing von `docmd`.

## Implementierung
Verschachteln Sie Ihre Ordner semantisch (z.B. tutorials/, guides/, reference/) und trennen Sie so die logischen Konzepte physisch auch im `navigation.json`.

## Kompromisse
Strikte Frameworks haben eine Lernkurve. Technische Redakteure könnten Schwierigkeiten bei der Kategorisierung haben.
