---
title: "Pestañas (Tabs)"
description: "Organice fragmentos de código alternativos, instrucciones de plataformas y contenido multilingüe en pestañas conmutables en docmd."
---

Las pestañas presentan conjuntos de datos mutuamente excluyentes o alternativos (como elecciones de gestores de paquetes o comandos de sistemas operativos). Condensan instrucciones técnicas en contenedores de pestañas limpios e interactivos.

::: callout info "Soporte de sintaxis sin espacios" icon:info
Tanto la sintaxis `::: tabs` como `:::tabs` (sin espacios) se renderizan de forma idéntica. Elija el estilo que mejor se adapte a su flujo de trabajo de creación.
:::

## Referencia de sintaxis

```markdown
::: tabs

== tab "Etiqueta de la pestaña" [propiedad:valor...]
El contenido de la pestaña va aquí.

== tab "Etiqueta secundaria"
El contenido de la pestaña secundaria va aquí.

:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Etiqueta** | `"String"` | Texto mostrado en el botón selector de pestañas. |
| **Icono** | `icon:NOMBRE` | Opcional. Agrega un icono de [Lucide](external:https://lucide.dev/icons) antes de la cadena de la etiqueta. |

## Ejemplos de uso

### Conmutador de gestor de paquetes

Muestre comandos de instalación en múltiples gestores de paquetes en un solo bloque compacto:

```markdown
::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::
```

::: tabs

== tab "pnpm" icon:box
```bash
pnpm add @docmd/core
```

== tab "npm" icon:terminal
```bash
npm install @docmd/core
```

== tab "yarn" icon:package
```bash
yarn add @docmd/core
```

:::

### Fragmentos de código multilingües

Agrupe implementaciones específicas del idioma utilizando iconos de pestañas para una identificación instantánea:

```markdown
::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::
```

::: tabs

== tab "TypeScript" icon:hexagon
```typescript
import { build } from '@docmd/core';
await build('./docmd.config.json');
```

== tab "JavaScript" icon:braces
```javascript
const { build } = require('@docmd/core');
build('./docmd.config.json');
```

:::

## Restricciones y reglas de comportamiento

| Regla | Nota técnica |
| :--- | :--- |
| **Límite de anidamiento** | Las pestañas no se pueden anidar directamente dentro de otros contenedores de pestañas. |
| **Compatibilidad con pasos** | No anide `::: steps` dentro de un panel de pestañas. Utilice una lista ordenada estándar en su lugar. |
| **Límites de ventana gráfica** | Mantenga el número de pestañas por debajo de 6 entradas por bloque para compatibilidad móvil. |
| **Persistencia de estado** | Los estados de las pestañas seleccionadas persisten en las transiciones de página durante la navegación SPA. |

::: callout tip "Etiquetado contextual para IA" icon:sparkles
Especifique los lenguajes o sistemas operativos de destino en las etiquetas de las pestañas (por ejemplo, `== tab "TypeScript"`). Las etiquetas explícitas permiten a los indexadores de IA mapear bloques de código alternativos a sus respectivos ecosistemas con precisión.
:::