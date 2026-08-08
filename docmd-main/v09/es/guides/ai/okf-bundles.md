---
title: "Paquetes OKF — Análisis detallado"
description: "Cómo organizar su contenido en docmd para obtener el mejor paquete OKF: conceptos tipificados, enlaces cruzados y la disciplina que hace que una base de conocimientos sea amigable con los agentes de IA."
---

El [`@docmd/plugin-okf`](../../plugins/okf.md) genera un paquete de [Formato de Conocimiento Abierto (OKF)][okf-spec] desde su sitio docmd. Esta guía explica cómo se ve el paquete, cómo organizar su contenido para el mejor consumo por parte de agentes de IA y cómo se diferencia OKF del formato de lista plana [`llms.txt`](../../plugins/llms.md).

[okf-spec]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## El modelo mental: una wiki, no un mapa del sitio

Un sitio de documentación tradicional es un árbol: secciones y subsecciones, con páginas colgando de cada una. Un usuario navega por el árbol de arriba a abajo para encontrar lo que necesita.

Un paquete OKF es una **wiki**: un directorio plano de archivos de conceptos tipificados con enlaces cruzados entre ellos. Un agente de IA navega por el gráfico horizontalmente, siguiendo los enlaces desde un concepto a sus vecinos.

Las dos estructuras se ven iguales en el disco (archivos Markdown en directorios), pero el modelo de navegación es diferente. Vale la pena citar textualmente los [tres principios de diseño][okf-principles] de la especificación OKF:

> 1. **Mínimamente opuesto a opiniones.** OKF requiere exactamente una cosa de cada concepto: un campo `type`. Todo lo demás (qué tipos existen, qué otros campos incluir, qué secciones tiene el cuerpo) se deja en manos del productor.
> 2. **Independencia entre productor y consumidor.** Un paquete creado manualmente por un humano puede ser consumido por un agente de IA. Un paquete generado por una canalización de exportación de metadatos se puede examinar en un visualizador. Un paquete sintetizado por un LLM puede ser consultado por otro. El formato es el contrato; las herramientas en cada extremo son intercambiables de forma independiente.
> 3. **Formato, no plataforma.** OKF no está vinculado a ninguna nube, base de datos, proveedor de modelos o marco de agentes específico.

[okf-principles]: https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing

## Cómo se ve un paquete OKF

```text
site/okf/
├── okf.yaml              ← manifiesto tipificado
├── index.md              ← catálogo estilo Karpathy
├── graph/                ← opcional: solo cuando plugins.okf.graph: true
│   ├── index.html        ← visualizador interactivo dirigido por fuerza
│   ├── graph.json        ← datos del gráfico
│   ├── graph.js          ← tiempo de ejecución del visualizador
│   └── graph.css         ← estilos del visualizador
├── concepts/
│   ├── weekly-active-users.md
│   ├── orders-table.md
│   └── api-authentication.md
└── _meta/
    ├── bundle.json
    └── lint-report.txt
```

Cada archivo `concepts/<slug>.md` lleva un campo `type` en el frontmatter más el cuerpo completo en Markdown de la página. El manifiesto `okf.yaml` enumera cada concepto con su tipo, ruta, idioma, versión y etiquetas: el catálogo que utiliza un agente de IA para decidir qué conceptos leer.

## Qué va en un `type`

El campo `type` es la única clave requerida en el frontmatter. Le dice al agente qué tipo de conocimiento representa este concepto. El plugin `@docmd/plugin-okf` tiene un mapa de inferencia de tipo por prefijo de ruta:

| Prefijo de URL | Tipo inferido |
| :--- | :--- |
| `/api/` | `api` |
| `/guides/` | `guide` |
| `/reference/` | `reference` |
| `/concepts/` | `concept` |
| `/runbooks/` | `runbook` |
| `/datasets/` | `dataset` |
| `/metrics/` | `metric` |
| `/tables/` | `table` |
| (cualquier otra cosa) | `concept` (predeterminado) |

Puede anular el tipo inferido con frontmatter explícito:

```markdown
---
type: api
title: "API de autenticación"
description: "Flujo de autenticación OAuth 2.0 + JWT para la API de usuario."
---

# API de autenticación
...
```

O utilice la forma anidada `okf.type`:

```markdown
---
okf:
  type: api
title: "API de autenticación"
---
```

El agente lee primero el campo `type`. Un concepto con `type: runbook` se trata como una guía paso a paso (por ejemplo, "cómo recuperarse de una interrupción parcial"); un concepto con `type: api` se trata como referencia de API; un concepto con `type: dataset` se trata como un diccionario de datos.

## Los enlaces cruzados hacen el gráfico

OKF es un gráfico, no un árbol. Las relaciones entre conceptos se infieren de los enlaces Markdown internos. Si `api-authentication.md` se vincula a `users-table.md`, el paquete OKF registra esa arista en `graph.json` y el visualizador de gráficos dibuja una línea entre los dos nodos.

El `okf-bundle` (léase: "gráfico de conceptos") es más útil que un árbol porque permite al agente encontrar conceptos relacionados que el autor no pensó incluir en una subsección. El patrón LLM-wiki que formaliza OKF asume explícitamente que el agente seguirá los enlaces para descubrir conocimientos adyacentes.

Mejores prácticas para enlaces cruzados:

- **Vincular hacia adelante**: al introducir un concepto, vincule a los conceptos de los que depende (por ejemplo, `[Configuración de MCP](./mcp-and-agent-skills.md)`).
- **Vincular hacia atrás**: en el concepto que depende de este, vincule de vuelta (por ejemplo, `[Asistente de IA](./ai-assistant.md)`).
- **No vincular en exceso**: cada enlace debe agregar información. Vincular cada palabra diluye el gráfico y confunde al agente.

## Exclusión voluntaria por página

Algunas páginas no son útiles para los agentes de IA: modelos legales, páginas internas de "acerca del equipo", texto de marketing. Utilice `frontmatter.okf: false` para excluir una sola página del paquete OKF:

```markdown
---
okf: false
---

# Hoja de ruta interna (Q3 2026)
...
```

O utilice `noindex: true` para excluir una página de todos los consumidores posteriores (mapa del sitio, búsqueda, llms.txt, OKF). Las dos marcas difieren:

- `okf: false`: excluido únicamente de OKF; sigue estando en la búsqueda y en llms.txt
- `noindex: true`: excluido de todos los consumidores posteriores

## En qué se diferencia OKF de `llms.txt`

El [plugin `llms.txt`](../../plugins/llms.md) produce una lista plana de páginas:

```text
- [Página 1](https://example.com/page-1)
- [Página 2](https://example.com/page-2)
- [Página 3](https://example.com/page-3)
```

El plugin OKF produce un gráfico tipificado:

```yaml
concepts:
  - id: api-authentication
    type: api
    title: "API de autenticación"
    path: /api/auth/
    file: concepts/api-authentication.md
    tags: [auth, security]
  - id: users-table
    type: table
    title: "Tabla de usuarios"
    path: /tables/users/
    file: concepts/users-table.md
    tags: [schema, data]
```

Los dos se complementan entre sí:

- **llms.txt** es para **consumo plano**: "dame todo". Un agente lee el archivo y tiene el texto completo en su ventana de contexto.
- **OKF** es para **consumo tipificado**: "dame el esquema para la tabla X". Un agente lee el manifiesto, selecciona los conceptos que necesita y los carga selectivamente.

Para proyectos con menos de 50 páginas, llms.txt solo a menudo es suficiente. Para proyectos con más de 50 páginas, OKF es el formato más eficiente: el agente no tiene que cargar cada página solo para encontrar la que necesita.

## Errores comunes

### 1. Omitir el campo `type`

El manifiesto OKF es más útil cuando cada concepto tiene un `type` distinto. Si el 80% de sus páginas se infieren como `concept`, el agente no puede distinguir cuáles son documentos de referencia, cuáles son tutoriales y cuáles son guías de ejecución. Establezca `type: <nombre>` explícitamente para cada página que tenga una categoría clara.

### 2. Páginas sin enlaces cruzados

Si una página es un callejón sin salida (sin enlaces internos hacia o desde ella), el visualizador de gráficos la muestra como un nodo aislado. El agente la leerá de forma aislada, perdiendo el contexto. Agregue al menos un enlace entrante (referenciado desde otra página) para cada página que desee mostrar.

### 3. Poner jerga interna en `description`

El campo `description` se muestra en el manifiesto y en los resúmenes de `llms.txt`. Un agente de IA lo usa para decidir si un concepto es relevante. Utilice un lenguaje sencillo que el agente pueda comparar con la consulta de un usuario: "usuarios activos semanales para el sitio de marketing, calculados a partir del flujo de eventos", no "WAU (ms)".

### 4. OKF para sitios sin agentes de IA

Si su sitio de documentación no tiene audiencia de agentes de IA, OKF no aporta nada. El plugin `@docmd/plugin-okf` está habilitado de forma predeterminada, así que desactívelo explícitamente:

```json
{
  "plugins": { "okf": false }
}
```

El plugin `llms.txt` es la herramienta adecuada para "texto plano buscable por IA"; OKF es la herramienta adecuada para "gráfico de conocimiento tipificado para agentes de IA".

## Cómo verificar

Después de `docmd build`, inspeccione el paquete en `site/okf/`:

```bash
# El manifiesto (cada concepto, tipo, ruta)
cat site/okf/okf.yaml | head -30

# El catálogo (estilo Karpathy agrupado por tipo)
open site/okf/index.md

# El gráfico interactivo (dirigido por fuerza, consciente del tema)
open site/okf/graph.html

# Advertencias producidas por el plugin
cat site/okf/_meta/lint-report.txt
```

El informe de análisis es lo primero que se debe verificar: enumera páginas sin un campo `type`, páginas con enlaces internos rotos y conceptos huérfanos (sin enlaces entrantes). Corrija cualquiera de ellos para una experiencia de agente más limpia.

- [Configuración del Asistente de IA](./ai-assistant.md) — Configuración del asistente interactivo impulsado por RAG.
- [MCP y habilidades de agente](./mcp-and-agent-skills.md) — Configuración del Protocolo de Contexto de Modelo y herramientas del espacio de trabajo del agente.