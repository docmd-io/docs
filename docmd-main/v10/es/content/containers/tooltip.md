---
title: Contenedor de Tooltip (Información Emergente)
description: Aprende a utilizar el contenedor ::: tip en docmd para mostrar información emergente interactiva y explicaciones de términos con enlace.
---

El contenedor `::: tip` (también disponible como `::: tooltip`) muestra información emergente interactiva y explicaciones de términos en línea dentro de oraciones o alrededor de elementos en bloque.

## Sintaxis de Contenedor (Container Syntax)

```markdown
# Tooltip en Línea
::: tip "Explicación emergente al pasar el cursor" [term:"Término mostrado"] [url:"URL_destino"] ::: /tip

# Tooltip a Nivel de Bloque
::: tip "Explicación emergente al pasar el cursor" [url:"URL_destino"]
Contenido encerrado dentro del bloque del contenedor tooltip...
::: /tip
```

## Características y Atributos Soportados

| Parámetro / Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| **Explicación Emergente** | `"String"` | Texto principal mostrado dentro del diálogo flotante al pasar el cursor (1er parámetro posicional o `text:"..."`). |
| **Término Mostrado** | `term:"String"` | Cadena de texto renderizada en el cuerpo del documento. Si se omite, toma el texto de la explicación emergente. |
| **URL de Enlace de Destino** | `url:URL` | Convierte el elemento en un hipervínculo interactivo. Soporta `external:https://...` para nuevas pestañas. |
| **Alias Soportados** | `::: tip`, `::: tooltip` | Ambos nombres de contenedor se comportan de manera idéntica en modo en línea y bloque. |

## Ejemplos de Uso

### Tooltip de Término en Línea

Renderiza explicaciones emergentes en línea para jerga técnica o características destacadas:

```markdown
Docmd cuenta con un diseño ::: tip "Sin configuración de compilación previa" term:"Zero-Config" ::: /tip.
```

Docmd cuenta con un diseño ::: tip "Sin configuración de compilación previa" term:"Zero-Config" ::: /tip.

### Tooltip con Enlace de Destino

Añade `url:` para hacer que el término mostrado sea interactivo mientras ofrece una vista previa al pasar el cursor:

```markdown
Conoce más sobre la ::: tip "Motor de compilación estática sin configuración" term:"Arquitectura de Docmd" url:"external:https://github.com/docmd-io/docmd" ::: /tip en nuestro repositorio.
```

Conoce más sobre la ::: tip "Motor de compilación estática sin configuración" term:"Arquitectura de Docmd" url:"external:https://github.com/docmd-io/docmd" ::: /tip en nuestro repositorio.

### Envoltorio de Tooltip a Nivel de Bloque

Envuelve líneas de texto o encabezados dentro de tooltips a nivel de bloque:

```markdown
::: tip "Shell Interactivo de Diagramas"
Pasa el cursor sobre este bloque para ver la explicación del contexto del shell de diagramas.
::: /tip
```

::: tip "Shell Interactivo de Diagramas"
Pasa el cursor sobre este bloque para ver la explicación del contexto del shell de diagramas.
::: /tip