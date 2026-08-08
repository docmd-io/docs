---
title: "docmd Dokumentation: Produktionsreife Docs aus Markdown"
description: "Erstellen Sie in Sekundenschnelle produktionsreife Dokumentationen aus Markdown. Zero Setup, standardmäßig schnell, SEO-freundlich und KI-bereit."
titleAppend: false
---

::: hero

# docmd

Von Markdown zu produktionsreifen Dokumenten mit einem einzigen Befehl. Statisches HTML für SEO. SPA für Geschwindigkeit. Works mit KI-Tools direkt nach der Installation.

::: button "Erste Schritte" ./getting-started/quick-start.md icon:rocket
::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github
:::

## Übersicht

docmd ist ein Zero-Configuration-Dokumentationsgenerator. Er erstellt schnelle statische Websites direkt aus Ihren Markdown-Dateien.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

Führen Sie diesen einzelnen Befehl aus. Die Engine erstellt Ihre Website, generiert die Navigation und aktiviert die Suche automatisch.

## Kernfunktionen

Alles, was für eine solide Dokumentation benötigt wird, ist bereits integriert. Keine zusätzlichen Plugins für die Basisfunktionen erforderlich.

::: grids
    ::: grid
        ::: card "Sofortiges Setup" icon:rocket
        Beginnen Sie sofort ohne Boilerplate. Die Engine erkennt Dateien automatisch und strukturiert die Navigation in Sekundenschnelle.
        :::
    :::
    ::: grid
        ::: card "KI-Kontext" icon:brain-circuit
        Generiert `llms.txt` und `llms-full.txt` automatisch. Ihre Dokumentation bleibt für KI-Assistenten lesbar.
        :::
    :::
    ::: grid
        ::: card "OKF-Bundles" icon:database
        Generiert ein Open Knowledge Format Bundle und einen typisierten Konzeptgraphen für KI-Agenten. Lesen Sie [mehr](external:https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing).
        :::
    :::
    ::: grid
        ::: card "Nativer MCP-Server" icon:terminal
        Integrierter Model Context Protocol Server mit nativen Tools. KI-Agenten abfragen und validieren Ihre Docs über eine lokale stdio-Verbindung — kein Netzwerk, kein externer Dienst.
        :::
    :::
    ::: grid
        ::: card "Lokale Suche" icon:search
        Schnelle, clientseitige Volltextsuche betrieben von MiniSearch. Funktioniert direkt nach der Installation über Versionen und Sprachen hinweg.
        :::
    :::
    ::: grid
        ::: card "Live-Vorschau" icon:monitor
        Rendern Sie Markdown sofort im Browser mit der `docmd.compile` API. Nutzen Sie Live-Editoren, CMS-Vorschauen und In-App-Dokumentation.
        :::
    :::
    ::: grid
        ::: card "Eigene Templates" icon:palette
        Personalisieren Sie Ihre Dokumentation mit Templates oder nutzen Sie integrierte Themes mit eigenem CSS. Unterstützt Dunkelmodus und Systemeinstellungen.
        :::
    :::
    ::: grid
        ::: card "Native Übersetzung" icon:globe
        Erstklassige i18n-Unterstützung. Bietet sprachenbezogenes Routing, individuelle Suchindizes und übersetzte UI-Strings.
        :::
    :::
:::

::: callout info "Umfangreiche Content-Container" icon:info
Gehen Sie über Standard-Markdown hinaus. Verwenden Sie strukturierte visuelle Muster wie Schritte, Tabs, Karten, Raster und Callouts direkt in Ihrem Text.
::: button "Container erkunden" ./content/containers/index.md icon:blocks
:::
