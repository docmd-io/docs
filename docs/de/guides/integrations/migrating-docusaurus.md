---
title: "Von Docusaurus migrieren"
description: "Eine Schritt-für-Schritt-Anleitung zur Migration Ihrer Dokumentation von Docusaurus zu docmd, mit Fokus auf Performance-Gewinne und Syntax-Mapping."
---

## Problem

Docusaurus ist ein leistungsstarkes Framework, aber die Abhängigkeit von schweren React-Runtimes, komplexen MDX-Abstraktionen und langsamen Build-Zeiten bei großen Projekten kann zur Last werden. Teams suchen oft nach einer leichtgewichtigeren Zero-Config-Alternative, die Geschwindigkeit und Einfachheit priorisiert, ohne auf reichhaltige UI-Komponenten und eine professionelle Developer Experience zu verzichten.

## Warum es wichtig ist

Eine Migration zwischen Dokumentations-Engines wird oft wegen des befürchteten Aufwandes für die Konvertierung proprietärer Syntax und der Umstrukturierung großer Content-Mengen vermieden. `docmd` minimiert diese Reibung, indem es nah am Standard-Markdown bleibt und gleichzeitig hochwertige, ressourcenschonende Alternativen für gängige Docusaurus-Funktionen bietet.

## Ansatz

`docmd` bietet eine Hochleistungsalternative für Standard-Markdown-Inhalte. Obwohl `docmd` die Ausführung beliebiger React-Komponenten innerhalb von Markdown (MDX) nicht unterstützt, bietet seine native [Container-Syntax](../../content/containers) erstklassigen Ersatz für Docusaurus-Admonitions, Tabs und Layout-Grids – bei deutlich schnelleren Build-Zeiten und ohne jeglichen Framework-Overhead auf der Client-Seite.

## Implementierung

### 1. Admonition- (Callout-) Mapping

Docusaurus verwendet Admonitions im `:::type`-Stil. `docmd` nutzt eine ähnliche, aber semantisch flexiblere [Callout-Syntax](../../content/containers/callouts). Die meisten Migrationen lassen sich mit einem einfachen globalen Suchen-und-Ersetzen erledigen:

*   `:::note` → `::: callout info`
*   `:::tip` → `::: callout tip`
*   `:::warning` → `::: callout warning`
*   `:::danger` → `::: callout danger`

### 2. Tabs und Layouts

Docusaurus verlässt sich auf React-Komponenten für interaktive Elemente wie Tabs. `docmd` bietet einen nativen [Tabs-Container](../../content/containers/tabs), der keine Imports erfordert und sofort in leichtgewichtiges, barrierefreies HTML gebaut wird.

```markdown
::: tabs
::: tab "npm"
npm install docmd
:::
::: tab "yarn"
yarn add docmd
:::
:::
```

### 3. Navigations-Übersetzung

Übertragen Sie Ihre `sidebars.js`-Logik in die [Navigations-Konfiguration](../../configuration/navigation) von `docmd`. `docmd` verwendet eine saubere JSON-basierte Struktur, die global definiert oder dezentral über `navigation.json`-Dateien in Unterverzeichnissen verwaltet werden kann.

### 4. Von MDX zu Plugins wechseln

Wenn Ihre Dokumentation für komplexe Logik auf eigene React-Komponenten angewiesen ist, empfehlen wir, diese Logik in [eigene Plugins](../../customisation/extending-custom-plugins) oder Standard-HTML/JavaScript zu überführen. Dies stellt sicher, dass Ihre Inhalte lesbar und portabel bleiben, während die Rendering-Engine schnell bleibt.

## Abwägungen

Der größte Kompromiss ist der Verzicht auf MDX. `docmd` erzwingt eine klare Trennung der Verantwortlichkeiten: **Inhalt gehört in Markdown, Logik gehört in Plugins.** Diese architektonische Entscheidung führt zu Build-Zeiten, die oft 10- bis 50-mal schneller sind als bei Docusaurus, und zu einem JavaScript-Payload, der deutlich kleiner ist. Dies resultiert in einer viel schnelleren "Time to Interactive" für Ihre Benutzer.
