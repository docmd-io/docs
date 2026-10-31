---
title: "Plugin Asistente de IA"
description: "Habilite asistencia de documentación interactiva basada en búsquedas impulsada por la integración multiproveedor de aiplug."
---

El plugin `@docmd/plugin-ai` introduce un panel superpuesto de Asistente de IA interactivo en su sitio de documentación. Utiliza los índices precompilados de `@docmd/plugin-search` para realizar Generación Aumentada por Recuperación (RAG), consultando secciones específicas de la documentación para ofrecer respuestas contextuales con enlaces directos a las fuentes.

## Capacidades Principales

* **Disparador Flotante y Panel Glassmorphic**: Disparador discreto con acceso rápido (`Ctrl+K`) que se expande en un panel de chat adaptable al tema.
* **Búsqueda Determinista y Verificación Fundamentada**: Aplica un flujo de recuperación en dos pasos (búsqueda orientada seguida de la lectura completa de la página autorizada) con validación de disponibilidad para rutas internas y URLs externas.
* **Consulta de URLs Externas y Gobernanza Cloud**: Permite consultar recursos de referencia HTTP/HTTPS remotos cuando está habilitado en `docmd.config.json` y autorizado por las políticas de docmd Cloud Relay.
* **Compactación Invisible del Historial**: Reduce las rondas anteriores de conversación en segundo plano para cumplir los límites de carga útil del relay en sesiones prolongadas.
* **Retransmisión Gratuita docmd Cloud Relay**: Despliegue en hosts estáticos (GitHub Pages, Cloudflare Pages, Netlify, Vercel) sin necesidad de infraestructura de backend.
* **Seguridad BYOK en Servidor y Cifrado KMS**: Las claves de API se cifran en reposo mediante KMS en docmd Cloud o se resuelven en el servidor (`AI_API_KEY`, `OPENAI_API_KEY`), garantizando que no se expongan credenciales en los paquetes web del cliente.
* **Integración Multiproveedor**: Desarrollado sobre `aiplug` con compatibilidad nativa para OpenAI, Anthropic, Gemini, DeepSeek, Groq e instancias locales de Ollama.
* **Neutralidad de Tema**: Se adapta automáticamente a los modos claro y oscuro en todas las plantillas estándar y personalizadas.

## Opciones de Configuración

Configure las opciones del asistente en `docmd.config.json`.

### Opción A: Retransmisión Gratuita docmd Cloud (Sitios Estáticos)

Para sitios estáticos (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3), conéctese al servicio gratuito de retransmisión de docmd Cloud mediante su `projectId`:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "¿Cómo puedo ayudarte hoy con esta documentación?",
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

### Opción B: Servidor Autohospedado (Variables de Entorno BYOK)

Cuando docmd se ejecuta en un servidor Node.js o contenedor Docker:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "¿Cómo puedo ayudarte hoy con esta documentación?",
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

## Referencia de Opciones

| Opción | Tipo | Predeterminado | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Habilita o deshabilita el disparador interactivo del Asistente de IA. |
| `projectId` | `string` | `undefined` | ID de proyecto de [docmd Cloud](https://cloud.docmd.io) para retransmisión serverless gratuita en sitios estáticos. |
| `cloud` | `object` | `undefined` | Objeto de opciones de retransmisión en la nube (ej. `{ "projectId": "docmd_ai..." }`). |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'` (cuando se define `projectId`) | URL del endpoint de retransmisión de chat de IA personalizado. |
| `allowExternalUrls` | `boolean` | `false` | Permite a la herramienta del asistente consultar URLs HTTP/HTTPS externas. |
| `captcha` | `boolean` | `false` | Habilita desafíos CAPTCHA de Prueba de Trabajo de código abierto contra bots antes de la ejecución. |
| `provider` | `string` | `'openai'` | Proveedor de LLM para servidores autohospedados (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Predeterminado del proveedor | ID del modelo específico (ej. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Ubicación del disparador flotante en pantalla (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'¿Cómo puedo ayudar...'` | Mensaje de bienvenida inicial en el panel de chat. |
| `placeholder` | `string` | `'Haz una pregunta a la IA...'` | Texto de marcador de posición del campo de entrada. |
| `suggestions` | `string[]` | Preguntas predeterminadas | Botones de indicaciones rápidas recomendadas. |
| `contextLimit` | `number` | `5` | Número máximo de fragmentos de documentación RAG pasados a la ventana de contexto del LLM. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Límite de velocidad de ventana deslizante para proteger los modelos de LLM contra el uso excesivo de API. |

## Consulta de URLs Externas y Gobernanza en el Portal Cloud

Si su documentación hace referencia a especificaciones, estándares externos o repositorios complementarios, active la lectura de URLs externas en `docmd.config.json`:

```json
{
  "plugins": {
    "ai": {
      "allowExternalUrls": true
    }
  }
}
```

### Regla de Prioridad de Cloud Relay

::: callout important title:"Prevalencia de las Políticas de Seguridad en Cloud Relay" icon:shield
Las directivas de seguridad establecidas en el portal de docmd Cloud siempre prevalecen sobre las opciones locales de `docmd.config.json`.
:::

Cuando las consultas se canalizan a través de docmd Cloud Relay, la política del proyecto en la nube determina de manera estricta si se permiten peticiones salientes:

1. Inicie sesión en [cloud.docmd.io](https://cloud.docmd.io).
2. Diríjase a **Configuración del proyecto (Project Configuration)** &rarr; **Permisos y capacidades (Permissions & Capabilities)**.
3. Active **Permitir consulta de URLs externas (Allow External URL Fetching)**.
4. Si esta opción está deshabilitada en la nube, el relay rechazará las peticiones externas aun cuando `allowExternalUrls: true` esté configurado localmente.

### Verificación Fundamentada de Documentos

El asistente comprueba de manera rigurosa la existencia de un documento antes de citarlo. Al ejecutar `read_documentation_page`:
* Se evalúa si el archivo o la URL externa responde satisfactoriamente.
* Si se produce un error 404 o el recurso no existe, el asistente informa explícitamente que la página no está disponible en lugar de inventar contenidos.

## Canalización de Recuperación Determinista y Compactación de Conversación

Para asegurar tiempos de respuesta inmediatos y evitar bucles de llamadas a herramientas, `@docmd/plugin-ai` implementa un flujo determinista:

1. **Búsqueda Orientada**: Ejecuta una única consulta concisa mediante `search_documentation`.
2. **Lectura Autorizada**: Lee íntegramente la página más relevante con `read_documentation_page`.
3. **Síntesis Directa**: Redacta una respuesta fundamentada con bloques de código comprobados y enlaces a las fuentes.

### Compactación Invisible del Historial

Para conversaciones de más de seis intercambios, el asistente compacta las rondas anteriores en resúmenes contextuales automáticos. Esto previene el desbordamiento de límites de caracteres en el relay (evitando errores por cargas superiores a 50.000 caracteres) sin perder el hilo de la conversación.

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
:::

Cuando ejecute docmd como servidor Node.js, establezca las variables de entorno antes de iniciar:

```bash
export OPENAI_API_KEY="sk-..."
# o
export ANTHROPIC_API_KEY="sk-ant-..."
# o fallback general
export AI_API_KEY="su-clave-de-api"
```

## Flujo de Ejecución de la Arquitectura

1. **Registro en Compilación**: Durante el build, `@docmd/plugin-ai` registra las acciones RPC (`ai:chat`) o inyecta el cliente del relay en la nube con su `projectId`.
2. **Generación Aumentada por Recuperación (RAG)**: Al recibir una consulta, se analiza el índice de búsqueda y se envían los fragmentos pertinentes al modelo.
3. **Transmisión de Respuestas**: Las respuestas se transmiten en tiempo real con enlaces Markdown clicables hacia las secciones citadas.