---
title: "Motor JavaScript"
description: "Conozca a fondo el motor de ejecución nativo en JavaScript de docmd: casos de uso, portabilidad, capacidades y límites."
---

El **Motor JavaScript** es el motor de ejecución fundamental incluido en docmd. Se ejecuta sin fricción en cualquier entorno de JavaScript moderno, ofreciendo un excelente rendimiento sin depender de compiladores externos ni dependencias binarias.

De forma predeterminada, todos los proyectos de docmd utilizan el motor JavaScript, proporcionando un recorrido de archivos, indexación de metadatos y generación de sitios sumamente estables y deterministas.

## Configuración

Para indicar explícitamente a docmd que utilice el motor JavaScript, defina la propiedad `engine` como `"js"` dentro de su archivo `docmd.config.json`.

```json "docmd.config.json"
{
  "title": "Manual para desarrolladores",
  "engine": "js",
  "src": "docs",
  "out": "site"
}
```

## Casos de uso recomendados y puntos fuertes

El motor JavaScript ofrece gran versatilidad y destaca en los siguientes entornos:

- **Repositorios estándar**: Los sitios con hasta varios cientos de páginas compilan con rapidez sobresaliente, aprovechando la compilación JIT optimizada de Node y el análisis nativo de JSON.
- **Máxima portabilidad**: Si su equipo utiliza sistemas operativos heterogéneos o redes corporativas restringidas, el motor JavaScript garantiza compilaciones perfectas en cualquier plataforma sin requerir binarios nativos.
- **Desarrollo ágil**: Las sesiones de desarrollo local disfrutan de recarga instantánea (`npx @docmd/core dev`) con una latencia de inicialización prácticamente nula.
- **Scripts y extensiones personalizadas**: La configuración dinámica y los plugins se ejecutan de manera natural dentro del mismo entorno JavaScript, evitando conversiones y serializaciones entre lenguajes.

## Compatibilidad de plataformas y sistemas

Al operar de forma íntegra en entornos de ejecución estándar, el motor JavaScript es compatible con una amplia diversidad de plataformas:

- **Sistemas operativos**: macOS, Linux, Windows, FreeBSD y OpenBSD.
- **Arquitecturas de hardware**: x64, ARM64 (Apple Silicon, AWS Graviton), ARMv7 y RISC-V.
- **Entornos en contenedores**: Alpine Linux, distribuciones Debian/Ubuntu estándar, ejecutores serverless (Vercel, Netlify) y canales de integración continua.

## Capacidades y consideraciones

| Dimensión | Perfil del motor JavaScript | Impacto operativo |
| :--- | :--- | :--- |
| **Modelo de concurrencia** | Bucle de eventos de Node.js + subprocesos Worker nativos | Excelente gestión asíncrona de respuestas y operaciones en disco fluidas. |
| **Metadatos de Git** | Orquestación mediante subprocesos (`child_process.execFile`) | Ejecuta binarios de Git para recolectar commits e incluye caché de disco persistente. |
| **Instalación e inicio** | Cero configuración | Arranque instantáneo sin necesidad de compilar paquetes nativos en la instalación. |
| **Límite de escalabilidad** | Alto rendimiento hasta ~1.000 documentos | En repositorios con miles de archivos, los subprocesos secuenciales pueden añadir pequeñas latencias. |

## Soporte completo de funciones

El motor JavaScript **ofrece compatibilidad universal con todas las funciones**. Cada característica central, sintaxis avanzada, ranura de plantilla y plugin oficial está diseñado para funcionar fluidamente en este motor.
