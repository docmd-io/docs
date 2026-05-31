---
title: "Rust-Engine"
description: "Erkunden Sie die optionale native Rust-Engine: Anwendungsfälle, Dateizugriffs-Funktionen, unterstützte Pakete und Einschränkungen."
---

Die **Rust-Engine** ist eine optionale Hochleistungs-Ausführungs-Engine. Sie beschleunigt schwere I/O-Workloads in riesigen Dokumentationsprojekten. Durch die Verwendung nativer Binärdateien über N-API umgeht sie die Einschränkungen des Standard-Event-Loops, um mehrthreadiges Dateilesen und Subprozess-Orchestrierung zu ermöglichen.

Verfügbar als **experimentelle Vorschau**, richtet sich die Rust-Engine an Unternehmen. Sie glänzt dort, wo tausende von Markdown-Dateien und umfangreiche Git-Logs zu Kompilierungs-Engpässen führen.

## Konfiguration

Um die native Rust-Beschleunigung zu aktivieren, konfigurieren Sie die Direktive `engine` in Ihrer Datei `docmd.config.json` als `"rust"`.

```json
{
  "title": "Global API Registry",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## Ideale Anwendungsfälle & Stärken

Die Rust-Engine löst spezifische Kompilierungs-Engpässe. Sie bietet in folgenden Szenarien hervorragende Effizienzgewinne:

- **Riesige Repositories (mehr als 1.000 Dateien)**: Monolithische Projekte profitieren immens von asynchronem, parallelem Dateisystemzugriff, der über Tokio orchestriert wird.
- **Intensives Erfassen von Git-Metadaten**: Das Extrahieren tiefer Commit-Logs über hunderte von Seiten hinweg erfordert schweres Starten von Subprozessen. Die Rust-Engine verarbeitet `git:log`-Aufgaben bis zu **1,24× schneller** als JavaScript.
- **Kaltstart-Beschleunigung in CI/CD**: In Umgebungen, in denen keine warmen Festplatten-Caches verfügbar sind, reduziert der rohe Dateilesedurchsatz die Gesamtverarbeitungszeit. Echte Benchmarks zeigen eine **Beschleunigung von ca. 25 % bei Kaltstarts** und eine **Verbesserung von ca. 17 % bei Warmstarts**.

## Unterstützte Geräte & Plattform-Pakete

Die Engine führt vorkompilierten Maschinencode aus. Sie erfordert dedizierte native Binärdateien, die auf Ihre Zielarchitektur zugeschnitten sind. Das grundlegende Paket `@docmd/engine-rust` lädt beim Start automatisch die richtige Plattform-Binärdatei verzögert.

Folgende Plattform-Pakete werden derzeit bereitgestellt:

| Plattform-Paket | Zielarchitektur | Host-Betriebssystem |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (glibc-Umgebungen) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (glibc-Umgebungen) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info "Sanfter automatischer Fallback"
Wenn in Ihrer Umgebung keine vorkompilierte Binärdatei verfügbar ist, protokolliert die Engine eine unschädliche Benachrichtigung und **weicht automatisch** auf die hochperformante JavaScript-Engine aus. Ihre Builds bleiben vollkommen deterministisch.
:::

## Funktionen & Strategische Einschränkungen

Um den maximalen Nutzen zu erzielen, müssen Sie die architektonischen Kompromisse verstehen. Die Engine eignet sich hervorragend für I/O-gebundene Operationen, verursacht jedoch Overhead bei der grenzüberschreitenden Serialisierung.

| Funktion / Aufgabe | Rust-Engine Leistungsprofil | Architektonisches Urteil |
| :--- | :--- | :--- |
| **Batch-Dateierkennung & -Lesevorgänge** | Beschleunigt über parallele Tokio-Worker. | ✅ Äußerst effektiv für riesige Verzeichnisse. |
| **Erfassung von Git-Commit-Logs** | Schnelle Subprozess-Orchestrierung unter Umgehung des Node-Event-Loops. | ✅ Hervorragend geeignet für Git-Metadatenextraktion bei Kaltstarts. |
| **Dauerhaftes Festplatten-Caching** | Native Unterstützung für verankerte Festplatten-Caches, um redundante Lesevorgänge zu eliminieren. | ✅ Äußerst effektiv für Warmstarts. |
| **CPU-gebundene Suchindizierung** | **Langsamer als native JavaScript-JIT**. | ❌ Ineffizient aufgrund des doppelten Serialisierungs-Overheads. |

### Die Serialisierungssteuer erklärt

Die Kommunikation zwischen dem Core-Orchestrator von docmd und der nativen Rust-Engine beruht auf stringifiziertem JSON, das die N-API-Laufzeitgrenze überschreitet:

```text
JS Worker → JSON.stringify() → NAPI Boundary → Serde Deserialisierung → [Rust-Aufgabe] → Serde Serialisierung → NAPI Boundary → JSON.parse()
```

Bei I/O-lastigen Operationen wie dem Abfragen von Git-Historien oder dem Lesen von Festplattenpuffern überwiegt die eingesparte Verarbeitungszeit die String-Konvertierungskosten bei weitem.

Bei hochgradig iterativen, CPU-gebundenen Aufgaben wie der Volltextsuchindizierung (`search:index`) verbraucht der **Serialisierungs-Roundtrip jedoch mehr CPU-Ressourcen als die eigentliche Aufgabe selbst**. Das Hin- und Herserialisieren großer Inhaltsarrays führt dazu, dass die Rust-Implementierung langsamer läuft als die native JIT-Stringmanipulation von Node.

Infolgedessen bleibt die **JavaScript-Engine die empfohlene Laufzeit für semantische Suchpipelines**. Aktivieren Sie die Rust-Engine selektiv für große Git- und Dateiverarbeitungs-Workloads.