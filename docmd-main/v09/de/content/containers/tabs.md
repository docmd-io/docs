---
title: "Tabs"
description: "Organisieren Sie alternative Code-Snippets, Plattform-Anweisungen und mehrsprachige Inhalte in umschaltbare Tabs in docmd."
---

Tabs präsentieren sich gegenseitig ausschließende oder alternative Datensätze (wie die Wahl des Paketmanagers oder Befehle für Betriebssysteme). Sie verdichten technische Anweisungen in saubere, interaktive Tab-Container.

::: callout info "Unterstützung leerzeichenloser Syntax" icon:info
Sowohl die Syntax `::: tabs` als auch `:::tabs` (ohne Leerzeichen) werden identisch gerendert. Wählen Sie den Stil, der am besten zu Ihrem Erstellungs-Workflow passt.
:::

## Syntax-Referenz

```markdown
::: tabs

== tab "Tab-Beschriftung" [eigenschaft:wert...]
Der Tab-Inhalt wird hier platziert.

== tab "Sekundäre Beschriftung"
Der sekundäre Tab-Inhalt wird hier platziert.

:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Beschriftung** | `"String"` | Auf der Tab-Auswahlschaltfläche angezeigter Text. |
| **Icon** | `icon:NAME` | Optional. Fügt ein [Lucide](external:https://lucide.dev/icons)-Icon vor der Beschriftungszeichenfolge hinzu. |

## Anwendungsbeispiele

### Paketmanager-Umschalter

Zeigen Sie Installationsbefehle über mehrere Paketmanager hinweg in einem einzigen kompakten Block an:

````markdown
::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::
````

::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::

### Mehrsprachige Code-Snippets

Gruppieren Sie sprachspezifische Implementierungen mithilfe von Tab-Icons zur sofortigen Identifikation:

````markdown
::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::
````

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::

## Einschränkungen & Verhaltensregeln

| Regel | Technischer Hinweis |
| :--- | :--- |
| **Verschachtelungslimit** | Tabs können nicht direkt in anderen Tab-Containern verschachtelt werden. |
| **Steps-Kompatibilität** | Verschachteln Sie `::: steps` nicht in einem Tab-Bereich. Verwenden Sie stattdessen eine standardmäßige geordnete Liste. |
| **Viewport-Grenzen** | Halten Sie die Tab-Anzahl unter 6 Eintragsblöcken für mobile Kompatibilität. |
| **Zustandspersistenz** | Ausgewählte Tab-Zustände bleiben bei Seitenübergängen während der SPA-Navigation erhalten. |

::: callout tip "Kontextbezogene Beschriftung für KI" icon:sparkles
Geben Sie Zielsprachen oder Betriebssysteme in Tab-Beschriftungen an (z. B. `== tab "TypeScript"`). Explizite Beschriftungen ermöglichen es KI-Indexieren, alternative Codeblöcke genau ihren jeweiligen Ökosystemen zuzuordnen.
:::