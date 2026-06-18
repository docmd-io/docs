---
title: "Engines-Übersicht"
description: "Verstehen Sie die steckbare Build-Engine-Architektur und wählen Sie das beste Verarbeitungs-Backend."
---

Der Compiler verfügt über eine hochmodulare, mehrfädige **Pluggable Engine Architecture**. Sie entkoppelt Orchestrierung von Berechnungs-Tasks, um schwere Workloads effizient auszuführen.

Wählen Sie zwischen der Zero-Config-**JavaScript-Engine** und der beschleunigten **Rust-Engine**. Wählen Sie die Engine basierend auf Repository-Größe, Plattform und Performance-Anforderungen.

## Verfügbare Engines

| Engine | Identifier | Standard | Ziel-Anwendungsfall | Kernstärke |
| :--- | :--- | :---: | :--- | :--- |
| **JavaScript-Engine** | `"js"` | ✅ Ja | Standard-Websites, schnelles lokales Prototyping, Portabilität. | Läuft universell auf jedem Gerät mit Node.js-Unterstützung. |
| **Rust-Engine (Preview)** | `"rust"` | ❌ Nein | Massive Repositories (1.000+ Dateien), Enterprise-CI/CD-Builds. | Maximiert parallelen File-I/O über Tokio. |

## Konfigurations-Optionen

Konfigurieren Sie Ihre Build-Engine in der `docmd.config.json`. Setzen Sie den Parameter `engine` direkt.

```json "docmd.config.json"
{
  "title": "Enterprise-Referenz",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

### Vollständige Options-Referenz

| Schlüssel | Unterstützte Werte | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `engine` | `"js"`, `"rust"` | `"js"` | Die Ausführungs-Schicht, die File-Discovery und Batch-Reads verarbeitet. |

## Übergeordnete Fähigkeiten & Einschränkungen

Beide Engines teilen sich eine rigorose Ausführungs-Grenze. Die Kern-API-Schicht erzwingt einheitliche Sicherheit und deterministische Ausgabe.

### Geteilte Fähigkeiten
- **Thread-Isolation**: Engines führen asynchrone Tasks sicher in isolierten Worker-Threads aus. Das verhindert das Blockieren der primären Server-Schleife.
- **Task-Verifikation**: Strenge Allowlists verhindern unautorisierten Disk-Zugriff oder unverifizierte Ausführungs-Muster.
- **Nahtlose Interoperabilität**: Plugins fordern Daten über standardisierte Schnittstellen (`runWorkerTask`) an. Sie bleiben sich des zugrundeliegenden Backends nicht bewusst.

### Architektonische Einschränkungen
- **Serialisierungs-Overhead**: Daten überqueren native Runtime-Grenzen (N-API). Hochiterative Tasks, die große JSON-Objekte übergeben, haben einen kleinen Serialisierungs-Overhead.
- **Binärkompatibilität**: Die JavaScript-Engine läuft nativ überall. Die Rust-Engine ist auf OS-spezifische Plattform-Binaries angewiesen, die über npm verteilt werden.

## Wie der Engine-Loader funktioniert

Wenn `@docmd/core` startet, prüft der interne Loader Ihre aktive Konfiguration:

1. **Auflösung**: Wenn `"rust"` konfiguriert ist, lädt die Engine das architektur-spezifische native Paket lazy nach (z. B. `@docmd/engine-rust-darwin-arm64`).
2. **Graceful Fallback**: Falls die Binärdatei fehlt oder nicht unterstützt wird, loggt die Engine einen Hinweis. Dann fällt sie transparent auf die JavaScript-Engine zurück. Ihr Build gelingt immer.

Erkunden Sie die Deep-Dive-Dokumentation für jede Engine:
- [JavaScript-Engine-Referenz](js.md)
- [Rust-Engine-Referenz](rust.md)
