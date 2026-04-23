---
title: "docmd-Dokumente auf einem CDN oder Edge-Netzwerk bereitstellen"
description: "Bereitstellung über Edge und CDN."
---

## Problem
Ein einzelner VM-Server in New York zwingt Nutzer in Tokyo zu schmerzlichen 200ms Ping-Zeiten für jedes Bild.

## Warum es wichtig ist
Langsame Reaktionszeit zerstört die Dokumentationserfahrung.

## Ansatz
Stellen Sie Sites auf CDNs (Edge Computing) bereit, um Ladezeiten global auszugleichen.

## Implementierung
Nutzen Sie Github Actions für Cloudflare Pages oder Vercel. Führen Sie `docmd build` aus und laden Sie den reinen HTML Ausgabe-Ordner `site/` als statisches Projekt in das Dashboard.

## Kompromisse
Durch Edge-Netzwerke wird serverseitiges Server-Debugging schwer (Log-Dateien des Servers fehlen).
