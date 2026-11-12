---
title: "Componentes MDX"
description: "Escriba documentación interactiva con MDX, sintaxis de componentes JSX, expresiones dinámicas y componentes compuestos en docmd."
---

docmd admite **MDX** de forma nativa, lo que le permite integrar perfectamente componentes al estilo JSX/React y expresiones dinámicas directamente dentro de su contenido Markdown. Con la tecnología del compilador ultrarrápido y sin dependencias de docmd, MDX se compila en HTML estático ligero y accesible sin sobrecarga de empaquetadores pesados ni tiempos de ejecución en el cliente.

Puede utilizar tanto la extensión `.md` como `.mdx` indistintamente.

## ¿Por qué MDX en docmd?

* **Compilación sin dependencias**: Compilación estática rápida sin necesidad de Webpack, Babel ni cadenas de herramientas externas de React.
* **Familiaridad con la sintaxis JSX**: Máxima compatibilidad para desarrolladores que migran desde Nextra, Docusaurus, Astro Starlight o Mintlify.
* **Coexistencia de componentes**: Utilice etiquetas JSX (`<Callout>`, `<Card>`, `<Tabs>`) junto con la sintaxis de contenedores nativa de docmd (`::: callout`).
* **Expresiones dinámicas seguras**: Interpole de forma segura valores de frontmatter, variables de configuración y expresiones JavaScript en un entorno aislado.
* **Etiquetas compuestas y con punto**: Soporte completo para componentes jerárquicos como `<Tabs.Tab>` y `<Steps.Step>`.

---

## Sintaxis básica de componentes

### Etiquetas con autocierre

Las etiquetas de cierre automático son ideales para indicadores en línea, insignias y widgets independientes:

```jsx
<Badge text="Estable" type="success" />
<Badge text="v0.9.10" type="info" />
<Badge text="En desuso" type="danger" />
```

### Componentes de bloque con contenido Markdown

Los componentes de bloque envuelven contenido Markdown, que sigue admitiendo el formato estándar de Markdown, fragmentos de código, listas y enlaces:

```jsx
<Callout type="tip" title="Consejo profesional">
  Puede incluir **texto en negrita**, `código en línea` e incluso bloques de código dentro de etiquetas JSX:

  ```bash
  npx @docmd/core build
  ```
</Callout>
```

---

## Componentes MDX integrados

docmd proporciona asignaciones integradas para los componentes de documentación más habituales:

### Avisos (`<Callout>`)

```jsx
<Callout type="info" title="Información">
  Proporciona orientación contextual o notas del sistema.
</Callout>

<Callout type="warning" title="Advertencia">
  Destaca precauciones críticas y cambios importantes.
</Callout>
```

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `type` | `String` | Estilo de variante: `info`, `tip`, `warning`, `danger` (predeterminado: `info`). |
| `title` | `String` | Texto de encabezado opcional del aviso. |
| `icon` | `String` | Nombre de icono de Lucide o identificador de Iconify personalizado. |

### Tarjetas y diseños de cuadrícula (`<Card>`, `<Cards>`)

Agrupe enlaces, características o accesos directos en cuadrículas adaptables y estructuradas:

```jsx
<Cards cols={2}>
  <Card title="Inicio rápido" href="/getting-started/quick-start" icon="rocket">
    Aprenda a inicializar y configurar su primer sitio de documentación con docmd.
  </Card>
  <Card title="Referencia de la CLI" href="/reference/cli-commands" icon="terminal">
    Marcadores de interfaz de comandos, opciones y configuraciones del servidor completos.
  </Card>
</Cards>
```

### Pestañas (`<Tabs>`, `<Tab>`)

Presente fragmentos de código en varios lenguajes o instrucciones para diferentes plataformas:

```jsx
<Tabs>
  <Tab label="npm">
    ```bash
    npm install @docmd/core
    ```
  </Tab>
  <Tab label="pnpm">
    ```bash
    pnpm add @docmd/core
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add @docmd/core
    ```
  </Tab>
</Tabs>
```

También se admite la notación compuesta `<Tabs.Tab>`:

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

Cree guías paso a paso numeradas y secuenciales para tutoriales o instrucciones de instalación:

```jsx
<Steps>
  ### Inicializar el proyecto
  Ejecute `npx @docmd/core init` en su terminal.

  ### Añadir contenido
  Escriba sus páginas de documentación en `docs/` utilizando Markdown o MDX.

  ### Desplegar
  Compile recursos estáticos listos para producción con `npx @docmd/core build`.
</Steps>
```

---

## Expresiones dinámicas e interpolación

MDX permite incrustar expresiones dinámicas mediante llaves `{}`. Las expresiones se evalúan en un entorno seguro con acceso al frontmatter del documento actual y a la configuración del sitio.

### Acceso al Frontmatter

```mdx
---
title: "Guía de autenticación"
version: "2.4.0"
author: "Equipo de docmd"
---

# {frontmatter.title}

Versión de la documentación: **{frontmatter.version}**  
Mantenido por: *{frontmatter.author}*
```

### Acceso a la configuración del sitio

```jsx
Bienvenido a la documentación de {config.title}.
```

### Expresiones de JavaScript

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Presupuesto de compilación calculado: {500 * 2}ms.
```

---

## Props y atributos

MDX admite las sintaxis de atributos JSX estándar:

```jsx
{/* Atributos de cadena */}
<Card title="Configuración" href="/configuration/overview" />

{/* Expresiones numéricas y booleanas */}
<Cards cols={3} animated={true} />

{/* Abreviatura booleana (equivalente a interactive={true}) */}
<Card interactive title="Tarjeta interactiva" />

{/* Propagación de atributos (spread) */}
<Card {...cardProps} />
```

---

## Elección entre contenedores y MDX

Tanto los contenedores nativos de docmd (`::: contenedor`) como los componentes MDX (`<Componente>`) son ciudadanos de primera clase en docmd:

| Característica | Contenedores nativos (`:::`) | Componentes MDX (`<Componente>`) |
| :--- | :--- | :--- |
| **Estilo de sintaxis** | Nativo de Markdown (`::: callout`) | Estilo JSX/React (`<Callout>`) |
| **Dependencias de herramientas** | Cero dependencias externas | Cero dependencias externas (mediante `lite-mdx`) |
| **Jerarquía compuesta** | Sangría anidada | Etiquetas con punto (`<Tabs.Tab>`) |
| **Expresiones dinámicas** | Sintaxis de variables (`$var`) | Expresiones JavaScript (`{expr}`) |
| **Portabilidad del ecosistema** | Lectura óptima en texto plano | Compatibilidad directa con Docusaurus / Nextra |

::: callout tip "Coexistencia" icon:sparkles
Puede combinar libremente contenedores nativos y componentes MDX dentro de la misma página de documentación sin ningún conflicto.
:::
