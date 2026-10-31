---
title: Resumen de Variables y Tiempo de Ejecución Dinámico
description: Descubra cómo el motor de variables y personalización de docmd permite crear documentación dinámica, mantenible e interactiva tanto en compilación como en tiempo de ejecución.
---

# Variables y Tiempo de Ejecución Dinámico

docmd cuenta con un **Motor de Variables y Personalización** que unifica la interpolación estática en tiempo de compilación con la personalización reactiva en el cliente.

En lugar de escribir manualmente nombres de empresas, URLs de APIs, años de lanzamiento o versiones en decenas de archivos Markdown, puede hacer referencia a variables dinámicas mediante expresiones limpias de plantilla.

```markdown
¡Bienvenido a la documentación de **{{ site.title }}** v{{ docmd.version }}!
Copyright actual: © {{ docmd.buildYear }}.
```

## Sintaxis de Plantillas

El motor de variables utiliza la sintaxis de llaves dobles:

```markdown
{{ variableName }}
```

### Valores Predeterminados (Fallbacks)

Si una variable no siempre está definida, puede especificar un valor alternativo utilizando el operador `||`:

```markdown
Conéctese a nuestro servidor en `{{ server.endpoint || "https://api.example.com" }}`.
¡Bienvenido de nuevo, {{ user.name || 'Invitado' }}!
Creado para la versión {{ targetVersion || 2.0 }}.
```

El valor predeterminado puede ser:
* Cadena entre comillas simples: `'ejemplo'`
* Cadena entre comillas dobles: `"ejemplo"`
* Número: `42` o `2.0`
* Identificador: `default`

### Tolerante a Espacios en Blanco

Las expresiones admiten espacios alrededor de los nombres de variables y operadores:

```markdown
{{   myVar   }}
{{ env.PORT || "8080" }}
```

## Ciclo de Vida: Tiempo de Compilación vs. Tiempo de Ejecución

docmd divide con claridad el ciclo de vida de las variables en dos etapas:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   RESOLUCIÓN EN TIEMPO DE COMPILACIÓN                  │
│  - Variables integradas dinámicas (docmd.version, docmd.buildYear)     │
│  - Variables de entorno del sistema (env.NAME, DOCMD_VAR_*)            │
│  - Variables de docmd.config.json (cadenas estáticas, configuración)   │
│  - Renderizado directo en HTML estático durante docmd build            │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   TIEMPO DE EJECUCIÓN EN EL CLIENTE                    │
│  - Impulsado por docmd-runtime.js (window.docmd)                       │
│  - Rehidrata marcadores dinámicos (<span data-docmd-var="...">)        │
│  - Personalización interactiva: claves API en vivo, sesiones           │
│  - Mensajería postMessage entre marcos y despacho de eventos           │
└────────────────────────────────────────────────────────────────────────┘
```

### Variables Estáticas de Compilación

Las variables resueltas durante `docmd build` se compilan directamente en el código HTML estático, sin generar sobrecarga de JavaScript ni cambios en el diseño de la página.

### Variables Dinámicas Reactivas

Las variables marcadas como dinámicas o que contienen atributos de sesión de usuario (como `user.name` o `user.apiKey`) se envuelven en marcadores DOM reactivos:

```html
<span data-docmd-var="user.name" class="docmd-var">Invitado</span>
```

En tiempo de ejecución, `docmd-runtime.js` rellena y sincroniza automáticamente estos valores en la página, en los bloques de código y durante las transiciones de navegación SPA sin recargar.

## Arquitectura: Separación entre Motor e Interfaz

Para garantizar la máxima velocidad y estabilidad, docmd mantiene una estricta separación entre la interfaz de usuario y el motor de ejecución en segundo plano:

* **`docmd-runtime.js`**: Motor de ejecución sin interfaz (headless) incluido en todas las plantillas (`default`, `summer`, etc.). Gestiona registros de variables, suscripciones, almacenamiento y eventos entre ventanas sin interferir en los estilos visuales ni en las animaciones.
* **`docmd-main.js`**: El script de presentación visual responsable de cambios de tema, menús móviles, navegación SPA e interacción con el DOM. En cada cambio de página SPA, invoca `window.docmd.sync()` para rehidratar las variables dinámicas de forma inmediata.

## Siguientes Pasos

Explore la guía completa sobre el sistema de variables:

* [Variables Integradas](./built-in-variables.md) — Variables del sistema disponibles sin configuración previa para fechas, años, versiones y metadatos Git.
* [Variables de Configuración y Personalizadas](./config-variables.md) — Cómo declarar variables en `docmd.config.json` y utilizarlas en pie de página, banners y documentos.
* [Variables de Entorno](./environment-variables.md) — Variables de entornos CI/CD y promoción mediante `DOCMD_VAR_*`.
* [Tiempo de Ejecución y Personalización](./runtime-personalisation.md) — SDK de cliente (`window.docmd`), sesiones reactivas y bloques de código interactivos.
