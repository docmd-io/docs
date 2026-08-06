---
title: "Configuración"
description: "Opciones de configuración globales, de proyecto y CLI para docmd-search."
---

`docmd-search` utiliza un sistema de configuración de cuatro niveles.

## Referencia del Esquema de Opciones

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "chunkSize": 256,
  "chunkOverlap": 32,
  "include": ["**/*.md", "**/*.txt", "**/*.html"],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/site/**",
    "**/.git/**",
    "**/_docmd-search/**"
  ],
  "outDir": "_docmd-search",
  "incremental": true,
  "topK": 10
}
```

## Opciones Disponibles

| Opción | Tipo | Predeterminado | Descripción |
| :----- | :--- | :------------- | :---------- |
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | ID del modelo en HuggingFace |
| `chunkSize` | `number` | `256` | Tokens máximos por fragmento |
| `chunkOverlap` | `number` | `32` | Solapamiento de tokens entre fragmentos adyacentes |
| `outDir` | `string` | `_docmd-search` | Carpeta de destino para archivos de índice |
| `incremental` | `boolean` | `true` | Omite archivos no modificados |
