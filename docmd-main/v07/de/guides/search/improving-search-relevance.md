---
title: "Suchrelevanz & Struktur"
description: "So strukturieren Sie Ihre Markdown-Inhalte, um die Suchrelevanz zu verbessern und Benutzern zu helfen, Informationen schneller zu finden."
---

## Problem

Suchmaschinen priorisieren Inhalte basierend auf ihrer Struktur. Wenn eine hochwertige Anleitung generische Überschriften wie "Einleitung" oder "Schritt 1" verwendet, weist die Suchmaschine den Kern-Keywords, die in den Absätzen vergraben sind, möglicherweise nicht genügend Gewicht zu. Dies führt dazu, dass relevante Seiten tief in den Suchergebnissen vergraben werden, was Benutzer frustriert, die sofortige Antworten erwarten.

## Warum es wichtig ist

Benutzer suchen typischerweise nach spezifischen technischen Begriffen (z. B. "Authentifizierungs-Token" oder "Deployment-Limit") statt nach vollständigen Sätzen. Wenn Ihre Dokumentationsstruktur diese Begriffe nicht hervorhebt, kann die Suchmaschine Ihre Inhalte nicht sicher ranken. Eine hohe Suchrelevanz ist der entscheidende Unterschied zwischen einem Self-Service-Dokumentationsportal und einem hohen Aufkommen an Support-Tickets.

## Ansatz

Strukturieren Sie Ihr Markdown so, dass der Suchindexer Kernkonzepte automatisch identifizieren und priorisieren kann. Die Suchmaschine von `docmd` weist dem Seiten-`title`, der `description` und den `headers` ein höheres Gewicht zu als dem Textkörper. Durch die Optimierung dieser strukturellen Elemente verbessern Sie die Auffindbarkeit Ihrer Inhalte erheblich.

## Implementierung

### 1. Frontmatter-Metadaten optimieren

Verwenden Sie den [Frontmatter](../../content/frontmatter)-Block, um explizite Schlüsselwörter und eine aussagekräftige Zusammenfassung bereitzustellen. Das [Search-Plugin](../../plugins/search) indexiert diese Felder, um bessere Ergebnisse und nützlichere Snippets in der Such-UI anzuzeigen.

```yaml
---
title: "AWS S3 Speicher-Konfiguration"
description: "So konfigurieren Sie IAM-Rollen und Bucket-Berechtigungen für die AWS S3-Integration."
keywords: ["aws", "s3", "storage", "iam", "cloud"]
---
```

### 2. Semantische Überschriften verwenden

Vermeiden Sie generische Überschriften. Fügen Sie stattdessen relevante Schlüsselwörter in Ihre Überschriften ein, um sowohl dem Benutzer als auch der Suchmaschine Kontext zu bieten.

*   **Niedrige Relevanz:** `## Schritt 1: Konfiguration`
*   **Hohe Relevanz:** `## Schritt 1: Konfigurieren von AWS IAM-Rollen`

### 3. Callouts für Schlüsselinformationen nutzen

Die Verwendung von [Callout-Containern](../../content/containers/callouts) für kritische Warnungen oder "Pro-Tipps" kann ebenfalls die Suchrelevanz verbessern. Inhalte innerhalb von Callouts sind oft semantisch isoliert und können vom Indexer anders gewichtet werden, um wichtige Schritte zur Fehlerbehebung hervorzuheben.

## Abwägungen

Die Optimierung der Suchrelevanz erfordert diszipliniertes Schreiben. Wenn sich Ihr Produkt weiterentwickelt, können Schlüsselwörter im Frontmatter veralten, wenn sie nicht regelmäßig überprüft werden. Darüber hinaus kann das Einfügen zu vieler Schlüsselwörter in Überschriften (Keyword-Stuffing) dazu führen, dass sich die Dokumentation repetitiv und weniger natürlich liest. Streben Sie ein Gleichgewicht zwischen SEO und Lesbarkeit an.
