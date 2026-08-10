---
title: "Configuración e integración del Asistente de IA"
description: "Cómo configurar y desplegar el Asistente de IA interactivo de docmd para soporte de documentación impulsado por RAG."
---

El Asistente de IA de docmd proporciona a los lectores respuestas en tiempo real y conscientes del contexto derivadas directamente de su documentación en Markdown. Impulsado por `@docmd/plugin-ai` y `aiplug`, el asistente realiza Generación Aumentada por Recuperación (RAG) utilizando el índice de búsqueda precompilado de su sitio mientras mantiene las claves de API de forma segura en el lado del servidor.

## Requisitos previos

Antes de configurar el Asistente de IA, asegúrese de:
1. `@docmd/plugin-search` esté habilitado en `docmd.config.json` (necesario para la extracción de contexto RAG).
2. Tenga una clave de API para su proveedor preferido (OpenAI, Anthropic, Gemini, DeepSeek, Groq u Ollama).

## Configuración

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

## Estructuración de credenciales de proveedor

Para mantener cero filtraciones de credenciales, las claves de API del proveedor se leen exclusivamente de variables de entorno:

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

Inicie su servidor web de desarrollo o producción después de exportar las claves. El cajón del asistente del lado del cliente se comunica con el servidor a través de controladores de acciones RPC seguros.

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