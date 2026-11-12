---
title: "Bibliotecas de Soporte"
description: "Micro-bibliotecas independientes y sin dependencias creadas por docmd.io para procesamiento de markdown, plantillas y compilación."
---

`docmd` está construido sobre un ecosistema modular de micro-bibliotecas independientes y sin dependencias externas. Cada biblioteca está diseñada con una estricta filosofía de ligereza: máximo rendimiento, cero dependencias, tipos TypeScript completos y ejecución isomórfica en Node.js, navegadores y entornos Edge.

Aunque estos paquetes impulsan el motor principal de compilación de `docmd`, son completamente independientes y se pueden utilizar en cualquier proyecto de JavaScript o TypeScript.

::: callout tip "Código Abierto Independiente" icon:sparkles
Cada biblioteca de soporte se publica de forma independiente en npm y se mantiene en su propio repositorio de GitHub bajo la organización `docmd-io`.
:::

## Resumen de Bibliotecas

::: cards cols:2
::: card title:"lite-matter" icon:file-text href:"/supporting-libraries/lite-matter"
Extractor de frontmatter ultraligero y analizador YAML para motores de Markdown y texto.
:::
::: card title:"lite-mdx" icon:code href:"/supporting-libraries/lite-mdx"
Compilador MDX y JSX sin dependencias con mapeo de componentes, propiedades y expresiones aisladas.
:::
::: card title:"lite-template" icon:layout href:"/supporting-libraries/lite-template"
Motor de plantillas asíncrono de velocidad submilimétrica compatible con sintaxis EJS básica.
:::
::: card title:"lite-hl" icon:highlighter href:"/supporting-libraries/lite-hl"
Tokenizador de código heurístico y resaltador de sintaxis con cero configuración.
:::
::: card title:"embed-lite" icon:video href:"/supporting-libraries/embed-lite"
Analizador estático de URL a HTML que genera incrustaciones adaptables para YouTube, Twitter/X, Spotify y más.
:::
:::

## Principios de Diseño

Todas las bibliotecas de soporte se adhieren a los siguientes principios:

* **Cero dependencias externas**: TypeScript puro y APIs web estándar sin dependencias pesadas.
* **Ejecución isomórfica**: Funcionamiento idéntico en Node.js, navegadores modernos, Cloudflare Workers y Deno.
* **Salida determinista**: Ejecución rápida con análisis predecible y estricto aislamiento de seguridad.
* **Seguridad de tipos**: Definiciones completas de TypeScript incluidas de forma nativa.
