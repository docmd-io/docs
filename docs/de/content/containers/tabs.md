---
title: "Tabs (Registerkarten)"
description: "Organisieren Sie dichte, alternative oder mehrsprachige Informationen in umschaltbaren interaktiven Bereichen."
---

Tabs sind das optimale UI-Muster für die Darstellung von sich gegenseitig ausschließenden oder verwandten Datensätzen (z. B. Installationsanweisungen "NPM vs. Yarn" oder "macOS vs. Windows") in einem kompakten, interaktiven Format.

## Syntax-Referenz

Der Container `tabs` verwendet das spezielle Unter-Trennzeichen `== tab "Label"`. Jedes Label definiert einen eigenen Bereich, zwischen dem Benutzer umschalten können.

```markdown
::: tabs

== tab "Label 1"
Inhalt für den ersten Tab.

== tab "Label 2"
Inhalt für den zweiten Tab.

:::
```

## Implementierungs-Galerie

### 1. Paketverwaltung
Tabs werden am häufigsten verwendet, um Installationsanweisungen für verschiedene Paketmanager in einer einzigen Ansicht zu zeigen.

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

== tab "TypeScript"
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.js');
```

== tab "JavaScript"
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.js');
```

:::

## Kernfunktionen

### Isomorphes Lazy-Rendering
`docmd` implementiert **Conditional Resource Laziness**. Wenn ein Tab rechenintensive Elemente enthält (z. B. **Mermaid.js**-Diagramme oder hochauflösende Bilder), werden diese Assets erst initialisiert und gerendert, wenn der Benutzer diesen spezifischen Tab aktiviert. Dies gewährleistet schnelle anfängliche Seitenladezeiten.

### Zustands-Persistenz
Der Standard-SPA-Router verfolgt den Index des aktiven Tabs über ähnliche Dokumentationsseiten hinweg. Wenn ein Benutzer auf einer Seite "pnpm" auswählt und zu einer anderen Seite mit einer passenden Tab-Struktur navigiert, bleibt der "pnpm"-Tab automatisch aktiv.

## Technische Einschränkungen

| Einschränkung | Hinweis |
| :--- | :--- |
| **Verschachtelungstiefe** | Um die Integrität des Layouts zu bewahren, können Tabs nicht in andere Tab-Komponenten verschachtelt werden. |
| **Interaktiver Konflikt**| Syntax-Konflikt: Um Schritte (Steps) in einem Tab zu verschachteln, verwenden Sie eine standardmäßige geordnete Liste (`1. Schritt Eins`) anstelle des Containers `::: steps`. |
| **Responsive-Limit** | Es wird empfohlen, die Anzahl der Tabs auf maximal 6 pro Block zu begrenzen, um die Kompatibilität mit Mobilgeräten zu gewährleisten. |

::: callout tip "KI-Kontext-Mapping"
Wenn Sie Tabs für Code-Snippets verwenden, geben Sie die Zielsprache immer direkt im Tab-Label an (z. B. `== tab "TypeScript"`). Dies ermöglicht es LLMs, den technisch relevanten Abschnitt aus dem `llms-full.txt`-Kontext-Stream sofort zu identifizieren und zu extrahieren.
:::