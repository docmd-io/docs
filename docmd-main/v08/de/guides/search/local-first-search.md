---
title: "Local-First Suchoptimierung"
description: "Wie Sie Ihre Dokumentations-Inhalte für die hochperformante, clientseitige Such-Engine von docmd optimieren."
---

## Problem

Local-First-Suchmaschinen laufen vollständig im Browser. Sie liefern sofortige Ergebnisse ohne Server-Roundtrip. Allerdings sind sie durch Browser-Speicher und Prozessorlimits eingeschränkt. Ein nicht optimierter Suchindex verbraucht übermäßig viel RAM. Das führt dazu, dass der Browser-Tab ruckelt oder abstürzt, insbesondere auf mobilen Geräten.

## Warum es wichtig ist

Eine nahtlose Sucherfahrung ist entscheidend für die Produktivität. Wenn das Suchtool Performance-Probleme oder Speicher-Bloat verursacht, wird es von Benutzern nicht mehr verwendet. Inhalte für Local-First-Suche zu optimieren stellt sicher, dass Dokumentation auf allen Geräten und unter allen Netzwerkbedingungen schnell, reaktiv und zuverlässig bleibt.

## Ansatz

Das [Search-Plugin](../../plugins/search.md) von docmd verwendet eine Build-Time-Extraction-Pipeline, um einen optimierten Index zu erstellen. Durch das Beschneiden unnötiger Daten und die Konzentration auf hochwertige semantische Felder ist der resultierende Index umfassend und leichtgewichtig.

## Implementierung

### 1. Build-Time-Extraction

Während des Build-Prozesses verarbeitet docmd Markdown-Dateien, um relevanten Text für die Indexierung zu extrahieren. Es entfernt automatisch:
*   HTML-Tags und strukturelles Boilerplate.
*   Markdown-Syntaxzeichen ohne semantischen Wert.
*   Reine Formatierungselemente, die den Index aufblähen.

Das stellt sicher, dass der Indexer nur sauberen, bedeutungsvollen Text erhält, was die finale Indexgröße deutlich reduziert.

### 2. Strategische Indexierung mit Frontmatter

Verwenden Sie [Frontmatter](../../content/frontmatter.md), um explizit zu steuern, wie eine Seite indexiert wird. Wenn eine Seite repetitive Daten (etwa rohe JSON-Logs) enthält, die für die Suche nicht nützlich sind, indexieren Sie nur die Header und Metadaten.

```yaml
---
title: "API-Log-Referenz"
search:
  indexBody: false  # Nur Titel und Header indexieren
---
```

### 3. Clientseitiges Speicher-Management

docmd verwaltet den Lebenszyklus des Suchindex im Browser sorgfältig. Es verwendet eine On-Demand-Loading-Strategie. Die Such-Engine wird erst initialisiert, wenn der Benutzer zum ersten Mal mit ihr interagiert. Das hält den initialen Seitenlade-Footprint klein und schont Systemressourcen.

## Abwägungen

Aggressives Beschneiden von Inhalten aus dem Suchindex (z. B. das Ausschließen großer Code-Blöcke) kann dazu führen, dass Nischen-Treffer fehlen. Sie müssen die Notwendigkeit eines leichtgewichtigen Index mit einer gründlichen Suchabdeckung abwägen. Wir empfehlen, Header und konzeptionelle Beschreibungen zu priorisieren, da dies die häufigsten Suchziele sind.
