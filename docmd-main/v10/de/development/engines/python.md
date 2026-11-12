---
title: "Python-Engine"
description: "Erkunden Sie die optionale Python-Ausführungs-Engine: Anwendungsfälle, File-I/O-Fähigkeiten, unterstützte Pakete und Einschränkungen."
---

Die **Python-Engine** ist eine optionale, mehrfädige Ausführungs-Engine. Sie beschleunigt schwere I/O-Workloads, Git-Historien-Traversierung und Vektorsuch-Operationen in Dokumentations-Projekten. Durch die Orchestrierung eines persistenten Python-3-Hintergrund-Workers umgeht sie Standard-Event-Loop-Beschränkungen und liefert nebenläufiges File-Reading und Subprozess-Orchestrierung.

Verfügbar als **erweiterbares Ausführungs-Backend**, zielt die Python-Engine auf Enterprise-Scale ab. Sie glänzt dort, wo Tausende von Markdown-Dateien, umfangreiche Git-Logs und die Vorbereitung von Vektor-Embeddings Kompilations-Engpässe verursachen.

## Konfiguration

Um Python-Beschleunigung zu aktivieren, setzen Sie die Direktive `engine` in Ihrer `docmd.config.json` auf `"python"`.

```json "docmd.config.json"
{
  "title": "Globale API-Registry",
  "engine": "python",
  "src": "docs",
  "out": "site"
}
```

## Ideale Anwendungsfälle & Stärken

Die Python-Engine löst spezifische Kompilations-Engpässe. Sie bietet exzellente Effizienzgewinne unter folgenden Szenarien:

- **Massive Repositories (1.000+ Dateien)**: Monolithische Projekte profitieren enorm von asynchronem, parallelem Dateisystemzugriff, orchestriert über Pythons `ThreadPoolExecutor`.
- **Intensive Git-Metadaten-Erntung**: Das Extrahieren tiefer Commit-Logs über Hunderte von Seiten erfordert schweres Subprozess-Spawning. Die Python-Engine verarbeitet `git:log`-Tasks bis zu **1,20× schneller** als JavaScript.
- **Offline-Semantik-Vektorverarbeitung**: Native Handler für überschriftenbasiertes Text-Chunking (`search:chunk`), Float32-zu-Int8-Vektorquantisierung (`search:quantize`) und Kosinus-Ähnlichkeitsberechnung (`search:cosine`) beschleunigen Workflows von `docmd-search` ohne Cloud-Abhängigkeiten.
- **Binärfreie plattformübergreifende Umgebungen**: Anders als native C- oder Rust-Addons, die vorkompilierte Plattform-Binaries erfordern, führt die Python-Engine universellen Python-Quellcode überall dort aus, wo Python 3.8+ installiert ist.

## Unterstützte Geräte & Plattform-Pakete

Die Engine führt interpretierten Python-Code über die Python-3-Laufzeitumgebung des Hosts aus. Anders als nativ kompilierte Engines benötigt sie keine separaten Plattform-Binärpakete; ein einziges universelles Paket `@docmd/engine-python` bedient alle unterstützten Plattformen.

Die folgenden Plattform-Pakete werden derzeit verteilt:

| Plattform-Paket | Ziel-Architektur | Host-Betriebssystem |
| :--- | :--- | :--- |
| `@docmd/engine-python` | ARM64 (Apple Silicon) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 (Intel) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | ARM64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | x64 | Windows (Python 3.8+) |

::: callout info title:"Transparenter Graceful Fallback" icon:info
Fehlt in Ihrer Umgebung Python 3 oder schlägt die Initialisierung der Engine fehl, loggt die Engine eine nicht-fatale Benachrichtigung und **fällt automatisch** auf die hochperformante JavaScript-Engine zurück. Ihre Builds bleiben vollständig deterministisch.
:::

## Fähigkeiten & Strategische Einschränkungen

Um maximalen Nutzen zu erzielen, müssen Sie die architektonischen Trade-offs verstehen. Die Engine glänzt bei I/O-gebundenen Operationen und Batch-Vektortransformationen, hat aber Overhead bei prozessübergreifender Serialisierung.

| Fähigkeit / Task | Python-Engine-Performance-Profil | Architektonisches Urteil |
| :--- | :--- | :--- |
| **Batch-File-Discovery & Reads** | Beschleunigt über parallele `ThreadPoolExecutor`-Worker. | ✅ Hocheffektiv für massive Verzeichnisse. |
| **Git-Commit-Log-Erntung** | Schnelle Subprozess-Orchestrierung, die Node-Event-Loops umgeht. | ✅ Exzellent für Cold-Start-Git-Metadaten-Extraktion. |
| **Semantische Vektoroperationen** | Natives Chunking, Float32-zu-Int8-Quantisierung und Kosinus-Ähnlichkeit. | ✅ Hocheffektiv für Offline-Vektorsuche. |
| **Einzelne winzige Datei-Reads** | **Langsamer als native In-Process-JavaScript-V8-Ausführung**. | ❌ Ineffizient durch prozessübergreifenden Kommunikations-Overhead. |

### Die Doppel-Serialisierungs-Steuer erklärt

Die Kommunikation zwischen docmds Core-Orchestrator und der Python-Engine beruht auf zeilenbasiertem JSON, das über eine persistente Standard-Input/Output-Pipe (`stdio`) ausgetauscht wird:

```text
JS Worker -> JSON.stringify() -> stdio Pipe -> Python Worker (runner.py) -> [Python Task] -> Serialisation -> stdio Pipe -> JSON.parse()
```

Bei I/O-lastigen Operationen wie dem Abfragen von Git-Historien oder dem Batch-Quantisieren von Embedding-Vektoren überwiegt die eingesparte Verarbeitungszeit die Serialisierungskosten bei Weitem.

Bei einzelnen kleinen Datei-Reads oder iterativen String-Operationen **verbraucht der prozessübergreifende Roundtrip jedoch mehr CPU-Ressourcen als die eigentliche Aufgabe**. Das Weiterleiten von Micro-Tasks über die Prozessgrenze läuft langsamer ab als die direkte Ausführung in Node.js.

Infolgedessen **bleibt die JavaScript-Engine der empfohlene Runtime für Standard-Dokumentations-Websites**. Aktivieren Sie die Python-Engine gezielt für große Git-Historien, parallele Verzeichnisindexierung und Vektorsuch-Pipelines.

## Plugin- & API-Integration

Plugins und Build-Lifecycle-Hooks können direkt über `@docmd/api` mit der Python-Engine interagieren. Die API-Schicht fungiert als Sicherheitsgrenze, setzt strikte Task-Allowlists durch und stellt High-Level-Hilfsfunktionen bereit:

```typescript
import { resolveEngine, chunkText, quantizeVectors, cosineSimilarity } from '@docmd/api';

// Konfigurierte Engine oder beste verfügbare auflösen (versucht Python, fällt auf JS zurück)
const engine = await resolveEngine(['python', 'js']);

// Überschriftenbasiertes semantisches Text-Chunking durchführen
const chunks = await chunkText(engine, markdownContent, 'guide.md');

// Float32-Vektoren in kompakte Int8-Darstellungen quantisieren
const { quantized, mins, ranges } = await quantizeVectors(engine, embeddingVectors);

// Kosinus-Ähnlichkeits-Ranking gegenüber Korpus-Vektoren berechnen
const matches = await cosineSimilarity(engine, queryVector, corpusVectors, 10);
```