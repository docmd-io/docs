---
title: "Migrar desde Astro Starlight"
description: "Una guía completa sobre cómo trasladar tu proyecto de Astro Starlight a docmd."
---

Starlight es un tema de documentación creado sobre Astro. `docmd` ofrece una experiencia similar de cero JavaScript por defecto sin requerir configuraciones completas de frameworks web ni complejas integraciones de Astro.

::: steps

### 1. Ejecutar el motor de migración

Ejecuta el siguiente comando en la raíz de tu proyecto existente de Starlight:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --starlight
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --starlight
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --starlight
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --starlight
```
:::

#### Qué sucede automáticamente

::: steps

1. **Copia de seguridad**: Todo el directorio de tu proyecto (excluyendo `node_modules`, `.git`, `package.json` y archivos de bloqueo) se respalda de forma segura en un nuevo directorio `starlight-backup/`.
2. **Migración de contenido**: Starlight almacena la documentación en `src/content/docs/`. El motor de migración extrae esta carpeta y mueve su contenido a la carpeta raíz `docs/`.
3. **Generación de configuración**: Se genera un `docmd.config.json`, extrayendo el `title` de tu sitio de la integración de Starlight dentro de `astro.config.mjs` o `astro.config.ts`.

:::

### 2. Previsualizar la salida de la migración

Previsualiza tu contenido Markdown en `docmd` de inmediato:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

### 3. Configuración manual y reemplazo de componentes

#### Configuración de navegación

Starlight define las barras laterales de navegación en `astro.config.mjs` a través del array `sidebar`. Crea un archivo `navigation.json` dentro de tu directorio `docs/`:

**Starlight (`astro.config.mjs`):**
```javascript
sidebar: [
  {
    label: "Guías",
    items: [
      { label: "Configuración", link: "/guides/setup/" }
    ]
  }
]
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guías",
    "collapsible": true,
    "children": [
      { "title": "Configuración", "path": "/guides/setup" }
    ]
  }
]
```

#### Reemplazar componentes Astro (MDX / Markdoc)

Starlight utiliza componentes Astro incrustados a través de MDX o Markdoc. Reemplázalos con los [Contenedores](../content/containers/callouts.md) nativos de `docmd`.

##### Convertir componentes de pestañas

**Starlight:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="Stars">Sirius, Vega, Betelgeuse</TabItem>
  <TabItem label="Moons">Io, Europa, Ganymede</TabItem>
</Tabs>
```

**docmd:**
```markdown
::: tabs
== tab "Stars" icon:sparkles
Sirius, Vega, Betelgeuse

== tab "Moons" icon:moon
Io, Europa, Ganymede
::: /tabs
```

##### Convertir llamadas de atención (asides)

**Starlight:**
```mdx
:::note[Título opcional]
Algún contenido de nota.
:::
```

**docmd:**
```markdown
::: callout info title:"Título opcional"
Algún contenido de nota.
::: /callout
```

#### Mapeo de frontmatter

Starlight exige un tipado estricto de frontmatter a través de las colecciones de contenido de Astro. Si utilizabas propiedades de frontmatter como `hero` o `banner` para páginas de inicio, reemplázalas con las [Secciones Hero](../content/containers/hero.md) nativas de `docmd` redactadas directamente en el cuerpo de Markdown.

:::

## Siguientes pasos

- Explora el [plugin de búsqueda](../plugins/search.md) integrado de `docmd`. Mientras que Starlight depende de la integración con Pagefind, `docmd` incluye un indexador de búsqueda local rápido y sin configuración predeterminada listo para usar.
