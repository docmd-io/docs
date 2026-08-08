---
title: "Contenedores interactivos personalizados"
description: "Un directorio completo de contenedores estructurales de interfaz de usuario y componentes interactivos en docmd."
---

El Markdown estándar destaca en el formato de texto básico, pero la documentación técnica requiere componentes estructurales para comunicar lógica compleja. `docmd` extiende Markdown con una suite de **contenedores isomórficos** que se renderizan en elementos de interfaz de usuario adaptables y de alta fidelidad.

::: callout tip "¿Migrando desde otros motores de documentación?" icon:sparkles
`docmd` admite alias de sintaxis de **VitePress** y **Docusaurus** de forma nativa. Los contenedores como `:::tip`, `:::warning`, `:::note`, `:::details` y `:::caution` funcionan sin modificaciones. La sintaxis sin espacios (por ejemplo, `:::tabs` en lugar de `::: tabs`) también es compatible con todos los contenedores.
:::

## Referencia de sintaxis de bloques

Todos los contenedores utilizan una sintaxis de bloques consistente, lo que garantiza una experiencia de creación predecible en todo su proyecto.

```markdown
::: type "Título de encabezado opcional"
Esta es el área de contenido principal.
Admite **Markdown**, imágenes y anidamiento profundo de componentes.
:::
```

| Componente | Palabra clave | Caso de uso principal |
| :--- | :--- | :--- |
| **[Avisos](callouts.md)** | `callout` | Alertas semánticas para consejos, advertencias y avisos críticos. |
| **[Tarjetas](cards.md)** | `card` | Contenedores estructurales con marco para rejillas de características y diseños de inicio. |
| **[Rejillas](grids.md)** | `grids` | Grupos flexbox multicolumna de ajuste automático. |
| **[Pestañas](tabs.md)** | `tabs` | Paneles conmutables interactivos para instrucciones de plataformas alternativas. |
| **[Pasos](steps.md)** | `steps` | Líneas de tiempo numeradas visuales para guías paso a paso. |
| **[Plegables](collapsible.md)** | `collapsible` | Desplegables de acordeón interactivos para preguntas frecuentes y datos técnicos detallados. |
| **[Botones](buttons.md)** | `button` | Enlaces de navegación de llamada a la acción destacados y autocerrados. |
| **[Etiquetas](tags.md)** | `tag` | Insignias de colores autocerradas para etiquetas de versión o etiquetas de estado. |
| **[Secciones Hero](hero.md)** | `hero` | Encabezados de páginas de inicio de gran impacto con soporte dividido y deslizante. |
| **[Incrustaciones de URL](embed.md)** | `embed` | Incrustaciones sin latencia para videos, medios sociales e interactivos a través de `embed-lite`. |
| **[Registros de cambios](changelogs.md)** | `changelog` | Historiales de versiones basados en líneas de tiempo y notas de lanzamiento. |
| **[Contenedores anidados](nested-containers.md)** | - | Patrones de composición recursivos para diseños multicomponente. |

## Beneficios estratégicos de los contenedores

Los contenedores facilitan más que el retoque visual; proporcionan **Señales semánticas** de alta fidelidad al compilador de `docmd` y a los agentes de IA posteriores:

1. **Mapeo de contexto de IA**: Marcar un bloque como `callout warning` instruye explícitamente a los LLM para que prioricen esa advertencia durante el razonamiento y la generación de respuestas.
2. **Integridad estructural**: Combinar `cards` y `grids` permite crear páginas de inicio complejas directamente en Markdown sin el exceso de HTML en línea.
3. **Mantenibilidad del código fuente**: Elimina el marcado HTML sin procesar, manteniendo sus archivos `.md` limpios, legibles y analizables por máquinas.

## Composición recursiva

`docmd` admite **Profundidad de anidamiento infinita**. Componga cualquier contenedor dentro de otro para crear componentes de documentación multicapa:

```markdown
::: card "Descripción general de la arquitectura"
    ::: callout info
    Este módulo utiliza una canalización de E/S asíncrona no bloqueante.
    :::
    ::: button "Explorar arquitectura del motor principal" ./#architecture
:::
```

[Domine la guía de anidamiento](nested-containers.md)