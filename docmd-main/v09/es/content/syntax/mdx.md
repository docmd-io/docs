---
title: "Sintaxis MDX"
description: "Guía de sintaxis para etiquetas JSX, elementos con autocierre, etiquetas compuestas, expresiones y atributos en docmd."
---

`docmd` admite la sintaxis MDX y JSX gracias al compilador ligero `lite-mdx`. Puede escribir etiquetas JSX, atributos y expresiones dinámicas de JavaScript directamente en sus archivos Markdown junto con la sintaxis Markdown estándar.

Se admiten indistintamente las extensiones de archivo `.md` y `.mdx`.

::: callout tip "Coexistencia con Contenedores" icon:sparkles
Puede combinar libremente Markdown estándar, contenedores nativos de docmd (`::: callout`) y etiquetas JSX (`<Callout>`) en el mismo documento sin conflictos.
:::

## Etiquetas y Elementos

### Etiquetas con Autocierre

Utilice etiquetas con autocierre para widgets independientes, insignias e indicadores en línea:

```jsx
<Badge text="v0.9.10" type="info" />
<Badge text="Estable" type="success" />
<Separator />
```

### Componentes de Bloque

Los componentes de bloque envuelven contenido Markdown. El formato Markdown estándar, fragmentos de código, listas y enlaces continúan funcionando dentro:

```jsx
<Callout type="tip" title="Consejo Profesional">
  El formato Markdown estándar como **texto en negrita**, `código en línea` y listas funciona dentro de los componentes de bloque:

  * Primer elemento de lista
  * Segundo elemento de lista
</Callout>
```

## Componentes Compuestos y Notación por Puntos

`docmd` procesa componentes anidados y compuestos utilizando notación por puntos:

```jsx
<Tabs>
  <Tabs.Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tabs.Tab>
  <Tabs.Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tabs.Tab>
</Tabs>
```

También puede utilizar etiquetas anidadas estándar como `<Tab>` dentro de `<Tabs>`, o `<Step>` dentro de `<Steps>`.

## Atributos y Propiedades

MDX admite las sintaxis de atributos JSX estándar:

### Atributos de Cadena

```jsx
<Card title="Inicio Rápido" href="/getting-started" icon="rocket" />
```

### Atributos Numéricos y Booleanos

Los valores envueltos en llaves `{}` se analizan como números o booleanos:

```jsx
<Cards cols={3} interactive={true} />
```

### Abreviatura Booleana

Escribir el nombre de un atributo por sí solo equivale a establecerlo en `true`:

```jsx
<Card interactive title="Tarjeta Interactiva" />
```

### Objetos y Matrices

Pase objetos y matrices utilizando llaves anidadas:

```jsx
<Chart config={{ responsive: true, theme: "dark" }} data={[12, 19, 3]} />
```

### Atributos Spread

Propague objetos de propiedades existentes en componentes:

```jsx
<Card {...opcionesTarjeta} />
```

## Expresiones Dinámicas

MDX le permite interpolar expresiones dinámicas en el contenido utilizando llaves `{}`.

### Acceso a Frontmatter

Interpole valores de frontmatter declarados al principio de su documento:

```mdx
---
title: "Notas de la Versión"
version: "0.9.10"
author: "Equipo docmd"
---

# {frontmatter.title}

Versión actual: **{frontmatter.version}**  
Mantenido por: *{frontmatter.author}*
```

### Acceso a la Configuración del Sitio

Lea valores de su archivo de configuración `docmd.config.json`:

```jsx
Bienvenido a la documentación de {config.title}.
```

### Expresiones JavaScript

Las operaciones simples de JavaScript se pueden evaluar en línea:

```jsx
Copyright © {new Date().getFullYear()} docmd.io.
Tiempo de espera calculado: {1000 * 5}ms.
```

::: callout note "Evaluación en Entorno Aislado" icon:shield
Las expresiones se ejecutan en un entorno seguro y aislado con acceso únicamente a las propiedades del frontmatter, la configuración del sitio y las utilidades matemáticas globales estándar.
:::

## Aislamiento de Bloques de Código

Los bloques de código y las comillas invertidas en línea están protegidos de la compilación JSX. Puede mostrar ejemplos JSX de forma segura sin que se ejecuten:

````markdown
```jsx
<Callout type="warning">Esto se representará como código sin formato, no como un componente.</Callout>
```
````

El código en línea como `<Badge />` dentro de comillas invertidas también se conserva como texto literal.

## Comentarios

Utilice la sintaxis de comentarios JSX para dejar notas que no aparecerán en la salida compilada:

```jsx
{/* Este es un comentario interno y no se representará */}
```
