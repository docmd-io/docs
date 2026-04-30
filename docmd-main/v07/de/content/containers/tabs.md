---
title: "Tabs"
description: "Organisieren Sie dichte, alternative oder mehrsprachige Informationen in umschaltbaren interaktiven Fenstern."
---

Tabs sind das optimale UI-Muster, um sich gegenseitig ausschließende oder verwandte Datensätze (z. B. "Installation über NPM vs. Yarn" oder "macOS vs. Windows"-Anleitungen) in einem kompakten, interaktiven Format zu präsentieren.

## Syntax-Referenz

Der `tabs`-Container verwendet das spezielle Untertrennzeichen `== tab "Beschriftung"`. Optional können Sie mit der Syntax `icon:name` ein Icon hinzufügen.

```markdown
::: tabs

== tab "Tab 1" icon:rocket
Inhalt für den ersten Tab.

== tab "Tab 2" icon:settings
Inhalt für den zweiten Tab.

:::
```

## Implementierungsgalerie

### 1. Paketverwaltung
Tabs werden am häufigsten verwendet, um Installationsanweisungen für verschiedene Paketmanager in einer einzigen Ansicht anzuzeigen.

::: tabs

== tab "pnpm"
```bash
pnpm add @docmd/core
```

== tab "npm"
```bash
npm install @docmd/core
```

== tab "yarn"
```bash
yarn add @docmd/core
```

:::

### 2. Mehrsprachige Code-Snippets
Halten Sie Ihre Logik sauber, indem Sie verschiedene Programmiersprachen oder Umgebungen trennen.

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.js');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.js');
```

:::

## Kernfunktionen

### Isomorphes Lazy Rendering
`docmd` implementiert **konditionale Ressourcen-Verzögerung (Lazy Loading)**. Wenn ein Tab rechenintensive Elemente enthält (z. B. **Mermaid.js**-Diagramme oder hochauflösende Bilder), werden diese Assets erst initialisiert und gerendert, wenn der Benutzer diesen spezifischen Tab aktiviert. Dies gewährleistet schnelle erste Seitenladezeiten.

### Status-Persistenz
Der Standard-SPA-Router verfolgt den Index des aktiven Tabs über ähnliche Dokumentationsseiten hinweg. Wenn ein Benutzer auf einer Seite "pnpm" auswählt und zu einer anderen Seite mit einer passenden Tab-Struktur navigiert, bleibt der "pnpm"-Tab automatisch aktiv.

## Technische Einschränkungen

| Einschränkung | Hinweis |
| :--- | :--- |
| **Verschachtelungstiefe** | Um die Layout-Integrität zu bewahren, können Tabs nicht in anderen Tab-Komponenten verschachtelt werden. |
| **Interaktiver Konflikt**| Konfliktträchtige Syntax: Um Steps in einem Tab zu verschachteln, verwenden Sie eine standardmäßige geordnete Liste (`1. Schritt eins`) anstelle des `::: steps`-Containers. |
| **Responsives Limit** | Es wird empfohlen, die Anzahl der Tabs auf 6 pro Block zu begrenzen, um die Kompatibilität mit Mobilgeräten zu gewährleisten. |

::: callout tip "AI Context Mapping"
Wenn Sie Tabs für Code-Snippets verwenden, geben Sie die Zielsprache immer direkt im Tab-Label an (z. B. `== tab "TypeScript"`). Dies ermöglicht es LLMs, den technisch relevanten Abschnitt im `llms-full.txt`-Kontextstream sofort zu identifizieren und zu extrahieren.
:::