---
title: "Local-First Suchoptimierung"
description: "So optimieren Sie Ihre Dokumentationsinhalte für die leistungsstarke, clientseitige Suchmaschine von docmd."
---

## Problem

Local-First-Suchmaschinen laufen vollständig im Browser und liefern sofortige Ergebnisse ohne Server-Umweg. Das bedeutet jedoch auch, dass sie durch den Speicher und die Rechenleistung des Browsers begrenzt sind. Wenn ein Suchindex nicht ordnungsgemäß optimiert ist, kann er übermäßig viel RAM verbrauchen, was dazu führt, dass der Browser-Tab ruckelt oder sogar abstürzt – besonders auf mobilen Geräten.

## Warum es wichtig ist

Eine nahtlose Sucherfahrung ist essenziell für die Produktivität von Entwicklern. Wenn das Suchwerkzeug Performance-Probleme verursacht oder zu viel Speicher verbraucht, werden Benutzer es meiden. Die Optimierung Ihrer Inhalte für die Local-First-Suche stellt sicher, dass Ihre Dokumentation auf allen Geräten und unter allen Netzwerkbedingungen schnell, reaktionsschnell und zuverlässig bleibt.

## Ansatz

Das [Search-Plugin](../../plugins/search) von `docmd` verwendet während des Builds eine Extraktions-Pipeline, um einen hochoptimierten Index zu erstellen. Durch das Entfernen unnötiger Daten und die Konzentration auf hochwertige semantische Felder wird sichergestellt, dass der resultierende Index sowohl umfassend als auch leichtgewichtig ist.

## Implementierung

### 1. Extraktion während des Build-Prozesses

Während des Builds verarbeitet `docmd` Ihre Markdown-Dateien, um nur den relevantesten Text für die Indexierung zu extrahieren. Dabei werden automatisch entfernt:
*   HTML-Tags und struktureller Boilerplate-Code.
*   Markdown-Syntaxzeichen, die keinen semantischen Mehrwert bieten.
*   Reine Formatierungselemente, die den Index unnötig aufblähen würden.

Dies stellt sicher, dass der Indexer nur sauberen, aussagekräftigen Text erhält, was die finale Indexgröße erheblich reduziert.

### 2. Strategische Indexierung mit Frontmatter

Sie können [Frontmatter](../../content/frontmatter) verwenden, um explizit zu steuern, wie eine Seite indexiert wird. Wenn eine Seite beispielsweise große Mengen an repetitiven Daten enthält (wie rohe JSON-Logs), die für die Suche nicht nützlich sind, können Sie festlegen, dass nur die Überschriften und Metadaten indexiert werden.

```yaml
---
title: "API Log Referenz"
search:
  indexBody: false  # Nur Titel und Überschriften indexieren
---
```

### 3. Clientseitiges Speichermanagement

`docmd` verwaltet den Lebenszyklus des Suchindex im Browser sorgfältig. Es verwendet eine On-Demand-Ladestrategie, was bedeutet, dass die Suchmaschine erst initialisiert wird, wenn der Benutzer zum ersten Mal damit interagiert. Dies hält den Footprint beim ersten Laden der Seite gering und stellt sicher, dass Systemressourcen nur bei Bedarf verbraucht werden.

## Abwägungen

Das aggressive Entfernen von Inhalten aus dem Suchindex (z. B. das Ausschließen großer Codeblöcke) kann manchmal dazu führen, dass sehr spezifische Ergebnisse fehlen. Sie müssen die Notwendigkeit eines leichtgewichtigen, schnellen Index gegen die Anforderung an eine gründliche Suchabdeckung abwägen. Wir empfehlen, Überschriften und konzeptionelle Beschreibungen zu priorisieren, da dies die häufigsten Suchziele für Entwickler sind.
