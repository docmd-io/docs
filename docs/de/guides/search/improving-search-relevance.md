---
title: "Verbesserung der Suchrelevanz durch strukturiertes Markdown"
description: "Relevanz und Struktur."
---

## Problem
Generic Header wie "Schritt 1" führen zu geringer Suchrelevanz in der Auswertung von Suchmaschinen.

## Warum es wichtig ist
Suchmaschinen priorisieren strukturierte Begriffe. Ohne diese enden Ergebnisse auf Seite 3.

## Ansatz
Verwenden Sie Semantik in Headern und Frontmatter. Thementitel > Textkörper.

## Implementierung
Verwenden Sie Aliase in `keywords: ["aws", "cloud"]` und semantische Header (`## AWS S3 Setup` statt `## Setup`). Nutzen Sie `<strong>` (Fett) sparsam für Schlüsselthemen.

## Kompromisse
Keywords müssen gepflegt werden, fette Texte können die Ästhetik im reinen Text stören.
