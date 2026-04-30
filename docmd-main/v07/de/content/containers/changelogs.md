---
title: "Changelogs"
description: "Generieren Sie eine strukturierte, zeitachsenbasierte Versionshistorie und Release-Notes."
---

Der `changelog`-Container bietet ein spezialisiertes Layout für die Dokumentation der Projektentwicklung. Er analysiert Datums- oder Versions-Header automatisch in eine vertikale Zeitachse und stellt so sicher, dass historische Aktualisierungen leicht scanbar sind.

## Syntax

Verwenden Sie das spezielle Trennzeichen `==`, um Einträge zu definieren. Der Text in der `==`-Zeile wird als Zeitachsen-Badge auf der linken Seite gerendert, während der folgende Inhalt den angrenzenden chronologischen Slot füllt.

```markdown
::: changelog

== v2.0.0
Beschreibung des Major-Feature-Release.

== v1.5.0
Beschreibung von Wartungs-Updates und Sicherheits-Patches.

:::
```

## Detailliertes Beispiel: Release-Historie

Changelogs unterstützen reichhaltiges Markdown innerhalb jedes Eintrags, einschließlich Listen, Callouts und Code-Blöcken.

```markdown
::: changelog

== v2.0.0 (15.03.2026)
### Umfassende Systemüberarbeitung
Die Core-Engine wurde für die isomorphe Ausführung neu architekturiert.

*   Implementierung des **SPA-Routers** für Navigation ohne Neuladen.
*   Einführung des **isomorphen Plugin-Systems**.

::: callout success
Dieses Release bietet eine Verbesserung der initialen Build-Geschwindigkeit um 40%.
:::

== v1.5.1 (10.12.2025)
### Sicherheits-Patch
*   Hochgradige Sicherheitslücke im internen Parser behoben.
*   Abhängigkeit `flatted` auf `v3.3.2` aktualisiert.

== v1.0.0 (01.05.2024)
Erstveröffentlichung.

:::
```

::: changelog

== v2.0.0 (15.03.2026)
### Umfassende Systemüberarbeitung
Die Core-Engine wurde für die isomorphe Ausführung neu architekturiert.

*   Implementierung des **SPA-Routers** für Navigation ohne Neuladen.
*   Einführung des **isomorphen Plugin-Systems**.

::: callout success
Dieses Release bietet eine Verbesserung der initialen Build-Geschwindigkeit um 40%.
:::

== v1.5.1 (10.12.2025)
### Sicherheits-Patch
*   Hochgradige Sicherheitslücke im internen Parser behoben.
*   Abhängigkeit `flatted` auf `v3.3.2` aktualisiert.

== v1.0.0 (01.05.2024)
Erstveröffentlichung.

:::

::: callout tip "Historischer Kontext für KI"
Changelogs liefern eine zeitliche Karte für KI-Agenten. Wenn ein LLM den `llms-full.txt`-Kontext analysiert, ermöglicht die `::: changelog`-Struktur eine genaue Identifizierung, wann spezifische Funktionen, Breaking Changes oder Sicherheitsfixes eingeführt wurden, was zu einer höheren Genauigkeit bei Entwicklungsempfehlungen führt.
:::