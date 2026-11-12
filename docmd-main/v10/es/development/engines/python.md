---
title: "Motor Python"
description: "Conozca el motor opcional en Python: casos de uso, capacidades de E/S de archivos, paquetes compatibles y limitaciones."
---

El **Motor Python** es un backend de ejecución opcional multihilo diseñado para acelerar cargas de trabajo pesadas de E/S, navegación de historiales de Git y operaciones de búsqueda vectorial en proyectos de documentación. Al coordinar un proceso worker persistente en segundo plano con Python 3, evita las limitaciones habituales del bucle de eventos para ofrecer lectura concurrente de archivos y orquestación de subprocesos sin requerir extensiones nativas compiladas por plataforma.

Disponible como un **backend de ejecución extensible**, el motor Python está orientado a proyectos de escala corporativa y documentación asistida por IA. Destaca donde miles de documentos Markdown, registros exhaustivos de Git y la preparación de vectores de incrustación introducen cuellos de botella de compilación.

## Configuración

Para activar la aceleración con Python, establezca la directiva `engine` en `"python"` dentro de su archivo `docmd.config.json`.

```json "docmd.config.json"
{
  "title": "Registro Global de APIs",
  "engine": "python",
  "src": "docs",
  "out": "site"
}
```

## Casos de uso ideales y puntos fuertes

El motor Python resuelve cuellos de botella específicos de compilación, destacando en los siguientes escenarios:

- **Repositorios masivos (+1.000 archivos)**: Los proyectos monolíticos aprovechan notablemente el acceso paralelo y asíncrono al sistema de archivos coordinado a través del `ThreadPoolExecutor` de Python.
- **Recolección intensiva de metadatos de Git**: La extracción de registros de commits profundos en cientos de páginas requiere múltiples subprocesos. El motor Python procesa las tareas `git:log` hasta **1.20 veces más rápido** que JavaScript.
- **Procesamiento vectorial semántico sin conexión**: Controladores nativos para división de texto por encabezados (`search:chunk`), cuantización de vectores de Float32 a Int8 (`search:quantize`) y cálculo de similitud del coseno (`search:cosine`) aceleran el flujo de `docmd-search` sin dependencias externas en la nube.
- **Entornos multiplataforma sin binarios nativos**: A diferencia de los módulos en C o Rust que requieren binarios compilados por arquitectura, el motor Python ejecuta código fuente Python universal dondequiera que Python 3.8+ esté instalado.

## Paquetes por plataforma y compatibilidad

El motor ejecuta código Python interpretado a través del entorno de ejecución de Python 3 del sistema. A diferencia de los motores compilados nativos, no requiere paquetes binarios nativos fragmentados por plataforma; un único paquete universal `@docmd/engine-python` atiende a todas las plataformas compatibles.

Actualmente se admiten los siguientes entornos:

| Paquete de plataforma | Arquitectura | Sistema operativo |
| :--- | :--- | :--- |
| `@docmd/engine-python` | ARM64 (Apple Silicon) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 (Intel) | macOS (Python 3.8+) |
| `@docmd/engine-python` | x64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | ARM64 | Linux (glibc/musl, Python 3.8+) |
| `@docmd/engine-python` | x64 | Windows (Python 3.8+) |

::: callout info title:"Retirada elegante automática" icon:info
Si su entorno carece de Python 3 o no puede inicializar el motor, este emitirá un aviso informativo y **volverá automáticamente** al motor JavaScript de alto rendimiento. Sus compilaciones permanecen siempre garantizadas y deterministas.
:::

## Capacidades y consideraciones estratégicas

Para obtener el máximo provecho, es fundamental comprender sus características arquitectónicas: destaca en operaciones de E/S y transformaciones vectoriales por lotes, pero presenta sobrecarga al serializar datos entre procesos.

| Capacidad / Tarea | Perfil de rendimiento en Python | Veredicto arquitectónico |
| :--- | :--- | :--- |
| **Descubrimiento y lectura por lotes** | Acelerado mediante workers paralelos `ThreadPoolExecutor`. | ✅ Muy eficaz en directorios extensos. |
| **Extracción de commits de Git** | Orquestación rápida multihilo eludiendo el bucle de eventos de Node. | ✅ Excelente para metadatos de Git en frío. |
| **Operaciones vectoriales semánticas** | División nativa, cuantización Float32 a Int8 y similitud de coseno. | ✅ Muy eficaz para búsqueda vectorial offline. |
| **Lectura de archivos diminutos aislados** | **Más lento que la ejecución nativa en proceso de JavaScript V8**. | ❌ Ineficiente por la sobrecarga de comunicación interproceso. |

### La tasa de doble serialización

La comunicación entre el orquestador central de docmd y el motor Python transfiere líneas JSON a través de una canalización persistente de entrada/salida estándar (`stdio`):

```text
Worker JS -> JSON.stringify() -> Tubería stdio -> Worker Python (runner.py) -> [Tarea Python] -> Serialización -> Tubería stdio -> JSON.parse()
```

Para operaciones dominadas por E/S (como consultar Git, explorar miles de rutas o cuantizar vectores por lotes), el tiempo ganado compensa con creces el coste de la serialización.

Sin embargo, para lecturas aisladas de archivos pequeños u operaciones iterativas de cadenas de texto, **el ciclo de comunicación entre procesos consume más recursos que la tarea misma**. Por esta razón, **el motor JavaScript sigue siendo la opción recomendada para sitios de documentación estándar**, reservando el motor Python para historiales extensos de Git, indexación paralela y búsqueda vectorial semántica.

## Integración de plugins y API

Los plugins y ganchos de compilación pueden comunicarse directamente con el motor Python a través de `@docmd/api`. Esta capa actúa como límite de seguridad, asegurando las listas de tareas permitidas y exponiendo funciones auxiliares de alto nivel:

```typescript
import { resolveEngine, chunkText, quantizeVectors, cosineSimilarity } from '@docmd/api';

// Resuelve el motor configurado o el mejor disponible (prueba Python, recurre a JS)
const engine = await resolveEngine(['python', 'js']);

// Realiza división semántica de texto respetando los encabezados
const chunks = await chunkText(engine, markdownContent, 'guide.md');

// Cuantiza vectores Float32 a representaciones compactas Int8
const { quantized, mins, ranges } = await quantizeVectors(engine, embeddingVectors);

// Calcula la similitud de coseno frente a vectores del corpus
const matches = await cosineSimilarity(engine, queryVector, corpusVectors, 10);
```
