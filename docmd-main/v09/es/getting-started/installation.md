---
title: "Instalación"
description: "Instale @docmd/core globalmente, localmente dentro de un proyecto, o ejecútelo en contenedor mediante la imagen oficial de Docker. Requiere Node.js 20+."
---

Elija el método de instalación que se adapte a su flujo de trabajo. Se requiere Node.js 20 o superior para compilaciones locales.

## 1. Instalación local (Recomendada)

Ejecutar `docmd` localmente mantiene la configuración de su documentación versionada directamente con su código fuente.

::: tabs
== tab "npm" icon:box
```bash
# Instalar como dependencia de desarrollo
npm install -D @docmd/core

# Inicializar un nuevo proyecto
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# Instalar como dependencia de desarrollo
pnpm add -D @docmd/core

# Inicializar un nuevo proyecto
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# Instalar como dependencia de desarrollo
yarn add -D @docmd/core

# Inicializar un nuevo proyecto
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# Instalar como dependencia de desarrollo
bun add -D @docmd/core

# Inicializar un nuevo proyecto
bunx docmd init
```
== tab "Docker" icon:container
```bash
# Descargar la imagen oficial multiarquitectura
docker pull ghcr.io/docmd-io/docmd:latest

# Compilar documentación desde docs/ local a site/
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

Consulte la [Guía de despliegue con Docker](../deployment/docker.md) para configuraciones de Docker Compose y Kubernetes.
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Scripts abreviados" icon:sparkles
Una vez instalado localmente, puede usar `npx docmd dev` para iniciar el servidor de vista previa en vivo, o agregar scripts de compilación directamente a su `package.json`.
:::

## 2. Instalación global

Instale el paquete globalmente para crear o ver sitios de forma previa en cualquier lugar de su sistema sin crear un proyecto local.

::: tabs
== tab "npm" icon:box
```bash
npm install -g @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -g @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn global add @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -g @docmd/core
```
:::

Una vez instalado, el binario `docmd` está disponible globalmente:

```bash
docmd dev   # Iniciar un servidor de desarrollo local
docmd build # Compilar salida de sitio estático
```

## 3. Integración solo para navegador

Incruste el motor de renderizado directamente dentro de una aplicación web existente a través de CDN.

::: callout info "Integración de biblioteca especializada" icon:help-circle
Esto omite la CLI y carga el motor de análisis directamente en el navegador. Úselo para portales dinámicos y renderizado interactivo en el cliente en lugar de sitios web estáticos para SEO.
:::

Agregue la hoja de estilos y el motor JavaScript a su encabezado HTML.

```html
<!-- Hoja de estilos principal -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Motor de renderizado isomórfico -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

Consulte la [Guía de API de navegador](../reference/browser-api.md) para obtener detalles completos de integración.

## 4. Solución de problemas

### Permiso denegado (Errores `EACCES`)
No use `sudo` para instalaciones globales en macOS o Linux. Solucione los conflictos de permisos utilizando un administrador de versiones de Node.js como [nvm](external:https://github.com/nvm-sh/nvm) o [fnm](external:https://github.com/Schniz/fnm).

### Políticas de ejecución de PowerShell (Windows)
Si Windows bloquea la ejecución de comandos, abra PowerShell como administrador y habilite la ejecución de scripts para el usuario actual.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
