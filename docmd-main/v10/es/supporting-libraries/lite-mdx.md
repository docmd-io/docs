---
title: "lite-mdx"
description: "Compilador MDX y JSX sin dependencias para motores de markdown y navegadores."
---

`lite-mdx` es un compilador ultrarrápido y sin dependencias para componentes MDX y JSX. Transforma etiquetas JSX, elementos compuestos y expresiones dinámicas de JavaScript en HTML y Markdown limpios sin necesidad de Babel, Unified ni pesadas cadenas de herramientas AST.

::: callout tip "Paquete menor a 8KB" icon:feather
`lite-mdx` ocupa menos de 8KB minificado y se ejecuta de manera idéntica en Node.js, navegadores modernos, funciones Edge y Cloudflare Workers.
:::

## Instalación

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-mdx
```
:::
::: tab label:npm
```bash
npm install lite-mdx
```
:::
::: tab label:bun
```bash
bun add lite-mdx
```
:::
:::

## Inicio Rápido

```typescript
import { compile } from 'lite-mdx';

const mdx = `
# Bienvenido a {project.name}

<Callout type="tip">
  Este es un consejo para **v{project.version}**.
</Callout>

<Button variant="primary">Empezar</Button>
`;

const result = compile(mdx, {
  scope: {
    project: { name: 'docmd', version: '0.10.0' }
  },
  components: {
    Callout: (props, children) => `<div class="callout ${props.type}">${children}</div>`,
    Button: (props, children) => `<button class="${props.variant}">${children}</button>`
  }
});

console.log(result.content);
```

## Características

* **Cero dependencias**: Implementación pura en TypeScript/ESM.
* **Jerarquía de componentes**: Etiquetas con autocierre (`<Badge />`), componentes de bloque (`<Callout>...</Callout>`) y componentes con punto (`<Tabs.Tab>`).
* **Atributos enriquecidos**: Compatibilidad con cadenas, números, booleanos, objetos y propagación `{...props}`.
* **Interpolación dinámica**: Evalúa expresiones como `{frontmatter.title}` dentro de un entorno seguro.
* **Aislamiento de código**: Los bloques de código y las comillas invertidas están protegidos contra la ejecución.

## Licencia

[MIT](https://github.com/docmd-io/lite-mdx/blob/main/LICENSE) © [docmd.io](https://docmd.io)
