---
title: "Componentes MDX"
description: "Redacte documentación con componentes MDX y JSX utilizando el plugin oficial mdx y lite-mdx."
---

`docmd` proporciona soporte integrado para componentes MDX y JSX a través del plugin `@docmd/plugin-mdx`. Impulsado por `lite-mdx`, compila etiquetas JSX en HTML accesible y contenedores nativos de `docmd` durante el tiempo de compilación sin sobrecarga de JavaScript en el cliente.

Tanto las extensiones de archivo `.md` como `.mdx` se pueden utilizar indistintamente.

::: callout tip "¿Por qué usar MDX en docmd?" icon:sparkles
MDX ofrece una sintaxis de autoría familiar para equipos que migran desde marcos como Nextra, Docusaurus o Mintlify, lo que permite renderizar el marcado de componentes existente sin reescribir archivos Markdown.
:::

## Instalación

Instale el plugin oficial de MDX:

```bash
docmd add mdx
```

Alternativamente, registre el plugin en su `docmd.config.json`:

```json
{
  "plugins": {
    "mdx": {}
  }
}
```

## Mapeos de Componentes Integrados

El plugin asigna componentes comunes de documentación directamente a contenedores de `docmd`:

### Cuadros de Información (`<Callout>`)

```jsx
<Callout type="tip" title="Consejo Profesional">
  Utilice etiquetas JSX estándar o contenedores docmd en el mismo archivo.
</Callout>

<Callout type="warning" title="Precaución">
  Asegúrese de actualizar sus dependencias antes de compilar.
</Callout>
```

| Propiedad | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `type` | `String` | `info` | Variante de estilo (`info`, `tip`, `warning`, `danger`). |
| `title` | `String` | `undefined` | Título que se muestra en la cabecera. |
| `icon` | `String` | `undefined` | Nombre de icono Lucide o identificador Iconify opcional. |

### Tarjetas y Cuadrículas (`<Card>`, `<Cards>`)

Agrupe enlaces y elementos de referencia en diseños de cuadrícula adaptables:

```jsx
<Cards cols={2}>
  <Card title="Inicio Rápido" href="/getting-started/quick-start" icon="rocket">
    Aprenda a inicializar y configurar su primer sitio de documentación con docmd.
  </Card>
  <Card title="Referencia CLI" href="/reference/cli-commands" icon="terminal">
    Comandos de interfaz de línea de comandos, opciones y herramientas de diagnóstico.
  </Card>
</Cards>
```

| Propiedad | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `cols` | `Number` | `2` | Columnas de la cuadrícula (`1`, `2`, `3` o `4`). |
| `title` | `String` | `undefined` | Título de la tarjeta. |
| `href` | `String` | `undefined` | URL de destino del enlace. |
| `icon` | `String` | `undefined` | Identificador del icono de la tarjeta. |

### Pestañas (`<Tabs>`, `<Tab>`)

Presente fragmentos de código específicos de plataforma o instrucciones multilingües:

```jsx
<Tabs>
  <Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tab>
  <Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add docmd
    ```
  </Tab>
</Tabs>
```

También se admite la notación de etiquetas compuestas:

```jsx
<Tabs>
  <Tabs.Tab label="macOS">
    `brew install docmd`
  </Tabs.Tab>
  <Tabs.Tab label="Linux">
    `curl -fsSL https://docmd.io/install.sh | sh`
  </Tabs.Tab>
</Tabs>
```

### Pasos (`<Steps>`)

Cree guías y tutoriales de instalación paso a paso numerados:

```jsx
<Steps>
  ### Inicializar Proyecto
  Ejecute `docmd init` en el directorio de su proyecto.

  ### Añadir Contenido
  Escriba sus páginas de documentación en `docs/` usando Markdown o MDX.

  ### Compilar Sitio
  Compile archivos estáticos listos para producción con `docmd build`.
</Steps>
```

## Comparación de Sintaxis

Puede elegir entre la sintaxis de contenedores nativos y las etiquetas JSX según sus preferencias o convenciones de proyecto:

| Característica | Contenedores Nativos (`:::`) | Componentes MDX (`<Component>`) |
| :--- | :--- | :--- |
| **Estilo de Sintaxis** | Markdown nativo (`::: callout`) | Estilo JSX/React (`<Callout>`) |
| **Dependencias** | Cero dependencias externas | Integrado mediante `@docmd/plugin-mdx` |
| **Etiquetas Compuestas** | Contenedores anidados | Notación por puntos (`<Tabs.Tab>`) |
| **Expresiones** | Variables de plantilla (`$var`) | Expresiones dinámicas (`{expr}`) |
| **Portabilidad** | Markdown simple más limpio | Compatible con Docusaurus / Nextra |

::: callout tip "Referencia de Sintaxis Completa" icon:book-open
Para obtener detalles completos sobre expresiones, tipos de atributos y sintaxis de comentarios, consulte la [Guía de Sintaxis MDX](syntax/mdx.md).
:::
