---
title: "Integración de búsqueda semántica"
description: "Configure y despliegue la búsqueda semántica híbrida del lado del cliente en docmd utilizando incrustaciones de vectores locales."
---

La búsqueda de texto completo tradicional depende de coincidencias exactas de palabras clave. Si un usuario busca "autenticación" pero la página solo usa términos como "OAuth2" o "inicio de sesión", los motores de búsqueda de palabras clave estándar no logran descubrirla.

docmd proporciona **Búsqueda semántica híbrida** del lado del cliente impulsada por `@docmd/plugin-search`. Ejecuta canalizaciones de modelos ONNX de Hugging Face locales dentro del navegador, combinando la frecuencia de palabras clave BM25 con la similitud cosenoidal de vectores para la comprensión del lenguaje natural sin llamadas a APIs de terceros.

## Configuración

Habilite la búsqueda semántica en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true,
      "showConfidence": true
    }
  }
}
```

## Perfiles de modelos de incrustación

| ID de modelo | Dimensiones | Tamaño | Idiomas | Caso de uso principal |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | Solo inglés | Documentación en inglés de alta precisión. |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ idiomas | Soporte multilingüe integral. |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ idiomas | Equilibrio recomendado para sitios internacionales. |

## Precompilación de vectores en CI/CD

Genere previamente fragmentos de índices de vectores durante los pasos de compilación para acelerar la ejecución del navegador:

```bash
# Compilar fragmentos de vectores de búsqueda semántica
npx docmd-search --build

# Compilar sitio estático
npx @docmd/core build
```

Esto emite fragmentos Vecto-JSON estáticos en `.docmd-search/`.

::: callout tip "Almacenamiento en caché de fragmentos de vectores" icon:zap
Confirme `.docmd-search/` en el control de versiones o almacénelo en caché en los flujos de trabajo de CI/CD. `docmd-search` realiza reindexación incremental, completando las compilaciones posteriores en menos de 300 ms.
:::