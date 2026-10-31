---
title: Visión General de Variables y Tiempo de Ejecución Dinámico
description: Aprenda cómo el motor de variables y personalización de docmd permite crear documentación dinámica, mantenible e interactiva durante la compilación y en el navegador.
---

# Visión General de Variables y Tiempo de Ejecución Dinámico

docmd incorpora un potente **Motor de Variables y Personalización** que combina la interpolación estática en tiempo de compilación con la personalización reactiva en el cliente.

En lugar de definir nombres de empresas, claves de API, años de copyright o versiones manualmente en decenas de archivos Markdown, puede emplear variables dinámicas mediante expresiones limpias de plantilla.

```markdown
¡Bienvenido a la documentación de **\{{ site.title }}** v\{{ docmd.version }}!
Copyright actual: © \{{ docmd.buildYear }}.
```

::: callout info "Variables evaluadas en vivo en esta compilación" icon:sparkles
Los siguientes valores han sido resueltos en tiempo real por el compilador docmd durante esta compilación:
- **Título del sitio:** {{ site.title }}
- **Versión del compilador:** v{{ docmd.version }}
- **Año de compilación:** © {{ docmd.buildYear }}
- **Rama Git actual:** {{ docmd.gitBranch || "main" }}
- **Commit Git actual:** {{ docmd.gitCommit || "HEAD" }}
- **Slug de página actual:** `{{ page.slug }}`
:::

## Sintaxis de Plantillas

El motor utiliza una sintaxis estándar basada en llaves:

```markdown
\{{ variableName }}
```

### Valores Predeterminados (Fallbacks)

Si una variable no siempre está definida (como en entornos de desarrollo local o configuraciones opcionales), proporcione un valor predeterminado usando el operador `||`:

```markdown
Conéctese a nuestro servidor en `\{{ server.endpoint || "https://api.example.com" }}`.
¡Bienvenido de nuevo, \{{ user.name || 'Invitado' }}!
Compilado para la versión \{{ targetVersion || 2.0 }}.
```

Los fallbacks pueden ser:
* Cadenas entre comillas simples: `'ejemplo'`
* Cadenas entre comillas dobles: `"ejemplo"`
* Números: `42` o `2.0`
* Identificadores: `default`

### Tolerancia a Espacios en Blanco

Las expresiones toleran espacios alrededor de los nombres y operadores:

```markdown
\{{   myVar   }}
\{{ env.PORT || "8080" }}
```

## Ciclo de Vida: Compilación vs. Tiempo de Ejecución

docmd divide de forma limpia el ciclo de vida de las variables en dos etapas complementarias:

::: mermaid title:"Canal de Resolución de Variables" icon:workflow align:center zoom:true
graph TD
    subgraph Origen["1. Entradas y Definiciones"]
        B1["docmd.config.json<br/>Bloque <code>variables</code>"]
        B2["Git y Entorno<br/><code>env.*</code>, <code>DOCMD_VAR_*</code>, Git Root"]
        B3["Metadatos Integrados<br/><code>version</code>, <code>buildYear</code>, <code>page.slug</code>"]
    end

    subgraph Compilador["2. Resolución Estática en Compilación"]
        Origen --> VReg["VariableRegistry (@docmd/parser)"]
        VReg --> Interp["Interpolador Markdown y Config"]
        Interp --> HTML["HTML Estático (Cero JS Overhead)"]
        Interp --> Markers["Marcadores Dinámicos &lt;span data-docmd-var&gt;"]
    end

    subgraph Runtime["3. Tiempo de Ejecución Reactivo en Cliente"]
        Markers --> DRuntime["docmd-runtime.js (window.docmd)"]
        DRuntime --> DOM["Rehidratación en Vivo y Fragmentos"]
        DRuntime --> Events["Eventos y postMessage entre Marcos"]
    end
::: /mermaid

::: grids
    ::: grid
        ::: card "Variables Estáticas de Compilación" icon:cpu
        Se compilan directamente en el HTML final durante `docmd build`. Tienen cero impacto en la ejecución de JavaScript en el navegador y evitan saltos de diseño (CLS).
        :::
    :::
    ::: grid
        ::: card "Variables Reactivas de Cliente" icon:sparkles
        Los datos de sesión de usuario (como claves de API o nombres de usuario) son sincronizados en vivo por `docmd-runtime.js`. Al escribir o cambiar de sesión, los bloques de código se actualizan al instante.
        :::
    :::
::: /grids

### Variables Estáticas en Compilación

Los valores determinados al compilar se insertan directamente en el código estático, sin requerir procesamiento adicional para el lector.

### Variables Dinámicas Reactivas

Las variables declaradas como dinámicas o que contienen datos de sesión (como `user.name` o `user.apiKey`) se encapsulan en marcadores DOM reactivos:

```html
<span data-docmd-var="user.name" class="docmd-var">Invitado</span>
```

En el navegador, `docmd-runtime.js` puebla y sincroniza estos valores en toda la página y en transiciones SPA sin recargas.

## Arquitectura: Separación entre Motor e Interfaz

Para garantizar la máxima velocidad y estabilidad, docmd separa limpiamente la interfaz visual del motor dinámico:

* **`docmd-runtime.js`**: El motor dinámico headless incluido en todas las plantillas (`default`, `summer`, etc.). Gestiona registros, suscripciones y eventos sin interferir con estilos ni animaciones.
* **`docmd-main.js`**: El script de interfaz responsable del cambio de tema, menús y transiciones SPA. Tras cada cambio de página ejecuta `window.docmd.sync()`.

::: callout tip "Compatibilidad Universal con Plantillas" icon:check-circle
Al incluirse `docmd-runtime.js` en todas las plantillas, cualquier tema personalizado o plugin de diseño hereda soporte dinámico automáticamente.
:::

## Próximos Pasos

Consulte las guías completas para cada tema:

::: grids
    ::: grid
        ::: card "Variables Integradas" icon:terminal
        Variables de sistema para años, fechas, versiones y metadatos de Git.
        [Ver Guía](./built-in-variables.md)
        :::
    :::
    ::: grid
        ::: card "Variables de Configuración" icon:settings
        Definición en `docmd.config.json` y uso en pies de página, banners y Markdown.
        [Ver Guía](./config-variables.md)
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "Variables de Entorno" icon:server
        Integración con pipelines CI/CD y promoción zero-prefix vía `DOCMD_VAR_*`.
        [Ver Guía](./environment-variables.md)
        :::
    :::
    ::: grid
        ::: card "Personalización en Cliente" icon:sparkles
        SDK de cliente (`window.docmd`), sesiones reactivas y ejemplos de código interactivos.
        [Ver Guía](./runtime-personalisation.md)
        :::
    :::
::: /grids
