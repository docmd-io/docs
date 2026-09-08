---
title: "Plugin de Threads"
description: "Hilos de discusión colaborativos y resaltado de texto integrados de forma nativa en archivos Markdown."
---

El plugin `@docmd/plugin-threads` permite comentarios colaborativos en línea y anotaciones de texto en las páginas de documentación. Los resaltados y los hilos de discusión se almacenan de forma nativa dentro de los archivos Markdown de origen mediante bloques contenedores personalizados (`::: threads`), sin necesidad de bases de datos externas.

Autor original: [@svallory](external:https://github.com/svallory)

::: callout info "Versión Alpha" icon:flask
Este plugin se encuentra en fase Alpha. Las APIs principales y los esquemas de almacenamiento son estables, mientras que los componentes de la interfaz de usuario se encuentran en evolución activa.
:::

## Instalación y configuración

Instale el plugin mediante la CLI:

```bash
npx @docmd/core add threads
```

Habilite la configuración de hilos en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Cuando es `true`, los hilos se muestran en un panel dedicado; cuando es `false`, se adjuntan en línea junto al texto destacado. |
| `devOnly` | `boolean` | `true` | Restringe los recursos de interfaz al servidor de desarrollo (`docmd dev`). Se omiten en compilaciones estáticas de producción (`docmd build`). |

### Requisito de servidor de desarrollo en vivo

La interfaz de comentarios, las herramientas de resaltado y la persistencia de cambios en Markdown requieren un servidor de desarrollo activo (`docmd dev`) con conexión WebSocket RPC funcional.

Debido a que Threads declara `requiresLiveServer: true`:
- **En desarrollo (`docmd dev`)**: La pestaña deslizante, las tarjetas de vista previa en línea, los modales de selección y la barra lateral de hilos están completamente activos y operativos.
- **Compilaciones estáticas de producción (`docmd build`)**: Los scripts y hojas de estilo del cliente se omiten automáticamente para garantizar que los sitios públicos se mantengan ultrarrápidos, sin sobrecarga y libres de intentos fallidos de conexión WebSocket. Cualquier sintaxis de hilos en Markdown (`::: threads` y `==texto=={t-...}`) sigue procesándose correctamente sin advertencias.
- **Anulación manual**: Si desea expresamente empaquetar los activos de Threads en compilaciones estáticas, configure `"devOnly": false` en `plugins.threads`.

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true,
      "devOnly": true
    }
  }
}
```

## Flujo de trabajo

1. **Selección de texto**: Seleccione un fragmento de texto durante el desarrollo en vivo local (`npx @docmd/core dev`).
2. **Modal de comentario**: Ingrese sus observaciones en la ventana emergente.
3. **Inyección del ancla**: El texto seleccionado se resalta con un identificador de hilo (`==texto resaltado=={t-a1b2c3d4}`).
4. **Persistencia en Markdown**: La estructura del hilo se anexa al final del archivo Markdown en un bloque `::: threads`.
5. **Sincronización con Git**: El historial de discusión se almacena en el control de versiones junto a los cambios del documento.

## Vista previa interactiva

El texto con discusiones asociadas recibe <span class="threads-preview-highlight">resaltados de color en línea</span>. Las tarjetas de discusión se muestran debajo:

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;hace 2d</div>
    <div class="threads-preview-body">Esta sección se beneficiaría de un diagrama para explicar la arquitectura. ¿Qué opinas?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;hace 1d</div>
    <div class="threads-preview-body">Buena idea. Agregaré un diagrama de flujo con Mermaid. ¿Sirve <code>sequenceDiagram</code> aquí?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;hace 12h</div>
    <div class="threads-preview-body">Perfecto. Un diagrama de flujo simple sería ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Nuevo comentario</div>
  </div>
</div>

Los resaltados adicionales alternan automáticamente entre <span class="threads-preview-highlight-blue">paletas de color distintivas</span>:

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;hace 3d</div>
    <div class="threads-preview-body">¿Deberíamos mencionar la compatibilidad hacia atrás en este punto?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Nuevo comentario</div>
  </div>
</div>

Las discusiones resueltas se muestran atenuadas:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;hace 5d&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Resuelto</span></div>
    <div class="threads-preview-body">Se corrigió el error tipográfico en el ejemplo de configuración.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Nuevo comentario</div>
  </div>
</div>

Una pestaña deslizante anclada a la derecha <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> reposa en el borde de la pantalla mostrando el número de hilos pendientes. Al pasar el cursor sobre cualquier texto resaltado, aparece una tarjeta de vista previa integrada directamente en el contenido, mientras que al pulsar la pestaña se despliega el panel lateral de discusión. Los hilos se conservan permanentemente entre aperturas y cierres del panel sin necesidad de recargar la página.

## Formato de almacenamiento en Markdown

Los hilos se guardan dentro de los archivos de origen utilizando sintaxis de bloques contenedores:

```markdown
# Visión general del motor

La arquitectura central incluye ==texto resaltado=={t-a1b2c3d4} con un hilo adjunto.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      Este texto requiere mayor detalle técnico.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Actualizado con especificaciones adicionales.

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

## Características principales

* **Selección de texto**: Resalte cualquier fragmento de texto para anclar un nuevo hilo.
* **Respuestas anidadas**: Conversaciones en árbol con respuestas organizadas.
* **Reacciones con emojis**: Contadores de reacciones asociados a comentarios.
* **Estado de resolución**: Marque hilos como resueltos con atribución de autoría.
* **Identidad de autor**: Las credenciales locales de Git determinan el avatar y perfil automáticamente.

## API de acciones RPC

El plugin de Threads expone puntos de enlace WebSocket RPC invocables con `docmd.call()`:

| Método RPC | Descripción técnica |
| :--- | :--- |
| `threads:get-threads` | Obtiene todos los hilos analizados para una ruta de archivo determinada. |
| `threads:add-thread` | Ancla un nuevo hilo y su comentario inicial. |
| `threads:add-comment` | Agrega una respuesta a un hilo existente. |
| `threads:edit-comment` | Actualiza el cuerpo de texto de un comentario. |
| `threads:delete-comment` | Elimina una entrada de comentario. |
| `threads:delete-thread` | Elimina el contenedor del hilo y limpia los anclajes de texto en el cuerpo. |
| `threads:resolve-thread` | Alterna el estado de resolución del hilo. |
| `threads:toggle-reaction` | Agrega o elimina reacciones emoji. |

## Almacenamiento de perfiles de autor

Los perfiles de los autores se guardan en caché en `<docsRoot>/.threads/authors.json`:

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

::: callout tip "Control de versiones nativo en Git" icon:git-commit
Dado que los metadatos de los hilos residen enteramente dentro de archivos `.md`, las revisiones y comentarios siguen el flujo natural de ramas, pull requests e historial de commits en Git.
:::
