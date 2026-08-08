---
title: "Bloques de código y resaltado"
description: "Documente implementaciones técnicas con resaltado de sintaxis de alto rendimiento, títulos de bloques de código y controles de copia en docmd."
---

`docmd` utiliza el motor rápido `lite-hl` para el resaltado de sintaxis nativo. Especifique el identificador de idioma en cada bloque cercado para aplicar las reglas léxicas adecuadas.

## Resaltado de sintaxis

Declare el identificador de idioma después del delimitador cercado de apertura:

````markdown
```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```
````

```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```

## Títulos de bloques de código

Proporcione una cadena de nombre de archivo entre comillas dobles después de la etiqueta de idioma para renderizar una barra de título con estilo sobre el contenedor de código:

````markdown
```json "docmd.config.json"
{
  "title": "Mi Documentación",
  "src": "docs/"
}
```
````

```json "docmd.config.json"
{
  "title": "Mi Documentación",
  "src": "docs/"
}
```

## Idiomas compatibles

`docmd` admite lenguajes de programación y formatos de datos populares de forma nativa:

- **Programación:** `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`, `c`, `cpp`
- **Lenguajes web:** `html`, `css`, `markdown`
- **Datos y Shell:** `json`, `yaml`, `bash`, `powershell`, `dockerfile`, `toml`
- **Diagramas y registros:** `mermaid`, `changelog`

## Estrategia de contexto de IA

Al escribir fragmentos de código para lectores humanos y agentes de IA:

1. **Etiquetas de idioma explícitas**: Utilice identificadores de idioma explícitos (`typescript`, `bash`, `json`) en lugar de depender de la detección automática para garantizar una tokenización precisa para `llms.txt`.
2. **Comentarios en línea explicativos**: Utilice comentarios en línea para explicar decisiones arquitectónicas y lógica no obvia.

::: callout tip "Utilidades de copia con un solo clic" icon:copy
Habilite `theme.copyCode: true` en `docmd.config.json` para mostrar botones interactivos de copia al portapapeles en los encabezados de los bloques de código.
:::