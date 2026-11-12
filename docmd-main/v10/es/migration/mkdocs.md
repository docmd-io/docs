---
title: "Migrar desde MkDocs"
description: "Una guía completa sobre cómo trasladar tu proyecto de MkDocs (o Material for MkDocs) a docmd."
---

MkDocs es un generador de sitios estáticos basado en Python. `docmd` ofrece una experiencia orientada primero a Markdown creada sobre Node.js/Bun sin complejos entornos virtuales de Python ni dependencias adicionales de pip.

::: steps

### 1. Ejecutar el motor de migración

Ejecuta el siguiente comando en la raíz de tu proyecto existente de MkDocs:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --mkdocs
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --mkdocs
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --mkdocs
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --mkdocs
```
:::

#### Qué sucede automáticamente

::: steps

1. **Copia de seguridad**: Todo el directorio de tu proyecto (excluyendo `node_modules`, `.git`, `package.json` y archivos de bloqueo) se respalda de forma segura en un nuevo directorio `mkdocs-backup/`.
2. **Migración de contenido**: Tu carpeta `docs/` se restaura en el directorio raíz para que la use `docmd`.
3. **Generación de configuración**: Se genera un `docmd.config.json`, extrayendo tu `site_name` y `site_dir` de `mkdocs.yml`.
4. **Autotraducción de navegación**: El bloque superior `nav:` en `mkdocs.yml` se analiza y traduce al formato del array `navigation` de `docmd` (incluyendo `children` anidados).

:::

### 2. Previsualizar la salida de la migración

Previsualiza tu contenido en `docmd` de inmediato:

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

### 3. Configuración manual y mapeo de extensiones

MkDocs utiliza `mkdocs.yml` para definir la estructura de navegación y extensiones de PyMdown. Traduce cualquier configuración personalizada a contenedores de `docmd`.

#### Configuración de navegación

Los bloques superiores `nav:` en `mkdocs.yml` se traducen automáticamente al array `navigation` de `docmd`. Si requieres funciones avanzadas de navegación (como iconos personalizados o URLs externas), crea un archivo `navigation.json` en tu carpeta `docs/`:

```yaml "mkdocs.yml"
nav:
  - Home: index.md
  - Guide:
    - Setup: setup.md
    - Usage: usage.md
```

```json "navigation.json"
[
  {
    "title": "Home",
    "path": "/"
  },
  {
    "title": "Guide",
    "collapsible": true,
    "children": [
      { "title": "Setup", "path": "/setup" },
      { "title": "Usage", "path": "/usage" }
    ]
  }
]
```

#### Reemplazar extensiones de Python Markdown

Convierte la sintaxis de las extensiones de PyMdown de MkDocs a los [Contenedores](../content/containers/callouts.md) nativos de `docmd`.

##### Convertir avisos

MkDocs utiliza la sintaxis de bloques `!!!`, la cual requiere conversión al formato `:::`.

**MkDocs (PyMdown):**
```markdown
!!! note "Título opcional"
    Este es un bloque de contenido de aviso.
```

**docmd:**
```markdown
::: callout info "Título opcional"
Este es un bloque de contenido de aviso.
:::
```

##### Convertir pestañas

**MkDocs (SuperFences):**
```markdown
=== "Pestaña 1"
    Contenido para la pestaña 1.

=== "Pestaña 2"
    Contenido para la pestaña 2.
```

**docmd:**
```markdown
::: tabs
== tab "Pestaña 1"
Contenido para la pestaña 1.

== tab "Pestaña 2"
Contenido para la pestaña 2.
:::
```

:::

## Siguientes pasos

- `docmd` cuenta con búsqueda integrada. No se requieren plugins de búsqueda adicionales ni indexadores externos.
- Explora las [Opciones de temas](../theming/customisation.md) para personalizar colores y marca y adaptarlos a tu tema anterior.
