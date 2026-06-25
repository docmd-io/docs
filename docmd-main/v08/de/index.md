---
title: "docmd Dokumentation: Produktionsreife Docs aus Markdown"
description: "Erstellen Sie in Sekundenschnelle produktionsreife Dokumentationen aus Markdown. Zero Setup, standardmäßig schnell, SEO-freundlich und KI-bereit."
titleAppend: false
---

::: hero

# docmd

Von Markdown zu produktionsreifen Dokumenten mit einem einzigen Befehl. Statisches HTML für SEO. SPA für Geschwindigkeit. Standardmäßig KI-bereit.

::: button "Erste Schritte" ./getting-started/quick-start.md icon:rocket
::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github
:::

## Übersicht

docmd ist ein Zero-Config-Dokumentationsgenerator. Er erstellt hochperformante statische Websites direkt aus Ihren Markdown-Dateien.

```bash
npx @docmd/core dev
```

Ein einzelner Befehl. Die Engine erstellt automatisch Ihre Website, generiert Navigation und aktiviert die sofortige Suche.

## Kernfunktionen

Alles, was für weltklasse Dokumentation benötigt wird, ist bereits enthalten. Keine komplexen Plugins für die Essentials erforderlich.

::: grids
::: grid
::: card "Sofortiges Setup" icon:rocket
Ohne Boilerplate-Code sofort anfangen. Die Engine erkennt Dateien automatisch und erstellt in Sekunden die Navigationsstruktur.
:::
:::
::: grid
::: card "KI-optimiert" icon:brain-circuit
Generiert automatisch `llms.txt` und `llms-full.txt`. Halten Sie Ihre Dokumentation für KI-Modelle verdaubar.
:::
:::
::: grid
::: card "OKF-Bundles" icon:database
Erzeugt ein Open-Knowledge-Format-Bundle — typisierter Konzeptgraph für KI-Agenten. Siehe [Spezifikation](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing).
:::
:::
::: grid
::: card "Nativer MCP-Server" icon:terminal
Integrierter Model-Context-Protocol-Server mit den Tools `search_docs`, `read_doc`, `validate_docs` und `get_llms_context`. KI-Agenten durchsuchen und validieren Ihre Dokumentation über eine lokale stdio-Verbindung — kein Netzwerk, kein externer Dienst.
:::
:::
::: grid
::: card "Lokale Suche" icon:search
Schnelle clientseitige Volltextsuche mit MiniSearch. Funktioniert sofort über Versionen und Sprachen hinweg.
:::
:::
::: grid
::: card "Live-Vorschau" icon:monitor
Betten Sie interaktive, editierbare Code-Sandboxes direkt in Ihre Seiten ein für sofortige Experimente.
:::
:::
::: grid
::: card "Anpassbare Templates" icon:palette
Personalisieren Sie Ihre Dokumentation mit Templates oder nutzen Sie integrierte Themes mit eigenem CSS. Unterstützt dunklen Modus und Systemvoreinstellungen.
:::
:::
::: grid
::: card "Native Internationalisierung" icon:globe
Erstklassige i18n-Unterstützung. Beinhaltet sprachpriorisiertes Routing, eigenständige Suchindizes und übersetzte UI-Strings.
:::
:::
:::

::: callout info "Umfangreiche Content-Container"
Gehen Sie über Standard-Markdown hinaus. Verwenden Sie strukturierte visuelle Muster wie Schritte, Tabs, Karten, Raster und Callouts direkt in Ihrem Text.
::: button "Container erkunden" ./content/containers/index.md icon:blocks
:::