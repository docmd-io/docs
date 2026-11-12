---
title: "lite-template"
description: "Asynchrone Template-Engine im Sub-Millisekundenbereich, kompatibel mit einfacher EJS-Syntax."
---

`lite-template` ist eine minimalistische asynchrone Template-Engine für Microservices, statische Website-Generatoren und Dokumenten-Renderer. Sie bietet Kompatibilität mit EJS-Tags ohne den Ballast schwerer Engines.

::: callout tip "Asynchrone Auswertung" icon:sparkles
`lite-template` kompiliert Templates in asynchrone JavaScript-Funktionen, sodass Sie Datenbankabfragen oder asynchrone Hilfsfunktionen direkt in Template-Tags mit `await` ausführen können.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-template
```
:::
::: tab label:npm
```bash
npm install lite-template
```
:::
::: tab label:bun
```bash
bun add lite-template
```
:::
:::

## Verwendung

```typescript
import { render } from 'lite-template';

const template = `
<header>
  <h1><%= title %></h1>
  <p><%- description %></p>
  <ul>
    <% for (const item of items) { %>
      <li><%= item %></li>
    <% } %>
  </ul>
</header>
`;

const output = await render(template, {
  title: "Willkommen bei docmd",
  description: "Dokumentations-Engine <strong>v0.10.0</strong>",
  items: ["Schnell", "Zero-Config", "Erweiterbar"]
});

console.log(output);
```

## Tag-Syntax

| Tag | Zweck | Beispiel |
| :--- | :--- | :--- |
| `<%= value %>` | HTML-maskierte Ausgabe | `<%= user.name %>` |
| `<%- value %>` | Unmaskierte Rohausgabe | `<%- rawHtml %>` |
| `<% code %>` | Skript-Ausführung / Schleifen | `<% if (active) { %>` |
| `<%# comment %>` | Template-Kommentar | `<%# interner Hinweis %>` |

## Lizenz

[MIT](https://github.com/docmd-io/lite-template/blob/main/LICENSE) © [docmd.io](https://docmd.io)
