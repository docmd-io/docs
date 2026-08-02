---
title: "Such-Relevanz & Struktur"
description: "Wie Sie Ihre Markdown-Inhalte strukturieren, um die Such-Relevanz zu verbessern und Benutzern zu helfen, Informationen schneller zu finden."
---

## Problem

Suchmaschinen priorisieren Inhalte anhand ihrer Struktur. Wenn ein hochwertiger Leitfaden generische Header wie "Einführung" oder "Schritt 1" verwendet, weist die Suchmaschine den zentralen Keywords möglicherweise nicht genug Gewicht zu. Relevante Seiten werden in den Suchergebnissen vergraben, was Benutzer frustriert, die sofortige Antworten erwarten.

## Warum es wichtig ist

Benutzer suchen typischerweise nach spezifischen technischen Begriffen (z. B. "authentication token" oder "deployment limit"), nicht nach vollständigen Sätzen. Wenn Ihre Dokumentationsstruktur diese Begriffe nicht hervorhebt, kann die Suchmaschine Ihre Inhalte nicht zuverlässig einordnen. Hohe Such-Relevanz verhindert eine hohe Zahl an Support-Tickets.

## Ansatz

Strukturieren Sie Ihr Markdown so, dass der Suchindexer zentrale Konzepte automatisch erkennt und priorisiert. Die Such-Engine von docmd weist dem `title`, der `description` und den `headers` einer Seite ein höheres Gewicht zu als dem Body-Text. Diese strukturellen Elemente zu optimieren verbessert die Auffindbarkeit erheblich.

## Implementierung

### 1. Frontmatter-Metadaten optimieren

Verwenden Sie den [Frontmatter](../../content/frontmatter.md)-Block, um explizite Keywords und eine beschreibende Zusammenfassung bereitzustellen. Das [Search-Plugin](../../plugins/search.md) indexiert diese Felder, um bessere Ergebnisse und nützliche Snippets in der Such-UI zu liefern.

```yaml
---
title: "AWS S3 Storage-Konfiguration"
description: "So konfigurieren Sie IAM-Rollen und Bucket-Berechtigungen für die AWS S3-Integration."
keywords: ["aws", "s3", "storage", "iam", "cloud"]
---
```

### 2. Semantische Header verwenden

Vermeiden Sie generische Header-Namen. Fügen Sie relevante Keywords in Ihre Header ein, um sowohl dem Benutzer als auch der Suchmaschine Kontext zu liefern.

*   **Geringe Relevanz:** `## Schritt 1: Konfiguration`
*   **Hohe Relevanz:** `## Schritt 1: AWS IAM-Rollen konfigurieren`

### 3. Callouts für Schlüsselinformationen verwenden

Die Verwendung von [Callout-Containern](../../content/containers/callouts.md) für kritische Warnungen oder "Pro-Tipps" verbessert die Such-Relevanz. Inhalte innerhalb von Callouts werden semantisch isoliert und vom Indexer anders gewichtet, um wichtige Troubleshooting-Schritte hervorzuheben.

## Abwägungen

Die Optimierung für Such-Relevanz erfordert diszipliniertes Schreiben. Während sich Ihr Produkt weiterentwickelt, veralten Keywords im Frontmatter, wenn sie nicht regelmäßig überprüft werden. Darüber hinaus wirkt es unnatürlich und repetitiv, zu viele Keywords in Header zu packen (Keyword-Stuffing). Streben Sie eine Balance zwischen SEO und Lesbarkeit an.