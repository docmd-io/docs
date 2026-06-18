---
title: "JavaScript-Engine"
description: "Tauchen Sie tief in docmds native JavaScript-Ausführungs-Engine ein: Anwendungsfälle, Portabilität, Fähigkeiten und Grenzen."
---

Die **JavaScript-Engine** ist die in docmd eingebettete, grundlegende Ausführungs-Engine. Sie läuft reibungslos auf modernen JavaScript-Runtimes und liefert exzellente Performance ohne externe Abhängigkeiten oder komplexe Compiler.

Standardmäßig verlässt sich jedes docmd-Repository auf die JavaScript-Engine. Sie bietet hochzuverlässige File-Traversal, Metadaten-Indexierung und Build-Generierung.

## Konfiguration

Um docmd explizit anzuweisen, das JavaScript-Backend zu nutzen, definieren Sie die Eigenschaft `engine` als `"js"` in `docmd.config.json`.

```json "docmd.config.json"
{
  "title": "Entwickler-Handbuch",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## Ideale Anwendungsfälle & Stärken

Die JavaScript-Engine ist außergewöhnlich vielseitig. Sie glänzt unter folgenden Bedingungen:

- **Standard-Repositories**: Sites mit bis zu mehreren Hundert Seiten bauen extrem schnell. Sie profitiert von optimierter JIT-Kompilierung und nativem JSON-Parsing.
- **Maximale Portabilität**: Wenn Ihr Team unterschiedliche Betriebssysteme oder eingeschränkte Unternehmensnetzwerke verwendet, garantiert die JavaScript-Engine reibungslose Builds überall.
- **Schnelles Prototyping**: Lokale Development-Builds profitieren von sofortigem Hot-Reloading (`npx @docmd/core dev`) mit niedriger Initialisierungs-Latenz.
- **Eigene Skripte**: Konfigurations-Fallbacks und Plugin-Integrationen laufen natürlich in JavaScript. Standard-String-Parsing vermeidet Serialisierungs-Kosten über Grenzen hinweg.

## Verfügbare Geräte & Host-Kompatibilität

Da sie vollständig in nativen Runtime-Umgebungen läuft, unterstützt die JavaScript-Engine eine umfassende Palette an Zielplattformen:

- **Betriebssysteme**: macOS, Linux, Windows, FreeBSD und OpenBSD.
- **Hardware-Architekturen**: x64, ARM64 (Apple Silicon, AWS Graviton), ARMv7 und RISC-V.
- **Container-Umgebungen**: Alpine Linux, Standard-Debian/Ubuntu, serverlose Build-Runner (Vercel, Netlify) und eingebettete CI-Pipelines.

## Fähigkeiten & Einschränkungen

| Dimension | JavaScript-Engine-Profil | Operative Auswirkung |
| :--- | :--- | :--- |
| **Concurrency-Modell** | Node.js Event Loop + Native Worker Threads | Exzellentes asynchrones Scheduling für Netzwerk-Antworten. Disk-intensive Blöcke laufen reibungslos. |
| **Git-Metadaten-Verarbeitung** | Subprozess-Orchestrierung (`child_process.execFile`) | Startet sicher native Git-Binaries, um Commit-Historien zu sammeln. Inklusive persistentem Disk-Cache. |
| **Setup & Initialisierung** | Zero-Configuration | Startet sofort. Keine Package-Postinstall-Kompilierung erforderlich. |
| **Skalierbarkeits-Ceiling** | Hochperformant bis ~1.000 Dokumente | Bei monolithischen Repositories mit über tausend komplexen Dateien kann sequenzieller Subprozess-Overhead kleinere Latenzen verursachen. |

## Feature-Vollständigkeit

Die JavaScript-Engine ist **exklusiv in ihrer universellen Feature-Unterstützung**. Jedes Kern-Feature, jede fortgeschrittene Syntax, jede Template-Zone und jedes offizielle Plugin ist darauf ausgelegt, hier reibungslos zu laufen.

Ob beim Kompilieren mathematischer Formeln, beim Rendern von Live-Suchindizes oder beim Generieren statischer Sitemaps — die JavaScript-Engine garantiert deterministische Builds.
