---
title: "Deployer"
description: "Genera configuraciones de despliegue para producción para Docker, NGINX, Caddy, Vercel y Netlify directamente desde docmd.config.json."
---

El comando `npx @docmd/core deploy` analiza la configuración de tu proyecto en `docmd.config.json` y genera manifiestos de despliegue específicos para cada proveedor. Las rutas de salida, nombres de host y reglas de reserva de SPA se inyectan automáticamente.

## Indicadores de destino de despliegue compatibles

| Plataforma de destino | Indicador del comando | Archivos de salida generados |
| :--- | :--- | :--- |
| **Contenedor Docker** | `--docker` | `Dockerfile`, `.dockerignore` |
| **Servidor web NGINX** | `--nginx` | `nginx.conf` |
| **Servidor web Caddy** | `--caddy` | `Caddyfile` |
| **CI de GitHub Pages** | `--github-pages` | `.github/workflows/deploy.yml` |
| **Vercel** | `--vercel` | `vercel.json` |
| **Netlify** | `--netlify` | `netlify.toml` |

## Ejemplos de uso

Ejecuta el comando del deployer desde la raíz de tu proyecto:

```bash
# Generación para un único proveedor
npx @docmd/core deploy --github-pages

# Generar configuraciones de Docker y NGINX simultáneamente
npx @docmd/core deploy --docker --nginx

# Sobrescribir archivos de configuración preexistentes
npx @docmd/core deploy --vercel --force
```

## Inyecciones de configuración

El deployer lee tus parámetros de configuración y personaliza las plantillas generadas:

| Propiedad de configuración | Uso en la salida generada |
| :--- | :--- |
| `title` | Comentarios de cabecera en los manifiestos generados. |
| `out` | Directivas `COPY` en el Dockerfile; rutas `root` en NGINX y Caddy. |
| `url` | `server_name` en NGINX; bloques de sitio en Caddy. |
| `layout.spa` | Controla reglas condicionales de reescritura de reserva para SPA. |

Si no se encuentra un `docmd.config.json`, el deployer evalúa los valores predeterminados sin configuración estándar.

## Protección contra sobrescritura

Por defecto, los archivos de despliegue existentes se conservan y se omiten mostrando un aviso. Pasa el indicador `--force` para sobrescribir los archivos de configuración existentes.

## Detalles de plataformas de destino

### Flujo de trabajo CI para GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Genera `.github/workflows/deploy.yml` que contiene un flujo de trabajo de GitHub Actions que descarga el repositorio, instala Node.js, ejecuta `npx @docmd/core build` y sube la salida estática a GitHub Pages.

::: callout tip "Alternativa con GitHub Action" icon:github
Si prefieres una acción preempaquetada sin necesidad de mantener archivos de flujo de trabajo locales, utiliza la acción oficial [`docmd-io/deploy`](./github-action).
:::

### Contenedorización con Docker

```bash
npx @docmd/core deploy --docker
```

Genera un `Dockerfile` multietapa:
1. **Etapa de compilación**: Instala la versión fijada de `@docmd/core` y compila los recursos estáticos.
2. **Etapa de servicio**: Copia los recursos de salida en una imagen mínima de `nginx:alpine`.

Si existe un archivo `nginx.conf` en la raíz del proyecto, el Dockerfile incluye automáticamente la directiva `COPY nginx.conf /etc/nginx/conf.d/default.conf`.

::: callout tip "Imagen de contenedor oficial" icon:container
Para ejecutar docmd directamente en canalizaciones en contenedores sin compilar imágenes personalizadas, consulta la [Guía de la imagen Docker](./docker).
:::

### Configuración de NGINX

```bash
npx @docmd/core deploy --nginx
```

Genera `nginx.conf` configurado con cabeceras de seguridad, compresión GZIP, almacenamiento en caché inmutable para recursos estáticos y reglas de reserva para SPA.

### Servidor Caddy

```bash
npx @docmd/core deploy --caddy
```

Genera un `Caddyfile` con gestión automática de certificados HTTPS y entrega de archivos estáticos.

### Despliegue en Vercel

```bash
npx @docmd/core deploy --vercel
```

Genera `vercel.json` con comandos de compilación estática, enrutamiento de salida y cabeceras de almacenamiento en caché para recursos.

### Despliegue en Netlify

```bash
npx @docmd/core deploy --netlify
```

Genera `netlify.toml` con comandos de compilación, directorios de publicación y reglas de redirección para SPA.
