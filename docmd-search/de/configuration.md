---
title: "Konfiguration"
description: "Globale, Projekt- und CLI-Konfigurationsoptionen für docmd-search."
---

`docmd-search` nutzt ein vierstufiges Konfigurationssystem.

## Optionenschema-Referenz

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

## Verfügbare Optionen

| Option | Typ | Standard | Beschreibung |
| :----- | :--- | :------ | :---------- |
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | HuggingFace Modell-ID |
| `chunkSize` | `number` | `256` | Maximale Tokens pro Chunk |
| `chunkOverlap` | `number` | `32` | Token-Überlappung zwischen benachbarten Chunks |
| `outDir` | `string` | `_docmd-search` | Zielordner für Indexdateien |
| `incremental` | `boolean` | `true` | Überspringt unveränderte Dateien |
