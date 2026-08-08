---
title: "Changelogs"
description: "Generieren Sie strukturierte, zeitachsenbasierte Versionshistorien und Release-Notes in docmd."
---

Der `changelog`-Container bietet ein spezialisiertes Layout für die Dokumentation der Projektentwicklung. Er parst Versions- oder Datums-Header in vertikale Zeitachseneinträge und stellt sicher, dass Release-Notes klar und scannbar bleiben.

## Syntax-Referenz

```markdown
::: changelog

== Beschriftungstext
Die Beschreibung des Eintrags wird hier platziert.

:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Eintragsmarkierung** | `==` | Trennzeichen, das einen neuen Zeitachseneintrag innerhalb des Changelog-Blocks einleitet. |
| **Beschriftung** | `String` | Textzeichenfolge (z. B. Versionsnummer oder ISO-Datum), die als Zeitachsen-Badge am linken Rand gerendert wird. |

## Anwendungsbeispiele

### Release-Historien-Zeitachse

Changelogs unterstützen die vollständige Markdown-Formatierung innerhalb jedes Eintrags, einschließlich Listen, Callouts und Code-Snippets:

```markdown
::: changelog

== v2.0.0 (2026-03-15)
### Umfassende Systemüberarbeitung
Die Core-Engine wurde für die isomorphe Ausführung neu architekturiert.

*   Implementiert den **SPA-Router** für Seiten-Navigation ohne Neuladen.
*   Eingeführt wurde die **isomorphe Plugin**-Architektur.

::: callout success
Dieses Release bietet eine Verbesserung der initialen Build-Kompilierungsgeschwindigkeit um 40%.
:::

== v1.5.1 (2025-12-10)
### Sicherheits-Patch
*   Kritische Sicherheitslücke im internen Parser behoben.
*   Abhängigkeit `flatted` auf `v3.3.2` aktualisiert.

== v1.0.0 (2024-05-01)
Erste öffentliche Veröffentlichung.

:::
```

::: changelog

== v2.0.0 (2026-03-15)
### Umfassende Systemüberarbeitung
Die Core-Engine wurde für die isomorphe Ausführung neu architekturiert.

*   Implementiert den **SPA-Router** für Seiten-Navigation ohne Neuladen.
*   Eingeführt wurde die **isomorphe Plugin**-Architektur.

::: callout success
Dieses Release bietet eine Verbesserung der initialen Build-Kompilierungsgeschwindigkeit um 40%.
:::

== v1.5.1 (2025-12-10)
### Sicherheits-Patch
*   Kritische Sicherheitslücke im internen Parser behoben.
*   Abhängigkeit `flatted` auf `v3.3.2` aktualisiert.

== v1.0.0 (2024-05-01)
Erste öffentliche Veröffentlichung.

:::

::: callout tip "Historischer Kontext für KI-Agenten" icon:sparkles
Changelog-Container liefern eine zeitliche Roadmap für KI-Agenten. Die `::: changelog`-Struktur ermöglicht es LLMs, genau zu parsen, wann spezifische APIs oder Sicherheits-Fixes im `llms.txt`-Kontextstrom eingeführt wurden.
:::