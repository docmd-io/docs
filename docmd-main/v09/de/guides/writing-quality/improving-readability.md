---
title: "Lesbarkeit verbessern"
description: "Wie Sie visuellen Rhythmus, Informations-Hierarchie und docmds strukturelle Tools nutzen, um hochlesbare Dokumentation zu erstellen."
---

## Problem

Technische Dokumentation ist oft dicht, jargonlastig und schwer zu scannen. Wenn Leser auf "Textwüsten" ohne visuelle Auflockerung stoßen, überfliegen sie wichtige Details. Dichte Formatierung erhöht die kognitive Reibung, was zu Frustration und potenziellen Fehlern führt.

## Warum es wichtig ist

Lesbarkeit ist eine funktionale Anforderung. Verpasst ein Entwickler eine in einem langen Absatz vergrabene Warnung, können die Konsequenzen gravierend sein. Eine klare Informations-Hierarchie stellt sicher, dass Benutzer Informationen schnell finden, korrekt verstehen und sicher handeln.

## Ansatz

Etablieren Sie einen vorhersehbaren visuellen Rhythmus, indem Sie lange Textabschnitte aufbrechen. Verwenden Sie [thematische Container](../../content/containers/index.md), um kritische Informationen hervorzuheben. Durch Nutzung von docmds eingebauten strukturellen Tools schaffen Sie eine Hierarchie, die das Auge des Lesers natürlich zu den wichtigsten Teilen der Seite führt.

## Implementierung

### 1. Die "Macht der Kürze"

Begrenzen Sie Absätze auf drei oder vier Sätze. Kürzere Absätze sind auf Bildschirmen leichter zu verdauen und bieten "Atemraum" für komplexe technische Konzepte. Fühlt sich ein Absatz zu lang an, brechen Sie ihn in eine Liste auf oder verwenden Sie eine Unterüberschrift.

### 2. Mit Callouts kategorisieren

Verwenden Sie [Callouts](../../content/containers/callouts.md) konsistent, um Informationen zu kategorisieren. Das erlaubt es überfliegenden Benutzern, die Absicht eines Blocks anhand seines visuellen Stils zu erkennen:

*   **Info**: Hintergrund-Kontext oder ergänzende Details.
*   **Tip**: Best Practices, Abkürzungen und "Pro-Tipps".
*   **Warning/Danger**: Kritische Aktionen, die zu Fehlern, Datenverlust oder Sicherheitslücken führen können.

```markdown
::: callout warning "Produktionssicherheit"
    Führen Sie diesen Befehl niemals auf einer Live-Datenbank aus, ohne vorher Backups verifiziert zu haben.
:::
```

### 3. Sequentielle Anleitung mit Steps

Vermeiden Sie für Tutorials narrative Aktionsbeschreibungen. Verwenden Sie stattdessen den [Steps-Container](../../content/containers/steps.md), um eine klare, nummerierte Abfolge zu schaffen.

```markdown
::: steps
    1. **Initialisieren**: Führen Sie `npx @docmd/core init` in Ihrem Projektstamm aus.
    2. **Konfigurieren**: Aktualisieren Sie Ihre `docmd.config.json` mit Site-Titel und Navigation.
    3. **Bauen**: Führen Sie `npx @docmd/core build` aus, um Ihre produktionsreifen statischen Dateien zu generieren.
:::
```

## Abwägungen

Die Verwendung spezialisierter Container wie `::: steps` oder `::: callout` erfordert, dass Mitwirkende docmd-spezifische Markdown-Erweiterungen erlernen. Auch wenn dies eine kleine Lernkurve mit sich bringt, überwiegt die signifikante Verbesserung in Informationsdichte und Klarheit den minimalen Aufwand bei Weitem.