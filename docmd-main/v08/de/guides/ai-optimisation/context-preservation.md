---
title: "Kontexterhaltung für KI-freundliche Dokumentation"
description: "Wie Sie sicherstellen, dass KI-Modelle die Beziehungen zwischen verschiedenen Teilen Ihrer Dokumentation verstehen und nutzen können."
---

## Problem

Während menschliche Leser problemlos auf einen Hyperlink klicken können, um mehr über einen Begriff zu erfahren, verarbeiten KI-Modelle Dokumentationen oft in isolierten "Chunks" (Stücken). Wenn eine KI auf einen Hyperlink stößt, kann sie ihn nicht "anklicken", um mehr Kontext abzurufen. Wenn kritische Informationen hinter einem Link verborgen sind, anstatt im Kontext erklärt zu werden, kann die KI möglicherweise keine genauen Antworten liefern, was zu Halluzinationen führt.

## Warum es wichtig ist

KI-Modelle verlassen sich auf den unmittelbar umgebenden Text, um die Bedeutung und Relevanz von Informationen zu bestimmen. Wenn Ihre Dokumentation stark fragmentiert ist und eine schlechte Kontexterhaltung aufweist, werden KI-gesteuerte Suchwerkzeuge (wie solche, die auf RAG basieren) Schwierigkeiten haben, qualitativ hochwertige Antworten zu liefern.

## Ansatz

Verwenden Sie **Inline Context Unrolling** (kontextuelles Entfalten im Text), um neben jedem wichtigen Link den minimal lebensfähigen Kontext bereitzustellen. Nutzen Sie außerdem die spezifischen Funktionen von `docmd`, wie das [LLMs-Plugin](../../plugins/llms.md), um eine einheitliche, maschinenlesbare Ansicht Ihres gesamten Dokumentationssatzes bereitzustellen.

## Implementierung

### 1. Beschreibende Verlinkung und Zusammenfassungen

Vermeiden Sie generische Linktexte. Stellen Sie stattdessen eine kurze, einseitige Zusammenfassung des verlinkten Konzepts vor oder nach dem Link selbst bereit.

-   **❌ Schlecht (Kontext verloren)**: Um das Timeout zu konfigurieren, lesen Sie die [Allgemeine Konfiguration](../../configuration/overview.md).
-   **✅ Besser (Kontext erhalten)**: Sie können den Parameter `timeoutMs` in der [Allgemeinen Konfiguration](../../configuration/overview.md) konfigurieren, der definiert, wie lange die Engine wartet, bevor eine Netzwerkanfrage fehlschlägt.

### 2. Verwendung von ausklappbaren Abschnitten für Details

[Ausklappbare Container](../../content/containers/collapsible.md) eignen sich hervorragend für die KI-Optimierung. Der Inhalt bleibt Teil des rohen Markdown-Quellcodes (den die KI lesen kann), wird aber für menschliche Leser visuell verstaut.

```markdown
### Datenbankverbindung

Stellen Sie die Verbindung über den primären URI her.

::: collapsible "Wie lautet das URI-Format?"
Der URI folgt dem standardmäßigen PostgreSQL-Format: `postgresql://benutzer:passwort@host:port/datenbank`.
:::
```

### 3. Aktivierung des LLMs-Plugins

Aktivieren Sie das [LLMs-Plugin](../../plugins/llms.md) in Ihrer `docmd.config.js`. Dieses Plugin generiert nach jedem Build automatisch eine `llms-full.txt`-Datei, die Ihren gesamten Dokumentationssatz in einer einzigen Datei mit hohem Kontextgehalt zusammenfasst, die leicht von Large Language Models verarbeitet werden kann.

## Abwägungen

Inline Context Unrolling macht Ihre Dokumentation etwas wortreicher und führt zu geringfügigen Redundanzen. Diese Redundanz ist jedoch ein kleiner Preis für die Sicherstellung, dass Ihre Dokumentation "KI-bereit" ist und in der Lage ist, qualitativ hochwertige automatisierte Support- und Sucherlebnisse zu ermöglichen.
