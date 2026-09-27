---
title: "Visión general de motores"
description: "Comprenda la arquitectura conectable de motores de compilación y seleccione el backend de procesamiento idóneo."
---

El compilador cuenta con una **Arquitectura de motores conectables** multi-hilo y altamente modular. Desacopla la orquestación general de las tareas computacionales intensivas para procesar grandes cargas de trabajo con máxima eficiencia.

Elija entre el **Motor JavaScript** (con cero configuración), el **Motor Rust** acelerado y el **Motor Python** multi-hilo, según el tamaño de su repositorio, la plataforma de destino y sus requisitos de rendimiento.

## Motores disponibles

| Motor | Identificador | Por defecto | Caso de uso recomendado | Fortaleza principal |
| :--- | :--- | :---: | :--- | :--- |
| **Motor JavaScript** | `"js"` | ✅ Sí | Sitios estándar, desarrollo local ágil, máxima portabilidad. | Ejecución universal en cualquier entorno compatible con Node.js. |
| **Motor Rust (Vista previa)** | `"rust"` | ❌ No | Repositorios masivos (más de 1.000 archivos), compilaciones de CI/CD empresariales. | Maximiza la E/S de archivos en paralelo mediante Tokio. |
| **Motor Python** | `"python"` | ❌ No | Repositorios grandes, procesamiento vectorial de IA/semántica, flujos multiplataforma. | E/S multi-hilo, cuantificación vectorial y tareas de coseno sin binarios nativos. |

## Opciones de configuración

Configure el motor deseado en su archivo `docmd.config.json` mediante la propiedad `engine`.

```json "docmd.config.json"
{
  "title": "Referencia empresarial",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

### Referencia completa de opciones

| Clave | Valores admitidos | Por defecto | Descripción |
| :--- | :--- | :--- | :--- |
| `engine` | `"js"`, `"rust"`, `"python"` | `"js"` | Capa de ejecución encargada del descubrimiento, lectura masiva de archivos y tareas vectoriales. |

## Capacidades compartidas y limitaciones

Todos los motores operan bajo un estricto límite de ejecución. La capa central de la API garantiza una seguridad uniforme y una salida determinista.

### Capacidades compartidas
- **Aislamiento en subprocesos**: Los motores ejecutan tareas asíncronas dentro de subprocesos de trabajo aislados (worker threads), evitando bloqueos en el ciclo de eventos principal.
- **Verificación de tareas**: Listas blancas estrictas impiden el acceso no autorizado al disco o patrones de ejecución no validados.
- **Interoperabilidad transparente**: Los plugins solicitan datos mediante interfaces normalizadas (`runWorkerTask`) sin necesidad de conocer qué backend subyace.

### Limitaciones arquitectónicas
- **Sobrecarga de serialización**: Los datos cruzan los límites de tiempo de ejecución nativos (N-API o stdio). Tareas con ciclos muy repetitivos que pasen objetos JSON grandes incurren en un pequeño coste de serialización.
- **Compatibilidad binaria**: El motor JavaScript funciona de manera idéntica en cualquier plataforma. El motor Rust depende de binarios específicos por sistema operativo distribuidos a través de npm, mientras que el motor Python requiere una instalación de Python 3.8+ en el sistema anfitrión.

## Cómo funciona el cargador de motores

Al iniciarse `@docmd/core`, el cargador interno examina la configuración activa:

1. **Resolución**: Si está configurado como `"rust"`, el motor carga perezosamente el paquete nativo correspondiente a su arquitectura (ej., `@docmd/engine-rust-darwin-arm64`). Si está configurado como `"python"`, inicializa el worker persistente mediante el entorno Python 3 del sistema.
2. **Retirada elegante (Fallback)**: Si el binario o entorno requerido no está disponible o no es compatible, el motor registra un aviso informativo y pasa automáticamente al motor JavaScript. La compilación nunca se detiene.

Explore la documentación detallada de cada motor:
- [Referencia del motor JavaScript](js.md)
- [Referencia del motor Rust](rust.md)
- [Referencia del motor Python](python.md)
