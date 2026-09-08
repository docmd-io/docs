---
title: "Visión general del despliegue"
description: "Despliega documentación estática generada por docmd en plantillas sin configuración previa, servidores web autohospedados, Docker o plataformas en la nube."
---

docmd compila sitios de documentación estática en directorios de salida independientes (por defecto: `site/`) que no requieren ningún entorno de ejecución en el servidor.

```bash
npx @docmd/core build
```

## Elegir un método de despliegue

Selecciona un patrón de despliegue según tus necesidades de infraestructura:

| Estrategia | Caso de uso principal | Destino final |
| :--- | :--- | :--- |
| **[Plantilla inicial](./starter-template)** | Creación rápida de nuevos repositorios con GitHub Actions preconfigurado. | GitHub Pages |
| **[GitHub Action](./github-action)** | Integración CI/CD automatizada para repositorios de código existentes. | GitHub Pages / CI personalizado |
| **[Herramienta CLI Deployer](./deployer)** | Generación automática de configuraciones de servidor y archivos de contenedores. | Docker, NGINX, Caddy, Vercel, Netlify |

## Plantilla inicial

El camino más rápido para proyectos de documentación independientes. Clona el repositorio de plantilla oficial que contiene un `docmd.config.json` predeterminado, páginas de muestra y un flujo de trabajo de GitHub Actions preconfigurado para despliegues automatizados con cada push.

→ [Guía de la plantilla inicial](./starter-template)

## GitHub Action

La GitHub Action `docmd-io/deploy` compila tu documentación y expone la ruta del directorio de salida para pasos de publicación posteriores. Úsala para integrar docmd en canalizaciones CI/CD existentes sin alterar la estructura de archivos del proyecto.

→ [Guía de GitHub Action](./github-action)

## Herramienta Deployer

El comando `deploy` analiza tu archivo de configuración `docmd.config.json` y genera archivos de configuración listos para producción adaptados a las preferencias de tu proyecto, enrutamiento SPA y directorios de recursos:

```bash
# Infraestructura autohospedada
npx @docmd/core deploy --docker          # Dockerfile multietapa + .dockerignore
npx @docmd/core deploy --nginx           # Configuración de NGINX para producción
npx @docmd/core deploy --caddy           # Caddyfile con HTTPS automático

# Plataformas en la nube y serverless
npx @docmd/core deploy --github-pages    # Flujo de trabajo de GitHub Actions
npx @docmd/core deploy --vercel          # Configuración vercel.json
npx @docmd/core deploy --netlify         # Configuración netlify.toml
```

→ [Referencia de la CLI Deployer](./deployer)

## Plataformas de alojamiento compatibles

* **[Imagen Docker](./docker)** — Imagen multiaquitectura oficial para entornos en contenedores.
* **[NGINX](./nginx)** — Configuración de proxy inverso autohospedado.
* **[Caddy](./caddy)** — Servidor web autohospedado con gestión automática de certificados TLS.
* **[Vercel](./vercel)** — Configuración de despliegue en la nube con optimización de recursos estáticos.
* **[Netlify](./netlify)** — Despliegue continuo respaldado por Git.
* **[Cloudflare Pages](./cloudflare-pages)** — Alojamiento de sitios estáticos en el edge con CI/CD integrado.
* **[Firebase Hosting](./firebase)** — Despliegue en la CDN global de Google con integración de GitHub Actions.

## Lista de verificación para producción

1. **URL canónica del sitio**: Especifica `url` en `docmd.config.json` para generar etiquetas canónicas precisas, URLs de Open Graph y entradas en el sitemap.
2. **Redirecciones de rutas**: Conserva rutas URL heredadas durante la migración mediante la opción `redirects`.
3. **Integración analítica**: Activa el plugin `analytics` para registrar el tráfico de visitas y métricas de búsqueda.
4. **Archivos de contexto de IA**: Activa el plugin `llms` para generar archivos `llms.txt` y `llms-full.txt` legibles por máquinas.

::: callout tip "Páginas 404 personalizadas" icon:info
docmd compila una página `404.html` independiente en la raíz de salida de tu sitio. La mayoría de los alojamientos estáticos sirven este archivo automáticamente para rutas no asignadas.
:::
