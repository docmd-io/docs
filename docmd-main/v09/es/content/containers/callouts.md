---
title: "Avisos (Callouts)"
description: "Destaque advertencias críticas, consejos profesionales y contexto de fondo mediante bloques visuales semánticos en docmd."
---

Los avisos (callouts) aíslan la información que requiere la atención inmediata del lector. `docmd` proporciona cinco tipos de avisos semánticos, cada uno con un estilo, acentos de fondo e iconografía distintivos.

::: callout info "Alias compatibles con la migración" icon:info
Al migrar desde VitePress o Docusaurus, los alias de contenedores nativos funcionan sin modificaciones:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

Estos alias se renderizan de forma idéntica a los avisos nativos de `docmd`. La sintaxis sin espacios como `:::callout` también es compatible.
:::

## Referencia de sintaxis

```markdown
::: callout type "Texto del título" [propiedad:valor...]
El contenido o texto de advertencia va aquí.
:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Tipo** | `info` \| `tip` \| `warning` \| `danger` \| `success` | Intención semántica que define los acentos de fondo y la iconografía predeterminados. |
| **Título** | `"String"` | Opcional. Anula la etiqueta de encabezado semántica predeterminada con un título personalizado. |
| **Icono** | `icon:NOMBRE` | Opcional. Anula el icono predeterminado con un icono de [Lucide](external:https://lucide.dev/icons) personalizado. |

### Tipos de avisos compatibles

| Tipo | Intención visual |
| :--- | :--- |
| `info` | Contexto de fondo o información útil no crítica. |
| `tip` | Accesos directos de rendimiento o mejores prácticas. |
| `warning` | Problemas potenciales o características en desuso a supervisar. |
| `danger` | Riesgo de pérdida de datos, cambios importantes o fallos críticos. |
| `success` | Confirmación de una configuración exitosa o paso de compilación. |

## Ejemplos de uso

### Aviso básico

Un aviso mínimo sin un título explícito utiliza la clave de tipo como su etiqueta de encabezado:

```markdown
::: callout info
Los esquemas de configuración heredados siguen siendo compatibles, pero ya no se recomiendan.
:::
```

::: callout info
Los esquemas de configuración heredados siguen siendo compatibles, pero ya no se recomiendan.
:::

### Título e icono personalizados

Anule la etiqueta e icono predeterminados con un título personalizado y cualquier nombre de icono de Lucide:

```markdown
::: callout warning "Aviso de cambios importantes" icon:alert-triangle
El sistema RPC de WebSocket interno está oficialmente en desuso.
:::
```

::: callout warning "Aviso de cambios importantes" icon:alert-triangle
El sistema RPC de WebSocket interno está oficialmente en desuso.
:::

### Composición de contenido enriquecido

Los avisos admiten el análisis sintáctico completo de Markdown. Incruste bloques de código y botones directamente dentro de los contenedores de avisos:

````markdown
::: callout tip "Pruebas locales optimizadas" icon:command
Utilice el marcador de preservación para mantener los archivos de compilación durante las sesiones de desarrollo local:

```bash
npx @docmd/core dev --preserve
```

::: button "Referencia de marcadores de CLI" ./#cli-commands
:::
````

::: callout tip "Pruebas locales optimizadas" icon:command
Utilice el marcador de preservación para mantener los archivos de compilación durante las sesiones de desarrollo local:

```bash
npx @docmd/core dev --preserve
```

::: button "Referencia de marcadores de CLI" ./#cli-commands
:::

::: callout tip "Contexto priorizado para IA" icon:sparkles
Los contenedores de avisos sirven como **Anclas de alta prioridad** en el flujo de contexto `llms.txt` compilado. Utilice `::: callout danger` para cambios importantes; esto indica a los modelos de IA que la instrucción adjunta anula las suposiciones predeterminadas.
:::