---
title: "Übersicht der Engines"
description: "Verstehen Sie die steckbare Build-Engine-Architektur und wählen Sie das beste Verarbeitungs-Backend."
---

Der Compiler verfügt über eine hochmodulare, mehrthreadige **steckbare Engine-Architektur**. Sie entkoppelt die Orchestrierung von Rechenaufgaben, um rechenintensive Workloads effizient auszuführen.

Wählen Sie zwischen der konfigurierungsfreien **JavaScript-Engine** und der beschleunigten **Rust-Engine**. Wählen Sie die Engine basierend auf der Größe Ihres Repositories, der Plattform und Ihren Leistungsanforderungen.

## Verfügbare Engines

| Engine | Bezeichner | Standard | Ziel-Anwendungsfall | Hauptstärke |
| :--- | :--- | :---: | :--- | :--- |
| **JavaScript-Engine** | `"js"` | ✅ Ja | Standard-Websites, schnelles lokales Prototyping, Portabilität. | Läuft universell auf jedem Gerät, das Node.js unterstützt. |
| **Rust-Engine (Vorschau)** | `"rust"` | ❌ Nein | Riesige Repositories (mehr als 1000 Dateien), Enterprise CI/CD-Builds. | Maximiert parallele Datei-I/O via Tokio. |

## Konfigurationsoptionen

Konfigurieren Sie Ihre Build-Engine in der Datei `docmd.config.json`. Setzen Sie den Parameter `engine` direkt.

```json
{
  "title": "Enterprise-Referenz",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

### Vollständige Optionsreferenz

| Schlüssel | Unterstützte Werte | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `engine` | `"js"`, `"rust"` | `"js"` | Die Ausführungsebene, die die Dateierkennung und Batch-Lesevorgänge verarbeitet. |

## Übergreifende Funktionen & Einschränkungen

Beide Engines teilen sich eine strikte Ausführungsgrenze. Die Core-API-Ebene erzwingt einheitliche Sicherheit und deterministische Ausgaben.

### Gemeinsame Funktionen
- **Thread-Isolation**: Engines führen asynchrone Aufgaben sicher in isolierten Worker-Threads aus. Dies verhindert das Blockieren des primären Server-Loops.
- **Aufgaben-Verifizierung**: Strikte Whitelists verhindern unbefugten Festplattenzugriff oder unbestätigte Ausführungsmuster.
- **Nahtlose Interoperabilität**: Plugins fordern Daten über standardisierte Schnittstellen (`runWorkerTask`) an. Sie bleiben vom zugrunde liegenden Backend unabhängig.

### Architektonische Einschränkungen
- **Serialisierungs-Overhead**: Daten überschreiten native Laufzeitgrenzen (N-API). Hochgradig iterative Aufgaben, die große JSON-Objekte übergeben, verursachen eine geringe Serialisierungsgebühr.
- **Binärkompatibilität**: Die JavaScript-Engine läuft überall nativ. Die Rust-Engine verlässt sich auf betriebssystemspezifische Plattform-Binärdateien, die über npm verteilt werden.

## So funktioniert der Engine-Loader

Beim Start von `@docmd/core` prüft der interne Loader Ihre aktive Konfiguration:

1. **Auflösung**: Wenn für `"rust"` konfiguriert, lädt die Engine das architekturspezifische native Paket verzögert (z. B. `@docmd/engine-rust-darwin-arm64`).
2. **Sanfter Fallback**: Wenn die Binärdatei fehlt oder nicht unterstützt wird, protokolliert die Engine einen Hinweis. Sie weicht dann transparent auf die JavaScript-Engine aus. Ihr Build gelingt in jedem Fall.

Erfahren Sie mehr in der Detaildokumentation für jede Engine:
- [JavaScript-Engine Referenz](js.md)
- [Rust-Engine Referenz](rust.md)