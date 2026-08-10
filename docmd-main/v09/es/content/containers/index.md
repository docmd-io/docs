---
title: "Contenedores Interactivos Personalizados"
description: "Directorio completo de contenedores estructurales de UI y componentes interactivos en docmd."
---

Standard Markdown es excelente para el formato básico de texto, pero la documentación técnica requiere componentes estructurales. `docmd` extiende Markdown con una suite de **contenedores isomórficos**.

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::

::: callout tip "¿Migrando desde otros motores de documentación?" icon:sparkles
`docmd` admite alias de sintaxis de **VitePress** y **Docusaurus** directamente. Contenedores como `:::tip`, `:::warning`, `:::note`, `:::details` y `:::caution` funcionan sin modificaciones.
:::

## Referencia de Sintaxis Unificada

Todos los contenedores utilizan una sintaxis de bloques uniforme con etiquetas explícitas de apertura y cierre, comentarios en línea y atributos de clave-valor universales:

```markdown
::: containerType title:"Título de Encabezado" icon:rocket # Encabezado con comentario
::: subContainer title:"Título de Elemento" icon:code-2 # Elemento subcontenedor explícito
Esta es el área principal de contenido.
Admite **Markdown**, imágenes y anidamiento profundo de componentes.
::: /subContainer # Cierre explícito de subcontenedor
::: /containerType # Cierre explícito del contenedor principal
```

| Componente | Palabra Clave | Caso de Uso Principal |
| :--- | :--- | :--- |
| **[Avisos / Callouts](callouts.md)** | `callout` | Alertas semánticas para consejos, advertencias y avisos críticos. |
| **[Tarjetas / Cards](cards.md)** | `card` | Contenedores estructurales enmarcados para rejillas de funciones. |
| **[Rejillas / Grids](grids.md)** | `grids` | Grupos flexbox multicolumna de ajuste automático. |
| **[Pestañas / Tabs](tabs.md)** | `tabs` | Paneles intercambiables interactivos con elementos explícitos `::: tab`. |
| **[Pasos / Steps](steps.md)** | `steps` | Líneas de tiempo numeradas visuales con elementos explícitos `::: step`. |
| **[Plegables / Collapsibles](collapsible.md)** | `collapsible` | Desplegables de acordeón interactivos para preguntas frecuentes. |
| **[Botones / Buttons](buttons.md)** | `button` | Enlaces de navegación con llamadas a la acción destacadas de autocierre. |
| **[Etiquetas / Tags](tags.md)** | `tag` | Insignias de colores de autocierre para etiquetas de versión. |
| **[Secciones Destacadas / Hero](hero.md)** | `hero` | Encabezados de páginas de destino con soporte dividido y `::: slide`. |
| **[Incrustaciones / Embeds](embed.md)** | `embed` | Incrustaciones para video, redes sociales y medios interactivos con `embed-lite`. |
| **[Diagramas Mermaid](mermaid.md)** | `mermaid` | Diagramas de flujo, secuencia y mapas de arquitectura con controles por diagrama. |
| **[Contenedores Anidados](nested-containers.md)** | - | Patrones de composición recursiva para diseños complejos. |

## Análisis Universal de Atributos y Clave-Valor (Universal Attribute & Key-Value Parsing)

Todos los encabezados de contenedores admiten parámetros posicionales, atributos clave-valor con nombre y comentarios en línea (`# comentario`):

```markdown
::: button title:"Documentación" url:"/docs/getting-started" icon:book color:#3b82f6 # Atributos con nombre
::: card title:"Visión General de Arquitectura" icon:cpu # Título e icono
::: callout warning title:"Política de Seguridad" # Título y comentario
```

- **Fallback Posicional**: Las cadenas entre comillas (`"Mi Título"`) se asignan automáticamente a `title` o `url` según el tipo de contenedor.
- **Sobrescrituras con Nombre**: `title:"..."`, `url:"..."`, `icon:...`, `color:#...` permiten especificar atributos en cualquier orden.
- **Comentarios en Línea**: `# comentario` al final de la línea del encabezado se elimina antes del análisis.

## Beneficios Estratégicos de los Contenedores

Los contenedores proporcionan algo más que un acabado visual; entregan **Señales Semánticas** de alta fidelidad al compilador `docmd` y a los agentes de IA:

1. **Mapeo de Contexto de IA**: Marcar un bloque como `callout warning` instruye explícitamente a los LLM para priorizar esa advertencia durante el razonamiento.
2. **Integridad Estructural**: La combinación de `cards` y `grids` permite crear páginas de destino complejas directamente en Markdown sin código HTML innecesario.
3. **Mantenibilidad del Código Fuente**: Elimina la fragmentación de HTML sin procesar, manteniendo sus archivos `.md` limpios, legibles y analizables por máquinas.

## Composición Recursiva y Cierres Explícitos (Recursive Composition & Explicit Closers)

`docmd` admite **Profundidad de Anidamiento Infinita** y resolución determinista de etiquetas de cierre mediante etiquetas nombradas (`::: /card`, `::: /tabs`):

```markdown
::: card title:"Visión General de Arquitectura" # Tarjeta principal
    ::: callout info title:"E/S Asíncrona" # Aviso interno
    Este módulo utiliza una canalización de E/S no bloqueante asíncrona.
    ::: /callout # Cierra el aviso interno
    ::: button title:"Explorar Motor Central" url:"/#architecture"
::: /card # Cierra la tarjeta principal
```

[Dominar la Guía de Anidamiento](nested-containers.md)