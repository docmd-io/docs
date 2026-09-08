---
title: "Plugin de OpenAPI"
description: "Documentación de referencia de API estática renderizada directamente a partir de especificaciones OpenAPI 3.x en tiempo de compilación."
---

El plugin `@docmd/plugin-openapi` convierte archivos de especificación OpenAPI 3.x (JSON o YAML) en páginas de referencia de API estructuradas y con capacidad de búsqueda. Siguiendo la filosofía de tiempo de ejecución sin JavaScript de Docmd, cada endpoint, tabla de parámetros y modelo de esquema se compila en HTML estático durante el procesamiento de compilación.

## Opciones de configuración

Configura los parámetros globales de renderizado de OpenAPI en `docmd.config.json`:

| Opción | Tipo | Valor por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Muestra el título de la API, versión y descripción del bloque `info` de la especificación. |
| `download` | `boolean` | `false` | Añade un enlace de descarga directa para el archivo de especificación JSON/YAML en bruto. |
| `summaryOnly` | `boolean` | `false` | Renderiza resúmenes de métodos y rutas de alto nivel sin esquemas completos de parámetros. |
| `allowRawHtml` | `boolean` | `false` | Permite HTML en bruto sin escapar dentro de las cadenas de descripción de la especificación. |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "info": true,
      "download": true,
      "summaryOnly": false
    }
  }
}
```

## Uso y sintaxis

Incrusta especificaciones OpenAPI mediante bloques de código delimitados etiquetados con `openapi`. Especifica rutas de archivo relativas partiendo de la raíz de fuentes de tu documentación:

````markdown
```openapi
assets/openapi.json
```
````

### Salida interactiva renderizada

A continuación se muestra una representación interactiva en vivo de `assets/docmd-api.json`:

```openapi
assets/docmd-api.json
```

### Elementos procesados de la especificación

El plugin analiza y renderiza:

* **Insignias de métodos HTTP**: Insignias codificadas por colores (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* **Rutas de endpoints**: Cadenas de rutas parametrizadas.
* **Tablas de parámetros**: Nombre, ubicación (`path`, `query`, `header`, `cookie`), tipo de dato, indicador de obligatoriedad y descripciones.
* **Modelos de petición y respuesta**: Tablas de esquemas estructuradas con tipos de campos, formatos, restricciones y valores predeterminados.
* **Ejemplos y cargas útiles**: Ejemplos de cuerpos de petición y cargas útiles de respuesta en múltiples formatos (`application/json`, `application/xml`, etc.).
* **Desplazamiento de esquema contenido**: Los modelos de esquemas anidados con profundidad se desplazan limpiamente dentro de su contenedor `.oa-table-wrap` sin provocar desbordamientos horizontales de la ventana gráfica.
* **Avisos de obsolescencia**: Advertencias integradas para endpoints marcados con `deprecated: true`.

::: callout tip "Ejecución en tiempo de compilación sin JS" icon:zap
Todas las especificaciones OpenAPI se analizan y generan como HTML estático durante la compilación. No se cargan librerías pesadas de JavaScript en el cliente durante el tiempo de ejecución, lo que mantiene mínimos los tiempos de carga de la página y garantiza la indexación completa en motores de búsqueda.
:::

## Compatibilidad técnica

| Característica de especificación | Nivel de compatibilidad |
| :--- | :--- |
| OpenAPI 3.x (JSON) | Soporte nativo |
| OpenAPI 3.x (YAML) | Compatible (dependencia `js-yaml`) |
| Swagger 2.0 | Heredado (Convertir a OpenAPI 3.x antes de compilar) |
| Ejemplos de petición y respuesta | Soporte completo (mapas de ejemplo único y múltiple) |
| Esquemas `$ref` internos | Resolución completa |
| Polimorfismo `oneOf` / `anyOf` | Renderizado como tipos unión |
| Operaciones obsoletas | Soportadas en línea |
