---
title: "Motor Rust"
description: "Conozca el motor nativo opcional en Rust: casos de uso, capacidades de E/S de archivos, paquetes compatibles y limitaciones."
---

El **Motor Rust** es un backend de ejecución opcional de alto rendimiento diseñado para acelerar cargas de trabajo pesadas de E/S en proyectos de documentación de gran envergadura. Al apoyarse en binarios nativos compilados mediante N-API, evita las limitaciones habituales del bucle de eventos para ofrecer lectura concurrente de archivos y orquestación de subprocesos en paralelo.

Disponible como **vista previa experimental**, el motor Rust está orientado a entornos de escala corporativa con miles de documentos Markdown e historiales extensos de Git.

## Configuración

Para activar la aceleración nativa con Rust, establezca la directiva `engine` en `"rust"` dentro de su archivo `docmd.config.json`.

```json "docmd.config.json"
{
  "title": "Registro Global de APIs",
  "engine": "rust",
  "src": "docs",
  "out": "site"
}
```

## Casos de uso ideales y puntos fuertes

El motor Rust resuelve cuellos de botella específicos de compilación, destacando en los siguientes escenarios:

- **Repositorios masivos (+1.000 archivos)**: Los proyectos monolíticos aprovechan notablemente el acceso paralelo al sistema de archivos coordinado a través de Tokio.
- **Recolección intensiva de metadatos de Git**: La extracción de registros de commits profundos en cientos de páginas requiere múltiples subprocesos. El motor Rust procesa las tareas `git:log` hasta **1.24 veces más rápido** que JavaScript.
- **Aceleración de compilaciones en frío en CI/CD**: En entornos donde las cachés de disco no están calientes, el rendimiento bruto de lectura reduce sustancialmente el tiempo total. Las mediciones muestran una **mejora de aproximadamente el 25% en compilaciones en frío** y del **17% en compilaciones en caliente**.

## Paquetes por plataforma y compatibilidad

El motor ejecuta código máquina precompilado y requiere binarios nativos ajustados a la arquitectura de su equipo. El paquete base `@docmd/engine-rust` carga automáticamente el binario adecuado durante el arranque.

Actualmente se distribuyen los siguientes paquetes según la plataforma:

| Paquete de plataforma | Arquitectura | Sistema operativo |
| :--- | :--- | :--- |
| `@docmd/engine-rust-darwin-arm64` | ARM64 (Apple Silicon) | macOS |
| `@docmd/engine-rust-darwin-x64` | x64 (Intel) | macOS |
| `@docmd/engine-rust-linux-x64-gnu` | x64 | Linux (entornos glibc) |
| `@docmd/engine-rust-linux-arm64-gnu` | ARM64 | Linux (entornos glibc) |
| `@docmd/engine-rust-win32-x64-msvc` | x64 | Windows |

::: callout info title:"Retirada elegante automática" icon:info
Si su entorno no dispone de un binario precompilado, el motor emitirá un aviso informativo y **volverá automáticamente** al motor JavaScript de alto rendimiento. Sus compilaciones permanecen siempre garantizadas y deterministas.
::: /callout

## Capacidades y consideraciones estratégicas

Para obtener el máximo provecho, es fundamental comprender sus características arquitectónicas: destaca en operaciones limitadas por E/S pero presenta sobrecarga al serializar datos entre fronteras de ejecución.

| Capacidad / Tarea | Perfil de rendimiento en Rust | Veredicto arquitectónico |
| :--- | :--- | :--- |
| **Descubrimiento y lectura por lotes** | Acelerado mediante Tokio en paralelo. | ✅ Muy eficaz en directorios extensos. |
| **Extracción de commits de Git** | Orquestación rápida sin saturar el bucle de eventos. | ✅ Excelente para metadatos de Git en frío. |
| **Caché en disco persistente** | Soporte nativo para eliminar lecturas redundantes. | ✅ Muy eficaz en compilaciones repetidas. |
| **Indexación de búsqueda en CPU** | **Más lento que el compilador JIT de JavaScript**. | ❌ Ineficiente por la doble serialización. |

### La tasa de doble serialización

La comunicación entre el orquestador central de docmd y el motor nativo de Rust transfiere cadenas JSON a través de la frontera N-API:

```text
Worker JS → JSON.stringify() → Límite NAPI → Deserialización Serde → [Tarea Rust] → Serialización Serde → Límite NAPI → JSON.parse()
```

Para operaciones dominadas por E/S (como consultar Git o leer archivos de disco), el tiempo ganado compensa con creces el coste de la conversión de texto.

Sin embargo, para tareas intensivas de CPU como la indexación de búsqueda de texto completo (`search:index`), **el ciclo de serialización consume más tiempo que la tarea misma**. Por esta razón, **el motor JavaScript sigue siendo la opción recomendada para las tareas de búsqueda semántica**, reservando el motor Rust para repositorios masivos con gran volumen de archivos e historiales de Git.
