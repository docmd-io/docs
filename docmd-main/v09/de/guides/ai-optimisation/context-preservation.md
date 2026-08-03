---
title: "Context Preservation für AI-freundliche Dokumentation"
description: "Wie Sie sicherstellen, dass AI-Modelle die Zusammenhänge zwischen verschiedenen Teilen Ihrer Dokumentation verstehen und nutzen können."
---

## Problem

Menschliche Leser können Hyperlinks anklicken, um mehr zu erfahren. AI-Modelle verarbeiten Dokumentation häufig in isolierten "Chunks". Wenn eine AI auf einen Hyperlink stößt, kann sie diesen nicht "anklicken", um Kontext abzurufen. Wenn kritische Informationen hinter einem Link verborgen sind, liefert die AI möglicherweise ungenaue Antworten. Das führt zu Halluzinationen.

## Warum es wichtig ist

AI-Modelle verlassen sich auf den unmittelbaren Kontext, um Bedeutung zu bestimmen. Wenn Ihre Dokumentation stark fragmentiert ist und Kontext schlecht bewahrt, haben AI-gestützte Such-Tools (wie RAG-Systeme) Schwierigkeiten, qualitativ hochwertige Antworten zu liefern.

## Ansatz

Verwenden Sie **Inline Context Unrolling**, um den minimal benötigten Kontext neben jedem wichtigen Link bereitzustellen. Verwenden Sie das [LLMs-Plugin](../../plugins/llms.md) von docmd, um eine einheitliche, maschinenlesbare Sicht Ihrer gesamten Dokumentation bereitzustellen.

## Implementierung

### 1. Beschreibende Links und Zusammenfassungen

Vermeiden Sie generische Link-Texte. Stellen Sie eine kurze, einzelne Zusammenfassung des verlinkten Konzepts neben dem Link bereit.

-   **❌ Schlecht (Kontext verloren)**: Um den Timeout zu konfigurieren, siehe [Allgemeine Konfiguration](../../configuration/overview.md).
-   **✅ Besser (Kontext bewahrt)**: Sie können den Parameter `timeoutMs` in der [Allgemeinen Konfiguration](../../configuration/overview.md) konfigurieren, die definiert, wie lange die Engine wartet, bevor eine Netzwerkanfrage fehlschlägt.

### 2. Collapsible-Sections für Details verwenden

[Collapsible-Container](../../content/containers/collapsible.md) eignen sich hervorragend für AI-Optimierung. Der Inhalt bleibt Teil der rohen Markdown-Quelle für die AI, wird für menschliche Leser jedoch visuell versteckt.

```markdown
### Datenbankverbindung

Stellen Sie die Verbindung über die primäre URI her.

::: collapsible "Was ist das URI-Format?"
Die URI folgt dem Standard-PostgreSQL-Format: `postgresql://user:password@host:port/database`.
:::
```

### 3. LLMs-Plugin aktivieren

Aktivieren Sie das [LLMs-Plugin](../../plugins/llms.md) in Ihrer `docmd.config.json`. Dieses Plugin generiert nach jedem Build eine `llms-full.txt`. Es verkettet Ihre gesamte Dokumentation in einer einzigen, kontextreichen Datei, die LLMs einfach konsumieren können.

## Abwägungen

Inline Context Unrolling macht Dokumentation etwas ausführlicher und führt zu leichter Redundanz. Das ist jedoch ein kleiner Preis, um sicherzustellen, dass Ihre Dokumentation "AI-ready" ist und hochwertigen automatisierten Support ermöglicht.