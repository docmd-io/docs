---
title: "Plugin del Asistente de IA"
description: "Habilita la asistencia interactiva de documentación con IA basada en búsqueda, impulsada por la integración multiproveedor de aiplug."
---

El plugin `@docmd/plugin-ai` introduce un panel interactivo del Asistente de IA en su sitio de documentación. Aprovecha los índices precompilados de `@docmd/plugin-search` para realizar Generación Aumentada por Recuperación (RAG), consultando secciones específicas de la documentación para ofrecer respuestas contextuales con enlaces directos a las fuentes.

## Capacidades clave

* **Disparador flotante y cajón glasmórfico**: Disparador limpio tipo píldora (atajo `⌘K`) que se despliega en un panel de chat adaptable al tema.
* **RAG consciente de la búsqueda**: Consulta los datos precompilados de `search-index.json` para fundamentar las respuestas del LLM directamente en la documentación de su sitio.
* **Retransmisión gratuita en la nube (docmd Cloud Relay)**: Despliegue en hosts estáticos (GitHub Pages, Cloudflare Pages, Netlify, Vercel) sin ninguna infraestructura de servidor backend.
* **Seguridad BYOK en el servidor y KMS**: Las claves de API se cifran en reposo mediante KMS en docmd Cloud o se resuelven exclusivamente en el servidor (`AI_API_KEY`, `OPENAI_API_KEY`), garantizando cero exposición de credenciales en los paquetes web del cliente.
* **Integración multiproveedor**: Impulsado por `aiplug` con compatibilidad nativa para OpenAI, Anthropic, Gemini, DeepSeek, Groq e instancias locales de Ollama.
* **Neutralidad de temas**: Se adapta a los modos claro y oscuro en todas las plantillas integradas y personalizadas.

## Opciones de configuración

Configure las opciones del asistente en `docmd.config.json`:

### Opción A: Retransmisión gratuita docmd Cloud (Sitios estáticos recomendados)

Para sitios estáticos (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3), conéctese al servicio gratuito de retransmisión en la nube de docmd utilizando su `projectId`:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "greeting": "¿Cómo puedo ayudar con esta documentación hoy?",
      "placeholder": "Haz una pregunta a la IA...",
      "suggestions": [
        "¿Cómo empiezo?",
        "Mostrar opciones de configuración",
        "Explicar conceptos clave"
      ]
    }
  }
}
```

### Opción B: Servidor autohospedado (Variables de entorno BYOK)

Para entornos Node.js o Docker donde docmd se ejecuta como servidor, configure el proveedor y el modelo directamente:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "¿Cómo puedo ayudar con esta documentación hoy?",
      "placeholder": "Haz una pregunta a la IA...",
      "suggestions": [
        "¿Cómo empiezo?",
        "Mostrar opciones de configuración",
        "Explicar conceptos clave"
      ],
      "contextLimit": 5,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Referencia de opciones

| Opción | Tipo | Predeterminado | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Habilita o deshabilita el disparador interactivo del Asistente de IA. |
| `projectId` | `string` | `undefined` | ID de proyecto de [docmd Cloud](https://cloud.docmd.io) para retransmisión serverless gratuita en sitios estáticos. |
| `cloud` | `object` | `undefined` | Objeto de opciones de retransmisión en la nube (ej. `{ "projectId": "docmd_ai..." }`). |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'` (cuando se define `projectId`) | URL del endpoint de retransmisión de chat de IA personalizado. |
| `captcha` | `boolean` | `false` | Habilita desafíos CAPTCHA de Prueba de Trabajo de código abierto contra bots antes de la ejecución. |
| `provider` | `string` | `'openai'` | Proveedor de LLM para servidores autohospedados (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Predeterminado del proveedor | ID del modelo específico (ej. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Ubicación del disparador flotante en pantalla (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'¿Cómo puedo ayudar...'` | Mensaje de bienvenida inicial en el panel de chat. |
| `placeholder` | `string` | `'Haz una pregunta a la IA...'` | Texto de marcador de posición del campo de entrada. |
| `suggestions` | `string[]` | Preguntas predeterminadas | Botones de indicaciones rápidas recomendadas. |
| `contextLimit` | `number` | `5` | Número máximo de fragmentos de documentación RAG pasados a la ventana de contexto del LLM. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Límite de velocidad de ventana deslizante para proteger los modelos de LLM contra el uso excesivo de API. |

## Configuración de la retransmisión gratuita de docmd Cloud

Si despliega su documentación como archivos estáticos en GitHub Pages, Cloudflare Pages, Netlify o Vercel, no es necesario ejecutar un servidor backend independiente para retransmitir consultas de IA. docmd ofrece un servicio gratuito de retransmisión en la nube en [cloud.docmd.io](https://cloud.docmd.io):

1. **Crear una cuenta y proyecto**: Inicie sesión en [cloud.docmd.io](https://cloud.docmd.io) y cree un nuevo proyecto.
2. **Definir dominio asociado**: En **Configuración del proyecto (Project Configuration)**, especifique el dominio de su documentación (ej. `docs.mycompany.com`). Solo las solicitudes procedentes de este dominio estarán autorizadas.
3. **Habilitar pruebas en localhost (Desarrollo)**: Para pruebas locales, active la casilla **Habilitar pruebas en localhost (127.0.0.1 / localhost)**. Desactívela antes del lanzamiento público en producción.
4. **Configurar modelo y clave BYOK**: En **Configuración del modelo y clave BYOK**, seleccione su proveedor de IA (OpenAI, Anthropic, Gemini, Groq, DeepSeek, etc.), introduzca el modelo y su clave de API, pulse en **Probar conexión (Test Connection)** y luego en **Guardar clave y configuración**. Las claves se cifran en reposo con tecnología de módulo de seguridad de hardware (KMS).
5. **Agregar el ID del proyecto a la configuración**: En la pestaña **Integración**, copie el fragmento con su `projectId` y péguelo en `docmd.config.json`:
   ```json
   {
     "plugins": {
       "ai": {
         "assistant": true,
         "projectId": "docmd_aiv77jc8ms8qtpvd"
       }
     }
   }
   ```

## Seguridad del lado del servidor (BYOK autohospedado)

::: callout warning title:"Cero filtraciones de credenciales" icon:alert-triangle
`@docmd/plugin-ai` procesa estrictamente las credenciales de API en el lado del servidor o a través de la retransmisión cifrada por KMS de docmd Cloud. Las claves de API del proveedor nunca se renderizan en el HTML del cliente ni en los paquetes de JavaScript estáticos.
::: /callout

Al ejecutar docmd como servidor Node.js, defina las claves de entorno del proveedor antes de iniciar el servidor de documentación:

```bash
export OPENAI_API_KEY="sk-..."
# o
export ANTHROPIC_API_KEY="sk-ant-..."
# o clave genérica de respaldo
export AI_API_KEY="su-clave-api"
```

## Flujo de ejecución de la arquitectura

1. **Registro de acciones en tiempo de compilación**: Durante la compilación del sitio, `@docmd/plugin-ai` registra controladores de acción RPC (`ai:chat`) o inyecta el cliente de retransmisión Cloud con su `projectId`.
2. **Generación aumentada por recuperación (RAG)**: Cuando un lector envía una consulta:
   - El cliente consulta el índice de búsqueda compilado por `@docmd/plugin-search` o herramientas MCP.
   - Los títulos y fragmentos de texto coincidentes se seleccionan en función de la distancia vectorial o de palabras clave.
   - Los fragmentos relevantes y resultados de herramientas se transfieren al relay o endpoint del servidor.
3. **Procesamiento del proveedor y citas**: La solicitud se enruta de forma segura al proveedor designado mediante `aiplug`. Las respuestas se transmiten en tiempo real con enlaces markdown a los anclajes de documentación correspondientes.