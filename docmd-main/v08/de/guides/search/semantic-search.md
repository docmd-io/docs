---
title: "Semantische Suche integrieren"
description: "So konfigurieren und deployen Sie die clientseitige hybride semantische Suche in docmd unter Verwendung lokaler Vektoreinbettungen."
---

## Das Problem

Die traditionelle Volltextsuche stützt sich vollständig auf exakte Keyword-Übereinstimmungen. Wenn ein Benutzer nach "Authentifizierung" sucht, die Seite jedoch nur Begriffe wie "OAuth2" oder "Login" verwendet, findet eine Standard-Suchmaschine den Inhalt nicht. Dies zwingt Autoren zu unnatürlichem Keyword-Stuffing und frustriert Leser, die die benötigten Informationen nicht finden.

## Warum es wichtig ist

Moderne Entwickler erwarten intuitive, kontextbezogene Suchfunktionen, die Absichten und Synonyme verstehen. Die Implementierung einer serverseitigen semantischen Suche erfordert in der Regel eine komplexe Infrastruktur wie Vektordatenbanken (z. B. Pinecone oder pgvector), das Hosten von Modellen und das Erstellen von APIs, was den Wartungsaufwand und die monatlichen Hostingkosten erhöht und Sicherheits- sowie Datenschutzbedenken aufwirft.

## Der Ansatz

Verwenden Sie das native **Semantische Such-Plugin** von docmd. Es arbeitet vollständig clientseitig in einer hochoptimierten Browser-Laufzeit. Es generiert strukturierte Vektorchunks zum Build-Zeitpunkt über lokale Hugging Face-Modellpipelines und führt ein Reranking unter Verwendung einer hybriden BM25-Keyword-Frequenz und einer Vektor-Kosinus-Ähnlichkeit durch. Es werden niemals Daten an Drittanbieter-APIs gesendet.

## Implementierung

### 1. Semantische Suche in der Konfiguration aktivieren

Fügen Sie die Optionen für das `search`-Plugin in Ihre `docmd.config.json` ein. Setzen Sie `semantic` auf `true` und aktivieren Sie `showConfidence`, um semantische Übereinstimmungen in den Suchergebnissen visuell zu kennzeichnen:

```json
{
  "plugins": {
    "search": {
      "semantic": true,
      "showConfidence": true
    }
  }
}
```

### 2. Das passende Einbettungsmodell wählen

docmd unterstützt sowohl leichtgewichtige, rein englische Modelle als auch umfassende mehrsprachige Modelle. Aktualisieren Sie Ihr Modellprofil über `docmd-search --settings` or definieren Sie es explizit:

| Modell-ID | Dimensionen | Größe | Sprachen | Bestens geeignet für |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | Nur Englisch | Schnelle, präzise englische Dokumentation |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ Sprachen | Absolute beste mehrsprachige Qualität |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ Sprachen | Hervorragende Balance für Mehrsprachigkeit |

### 3. Index in CI/CD vorbauen

Um Overhead im Browser beim ersten Laden zu vermeiden, generieren Sie die Vektorchunks während Ihres Builds oder in Ihrer CI/CD-Pipeline vorab mit der CLI:

```bash
# Bauen Sie den semantischen Suchindex vorab
npx docmd-search --build

# Führen Sie anschließend den docmd-Build aus
npx @docmd/core build
```

Dies erzeugt hochoptimierte statische Vektor-JSON-Chunks in `.docmd-search/`. Wenn ein Benutzer eine Suche durchführt, lädt der Client diese Chunks progressiv im Hintergrund, wodurch die Benutzeroberfläche sofort interaktiv bleibt.

## Abwägungen

### Initiale Asset-Größe
Clientseitige Vektoreinbettungen erfordern, dass der Browser beim ersten Suchvorgang eine WebAssembly-Laufzeitumgebung und die vorkompilierte ONNX-Modelldatei herunterlädt. Obwohl diese Assets dauerhaft im Cache-Speicher des Browsers gespeichert werden, kann die Latenz beim ersten Suchvorgang auf langsameren Verbindungen etwas höher sein (~1-2 Sekunden Verzögerung).

### Suchqualität vs. Payload-Größe
Die Wahl größerer Modelle wie `LaBSE` bietet eine außergewöhnliche mehrsprachige Qualität, führt jedoch zu größeren Downloads. Für standardmäßige internationale Dokumentations-Websites ist das Modell `paraphrase-multilingual-MiniLM-L12-v2` die empfohlene goldene Mitte zwischen Genauigkeit und Netzwerklast.