---
title: "Schnelle & genaue Suche"
description: "Wie docmd die Suchindexierung für Geschwindigkeit und Genauigkeit optimiert, auch in groß angelegten Dokumentations-Projekten."
---

## Problem

Mit wachsender Dokumentation kann der kompilierte Suchindex groß werden. Eine monolithische Indexdatei blockiert den Main-Thread des Browsers während des Downloads und Parsings. Das verzögert die "Time to Interactive" und lässt die Suchoberfläche träge wirken.

## Warum es wichtig ist

Das primäre Ziel der Dokumentationssuche ist "Time to Answer". Wenn ein Benutzer mehrere Sekunden auf das Laden des Index wartet, geht der Nutzen des Tools verloren. Schnelle, genaue Suchergebnisse sind unerlässlich, um eine professionelle Developer Experience zu bieten.

## Ansatz

docmd nutzt eine optimierte Indexierungsstrategie, die von einer hochperformanten Such-Library betrieben wird. Sie verwendet **Scoping**, **Inkrementelles Laden** und **Field-Optimierung**, um sicherzustellen, dass Suchergebnisse unabhängig von der Site-Größe sofort geliefert werden.

## Implementierung

### 1. Gescopte Suchindizes

docmd generiert automatisch separate Suchindizes für jede [Locale](../../configuration/localisation/index.md) und [Version](../../configuration/versioning.md). Benutzer laden nur den für ihren aktuellen Kontext relevanten Index herunter. Beispielsweise lädt ein Benutzer, der die chinesische Version liest, nur den chinesischen Suchindex — die Payload-Größe wird deutlich reduziert.

### 2. Intelligentes Field-Stripping

Das [Search-Plugin](../../plugins/search.md) erlaubt Ihnen, exakt zu steuern, welche Inhalte indexiert werden. Standardmäßig priorisiert es Header und Frontmatter-Metadaten und entfernt gängige "Stop Words". Sie können bestimmte Seiten über die Eigenschaft `search` in Ihrem [Frontmatter](../../content/frontmatter.md) vom Index ausschließen.

```yaml
---
title: "Interner Entwickler-Leitfaden"
search: false  # Diese Seite erscheint nicht in den Suchergebnissen
---
```

### 3. Lazy Loading & Prefetching

Um initiale Seitenladevorgänge schnell zu halten, ruft docmd den Suchindex lazy im Hintergrund ab. Es wird auch sofort ausgelöst, wenn ein Benutzer mit der Such-UI interagiert (z. B. Klick auf die Suchleiste oder Verwendung des Shortcuts `Cmd+K` / `Ctrl+K`).

### 4. Ergebnis-Ranking

Ergebnisse werden anhand eines gewichteten Scoring-Systems sortiert. Keywords, die im `title` oder in `h1`-Headern einer Seite vorkommen, werden deutlich höher gewichtet als solche im Body-Text. Das stellt sicher, dass die relevantesten Seiten ganz oben erscheinen.

## Abwägungen

Das Ausschließen von Utility- oder internen Seiten aus dem Suchindex macht sie schwerer auffindbar. Verwenden Sie die Eigenschaft `search: false` sparsam, um sicherzustellen, dass wertvolle Informationen findbar bleiben. Während Lazy Loading die anfängliche Performance verbessert, können Benutzer mit langsamer Verbindung beim erstmaligen Auslösen einer Suche eine kurze Verzögerung erleben.
