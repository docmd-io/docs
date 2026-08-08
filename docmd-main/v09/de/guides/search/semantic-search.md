---
title: "Semantische Suche Integration"
description: "Konfigurieren und deployen Sie clientseitige hybride semantische Suche in docmd mit lokalen Vektor-Embeddings."
---

Traditionelle Volltextsuche verlässt sich auf exakte Keyword-Treffer. Wenn ein Benutzer nach "Authentifizierung" sucht, die Seite jedoch nur Begriffe wie "OAuth2" oder "Login" verwendet, schlagen Standard-Suchmaschinen fehl.

docmd bietet clientseitige **Hybride Semantische Suche**, angetrieben von `@docmd/plugin-search`. Sie führt lokale Hugging Face ONNX-Modell-Pipelines im Browser aus und kombiniert BM25-Schlüsselworthäufigkeit mit Vektor-Kosinus-Ähnlichkeit für natürliches Sprachverständnis ohne externe API-Aufrufe.

## Konfiguration

Aktivieren Sie die semantische Suche in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true,
      "showConfidence": true
    }
  }
}
```

## Embedding-Modell-Profile

| Modell-ID | Dimensionen | Größe | Sprachen | Primärer Anwendungsfall |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | Nur Englisch | Hochpräzise englische Dokumentation. |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ Sprachen | Umfassende mehrsprachige Unterstützung. |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ Sprachen | Empfohlene Balance für internationale Websites. |

## Vektoren in CI/CD vorgenerieren

Generieren Sie Vektorindex-Häppchen vorab in den Build-Schritten, um die Browser-Ausführung zu beschleunigen:

```bash
# Semantische Such-Vektor-Chunks bauen
npx docmd-search --build

# Statische Website kompilieren
npx @docmd/core build
```

Dies gibt statische Vecto-JSON-Chunks nach `.docmd-search/` aus.

::: callout tip "Vektor-Chunks cachen" icon:zap
Übergeben Sie `.docmd-search/` an die Versionskontrolle oder cachen Sie es in CI/CD-Workflows. `docmd-search` führt inkrementelle Re-Indexierungen durch und schließt nachfolgende Builds in unter 300 ms ab.
:::
