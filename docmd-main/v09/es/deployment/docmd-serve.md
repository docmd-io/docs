---
title: "Servidor de Producción (docmd serve)"
description: "Ejecute docmd como servidor de producción: compile una vez, sirva en un puerto fijo, con acciones de plugins opcionales y MCP sobre HTTP."
---

`docmd serve` compila su sitio una vez y lo sirve desde un proceso de Node.js. Es la contraparte de producción de `docmd dev`, al igual que `preview` en Vite o `start` en Next.js. Utilícelo detrás de un proxy inverso, en un contenedor o en cualquier lugar donde un alojamiento puramente estático no sea suficiente, por ejemplo, cuando un plugin necesita escribir en el sitio.

Para un sitio puramente estático, `docmd build` y cualquier servidor estático (NGINX, Caddy, Vercel, ...) siguen siendo la opción más sencilla.

```bash
npx @docmd/core serve [--host <address>] [--port <number>] [--config <path>]
```

## En qué se diferencia de `dev`

| | `docmd dev` | `docmd serve` |
| :--- | :--- | :--- |
| Compilación | Compilación de desarrollo, reconstruida en cada cambio | Compilación de producción, una sola vez al inicio |
| Monitor de archivos y recarga en vivo | Sí | No |
| Abre el navegador | Sí | No |
| Puerto en uso | Cambia al siguiente puerto disponible | Sale con código de salida 1 |
| Dirección de enlace predeterminada | `127.0.0.1` | `127.0.0.1` |
| Acciones de plugins | Activas para páginas servidas por el servidor dev | Desactivadas a menos que `serve.actions` las habilite |
| Punto final de estado (Healthcheck) | No | `GET /healthz` |

Al iniciar, `serve` primero enlaza el puerto, luego borra el directorio de salida y compila en él. Hasta que finaliza esa compilación, cada solicitud recibe `503 Service Unavailable` con `Retry-After: 1`. Se niega a iniciar si el directorio de salida contiene la raíz del proyecto o el directorio fuente, ya que tendría que eliminarlos. Los espacios de trabajo (workspaces) aún no son compatibles.

`SIGTERM` y `SIGINT` lo detienen limpiamente: las solicitudes abiertas tienen hasta 4 segundos para finalizar y luego el proceso sale con código 0. `docmd stop` también detiene los procesos `serve`.

## Host y puerto

La dirección se resuelve en este orden (la primera coincidencia gana):

1. `--host` y `--port` en la línea de comandos;
2. Las variables de entorno `DOCMD_HOST` y `PORT`;
3. `serve.host` y `serve.port` en su configuración;
4. Los valores predeterminados: `127.0.0.1` y `3000`.

Para aceptar conexiones desde otras máquinas o desde fuera de un contenedor, vincule a `0.0.0.0`:

```bash
npx @docmd/core serve --host 0.0.0.0 --port 8080
```

## Configuración

Todo el bloque `serve` es opcional. Estos son los valores predeterminados:

```json "docmd.config.json"
{
  "serve": {
    "host": "127.0.0.1",
    "port": 3000,
    "actions": { "enabled": false, "origins": [], "identityHeader": null },
    "mcp": { "enabled": false, "origins": [] }
  }
}
```

| Clave | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `host` | `127.0.0.1` | Interfaz de red para vincular. |
| `port` | `3000` | Puerto en el que escuchar. |
| `actions.enabled` | `false` | Aceptar [acciones de plugins](#acciones-de-plugins) a través de WebSocket en el mismo puerto. Solo el valor `true` las activa. |
| `actions.origins` | `[]` | Orígenes completos autorizados a abrir el socket de acciones, p. ej. `https://docs.example.com`. Requerido cuando las acciones están activas. |
| `actions.identityHeader` | `null` | Encabezado de solicitud establecido por su proxy inverso autenticador. Sin él, se rechaza cualquier escritura de una acción. |
| `mcp.enabled` | `false` | Servir las [herramientas MCP sobre HTTP](#mcp-sobre-http) en `POST /mcp`. Solo el valor `true` lo activa. |
| `mcp.origins` | `[]` | Orígenes completos autorizados a invocar `/mcp` desde un navegador. |

`build` y `dev` ignoran el bloque `serve`. `serve` lo verifica al inicio y sale con código 1, enumerando cada problema, si un origen no es un origen `http(s)` completo (no se admite `*`), si las acciones están activadas sin orígenes o si `identityHeader` no es un nombre de encabezado válido (o es `cookie`).

El banner de inicio muestra qué está activo:

```text
Local Access    http://127.0.0.1:3000
Serving from    ./site
Actions         on (origins: https://docs.example.com; writes need x-auth-request-email)
MCP             on at POST /mcp (read-only; no browser origins)
```

## Puntos finales (Endpoints)

| Ruta | Descripción |
| :--- | :--- |
| `GET`/`HEAD /healthz` | `200` con `{"status":"ok","version":"<docmd version>"}` una vez compilado el sitio; `503` antes. Úselo para comprobaciones de estado de contenedores y balanceadores de carga. |
| `POST /mcp` | MCP sobre HTTP, cuando `serve.mcp.enabled` es `true`. De lo contrario, `/mcp` es una ruta ordinaria del sitio. |
| Actualización a WebSocket | Acciones de plugins, cuando `serve.actions.enabled` es `true`. De lo contrario, `404`. |
| Todo lo demás | Su sitio compilado, desde el directorio de salida. |

## Acciones de plugins

Los plugins que declaran `requiresLiveServer` y registran `actions` (por ejemplo, [Threads](../plugins/threads)) solo funcionan mientras un servidor los aloja. En `dev` siempre es el caso. En `serve` se activa de forma explícita:

```json "docmd.config.json"
{
  "serve": {
    "actions": {
      "enabled": true,
      "origins": ["https://docs.example.com"],
      "identityHeader": "x-auth-request-email"
    }
  }
}
```

Con las acciones activadas:

* El sitio se compila con los recursos de cliente de los plugins de servidor en vivo y el puente `docmd-api.js`, que se reconecta a través de `wss://` cuando la página se sirve sobre HTTPS.
* Una actualización a WebSocket debe incluir un `Origin` listado en `origins`. Cualquier otro origen, o ninguno, recibe un `403`. Indique el origen público que utilizan sus lectores, no la dirección interna del servidor.
* Las lecturas, tareas de worker y solicitudes de recompilación están abiertas a todas las conexiones aceptadas.
* Las escrituras a través de `ctx.writeFile` y `ctx.source` requieren una identidad de confianza: se rechazan a menos que `identityHeader` esté configurado **y** la solicitud de actualización de WebSocket haya llevado ese encabezado con un valor no vacío. El valor llega al plugin como `ctx.caller.identity`.
* Los archivos escritos por una acción se recompilan y se anuncian a todos los clientes con un evento `system:rebuilt`. `serve` nunca recarga la página automáticamente por usted.

Si un plugin falla en su enlace `onServerReady`, `serve` sale con código 1 y no escucha en ningún puerto.

### Identidad detrás de un proxy inverso

docmd no tiene un sistema de inicio de sesión propio. `identityHeader` nombra un encabezado que un proxy inverso con autenticación agrega a cada solicitud, como `X-Auth-Request-Email` de oauth2-proxy o `Cf-Access-Authenticated-User-Email` de Cloudflare Access.

::: callout warning "Confíe únicamente en encabezados controlados por su proxy" icon:shield-alert
docmd no puede determinar quién configuró el encabezado. Solo es confiable cuando:

* El proxy lo establece en cada solicitud que reenvía y elimina cualquier copia enviada por el cliente;
* Los clientes no pueden alcanzar el puerto de `serve` sin pasar por el proxy (vincule a `127.0.0.1` o mantenga el puerto en una red privada).

Si alguna de estas condiciones no se cumple, cualquiera podría escribir en nombre de cualquiera. Deje `identityHeader` sin configurar y las escrituras permanecerán rechazadas.
:::

## MCP sobre HTTP

`serve.mcp.enabled: true` expone las herramientas del [servidor MCP](../reference/mcp-server) en `POST /mcp`, permitiendo que los agentes de IA busquen y lean la documentación desplegada sin necesidad de un clon local.

```json "docmd.config.json"
{
  "serve": {
    "mcp": { "enabled": true }
  }
}
```

* **Solo lectura.** Las herramientas son las mismas que en `docmd mcp`, pero nada a través de HTTP escribe en el disco: `get_llms_context` devuelve el `llms-full.txt` del sitio que se está sirviendo en lugar de reconstruirlo.
* **Misma configuración que el servidor.** Las herramientas leen el archivo con el que se inició `serve` (`--config` incluido), y `read_doc` solo devuelve Markdown dentro de su directorio fuente, nunca páginas excluidas por `exclude`.
* **Regla de origen.** Una solicitud que incluya un encabezado `Origin` (enviado por los navegadores en peticiones `POST`) debe coincidir con `mcp.origins`, o recibirá un `403`. Las solicitudes sin `Origin`, procedentes de clientes MCP que no sean navegadores, son aceptadas. Esto evita que otros sitios web invoquen las herramientas a través del navegador de un lector.
* **Transporte.** MCP sin estado sobre HTTP: una respuesta JSON por cada `POST`, soporte de lotes, sin sesiones ni flujos de eventos. El tamaño del cuerpo está limitado a 1 MiB; los métodos distintos a `POST` reciben un `405`.

El punto final no tiene autenticación propia. Si su documentación es privada, proteja `/mcp` con el mismo proxy inverso que el resto del sitio.

Conexión de un cliente, por ejemplo Claude Code:

```bash
claude mcp add --transport http docmd https://docs.example.com/mcp
```

## Docker

La [imagen oficial de Docker](./docker) ejecuta `docmd serve --host 0.0.0.0` de forma predeterminada, y su comprobación de estado invoca `/healthz`.
