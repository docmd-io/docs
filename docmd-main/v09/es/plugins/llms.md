---
title: "Plugin de contexto para LLM"
description: "Optimice su documentación para agentes de IA y modelos de lenguaje mediante la generación automática de archivos llms.txt y llms-full.txt."
---

El plugin `@docmd/plugin-llms` implementa el estándar `llms.txt` para producir archivos de contexto legibles por máquinas durante la compilación. Herramientas de IA, extensiones de IDE (como Cursor y Copilot) y agentes autónomos consumen estos archivos para construir representaciones de alta precisión del contenido de su documentación.

El plugin se encuentra **activo por defecto**. Defina la propiedad [`url`](../configuration/overview.md) en `docmd.config.json` para garantizar que las rutas emitidas sean URLs canónicas absolutas.

## Archivos generados

Durante la compilación, se crean tres archivos en la raíz del directorio de salida:

* `llms.txt` — Resumen estructurado con títulos, descripciones y URLs canónicas de cada página.
* `llms-full.txt` — Contexto integral con el contenido Markdown sin procesar de cada página añadido al final.
* `llms.json` — Manifiesto en formato JSON con metadatos tipados (título, URL, descripción, prioridad).

Además, se insertan etiquetas `<link>` en el `<head>` de cada página para facilitar su descubrimiento por rastreadores.

## Opciones de configuración

Configure los parámetros de contexto LLM en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación de archivos de contexto para LLM. |
| `fullContext` | `boolean` | `true` | Genera `llms-full.txt` con el cuerpo completo en Markdown. |
| `maxTokenLimit` | `number` | `null` | Límite máximo opcional de caracteres/tokens para la salida del paquete. |
| `i18n` | `boolean` | `false` | Genera archivos específicos por idioma (`llms.<locale>.txt`) junto a los predeterminados. |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "llms": {
      "fullContext": true,
      "i18n": false
    }
  }
}
```

## Comportamiento del idioma predeterminado

Por defecto, el plugin genera archivos sin sufijo (`llms.txt`, `llms-full.txt`, `llms.json`) para el **idioma predeterminado**, garantizando compatibilidad con las herramientas de IA que esperan nombres estándar en la raíz.

En sitios monolingües se genera un único conjunto en la raíz. En sitios con varios idiomas, el idioma predeterminado se ubica en las rutas sin sufijo.

## Paquetes de contexto multilingües

Para generar archivos de contexto dedicados para idiomas secundarios, configure `i18n: true`:

```json "docmd.config.json"
{
  "plugins": {
    "llms": {
      "i18n": true
    }
  }
}
```

Al habilitar esta opción, la salida incluye:

```text
site/llms.txt          ← Idioma predeterminado (sin sufijo)
site/llms-full.txt     ← Idioma predeterminado (sin sufijo)
site/llms.json         ← Idioma predeterminado (sin sufijo)
site/llms.es.txt       ← Idioma español (con sufijo)
site/llms-full.es.txt  ← Idioma español (con sufijo)
site/llms.de.txt       ← Idioma alemán (con sufijo)
site/llms-full.de.txt  ← Idioma alemán (con sufijo)
site/llms.zh.txt       ← Idioma chino (con sufijo)
site/llms-full.zh.txt  ← Idioma chino (con sufijo)
```

## Seguridad y saneamiento

Todas las cadenas controladas por el usuario (títulos y descripciones) se someten a saneamiento estricto:

* **Integridad de enlaces**: Los caracteres de control Markdown (`` ` ``, `[`, `]`, saltos de línea) en los títulos se escapan para evitar sintaxis `[título](ruta)` corrupta.
* **Protección contra inyección en hojas de cálculo**: A las cadenas que comienzan con `=`, `+`, `-` o `@` se les antepone una comilla simple (`'`) para evitar ejecuciones de fórmulas.

## Exclusión de páginas

Para excluir notas internas, borradores o documentos confidenciales de los archivos de contexto para IA, configure `llms: false` en el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Lista de verificación interna de lanzamiento"
llms: false # Excluye la página de llms.txt y llms-full.txt
---
```

Las páginas excluidas continuarán mostrándose en el sitio web y en el buscador local.

::: callout tip "Grafos de conocimiento estructurados" icon:cpu
Para paquetes de conocimiento con grafos de conceptos tipados y visualizaciones interactivas, combine este plugin con el [Plugin de paquetes OKF](./okf.md).
:::
