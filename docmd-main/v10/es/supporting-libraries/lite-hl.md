---
title: "lite-hl"
description: "Tokenizador de código heurístico y resaltador de sintaxis universal sin configuración."
---

`lite-hl` es un resaltador de sintaxis rápido y universal que no requiere configuración externa. Emplea reconocimiento heurístico de patrones para ofrecer un resaltado preciso de los lenguajes de programación más populares manteniendo un peso mínimo.

::: callout tip "Resaltado Universal" icon:cpu
`lite-hl` funciona de forma idéntica en entornos de servidor Node.js y en el navegador, resultando perfecto para generadores isomórficos de documentación.
:::

## Instalación

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-hl
```
:::
::: tab label:npm
```bash
npm install lite-hl
```
:::
::: tab label:bun
```bash
bun add lite-hl
```
:::
:::

## Uso

```typescript
import { highlight } from 'lite-hl';

const code = `function calcularTotal(precio, impuesto) {
  return precio * (1 + impuesto);
}`;

const html = highlight(code, 'javascript');
console.log(html);
```

## Lenguajes Compatibles

`lite-hl` incluye tokenizadores integrados para más de 30 lenguajes:

* JavaScript, TypeScript, JSX, TSX
* Python, Rust, Go, C, C++, C#
* HTML, XML, CSS, SCSS, JSON, YAML
* Bash, Shell, SQL, Markdown, Dockerfile

## Licencia

[MIT](https://github.com/docmd-io/lite-hl/blob/main/LICENSE) © [docmd.io](https://docmd.io)
