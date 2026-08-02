---
title: "Rust-Engine"
description: "Erkunden Sie die optionale native Rust-Engine: Anwendungsfälle, File-I/O-Fähigkeiten, unterstützte Pakete und Einschränkungen."
---

Die **Rust-Engine** ist eine optionale, hochperformante Ausführungs-Engine. Sie beschleunigt schwere I/O-Workloads in massiven Dokumentations-Projekten. Durch die Verwendung nativer Binaries über N-API umgeht sie Standard-Event-Loop-Beschränkungen und liefert mehrfädiges File-Reading und Subprozess-Orchestrierung.

Verfügbar als **experimentelle Preview**, zielt die Rust-Engine auf Enterprise-Scale ab. Sie glänzt dort, wo Tausende von Markdown-Dateien und umfangreiche Git-Logs Kompilations-Engpässe verursachen.

## Konfiguration

Um native Rust-Beschleunigung zu aktivieren, setzen Sie die Direktive `engine` in Ihrer `docmd.config.json` auf `"rust"`.

```json "docmd.config.json"
{
  "title": "Globale API-Registry",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## Ideale Anwendungsfälle & Stärken

Die Rust-Engine löst spezifische Kompilations-Engpässe. Sie bietet exzellente Effizienzgewinne unter folgenden Szenarien:

- **Massive Repositories (1.000+ Dateien)**: Monolithische Projekte profitieren enorm von asynchronem, parallelem File-System-Zugriff, orchestriert über Tokio.
- **Intensive Git-Metadaten-Erntung**: Das Extrahieren tiefer Commit-Logs über Hunderte von Seiten erfordert schweres Subprozess-Spawning. Die Rust-Engine verarbeitet `git:log`-Tasks bis zu **1,24× schneller** als JavaScript.
- **Cold-Build-Beschleunigung in CI/CD**: In Umgebungen ohne warme Disk-Caches reduziert der rohe File-Read-Durchsatz die Gesamtverarbeitungszeit. Praxis-Benchmarks zeigen eine **~25 % Beschleunigung bei Cold Builds** und eine **~17 % Verbesserung bei Warm Builds**.

## Unterstützte Geräte & Plattform-Pakete

Die Engine führt vorkompilierten Maschinencode aus. Sie benötigt dedizierte native Binaries, die auf Ihre Ziel-Host-Architektur zugeschnitten sind. Das fundamentale Paket `@docmd/engine-rust` lädt automatisch das korrekte Plattform-Binary beim Start lazy nach.

Die folgenden Plattform-Pakete werden derzeit verteilt:

| Plattform-Paket | Ziel-Architektur | Host-Betriebssystem |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (glibc-Umgebungen) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (glibc-Umgebungen) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "Transparenter Graceful Fallback"
Fehlt in Ihrer Umgebung ein passendes vorgebautes Binary, loggt die Engine eine nicht-fatale Benachrichtigung und **fällt automatisch** auf die hochperformante JavaScript-Engine zurück. Ihre Builds bleiben vollständig deterministisch.
:::

## Fähigkeiten & Strategische Einschränkungen

Um maximalen Nutzen zu erzielen, müssen Sie die architektonischen Trade-offs verstehen. Die Engine glänzt bei I/O-gebundenen Operationen, hat aber Overhead bei Cross-Boundary-Serialisierung.

| Fähigkeit / Task | Rust-Engine-Performance-Profil | Architektonisches Urteil |
| :--- | :--- | :--- |
| **Batch-File-Discovery & Reads** | Beschleunigt über parallele Tokio-Worker. | ✅ Hocheffektiv für massive Verzeichnisse. |
| **Git-Commit-Log-Erntung** | Schnelle Subprozess-Orchestrierung, die Node-Event-Loops umgeht. | ✅ Exzellent für Cold-Start-Git-Metadaten-Extraktion. |
| **Persistentes Disk-Caching** | Native Unterstützung für verankerte Disk-Caches zur Eliminierung redundanter Reads. | ✅ Hocheffektiv für Warm Builds. |
| **CPU-gebundene Such-Indexierung** | **Langsamer als natives JavaScript-JIT**. | ❌ Ineffizient durch doppelten Serialisierungs-Overhead. |

### Die Doppel-Serialisierungs-Steuer erklärt

Die Kommunikation zwischen docmds Core-Orchestrator und der nativen Rust-Engine beruht auf stringifiziertem JSON, das die N-API-Runtime-Grenze überquert:

```text
JS Worker → JSON.stringify() → NAPI Boundary → Serde Deserialisation → [Rust Task] → Serde Serialisation → NAPI Boundary → JSON.parse()
```

Bei I/O-lastigen Operationen wie dem Abfragen von Git-Historien oder dem Lesen von Disk-Buffern überwiegt die eingesparte Verarbeitungszeit die Kosten der String-Konversion bei Weitem.

Für hochiterative, CPU-gebundene Tasks wie die Volltext-Suchindizierung (`search:index`) **verbraucht der Serialisierungs-Roundtrip jedoch mehr CPU-Ressourcen als die zugrundeliegende Aufgabe selbst**. Die Serialisierung großer Content-Arrays hin und her führt dazu, dass die Rust-Implementierung langsamer läuft als Nodes native JIT-String-Manipulation.

Infolgedessen **bleibt die JavaScript-Engine der empfohlene Runtime für semantische Such-Pipelines**. Aktivieren Sie die Rust-Engine gezielt für große Git- und File-Management-Workloads.