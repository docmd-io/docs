---
title: "Kontext-Erhaltung für KI-freundliche Dokumentationen"
description: "So stellen Sie sicher, dass KI-Modelle die Beziehungen zwischen verschiedenen Teilen Ihrer Dokumentation verstehen und nutzen können."
---

## Problem

Während menschliche Leser einfach auf einen Hyperlink klicken können, um mehr über einen Begriff zu erfahren, verarbeiten KI-Modelle Dokumentationen oft in isolierten "Chunks". Wenn eine KI auf einen Hyperlink stößt, kann sie diesen nicht "anklicken", um mehr Kontext abzurufen. Wenn kritische Informationen hinter einem Link verborgen sind, anstatt im Kontext erklärt zu werden, kann die KI möglicherweise keine korrekten Antworten geben, was zu Halluzinationen führt.

## Warum es wichtig ist

KI-Modelle verlassen sich auf den unmittelbar umgebenden Text, um die Bedeutung und Relevanz von Informationen zu bestimmen. Wenn Ihre Dokumentation durch mangelhafte Kontext-Erhaltung stark fragmentiert ist, werden KI-gestützte Suchwerkzeuge (wie z. B. RAG-basierte Systeme) Schwierigkeiten haben, qualitativ hochwertige Antworten zu liefern.

## Ansatz

Nutzen Sie **Inline-Kontext-Entfaltung (Inline Context Unrolling)**, um neben jedem wichtigen Link einen minimal lebensfähigen Kontext bereitzustellen. Nutzen Sie zusätzlich spezifische Funktionen von `docmd`, wie das [LLMs-Plugin](../../plugins/llms.md), um eine einheitliche, maschinenlesbare Sicht auf Ihren gesamten Dokumentationssatz zu ermöglichen.

## Implementierung

### 1. Deskriptive Verlinkung und Zusammenfassungen

Vermeiden Sie generische Linktexte. Geben Sie stattdessen vor oder nach dem Link eine kurze, ein-satz-lange Zusammenfassung des verlinkten Konzepts an.

-   **❌ Schlecht (Kontext geht verloren)**: Informationen zur Zeitüberschreitung finden Sie in der [Allgemeinen Konfiguration](../../configuration/overview.md).
-   **✅ Besser (Kontext bleibt erhalten)**: Sie können den Parameter `timeoutMs` in der [Allgemeinen Konfiguration](../../configuration/overview.md) konfigurieren. Dieser definiert, wie lange die Engine wartet, bevor eine Netzwerkanfrage fehlschlägt.

### 2. Verwendung von Collapsibles für Details

[Einklappbare Container (Collapsibles)](../../content/containers/collapsible.md) eignen sich hervorragend für die KI-Optimierung. Der Inhalt bleibt Teil der rohen Markdown-Quelle (die die KI lesen kann), ist aber für menschliche Leser visuell ausgeblendet.

```markdown
### Datenbank-Verbindung

Verbinden Sie sich über die primäre URI.

::: collapsible "Wie lautet das URI-Format?"
Die URI folgt dem Standard-PostgreSQL-Format: `postgresql://user:password@host:port/database`.
:::
```

### 3. Aktivierung des LLMs-Plugins

Aktivieren Sie das [LLMs-Plugin](../../plugins/llms.md) in Ihrer `docmd.config.js`. Dieses Plugin generiert nach jedem Build automatisch eine `llms-full.txt`-Datei, die Ihren gesamten Dokumentationssatz in einer einzigen Datei mit hohem Kontext zusammenfasst, die leicht von Large Language Models verarbeitet werden kann.

## Abwägungen

Die Inline-Kontext-Entfaltung macht Ihre Dokumentation etwas wortreicher und führt zu geringfügiger Redundanz. Dies ist jedoch ein kleiner Preis für die Gewissheit, dass Ihre Dokumentation "KI-bereit" ist und hochwertige automatisierte Support- und Sucherfahrungen ermöglichen kann.
