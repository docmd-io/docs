---
title: "Etiquetas (Tags)"
description: "Utilice contenedores de etiquetas para etiquetar versiones, estados o destacar fragmentos de texto cortos en línea en docmd."
---

El contenedor `tag` es un componente de autocierre que inyecta insignias compactas en forma de píldora en línea. Las etiquetas conservan sus proporciones compactas en todos los contextos; no heredan los tamaños de fuente de encabezado circundantes ni los pesos de texto.

## Referencia de sintaxis

```markdown
::: tag "Texto de la etiqueta" [propiedad:valor...]
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Etiqueta** | `"String"` | Cadena de texto mostrada dentro de la insignia de píldora. |
| **Color** | `color:VALOR` | Aplica un color de fondo (admite nombres CSS estándar o códigos hexadecimales). Calcula automáticamente el color de texto en contraste. |
| **Icono** | `icon:NOMBRE` | Agrega un icono de [Lucide](external:https://lucide.dev/icons) dentro de la insignia. |
| **URL** | `url:URL` | Convierte la etiqueta en un enlace interactivo. Anteponga `external:` para abrir en una nueva pestaña. Utilice cadenas de URL sin comillas coincidentes con los [botones](buttons.md). |

## Ejemplos de uso

### Insignias de versión en línea

Utilice una etiqueta de color en línea para indicar introducciones de características o restricciones de versión:

```markdown
Esta capacidad se introdujo en ::: tag "v0.9.0" color:blue y es totalmente compatible.
```

Esta capacidad se introdujo en ::: tag "v0.9.0" color:blue y es totalmente compatible.

### Indicadores de estado

Inserte etiquetas de estado en todas sus páginas de documentación con acentos de color personalizados:

```markdown
::: tag "Obsoleto" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Estable" color:#22c55e
::: tag "Verificado" icon:check-circle color:#10b981
```

::: tag "Obsoleto" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Estable" color:#22c55e
::: tag "Verificado" icon:check-circle color:#10b981

### Insignias de etiquetas enlazadas

Agregue `url:` para que una etiqueta actúe como un hipervínculo, útil para hacer referencias cruzadas de notas de lanzamiento o recursos externos.

```markdown
Consulte las últimas ::: tag "Notas de lanzamiento" icon:external-link url:./#release-notes
```

Consulte las últimas ::: tag "Notas de lanzamiento" icon:external-link url:./#release-notes

### Enlaces externos

Anteponga `external:` a la URL para forzar que el enlace se abra en una nueva pestaña del navegador:

```markdown
::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd
```

::: tag "GitHub" icon:github url:external:https://github.com/docmd-io/docmd