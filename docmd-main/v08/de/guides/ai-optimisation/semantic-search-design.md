---
title: "Semantic Search und RAG-freundlich designen"
description: "Wie Sie Ihre Dokumentation strukturieren, um sie für vektorbasierte Suche und Retrieval-Augmented Generation zu optimieren."
---

## Problem

Traditionelle Stichwortsuche basiert auf exakten Textübereinstimmungen. Sucht ein Benutzer nach "authentication", scheitert eine einfache Stichwort-Engine daran, "Integrating OAuth2" zu finden, wenn das exakte Wort fehlt. Semantic Search verwendet Vektor-Embeddings, um die Bedeutung der Anfrage zu verstehen. Sie löst dieses Problem, erfordert aber spezifische Dokumentationsstrukturen.

## Warum es wichtig ist

Moderne Entwickler erwarten intuitive, intent-basierte Suche. Wenn Dokumentation aufgrund terminologischer Unterschiede relevante Inhalte nicht zutage fördert, verlassen Benutzer Ihre Site. Semantic-Search-freundliches Design stellt sicher, dass Dokumentation unabhängig vom verwendeten Vokabular auffindbar bleibt.

## Ansatz

Strukturieren Sie Ihre Dokumentation so, dass sie von RAG-Pipelines (Retrieval-Augmented Generation) leicht konsumiert werden kann. Erstellen Sie "semantisch dichte" Inhalte, in denen Konzepte klar definiert sind. Ersetzen Sie Pronomen durch explizite Entitäten, um den Kontext beim Chunking und bei der Vektorisierung zu bewahren.

## Implementierung

### 1. Reichhaltige Frontmatter-Metadaten

Verwenden Sie [Frontmatter](../../content/frontmatter.md), um explizite Keywords und Beschreibungen bereitzustellen, die möglicherweise nicht natürlich im Fließtext vorkommen. Das gibt der Suchmaschine zusätzliche "Hooks" zu Ihren Inhalten.

```yaml
---
title: "OAuth2 integrieren"
description: "Erfahren Sie, wie Sie sichere Benutzer-Authentifizierung und SSO implementieren."
keywords: ["login", "authentication", "sso", "security", "identity"]
---
```

### 2. Die "Semantic Density"-Strategie

RAG-Systeme zerschneiden Dokumente in kleine Vektor-Chunks. Der erste Absatz jedes Abschnitts sollte die höchste Dichte an relevanten Nomen und Verben zum jeweiligen Thema enthalten. Das stellt sicher, dass die primäre "Bedeutung" des Abschnitts im initialen Vektor erfasst wird.

-   **✅ Gut**: "Dieser Leitfaden erklärt, wie Sie **OAuth2 Single Sign-On (SSO)** implementieren, um sichere **Authentifizierung** für Ihre Dokumentations-Site bereitzustellen."
-   **❌ Schlecht**: "In diesem Abschnitt besprechen wir, wie es funktioniert und wie Sie es einfach einrichten können."

### 3. Pronomen-Mehrdeutigkeit vermeiden

In einer gechunkten Datenbank ist ein Satz wie "Es funktioniert mit jedem Anbieter" nutzlos, wenn der vorhergehende Absatz, der "Es" definiert, in einen anderen Chunk geschnitten wurde. Seien Sie explizit.

-   **❌ Mehrdeutig**: "Es ist hochgradig skalierbar."
-   **✅ Explizit**: "Die **docmd-Such-Engine** ist darauf ausgelegt, hochgradig skalierbar zu sein."

## Abwägungen

Schreiben für semantische Dichte kann formeller oder repetitiver wirken als traditionelles erzählerisches Schreiben. Die daraus resultierende Verbesserung der Auffindbarkeit und Genauigkeit der AI-Antworten macht dies jedoch zu einer wichtigen Praxis für Dokumentation auf Enterprise-Niveau.
