---
title: "Iconos"
description: "Integre iconos de Lucide y más de 200.000 iconos vectoriales de Iconify en navegación, botones, etiquetas y contenedores en docmd."
---

`docmd` incluye un sistema de iconos flexible y sin sobrecarga en tiempo de ejecución. La biblioteca de iconos [Lucide](external:https://lucide.dev/) se encuentra disponible de forma nativa sin configuración adicional. Para sistemas de diseño más amplios, el plugin oficial [`@docmd/plugin-iconify`](../plugins/iconify.md) proporciona acceso bajo demanda a más de 200.000 iconos vectoriales procedentes de más de 100 colecciones de código abierto (Material Design, Carbon, Tabler, FontAwesome, Solar, Simple Icons y más).

Todos los iconos se insertan directamente como SVG limpios en línea durante la compilación, garantizando cero sobrecarga de JavaScript en el cliente o retrasos por fuentes web.

## Configuración en `docmd.config.json`

### Iconos en la navegación lateral

Asigne nombres de iconos Lucide a los enlaces de navegación en `docmd.config.json`. Utilice el identificador en minúsculas separado por guiones (kebab-case) del icono deseado:

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Inicio", "path": "/", "icon": "home" },
    { "title": "Configuración", "path": "/setup", "icon": "settings" },
    { "title": "Despliegue", "path": "/deployment", "icon": "rocket" }
  ]
}
```

### Habilitar Iconify (más de 100 colecciones)

Para desbloquear más de 200.000 iconos de Material Design, Carbon, Tabler, Solar y otras colecciones, active el plugin `@docmd/plugin-iconify` en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

Instale el paquete del plugin mediante la CLI:

```bash
npx @docmd/core add iconify
```

::: callout tip title:"Instalación automática" icon:sparkles
Cuando se declara `"iconify": {}` en `docmd.config.json`, `docmd` descargará e instalará automáticamente `@docmd/plugin-iconify` en la siguiente compilación si aún no se encuentra instalado.
:::

## Iconos en contenedores de interfaz

Utilice la propiedad `icon:` en contenedores como botones, llamadas de atención, tarjetas, pestañas o etiquetas.

### Sintaxis nativa de Lucide

Utilice directamente cualquier identificador en formato kebab-case de Lucide:

```markdown
::: button "Descargar versión" /download icon:download
::: tag "Verificado" icon:check-circle color:green
::: callout info title:"Consejo" icon:lightbulb
Los iconos de Lucide funcionan de inmediato sin necesidad de configurar plugins adicionales.
:::
```

### Sintaxis ampliada de Iconify

Con `@docmd/plugin-iconify` activado, haga referencia a iconos de cualquier colección mediante `iconify:<colección>:<nombre>` o `iconify-<colección>-<nombre>`:

```markdown
::: button "Repositorio en GitHub" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: callout icon:iconify:mdi:home title:"Portal de documentación"
Bienvenido a nuestro portal unificado de documentación para desarrolladores.
:::
::: card title:"Arquitectura Cloud" icon:iconify:simple-icons:googlecloud
Ejecute documentación en contenedores sobre Google Cloud Run y Cloud Storage.
:::
::: tag "Seguro" icon:iconify-solar:shield-check-bold color:green
```

Para consultar todas las opciones de sintaxis, colecciones admitidas y ejemplos en contenedores, revise la **[Referencia del plugin Iconify](../plugins/iconify.md)**.

## Estilos CSS personalizados

* Los iconos nativos de Lucide se renderizan con las clases `.lucide-icon` y `.icon-<nombre>`.
* Los iconos de Iconify se renderizan con las clases `.iconify-icon` y `.icon-<colección>-<nombre>`.

Ajuste dimensiones, alineación o grosor de trazo en `customCss`:

```css
/* Estilo general para iconos nativos Lucide */
.lucide-icon {
  stroke-width: 1.5px;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}

/* Estilo general para iconos Iconify */
.iconify-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* Personalizar identificadores concretos */
.icon-rocket {
  color: #ff5733;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}

.icon-simple-icons-googlecloud {
  color: #4285f4;
}
```

## Directorios y referencias de iconos

* **[Directorio de iconos Lucide](external:https://lucide.dev/icons)**: Explore miles de iconos vectoriales nativos.
* **[Explorador de colecciones Iconify](external:https://icon-sets.iconify.design/)**: Busque en más de 200.000 iconos vectoriales de más de 100 colecciones de código abierto.
* **[Documentación del plugin Iconify](../plugins/iconify.md)**: Configuración completa, almacenamiento en caché y ejemplos en contenedores para `@docmd/plugin-iconify`.

::: button "Explorar catálogo de iconos Lucide" external:https://lucide.dev/icons icon:globe
::: button "Explorar más de 200.000 iconos en Iconify" external:https://icon-sets.iconify.design/ icon:external-link
