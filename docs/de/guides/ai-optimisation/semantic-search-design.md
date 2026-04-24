---
title: "Design für semantische Suche und RAG"
description: "So strukturieren Sie Ihre Dokumentation, um sie für die vektorbasierte Suche und Retrieval-Augmented Generation zu optimieren."
---

## Problem

Die herkömmliche Stichwortsuche (wie die [integrierte Suche von docmd](../../plugins/search)) verlässt sich auf exakte Texttreffer. Wenn ein Benutzer nach "Authentifizierung" sucht, findet eine einfache Keyword-Engine eine Seite mit dem Titel "Integration von OAuth2" unter Umständen nicht, falls dieses spezifische Wort nicht oft genug vorkommt. Die semantische Suche, die Vektor-Embeddings nutzt, um die *Bedeutung* einer Abfrage zu verstehen, löst dieses Problem, erfordert jedoch spezifische Dokumentationsstrukturen, um effektiv zu sein.

## Warum es wichtig ist

Entwickler von heute erwarten intuitive, intent-basierte Sucherlebnisse. Wenn Ihre Dokumentation relevante Inhalte aufgrund geringfügiger terminologischer Unterschiede nicht anzeigt, werden Benutzer Ihre Seite schnell verlassen und woanders Hilfe suchen. Ein Design für die semantische Suche stellt sicher, dass Ihre Dokumentation auffindbar bleibt, selbst wenn Benutzer unterschiedliche Begriffe verwenden.

## Ansatz

Strukturieren Sie Ihre Dokumentation so, dass sie leicht von Retrieval-Augmented Generation (RAG)-Pipelines verarbeitet werden kann. Dies beinhaltet die Erstellung "semantisch dichter" Inhalte, in denen Konzepte klar definiert sind und Pronomen durch explizite Begriffe ersetzt werden, um den Kontext während des Chunking- und Vektorisierungsprozesses zu erhalten.

## Implementierung

### 1. Reichhaltige Frontmatter-Metadaten

Nutzen Sie [Frontmatter](../../content/frontmatter), um explizite Schlüsselwörter und Beschreibungen bereitzustellen, die im Fließtext vielleicht nicht natürlich vorkommen würden. Dies gibt der Suchmaschine zusätzliche Anhaltspunkte für Ihren Inhalt.

```yaml
---
title: "Integration von OAuth2"
description: "Erfahren Sie, wie Sie sichere Benutzerauthentifizierung und SSO implementieren."
keywords: ["login", "authentifizierung", "sso", "security", "identity"]
---
```

### 2. Die "Semantische Dichte"-Strategie

RAG-Systeme zerlegen Dokumente in kleine Stücke (Vektoren). Der erste Absatz jedes Abschnitts sollte die höchste Dichte an relevanten Substantiven und Verben zu diesem Thema enthalten. Dies stellt sicher, dass die primäre "Bedeutung" des Abschnitts bereits im initialen Vektor erfasst wird.

-   **✅ Gut**: "Dieser Leitfaden erklärt, wie Sie **OAuth2 Single Sign-On (SSO)** implementieren, um eine sichere **Authentifizierung** für Ihre Dokumentationsseite bereitzustellen."
-   **❌ Schlecht**: "In diesem Abschnitt sprechen wir darüber, wie es funktioniert und wie Sie es einfach einrichten können."

### 3. Vermeidung von mehrdeutigen Pronomen

In einer zerlegten Datenbank ist ein Satz wie "Es funktioniert mit jedem Anbieter" nutzlos, wenn der vorangehende Absatz, der "Es" definiert, in einen anderen Chunk geschnitten wurde. Seien Sie explizit.

-   **❌ Mehrdeutig**: "Es ist hochgradig skalierbar."
-   **✅ Explizit**: "Die **docmd Search Engine** ist so konzipiert, dass sie hochgradig skalierbar ist."

## Abwägungen

Das Schreiben für semantische Dichte kann sich manchmal etwas formeller oder repetitiver anfühlen als herkömmliches narratives Schreiben. Die daraus resultierende Verbesserung der Auffindbarkeit und der Genauigkeit von KI-generierten Antworten macht dies jedoch zu einer unverzichtbaren Praxis für moderne, professionelle Dokumentationen.
