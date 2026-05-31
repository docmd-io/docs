---
title: "JavaScript-Engine"
description: "Erforschen Sie docmds native JavaScript-Ausführungs-Engine im Detail: Anwendungsfälle, Portabilität, Funktionen und Grenzen."
---

Die **JavaScript-Engine** ist die grundlegende, in docmd integrierte Ausführungs-Engine. Sie läuft problemlos auf modernen JavaScript-Laufzeiten. Sie liefert eine hervorragende Leistung ohne externe Abhängigkeiten oder komplexe Compiler.

Standardmäßig verlässt sich jedes docmd-Repository auf die JavaScript-Engine. Sie bietet eine äußerst zuverlässige Dateidurchquerung, Metadaten-Indizierung und Build-Generierung.

## Konfiguration

Um docmd explizit anzuweisen, das JavaScript-Backend zu verwenden, definieren Sie die Eigenschaft `engine` als `"js"` in der Datei `docmd.config.json`.

```json
{
  "title": "Entwickler-Handbuch",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## Ideale Anwendungsfälle & Stärken

Die JavaScript-Engine ist außergewöhnlich vielseitig. Sie glänzt unter den folgenden Bedingungen:

- **Standard-Repositories**: Websites mit bis zu mehreren hundert Seiten bauen extrem schnell. Sie nutzt optimierte JIT-Kompilierung und natives JSON-Parsing.
- **Maximale Portabilität**: Wenn Ihr Team unterschiedliche Betriebssysteme oder eingeschränkte Unternehmensnetzwerke nutzt, garantiert die JavaScript-Engine überall fehlerfreie Builds.
- **Schnelles Prototyping**: Lokale Entwicklungs-Builds profitieren von sofortigem Hot-Reloading (`npx @docmd/core dev`) mit geringer Initialisierungslatenz.
- **Benutzerdefiniertes Scripting**: Konfigurations-Fallbacks und Plugin-Integrationen werden nativ in JavaScript ausgeführt. Standard-String-Parsing vermeidet grenzüberschreitende Serialisierungskosten.

## Verfügbare Geräte & Host-Kompatibilität

Da sie vollständig in nativen Laufzeitumgebungen arbeitet, unterstützt die JavaScript-Engine eine umfassende Palette von Zielplattformen:

- **Betriebssysteme**: macOS, Linux, Windows, FreeBSD und OpenBSD.
- **Hardware-Architekturen**: x64, ARM64 (Apple Silicon, AWS Graviton), ARMv7 und RISC-V.
- **Container-Umgebungen**: Alpine Linux, Standard-Debian/Ubuntu, Serverless-Build-Runner (Vercel, Netlify) und eingebettete CI-Pipelines.

## Funktionen & Einschränkungen

| Dimension | JavaScript-Engine-Profil | Operative Auswirkung |
| :--- | :--- | :--- |
| **Konkurrenzmodell** | Node.js-Event-Loop + Native Worker-Threads | Hervorragende asynchrone Planung für Netzwerkantworten. Festplattenintensive Blöcke arbeiten reibungslos. |
| **Git-Metadaten-Verarbeitung** | Subprozess-Orchestrierung (`child_process.execFile`) | Startet sicher native Git-Binärdateien, um Commit-Verläufe zu erfassen. Enthält dauerhaften Festplatten-Caching. |
| **Einrichtung & Initialisierung** | Zero-Configuration | Startet augenblicklich. Keine Postinstall-Kompilierung von Paketen erforderlich. |
| **Skalierungsgrenze** | Hochperformant bis ca. 1.000 Dokumente | Bei monolithischen Repositories mit mehr als tausend komplexen Dateien kann der Overhead sequenzieller Subprozesse geringfügige Latenzen verursachen. |

## Feature-Vollständigkeit

Die JavaScript-Engine bietet **exklusive universelle Feature-Unterstützung**. Jedes Core-Feature, jede erweiterte Syntax, jede Template-Zone und jedes offizielle Plugin ist so konzipiert, dass es hier reibungslos ausgeführt wird.

Ob mathematische Formeln kompiliert, Live-Suchindizes gerendert oder statische Sitemaps generiert werden – die JavaScript-Engine garantiert deterministische Builds.