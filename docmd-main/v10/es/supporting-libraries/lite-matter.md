---
title: "lite-matter"
description: "Extractor de frontmatter ultraligero y sin dependencias para motores de markdown y texto."
---

`lite-matter` es un extractor de frontmatter ultraligero. Analiza bloques de metadatos YAML en documentos Markdown, devuelve objetos estructurados y preserva intacto el cuerpo del documento.

::: callout tip "¿Por qué lite-matter?" icon:zap
Los analizadores tradicionales de frontmatter suelen acarrear pesados grafos de dependencias. `lite-matter` ofrece un reemplazo directo y de alto rendimiento para generadores de sitios estáticos y herramientas de compilación.
:::

## Instalación

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-matter
```
:::
::: tab label:npm
```bash
npm install lite-matter
```
:::
::: tab label:bun
```bash
bun add lite-matter
```
:::
:::

## Uso

Extraiga metadatos de frontmatter y el contenido del documento mediante la función `matter()`:

```typescript
import { matter } from 'lite-matter';

const markdown = `---
title: "Versión v0.10.0"
date: 2026-11-12
tags: ["lanzamiento", "anuncio"]
---

# Anuncio del Lanzamiento

Bienvenido a la versión más reciente.
`;

const { data, content } = matter(markdown);

console.log(data.title);   // "Versión v0.10.0"
console.log(data.tags);    // ["lanzamiento", "anuncio"]
console.log(content);      // "# Anuncio del Lanzamiento\n\nBienvenido a la versión más reciente.\n"
```

## Características

* **Soporte CRLF**: Procesa saltos de línea Windows (`\r\n`) y POSIX (`\n`) de forma transparente.
* **Estructuras anidadas**: Compatibilidad total con objetos, arrays y cadenas multilínea en YAML.
* **Seguridad y tolerancia a fallos**: Devuelve metadatos vacíos si el frontmatter falta o está mal formado sin lanzar excepciones.
* **Preservación de contenido**: El cuerpo del documento se conserva byte a byte sin modificaciones.

## Licencia

[MIT](https://github.com/docmd-io/lite-matter/blob/main/LICENSE) © [docmd.io](https://docmd.io)
