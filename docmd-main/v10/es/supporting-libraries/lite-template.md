---
title: "lite-template"
description: "Motor de plantillas asíncrono y ligero compatible con la sintaxis básica de EJS."
---

`lite-template` es un motor de plantillas asíncrono y minimalista diseñado para microservicios, generadores de sitios estáticos y renderizadores en tiempo de ejecución. Ofrece compatibilidad con las etiquetas básicas de EJS sin sobrecargar el proyecto.

::: callout tip "Evaluación Asíncrona" icon:sparkles
`lite-template` compila plantillas en funciones JavaScript asíncronas, lo que le permite invocar consultas de base de datos o utilidades con `await` directamente dentro de las etiquetas de la plantilla.
:::

## Instalación

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

## Uso

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
  title: "Bienvenido a docmd",
  description: "Motor de documentación <strong>v0.10.0</strong>",
  items: ["Rápido", "Cero-configuración", "Extensible"]
});

console.log(output);
```

## Sintaxis de Etiquetas

| Etiqueta | Propósito | Ejemplo |
| :--- | :--- | :--- |
| `<%= valor %>` | Salida con escape HTML | `<%= usuario.nombre %>` |
| `<%- valor %>` | Salida sin escape (HTML directo) | `<%- htmlCrudo %>` |
| `<% código %>` | Ejecución de scripts y bucles | `<% if (activo) { %>` |
| `<%# comentario %>` | Comentario interno en la plantilla | `<%# nota interna %>` |

## Licencia

[MIT](https://github.com/docmd-io/lite-template/blob/main/LICENSE) © [docmd.io](https://docmd.io)
