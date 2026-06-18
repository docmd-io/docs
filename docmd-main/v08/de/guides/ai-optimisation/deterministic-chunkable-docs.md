---
title: "Deterministische und chunkbare Dokumentation erstellen"
description: "Wie Sie Ihre Dokumentation strukturieren, um sie für Retrieval-Augmented Generation (RAG) und AI-Ingestion zu optimieren."
---

## Problem

Wenn AI-Pipelines Dokumentation ingestieren, zerschneiden sie das Markdown in kleinere "Chunks". Wenn ein Dokument aus langen Absätzen mit unklaren Grenzen besteht, teilt der Algorithmus den Kontext mitten im Gedanken. Das zerstört den Nutzen des Chunks und führt zu falschen AI-Antworten.

## Warum es wichtig ist

Wenn eine AI einen Code-Block abruft, aber den vorhergehenden Absatz verpasst, der erklärt *wann* er zu verwenden ist, fehlt der Antwort die Bedingtheit. Wenn Sie Ihre Dokumentation für Chunkbarkeit strukturieren, stellt jeder Abschnitt für sich genommen genügend Kontext bereit.

## Ansatz

Strukturieren Sie Ihre Seiten als Hierarchie aus deterministischen, atomaren Blöcken. Verwenden Sie Markdown-Header, um Konzepte klar abzugrenzen. Stellen Sie sicher, dass zusammengehörige Informationen (etwa eine Warnung und der dazugehörige Code) in der Quelldatei räumlich nah beieinander stehen.

## Implementierung

### 1. Atomare Header-Abschnitte

Stellen Sie sicher, dass jeder `##` oder `###`-Header ein einzelnes, atomares Konzept einkapselt. Ein gut strukturierter Abschnitt sollte für sich allein als nützlicher Chunk für ein AI-Modell bestehen können.

-   **✅ Gut**: Ein Header "Authentifizierung via OAuth", gefolgt von einer kurzen Erklärung und einem Code-Beispiel.
-   **❌ Schlecht**: Eine umfangreiche "Getting Started"-Seite mit 15 verschiedenen Konzepten und ohne Unter-Header.

### 2. Enge räumliche Nähe für kritische Informationen

Trennen Sie eine kritische Warnung nicht durch lange Absätze vom dazugehörigen Code. Verwenden Sie [Callouts](../../content/containers/callouts.md), um sie vertikal miteinander zu verbinden. Das erhöht die Wahrscheinlichkeit, dass sie bei der Ingestion im selben Vektor-Chunk verbleiben.

```markdown
::: callout warning "Destruktive Aktion"
Dieser Befehl löscht dauerhaft alle Logs.
:::

`npx @docmd/core logs --clear`
```

### 3. Automatisierte Konkatenation

Das [LLMs-Plugin](../../plugins/llms.md) erleichtert das Chunking, indem es eine `llms-full.txt`-Datei generiert. Es verwendet Standard-Trenner (`---`) zwischen den Seiten. Das hilft Ingestion-Pipelines, natürliche Dokument-Grenzen zu erkennen und gleichzeitig den globalen Kontext zu bewahren.

## Abwägungen

Dieser Ansatz bevorzugt einen modularen, segmentierten Schreibstil gegenüber langen, fließenden Erzählungen. Auch wenn dies für einen menschlichen Leser repetitiv wirken kann, verbessert es die Leistung von AI-gestützter Suche und automatisierten Support-Agenten erheblich.
