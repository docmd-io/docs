---
title: "Migrar desde VitePress"
description: "Una guía completa sobre cómo trasladar tu proyecto de VitePress a docmd."
---

VitePress es un generador de sitios estáticos impulsado por Vue. `docmd` ofrece una velocidad en tiempo de ejecución equivalente mientras elimina completamente la sobrecarga del framework JavaScript en el cliente, suprimiendo retrasos de hidratación de Vue.

::: steps

### 1. Ejecutar el motor de migración

Ejecuta el siguiente comando en la raíz de tu proyecto existente de VitePress:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --vitepress
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --vitepress
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --vitepress
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --vitepress
```
:::

#### Qué sucede automáticamente

::: steps

1. **Copia de seguridad**: Todo el directorio de tu proyecto (excluyendo `node_modules`, `.git`, `package.json` y archivos de bloqueo) se respalda de forma segura en un nuevo directorio `vitepress-backup/`.
2. **Migración de contenido**: Tu carpeta `docs/` (o archivos Markdown raíz) se restaura en el directorio raíz del proyecto. El directorio de configuración oculto `.vitepress` se elimina para evitar conflictos.
3. **Generación de configuración**: Se genera un `docmd.config.json`, extrayendo el `title` de tu sitio de `.vitepress/config.js`, `ts` o `mjs`.

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

VitePress configura la navegación dentro de módulos de configuración de JavaScript y permite incrustar componentes de Vue. Traduce estos elementos a contenedores de `docmd`.

#### Configuración de navegación

VitePress utiliza un array de objetos en `themeConfig.sidebar`. Crea un archivo `navigation.json` dentro de tu directorio `docs/`:

**VitePress (`.vitepress/config.js`):**
```javascript
themeConfig: {
  sidebar: [
    {
      text: "Guía",
      items: [
        { text: "Introducción", link: "/introduction" },
        { text: "Primeros pasos", link: "/getting-started" }
      ]
    }
  ]
}
```

**docmd (`navigation.json`):**
```json
[
  {
    "title": "Guía",
    "collapsible": true,
    "children": [
      { "title": "Introducción", "path": "/introduction" },
      { "title": "Primeros pasos", "path": "/getting-started" }
    ]
  }
]
```

#### Reemplazar componentes Vue y sintaxis de contenedores

Debido a que `docmd` no ejecuta Vue en el cliente, reemplaza los componentes personalizados con [Contenedores](../content/containers/callouts.md) de `docmd`.

Los contenedores de avisos de VitePress funcionan **de forma predeterminada** sin modificaciones:
- `:::tip` → se renderiza como `callout tip`
- `:::warning` → se renderiza como `callout warning`
- `:::danger` → se renderiza como `callout danger`
- `:::info` → se renderiza como `callout info`
- `:::details` → se renderiza como `collapsible`

::: callout success "Cero cambios requeridos" icon:check-circle
La sintaxis de contenedores de VitePress es compatible de forma nativa. Los bloques de advertencia existentes y las secciones de detalles desplegables se renderizan correctamente sin editar tus archivos Markdown.
:::

:::

## Siguientes pasos

- Explora la [Guía de despliegue](../deployment/index.md) de `docmd` para configurar compilaciones en GitHub Actions, Vercel, Netlify o Docker.
- Revisa el catálogo completo de [Contenedores](../content/containers/index.md) visuales.
