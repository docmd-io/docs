---
title: "Verwaltung mehrversioniger Dokumentationen (v1, v2) in docmd"
description: "Ein umfassender Leitfaden zu Multi-Version-Docs."
---

## Problem
Software entwickelt sich weiter, aber Unternehmensbenutzer bleiben oft bei älteren LTS-Versionen. 

## Warum es wichtig ist
Ohne Möglichkeit, durch Versionen zu navigieren, wenden Benutzer v2-Anweisungen auf v1 an, was zu Systemfehlern führt.

## Ansatz
`docmd` bietet eine native Versionierungs-Engine. Es isoliert Builds, bewahrt URL-Pfade bei Versionswechseln und begrenzt die Suche auf den aktuellen Kontext.

## Implementierung
Trennen Sie Ordner als `docs/` (für v2) und `docs-v1.x/` (für v1) und definieren Sie diese im Konfigurationsobjekt `versions` in `docmd.config.js`.

## Kompromisse
Künftige Repo-Größen steigen durch das Beibehalten alter Ordner. Bei massiven Coden sollten alte Versionen nur durch CI/CD generiert werden.
