---
title: "Schnelle & präzise Suche"
description: "Wie docmd die Suchindexierung für Geschwindigkeit und Genauigkeit optimiert, selbst in großen Dokumentationsprojekten."
---

## Problem

Wenn eine Dokumentation auf Hunderte oder Tausende von Seiten anwächst, kann der kompilierte Suchindex sehr groß werden. Eine monolithische Indexdatei kann den Hauptthread des Browsers während des Downloads und Parsens blockieren, was die "Time to Interactive" verzögert und dazu führt, dass sich die Suchoberfläche träge oder nicht reaktionsfähig anfühlt.

## Warum es wichtig ist

Das primäre Ziel der Dokumentationssuche ist die "Time to Answer". Wenn ein Benutzer das Suchmodal aufruft und mehrere Sekunden warten muss, bis der Index geladen ist, geht der Nutzen des Suchwerkzeugs verloren. Schnelle, präzise Suchergebnisse sind essenziell, um eine professionelle Developer Experience zu bieten und Benutzern zu helfen, Informationen reibungslos zu finden.

## Ansatz

`docmd` verwendet eine optimierte Indexierungsstrategie, die von einer leistungsstarken Suchbibliothek angetrieben wird. Es setzt auf **Scoping**, **inkrementelles Laden** und **Feldoptimierung**, um sicherzustellen, dass Suchergebnisse fast augenblicklich geliefert werden, unabhängig von der Größe der Dokumentations-Website.

## Implementierung

### 1. Gescopte Suchindizes

`docmd` generiert automatisch separate Suchindizes für jedes [Locale](../../configuration/localisation/index.md) und jede [Version](../../configuration/versioning.md). Dies stellt sicher, dass ein Benutzer nur den für seinen aktuellen Kontext relevanten Index herunterlädt. Beispielsweise lädt ein Benutzer, der die deutsche Version Ihrer Dokumentation durchsucht, nur den deutschen Suchindex herunter, was die Payload-Größe erheblich reduziert.

### 2. Intelligentes Field-Stripping

Das [Search-Plugin](../../plugins/search.md) ermöglicht es Ihnen zu steuern, welche Inhalte genau indexiert werden. Standardmäßig werden Überschriften und Frontmatter-Metadaten priorisiert, während gängige "Stoppwörter" und unnötige Codesymbole, die den Index ohne Mehrwert aufblähen würden, entfernt werden. Sie können auch spezifische Seiten über die Eigenschaft `search` in Ihrem [Frontmatter](../../content/frontmatter.md) vom Index ausschließen.

```yaml
---
title: "Interner Entwickler-Leitfaden"
search: false  # Diese Seite erscheint nicht in den Suchergebnissen
---
```

### 3. Lazy Loading & Prefetching

Um das erste Laden der Seite schnell zu halten, lädt `docmd` den Suchindex nicht sofort. Stattdessen wird er verzögert im Hintergrund abgerufen oder in dem Moment ausgelöst, in dem ein Benutzer mit der Such-UI interagiert (z. B. durch Klicken auf die Suchleiste oder Verwenden des Tastenkürzels `Cmd+K` / `Ctrl+K`).

### 4. Ranking der Ergebnisse

Ergebnisse werden basierend auf einem gewichteten Bewertungssystem eingestuft. Schlüsselwörter, die im Seiten-`title` oder in `h1`-Überschriften gefunden werden, werden deutlich höher gewichtet als solche im Textkörper. Dies stellt sicher, dass die relevantesten Seiten ganz oben in der Ergebnisliste erscheinen.

## Abwägungen

Das Ausschließen von Hilfs- oder internen Seiten vom Suchindex erschwert deren Auffindbarkeit. Sie sollten die Eigenschaft `search: false` sparsam einsetzen, um sicherzustellen, dass wertvolle Informationen auffindbar bleiben. Während Lazy Loading die Performance verbessert, können Benutzer mit extrem langsamen Verbindungen eine kurze Verzögerung bemerken, wenn sie zum ersten Mal eine Suche auslösen.
