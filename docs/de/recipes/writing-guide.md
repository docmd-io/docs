---
title: "Rezept: Standards für technisches Schreiben"
description: "Best Practices für die Erstellung von klarer, scanbarer und KI-optimierter Dokumentation."
---

Qualitativ hochwertige Dokumentation zeichnet sich durch architektonische Klarheit und Scanbarkeit aus. Dieser Leitfaden beschreibt die professionellen Standards für die Nutzung von `docmd`-Funktionen, um die Erfahrung für Mensch und Maschine zu optimieren.

## Scanbarkeit & semantische Dichte

Technische Benutzer lesen Dokumentationen selten linear; sie scannen nach spezifischen Lösungen.

*   **Beschreibende semantische Überschriften**: Vermeiden Sie generische Titel. Verwenden Sie „Initialisierung der Produktions-Pipeline“ anstelle von „Start“.
*   **Prägnante Absätze**: Fassen Sie einzelne Konzepte in Blöcken von 2-3 Sätzen zusammen, um eine kognitive Überlastung zu vermeiden.
*   **Lexikalische Hervorhebung**: Nutzen Sie **Fettdruck** für wichtige Fachbegriffe, Dateipfade und Terminalbefehle, um sicherzustellen, dass diese beim schnellen Scannen hervorstechen.

## Strategie für interaktive Container

`docmd` bietet spezialisierte UI-Blöcke. Setzen Sie diese bewusst ein, um das mentale Modell Ihres Dokuments zu verstärken.

### Callouts vs. Cards
*   **Callouts (Hinweise)**: Verwendung für Zusatzinformationen außerhalb des Hauptflusses. `tip` für Performance-Abkürzungen, `warning` für vorsichtige Logik und `danger` für kritische Breaking Changes.
*   **Cards (Strukturblöcke)**: Verwendung für die Gruppierung von Inhalten innerhalb des Hauptflusses. Karten sind ideal für Feature-Zusammenfassungen auf einer Landingpage oder zum Gruppieren verwandter Konfigurationsschlüssel.

### Sequenzielle Workflows
Wenn Sie ein mehrstufiges Verfahren dokumentieren, verwenden Sie immer den `::: steps`-Container. Dies bietet eine visuelle Zeitachse, die sowohl für Menschen als auch für KI-Agenten wesentlich besser lesbar ist als eine standardmäßige nummerierte Liste.

## Hochwertige Verlinkung

Der SPA-Router von `docmd` ermöglicht eine sofortige Navigation ohne Neuladen. Erhalten Sie dieses Erlebnis durch zuverlässige Referenzierung:

*   **Dateisystem-bewusste Pfade**: Verwenden Sie immer relative Pfade zu Ihren Quell-`.md`-Dateien (z. B. `../core/engine.md`). Dies gewährleistet die Integrität der Links in IDEs, lokalen Dev-Servern und Produktions-Builds.
*   **Beschreibende Anker**: Vermeiden Sie „Mehr lesen“. Nutzen Sie aussagekräftige Deskriptoren wie „[Analysieren Sie die Browser-API-Referenz](/api/browser-api)“.

## Professionalität bei Code-Blöcken

*   **Explizite Sprachkennzeichnung**: Geben Sie immer die Sprachkennung an (z. B. ` ```typescript `). Dies ermöglicht sowohl ein genaues Syntax-Highlighting als auch ein zuverlässiges KI-Parsing.
*   **Automatisierte Portabilität**: `docmd` fügt jedem Code-Block automatisch interaktive Kopierschaltflächen hinzu; bevorzugen Sie prägnante, sofort ausführbare Snippets, um den Nutzen für Entwickler zu maximieren.