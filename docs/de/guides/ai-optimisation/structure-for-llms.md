---
title: "Wie man Dokumentation für LLMs strukturiert"
description: "Ein Leitfaden für KI-Struktur."
---

## Problem
LLMs konsumieren reinen Text. Ohne semantische Hierarchie fällt es der KI schwer, Abhängigkeiten zu erkennen.

## Warum es wichtig ist
Schlechte Semantik führt zu Halluzinationen von KI-Codierungsassistenten und verärgert Ihre Entwickler.

## Ansatz
Wechseln Sie zur "semantischen Strukturierung" anstatt optischer Formatierung. Nutzen Sie `llms-full.txt` von `docmd`.

## Implementierung
Verwenden Sie korrekte Header-Reihenfolgen (kein Auslassen von Ebenden), aussagekräftige Alt-Texte für Bilder (`../../assets/favicon.ico`) und spezifische Code-Block-Sprachen (`json` statt nichts).

## Kompromisse
Autoren müssen disziplinierter sein und Standard-Querverweise als HTML vermeiden.
