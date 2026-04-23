---
title: "Integration von docmd mit GitHub Actions (CI/CD)"
description: "Github Actions CI/CD Pipeline."
---

## Problem
Dokumentationen von lokalen Rechnern aus hochladen resultiert in Fehlversionen bei NodeJS Versionen.

## Warum es wichtig ist
Änderungen sollen per PR automatisiert in Minuten weltweit ausgerollt sein.

## Ansatz
GitHub Actions Build und Upload nach Github Pages.

## Implementierung
Workflow `.github/workflows/docs.yml`. Installieren Sie das Framework (`npm i -g @docmd/core`), rufen Sie `docmd build` auf, und laden Sie via `peaceiris/actions-gh-pages` das `site/` Verzeichnis bei Github hoch.

## Kompromisse
Ausfallrisiken liegen ausschließlich an der Up-Time von Github. Token der Deployments müssen gewartet werden.
