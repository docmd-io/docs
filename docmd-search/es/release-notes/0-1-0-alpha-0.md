---
title: "v0.1.0-alpha.0 - Primera Alpha Pública"
description: "Notas de lanzamiento para la primera alpha pública de docmd-search."
date: "2026-05-31"
---

Nos alegra presentar la primera versión alpha de **docmd-search**.

docmd-search es un motor de búsqueda semántica diseñado para sitios de documentación. Funciona completamente en el navegador, no requiere servidores ni claves API.

## Novedades en esta versión

### Motor Principal

- **Indexación semántica local** – Genera embeddings vectoriales en tiempo de compilación con `Xenova/all-MiniLM-L6-v2`.
- **Búsqueda en el navegador** – La clasificación y recuperación ocurren completamente en el navegador.
- **Indexación por fragmentos** – El contenido se divide en fragmentos superpuestos configurables.
