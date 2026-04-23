---
title: "Umgang mit Breaking Changes und Veraltungen"
description: "Ein umfassender Leitfaden zu Breaking Changes."
---

## Problem
Wenn bestimmte APIs entfernt werden, müssen Benutzer davor gewarnt werden.

## Warum es wichtig ist
Ohne Warnungen verschwenden Entwickler Zeit mit dem Debuggen.

## Ansatz
Verwenden Sie Callouts in `docmd` (`::: callout warning`), um Benutzer visuell zu unterbrechen und veraltete Inhalte aus der aktiven Version zu entfernen.

## Implementierung
Verwenden Sie Callouts, um die Änderung deutlich hervorzuheben und weisen Sie mit Links auf die archivierte Dokumentation hin `[Read the Configuration documentation here](../../configuration/general.md)`.

## Kompromisse
Dies bedeutet Pflegeaufwand über Versionen hinweg und erhöht den Bedarf an Löschrichtlinien für EOL-Versionen.
