---
title: "Configuración e integración del Asistente de IA"
description: "Cómo configurar y desplegar el Asistente de IA interactivo de docmd para soporte de documentación impulsado por RAG."
---

El Asistente de IA de docmd proporciona a los lectores respuestas en tiempo real y conscientes del contexto derivadas directamente de su documentación en Markdown. Impulsado por `@docmd/plugin-ai` y `aiplug`, el asistente realiza Generación Aumentada por Recuperación (RAG) utilizando el índice de búsqueda precompilado de su sitio mientras mantiene las claves de API de forma segura en el lado del servidor.

## Requisitos previos

Antes de configurar el Asistente de IA, asegúrese de:
1. `@docmd/plugin-search` esté habilitado en `docmd.config.json` (necesario para la extracción de contexto RAG).
2. Tenga una clave de API para su proveedor preferido (OpenAI, Anthropic, Gemini, DeepSeek, Groq u Ollama).

## Arquitectura de despliegue: Elija su estrategia

El Asistente de IA de docmd admite dos modelos de despliegue principales:

| Arquitectura | Ideal para | Infraestructura backend | Seguridad de la clave API |
| :--- | :--- | :--- | :--- |
| **Retransmisión gratuita docmd Cloud** | Sitios estáticos (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3) | Cero servidores — impulsado por el relay serverless administrado de docmd | Cifrado en reposo con hardware KMS |
| **Servidor autohospedado** | Aplicaciones dinámicas Node.js, contenedores Docker, intranets privadas | Servidor propio Node.js (`docmd dev` / `docmd serve`) | Variables de entorno en el servidor |
| **LLM local (Ollama)** | Redes aisladas, desarrollo local, cero dependencias en la nube | Estación de trabajo local con `ollama` | Endpoint local en localhost |

---

## Estrategia 1: Retransmisión gratuita docmd Cloud (Cero infraestructura)

Para alojamiento estático Jamstack, docmd proporciona una plataforma de retransmisión en la nube gratuita en [cloud.docmd.io](https://cloud.docmd.io) que redirige las solicitudes de manera segura sin exponer sus claves de API ni requerir el mantenimiento de un backend Node.js.

### 1. Crear un proyecto en la nube
1. Vaya a [cloud.docmd.io](https://cloud.docmd.io) e inicie sesión.
2. Haga clic en **Crear nuevo proyecto (Create New Project)**, ingrese un nombre (ej. `Documentación de Desarrolladores`) y su **Dirección de dominio asociada** (ej. `docs.mycompany.com`).
3. Si desarrolla localmente, marque la opción **Habilitar pruebas en localhost (127.0.0.1 / localhost)**.

### 2. Configurar la clave BYOK del proveedor
1. En el panel de su proyecto, vaya a **Configuración del modelo y clave BYOK**.
2. Seleccione su proveedor de IA (OpenAI, Anthropic, Google Gemini, Groq, DeepSeek, etc.).
3. Elija el nombre del modelo (ej., `gpt-4o-mini`, `claude-3-5-haiku-20241022`, `gemini-1.5-flash`).
4. Ingrese la clave de API del proveedor, haga clic en **Probar conexión** y guarde la clave y configuración.

### 3. Agregar el ID del proyecto a `docmd.config.json`
Vaya a la pestaña **Integración**, copie el fragmento de configuración y actualice su `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "¿Cómo puedo ayudar con esta documentación hoy?",
      "suggestions": [
        "¿Cómo empiezo?",
        "Mostrar opciones de configuración",
        "Explicar conceptos clave"
      ]
    }
  }
}
```

Ahora compile e implemente sus archivos estáticos en cualquier host (GitHub Pages, S3, Cloudflare Pages). El asistente del cliente establecerá automáticamente una sesión segura a través de la retransmisión.

---

## Estrategia 2: Servidor autohospedado (BYOK de entorno)

Si ejecuta docmd en un servidor Node.js o dentro de Docker:

### 1. Configuración

Agregue el bloque de plugin `ai` a `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "indexBody": true
    },
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "¿Cómo puedo ayudar con esta documentación hoy?",
      "suggestions": [
        "¿Cómo empiezo?",
        "Mostrar opciones de configuración",
        "Explicar conceptos clave"
      ],
      "contextLimit": 5,
      "captcha": false
    }
  }
}
```

::: callout tip title:"Modelos recomendados" icon:sparkles
Para un equilibrio óptimo entre la velocidad de respuesta y el costo, recomendamos utilizar modelos de razonamiento rápido como `gpt-4o-mini` (OpenAI), `claude-3-5-haiku-20241022` (Anthropic) o `gemini-1.5-flash` (Google).
::: /callout

### 2. Estructuración de credenciales de proveedor

Para mantener cero filtraciones de credenciales, las claves de API del proveedor se leen exclusivamente de variables de entorno en su servidor:

```bash
# OpenAI
export OPENAI_API_KEY="sk-..."

# Anthropic
export ANTHROPIC_API_KEY="sk-ant-..."

# Google Gemini
export GEMINI_API_KEY="AIzaSy..."

# Clave de respaldo genérica
export AI_API_KEY="su-clave-api"
```

Inicie su servidor con `docmd dev` o `docmd serve`. El cajón del asistente se comunica con su servidor mediante controladores de acciones RPC seguros.

## Ajuste fino de RAG y contexto de búsqueda

El Asistente de IA utiliza datos de `@docmd/plugin-search` para extraer fragmentos de documentación de verdad fundamental antes de ejecutar las indicaciones.

### 1. Aumento de la profundidad del contexto

Ajuste `contextLimit` para controlar cuántos fragmentos de Markdown se pasan al modelo:

```json
{
  "plugins": {
    "ai": {
      "contextLimit": 8
    }
  }
}
```

Valores más altos de `contextLimit` mejoran la precisión de la respuesta para preguntas complejas que abarcan múltiples páginas, pero aumentan el consumo de tokens de la indicación.

### 2. Protección contra el uso excesivo de bots

Evite el abuso de scripts automatizados configurando límites de velocidad de ventana deslizante o habilitando desafíos CAPTCHA de Prueba de Trabajo integrados:

```json
{
  "plugins": {
    "ai": {
      "captcha": true,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Despliegue de LLM local (Ollama)

Para entornos aislados o pruebas locales, configure `@docmd/plugin-ai` para apuntar a una instancia local de Ollama:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "provider": "ollama",
      "model": "llama3.2:3b",
      "baseUrl": "http://localhost:11434"
    }
  }
}
```

Asegúrese de que Ollama se esté ejecutando localmente (`ollama serve`) antes de compilar o iniciar docmd.

::: callout info "Integración de temas" icon:palette
El disparador flotante y el cajón glasmórfico del Asistente de IA se adaptan automáticamente a la apariencia de su tema activo (modo claro u oscuro) y respetan los límites de diseño de la barra de menú.
:::