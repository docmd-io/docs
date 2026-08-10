---
title: "Seguridad y Política de HTML"
description: "Configura políticas de seguridad HTML, desinfecta HTML sin formato, controla incrustaciones de iframe e implementa buenas prácticas de seguridad en docmd."
---

`docmd` proporciona un modelo de seguridad robusto y multicapa para proteger sitios estáticos contra Cross-Site Scripting (XSS), incrustaciones maliciosas de terceros e inyecciones no deseadas de HTML sin formato.

## Esquema de Configuración de Seguridad

Las reglas de seguridad se pueden configurar en el manifiesto `docmd.config.json`:

```json "docmd.config.json"
{
  "security": {
    "htmlPolicy": "escape",
    "strictLinkSanitizing": true,
    "allowedIframeHosts": [
      "youtube.com",
      "vimeo.com",
      "codesandbox.io",
      "stackblitz.com"
    ]
  }
}
```

## Políticas de Procesamiento HTML (`htmlPolicy`)

La opción `htmlPolicy` controla cómo `docmd` procesa los elementos HTML declarados dentro de los archivos Markdown:

| Modo | Comportamiento | Mejor Caso de Uso |
| :--- | :--- | :--- |
| `"escape"` *(Predeterminado)* | Convierte todas las etiquetas HTML sin formato en entidades HTML seguras (`&lt;div&gt;`). Previene inyecciones accidentales de código. | Sitios de documentación pública y repositorios de código abierto que aceptan solicitudes de extracción de colaboradores no verificados. |
| `"strip"` | Elimina por completo las etiquetas HTML sin formato de la salida compilada. | Sitios corporativos estrictos que requieren pureza absoluta de Markdown sin etiquetas secundarias. |
| `"allow"` | Renderiza los elementos HTML sin formato como nodos DOM ejecutables. | Documentación técnica autorizada que incorpora componentes web personalizados o HTML sin formato (`noStyle: true`). |

::: callout warning title:"Precaución XSS con htmlPolicy: 'allow'" icon:alert-triangle
Establecer `htmlPolicy` en `"allow"` permite la ejecución de código arbitrario si los archivos Markdown contienen etiquetas `<script>`. Utiliza `"allow"` únicamente cuando el contenido Markdown provenga de repositorios de código de confianza.
::: /callout

## Procesamiento de Bloques HTML Multilínea

En `docmd`, los bloques HTML sin formato se procesan sin romper la estructura cuando existen líneas en blanco dentro de los elementos:

```html
<div class="custom-widget">
    <h3>Título del Widget</h3>

    <p>Párrafo con líneas en blanco a su alrededor.</p>
</div>
```

Cuando `htmlPolicy` está configurado en `"allow"`, `docmd` conserva la jerarquía de bloques externa y evita que `markdown-it` corrompa las etiquetas internas convirtiéndolas en bloques de código con sangría o párrafos planos.

## Aislamiento de Enlaces Externos

Todos los enlaces externos generados por los contenedores de `docmd` (`::: tag`, `::: button`, `::: card`) y enlaces Markdown (`[texto](https://...)`) se desinfectan automáticamente:

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">Enlace Externo</a>
```

- `target="_blank"` garantiza que los enlaces externos se abran en una pestaña independiente del navegador.
- `rel="noopener noreferrer"` previene que la página de destino tome el control de `window.opener` o acceda al almacenamiento de sesión.

## Aislamiento Sandbox para Incrustaciones e Iframes

El contenedor `::: embed` utiliza `embed-lite` para transformar URLs de video y widgets en contenedores `<iframe>` aislados mediante sandbox:

```markdown
::: embed https://www.youtube.com/watch?v=dQw4w9WgXcQ # incrustación de video de confianza
```

Los iframes con sandbox restringen la navegación de nivel superior, los envíos de formularios y la manipulación directa del DOM principal de forma predeterminada, preservando la capacidad de reproducción multimedia.
