---
title: "Implementierung eigener Favicons und Metadaten"
description: "Anpassung der Head Attribute und Icons."
---

## Problem
Auf Social-Media Slack Kanälen sehen URLs der Standard-Doku wie unfertige Text-Wüsten ohne Thumbnails aus.

## Warum es wichtig ist
Links müssen Autorität bei Lesern erzeugen. Eigene Favicons erlauben die dauerhafte Speicherung der Doku-URL als erkennbarer Tab im Browser.

## Ansatz
Injection durch die Kopf Konfiguration des `docmd` Systems sowie individuelle Frontmatter Injections für OG Tags.

## Implementierung
Die Tags werden dem Array in der `docmd.config.js` direkt ins `head:` gehängt. Besondere Blog Artikel laden ihre Vorschau per `image:` Frontmatter Parameter.

## Kompromisse
Der Wechsel von Icons in den `assets/` muss immer manuell in das Skript rückübersetzt werden.
