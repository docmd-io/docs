---
title: "Nutzung von docmd neben anderen Dokumentationswerkzeugen"
description: "Zusammenspiel unterschiedlicher Tools."
---

## Problem
Unternehmen nutzen gleichzeitig Confluence für Docs, Stoplight für Swagger und docmd für Tutorials. Ohne Brückenschlag verliert der User die Orientierung.

## Warum es wichtig ist
Der Entwickler-Fluss bricht beim Domainwechsel radikal ab.

## Ansatz
Nutzen Sie explizite Embedded Iframes und einheitliche Menübänder über Subdomains hinweg.

## Implementierung
Integrieren Sie exakte Webapp IDs in Iframes. Bilden Sie über die Master `docmd.config.js` in der `layout.menubar` absolute Hyperlinks auf Stoplight API Instanzen ab, damit der Sprung nathlos gelingt. 

## Kompromisse
Iframes in Mobil Ansichten verbergen das Scrolling unangenehm. docmd Offline Search funktioniert über externe Ressourcen nicht.
