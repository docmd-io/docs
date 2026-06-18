---
title: "Semantic Search Integration"
description: "Wie Sie clientseitige hybride semantische Suche in docmd mit lokalen Vektor-Embeddings konfigurieren und bereitstellen."
---

## Problem

Traditionelle Volltextsuche basiert vollständig auf exakten Keyword-Treffern. Sucht ein Benutzer nach "authentication", die Seite verwendet jedoch nur Begriffe wie "OAuth2" oder "login", wird eine Standard-Keyword-Suchmaschine sie nicht finden. Das zwingt Autoren zu unnatürlichem Keyword-Stuffing und frustriert Leser, die nicht finden, was sie suchen.

## Warum es wichtig ist

Moderne Entwickler erwarten natürlichsprachliche Schnittstellen, die Intent, Synonyme und Kontext verstehen. Die Implementierung von serverseitiger semantischer Suche erfordert typischerweise den Aufbau komplexer Infrastruktur wie Vektor-Datenbanken (z. B. Pinecone oder pgvector), das Hosting von Modellen und den Aufbau von APIs — was den Wartungsaufwand, monatliche Hosting-Kosten sowie Sicherheits- und Datenschutzbedenken erhöht.

## Ansatz

Verwenden Sie das native **Semantic-Search-Plugin** von docmd. Es arbeitet vollständig clientseitig mit einer hochoptimierten Browser-Runtime. Es generiert zur Build-Zeit strukturierte Vektor-Chunk-Indizes mithilfe lokaler Hugging-Face-Model-Pipelines und re-ranked Treffer anschließend mittels hybrider BM25-Keyword-Frequenz und Vektor-Cosine-Similarity. Es werden niemals Daten an Drittanbieter-APIs gesendet.

## Implementierung

### 1. Semantic Search in der Konfiguration aktivieren

Fügen Sie die `search`-Plugin-Optionen in Ihrer `docmd.config.json` hinzu. Setzen Sie `semantic` auf `true` und aktivieren Sie `showConfidence`, um semantische Treffer in den Suchergebnissen visuell kenntlich zu machen:

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

### 2. Wählen Sie das passende Embedding-Modell

docmd unterstützt sowohl leichtgewichtige rein englischsprachige Modelle als auch umfassende mehrsprachige Modelle. Aktualisieren Sie Ihr Modell-Profil mit `docmd-search --settings` oder definieren Sie es explizit:

| Modell-ID | Dimensionen | Größe | Sprachen | Am besten für |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | nur Englisch | schnelle, hochpräzise englische Dokumentation |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ Sprachen | absolut beste mehrsprachige Qualität |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ Sprachen | ausgezeichneter mehrsprachiger Kompromiss |

### 3. Pre-Building des Index in CI/CD

Um Overhead im Browser beim Erstladen zu vermeiden, generieren Sie die Such-Chunks vorab in Ihrer Build- oder CI/CD-Pipeline über die CLI:

```bash
# Den semantischen Suchindex bauen
npx docmd-search --build

# Anschließend docmd build ausführen
npx @docmd/core build
```

Dies erzeugt hochoptimierte statische Vecto-JSON-Chunks in `.docmd-search/`. Wenn ein Benutzer eine Suche durchführt, lädt der Client diese Chunks progressiv im Hintergrund, sodass die UI stets sofort interaktiv bleibt.

## Abwägungen

### Initiale Asset-Größe
Clientseitige Vektor-Embeddings erfordern, dass der Browser beim ersten Suchvorgang eine WebAssembly-Runtime und die vortrainierte ONNX-Modelldatei herunterlädt. Obwohl diese Assets im Cache Storage des Browsers dauerhaft zwischengespeichert werden, kann die Latenz bei der ersten Suche in langsamen Verbindungen etwas höher ausfallen (~1-2 Sekunden Verzögerung).

### Suchqualität vs. Payload-Größe
Größere Modelle wie `LaBSE` bieten außergewöhnliche mehrsprachige Qualität, führen aber zu umfangreicheren Downloads. Für internationale Standarddokumentations-Websites ist das Modell `paraphrase-multilingual-MiniLM-L12-v2` der empfohlene Sweet Spot zwischen Genauigkeit und Netzwerk-Payload.