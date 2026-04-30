---
title: "Plugin-Mechanismus & Verwendung"
description: "Erfahren Sie mehr über die Lifecycle-Hooks von docmd, den Plugin-Sicherheitsmechanismus und wie Sie die Funktionen der Engine erweitern können."
---

`docmd` folgt einer steckbaren Architektur. Fast alle Kernfunktionen — von der Suche über SEO bis hin zur Live-Vorschau — sind als Plugins implementiert. Dieses Design stellt sicher, dass die Engine leichtgewichtig bleibt, während Entwickler Funktionen selektiv basierend auf ihren spezifischen Projektanforderungen aktivieren können.

## Plugin-Übersicht

| Plugin | Funktion |
| :--- | :--- |
| **[Suche (Search)](search.md)** | Bietet eine leistungsstarke, Offline-first Volltextsuche. |
| **[SEO](seo.md)** | Generiert automatisch Meta-Tags, Sitemaps und steuert den Zugriff von KI-Crawlern. |
| **[Mermaid](mermaid.md)** | Rendert Flussdiagramme, Sequenzdiagramme und Gantt-Charts. |
| **[LLMs](llms.md)** | Generiert einen maschinenlesbaren Stream der gesamten Dokumentation für KI-Training oder Suche. |
| **[Live-Vorschau (Live)](../content/live-preview.md)** | Stellt eine im Browser laufende Rendering-Engine für benutzerdefinierte Editoren bereit. |

## Lifecycle-Hooks

Plugins können in den Build-Prozess eingreifen, indem sie sich in die folgenden Lifecycle-Hooks einklinken:

| Hook | Beschreibung |
| :--- | :--- |
| `onInit(ctx)` | Wird sofort nach dem Start der Engine und dem Laden der Konfiguration ausgeführt |
| `onPostBuild(ctx)` | Ausführung von Logik nach der Generierung aller HTML-Dateien |
| `translations(localeId)` | Gibt übersetzte UI-Strings für ein Locale zurück |
| `actions` | Serverseitige Handler, die über WebSocket-RPC vom Browser aus aufrufbar sind |
| `events` | "Fire-and-Forget"-Handler für vom Browser gepushte Events |

## Plugin-Sicherheit

Das Plugin-System bietet integrierte Sicherheitsgarantien:

- **Validierung**: Plugins können einen `plugin`-Deskriptor mit `name`, `version` und `capabilities` deklarieren. Ungültige Deskriptoren werden zum Ladezeitpunkt abgelehnt.
- **Isolierung**: Jeder Hook-Aufruf ist in einen Try/Catch-Block gehüllt. Ein fehlerhaftes Plugin kann weder den Build zum Absturz bringen noch andere Plugins beeinflussen.
- **Erzwingung von Fähigkeiten**: Plugins, die Fähigkeiten (Capabilities) deklarieren, können sich nur für Hooks registrieren, die sie explizit deklariert haben. Nicht deklarierte Hooks werden mit einer Warnung übersprungen.

Siehe [Plugins erstellen](building-plugins.md) für die vollständige API-Referenz.

::: callout tip "KI-transparente Architektur :robot:"
Die Plugin-Architektur ist auf **Determinismus** ausgelegt. Jeder von einem Plugin injizierte Meta-Tag und jedes Skript ist rückverfolgbar, was es KI-Agenten (und menschlichen Entwicklern) ermöglicht, genau zu verstehen, wie sich die Website verhält, ohne versteckte Nebeneffekte.
:::