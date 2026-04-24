---
title: "Erstellung deterministischer und chunkbarer Dokumentation"
description: "So strukturieren Sie Ihre Dokumentation, um sie für Retrieval-Augmented Generation (RAG) und die KI-Verarbeitung zu optimieren."
---

## Problem

Wenn KI-Pipelines (wie RAG-Architekturen) Dokumentationen aufnehmen, schneiden sie die Markdown-Quelle in kleinere "Chunks" (z. B. jeweils 500 Token). Wenn ein Dokument aus langen, ausschweifenden Absätzen mit unklaren Grenzen besteht, kann der Slicing-Algorithmus den Kontext mitten im Gedanken trennen. Dies zerstört den Nutzen des Chunks und führt zu unvollständigen oder falschen KI-Antworten.

## Warum es wichtig ist

Wenn eine KI einen Chunk abruft, der einen Code-Block enthält, aber den vorangehenden Absatz verpasst, der erklärt, *wann* dieser Code zu verwenden ist, wird der generierten Antwort die notwendige Konditionalität fehlen. Die Strukturierung Ihrer Dokumentation nach "Chunkbarkeit" stellt sicher, dass jeder Textabschnitt genügend Kontext enthält, um für sich allein nützlich zu sein.

## Ansatz

Strukturieren Sie Ihre Seiten als Hierarchie deterministischer, atomarer Blöcke. Nutzen Sie Markdown-Überschriften, um Konzepte klar voneinander abzugrenzen, und stellen Sie sicher, dass zusammengehörige Informationen (wie eine Warnung und der dazugehörige Code) in der Quelldatei physisch nah beieinander liegen.

## Implementierung

### 1. Atomare Überschriften-Abschnitte

Stellen Sie sicher, dass jede `##`- oder `###`-Überschrift ein einzelnes, atomares Konzept kapselt. Ein gut strukturierter Abschnitt sollte als nützlicher Chunk für ein KI-Modell allein stehen können.

-   **✅ Gut**: Eine Überschrift "Authentifizierung via OAuth", gefolgt von einer kurzen Erklärung und einem Code-Beispiel.
-   **❌ Schlecht**: Eine massive "Getting Started"-Seite mit 15 verschiedenen Konzepten ohne Unterüberschriften.

### 2. Räumliche Nähe für kritische Informationen

Trennen Sie eine kritische Warnung nicht durch lange Absätze von dem Code, auf den sie sich bezieht. Nutzen Sie [Callouts](../../content/containers/callouts), um sie vertikal aneinander zu binden. Dies erhöht die Wahrscheinlichkeit, dass sie bei der Verarbeitung im selben Vektor-Chunk bleiben.

```markdown
::: callout warning "Destruktive Aktion"
Das Ausführen dieses Befehls löscht permanent alle Logs.
:::

`docmd logs --clear`
```

### 3. Automatisierte Zusammenführung

Das [LLMs-Plugin](../../plugins/usage) erleichtert das Chunking, indem es eine `llms-full.txt`-Datei generiert. Diese Datei nutzt Standard-Trenner (`---`) zwischen den Seiten und hilft Ingestions-Pipelines so dabei, natürliche Dokumentgrenzen zu erkennen, während der globale Kontext Ihres Projekts erhalten bleibt.

## Abwägungen

Dieser Ansatz bevorzugt einen modularen, segmentierten Schreibstil gegenüber langen, fließenden Erzählungen. Während sich dies für einen menschlichen Leser repetitiver anfühlen mag, verbessert es die Leistung von KI-gestützten Suchvorgängen und automatisierten Support-Agenten, die auf Ihre Dokumentation angewiesen sind, erheblich.
