---
title: "Migrar desde Docusaurus"
description: "Una guía completa sobre cómo trasladar tu proyecto de Docusaurus v2/v3 a docmd."
---

Docusaurus es un framework de documentación basado en React. `docmd` ofrece una alternativa rápida y sin configuración que compila notablemente más rápido y no requiere componentes de React para renderizar funciones avanzadas de documentación.

### 1. Ejecutar el motor de migración

Ejecuta el siguiente comando en la raíz de tu proyecto existente de Docusaurus:

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core migrate --docusaurus
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core migrate --docusaurus
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core migrate --docusaurus
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core migrate --docusaurus
```
:::

#### Qué sucede automáticamente

::: steps

1. **Copia de seguridad**: Todo el directorio de tu proyecto (excluyendo `node_modules`, `.git`, `package.json` y archivos de bloqueo de dependencias) se respalda de forma segura en un nuevo directorio `docusaurus-backup/`.
2. **Migración de contenido**: Tu carpeta `docs/` se restaura en el directorio raíz del proyecto.
3. **Traducción de frontmatter**: Las etiquetas de frontmatter `sidebar_label` de Docusaurus se traducen automáticamente a `nav_title` de `docmd`, y las etiquetas heredadas `id` se eliminan de manera segura.
4. **Generación de configuración**: Se genera un `docmd.config.json`, extrayendo el `title` de tu sitio y las opciones de directorios estáticos de `docusaurus.config.js` o `docusaurus.config.ts`.

:::

### 2. Previsualizar la salida de la migración

Previsualiza tu contenido Markdown de inmediato en `docmd`:

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

Docusaurus utiliza configuraciones programáticas en JavaScript y componentes de React que deben mapearse a Markdown estándar y contenedores de `docmd`.

#### Configuración de navegación

Las barras laterales de Docusaurus a menudo se generan automáticamente o se declaran en `sidebars.js`. Crea un archivo `navigation.json` dentro de tu directorio `docs/` para definir la navegación explícita de la barra lateral. Consulta la [Guía de navegación](../configuration/navigation.md).

#### Reemplazar componentes MDX y React

Convierte las etiquetas personalizadas `<MyReactComponent />` en Markdown estándar o utiliza los [Contenedores](../content/containers/callouts.md) nativos de `docmd`.

##### Alias de contenedores de avisos

Los avisos de Docusaurus funcionan **de forma predeterminada** sin modificaciones de archivos:
- `:::note` → se renderiza como `callout info`
- `:::tip` → se renderiza como `callout tip`
- `:::info` → se renderiza como `callout info`
- `:::caution` → se renderiza como `callout warning`
- `:::danger` → se renderiza como `callout danger`

::: callout tip "Sintaxis de contenedores nativos" icon:sparkles
Para disfrutar de funciones avanzadas (como iconos personalizados o colores de insignia personalizados), convierte los avisos de Docusaurus a la sintaxis nativa de `docmd`:
```markdown
::: callout tip title:"Título personalizado" icon:sparkles
Este es un contenedor de tipo tip.
::: /callout
```
:::

##### Bloques de código con pestañas

**Docusaurus (React MDX):**
```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="apple" label="Apple" default>
    Apple content.
  </TabItem>
  <TabItem value="orange" label="Orange">
    Orange content.
  </TabItem>
</Tabs>
```

**docmd (Contenedor nativo):**
```markdown
::: tabs
== tab "Apple" icon:apple
Apple content.

== tab "Orange" icon:citrus
Orange content.
::: /tabs
```

#### Localización (i18n)

Si utilizabas las funciones de `i18n` de Docusaurus, traslada los archivos traducidos desde `i18n/<locale>/docusaurus-plugin-content-docs/current/` a los directorios de idioma de `docmd` (`docs/en/`, `docs/es/`, `docs/de/`, etc.) y define los códigos de idioma en `docmd.config.json`. Consulta la [Guía de localización](../configuration/localisation/index.md).

## Siguientes pasos

- Personaliza la apariencia de tu sitio en la [Guía de diseño e interfaz](../configuration/layout-ui.md).
- Reemplaza páginas de inicio hero personalizadas en React con [Contenedores Hero](../content/containers/hero.md) nativos.
