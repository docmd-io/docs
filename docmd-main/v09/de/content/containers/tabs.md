---
title: "Tabs"
description: "Organisieren Sie alternative Code-Snippets, Plattform-Anweisungen und mehrsprachige Inhalte in umschaltbare Tabs in docmd."
---

Tabs präsentieren sich gegenseitig ausschließende oder alternative Datensätze (wie die Wahl des Paketmanagers oder Befehle für Betriebssysteme). Sie verdichten technische Anweisungen in saubere, interaktive Tab-Container.

## Container-Syntax

```markdown
::: tabs # Äußerer Tab-Gruppen-Container Öffner
::: tab [title:"Tab-Beschriftung"] [icon:icon_name] # Einzelnes Tab-Element Öffner
Inhalt für Tab 1 (Code-Blöcke, Text, Listen)...
::: /tab # Expliziter Tab-Element-Schließer

::: tab [title:"Tab-Beschriftung 2"] [icon:icon_name] # Zweites Tab Öffner
Inhalt für Tab 2...
::: /tab
::: /tabs # Expliziter Tab-Gruppen-Schließer
```

## Funktionen & Unterstützte Attribute

| Parameter / Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Tab-Beschriftung** | `"String"` \| `title:"..."` | Text auf der Tab-Auswahlschaltfläche (1. Parameter oder `title:"..."`). |
| **Iconografie** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon vor der Beschriftung hinzu. |
| **Sub-Container** | `::: tab` ... `::: /tab` | Explizite Tab-Element-Wrapper. Legacy `== tab` Syntax wird ebenfalls unterstützt. |
| **Schließ-Tags** | `::: /tabs`, `::: /tab`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

### Paketmanager-Umschalter

Zeigen Sie Installationsbefehle über mehrere Paketmanager hinweg mit expliziten Sub-Containern an:

````markdown
::: tabs # Paketmanager-Optionen
::: tab "pnpm" icon:box # Empfohlener Paketmanager
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs
````

::: tabs # Paketmanager-Optionen
::: tab "pnpm" icon:box # Empfohlener Paketmanager
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs

### Mehrsprachige Code-Snippets

Gruppieren Sie sprachspezifische Implementierungen mithilfe von Tab-Icons und benannten Schließungs-Tags:

````markdown
::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs
````

::: tabs
::: tab title:"TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```
::: /tab

::: tab title:"JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```
::: /tab
::: /tabs

::: callout note "Legacy == tab Syntax" icon:archive
Bestehende Dokumentationen mit `== tab`-Syntax werden weiterhin nahtlos verarbeitet:

```markdown
::: tabs
== tab "JavaScript"
console.log("Legacy-Syntax");
::: /tabs
```
:::