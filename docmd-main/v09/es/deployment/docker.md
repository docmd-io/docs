---
title: "Contenedorización con Docker"
description: "Ejecuta docmd dentro de entornos en contenedores utilizando imágenes oficiales o Dockerfiles generados."
---

docmd genera recursos estáticos, lo que lo hace ideal para despliegues en contenedores. Puedes descargar la imagen oficial precompilada o generar un `Dockerfile` personalizado a través de la CLI del Deployer.

## Imagen de contenedor oficial

La imagen de contenedor precompilada compila y sirve su sitio sin necesidad de un entorno local de Node.js. Su comando predeterminado es [`docmd serve --host 0.0.0.0`](./docmd-serve): una compilación de producción, servida en el puerto 3000, con una comprobación de estado en `/healthz`. Las imágenes se publican para arquitecturas `linux/amd64` y `linux/arm64`.

### Comandos de inicio rápido

```bash
# Descargar imagen de versión fija
docker pull ghcr.io/docmd-io/docmd:0.9.0

# Compilar salida estática (monta el directorio local docs)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# Servir su documentación en modo de producción (comando predeterminado)
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0

# Servidor de desarrollo con recarga en vivo, durante la redacción
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0 dev --host 0.0.0.0
```

::: callout info "Comando predeterminado" icon:info
Las imágenes anteriores a `docmd serve` ejecutaban `dev --host 0.0.0.0` de forma predeterminada. Si dependía de la recarga en vivo sin pasar un comando, pase `dev --host 0.0.0.0` explícitamente.
:::

::: callout tip "Fijar versiones" icon:pin
Fija etiquetas de versión específicas (por ejemplo, `0.9.0`) en las canalizaciones de CI en producción para garantizar la reproducibilidad de las compilaciones.
:::

### Flujo de trabajo con Docker Compose

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.9.0
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### Comprobación de estado y puerto

El `HEALTHCHECK` de la imagen solicita `GET /healthz` en `${PORT:-3000}`. `docmd serve` responde `200` una vez que el sitio está compilado y `503` mientras se ejecuta la primera compilación. Configure `PORT` para mover el servidor y la comprobación de estado juntos:

```bash
docker run -e PORT=8080 -p 8080:8080 ghcr.io/docmd-io/docmd:0.9.0
```

En Kubernetes, apunte los sondeos de inicio y de disponibilidad a `/healthz`. `serve` escribe el sitio compilado en `/docs`, así que móntelo desde un volumen con permisos de escritura, no directamente desde un ConfigMap.

### Especificaciones de la imagen

| Propiedad | Especificaciones |
| :--- | :--- |
| **Sistema operativo base** | Alpine Linux |
| **Mapeo de identidad de usuario** | Remapea la identidad root del contenedor al UID/GID del anfitrión mediante `su-exec` automáticamente. |
| **Directorio de trabajo predeterminado** | `/docs` (personalizable mediante la opción `-w`). |
| **Arquitecturas** | `linux/amd64`, `linux/arm64` |

### Directorio de trabajo y permisos personalizados

El punto de entrada detecta automáticamente el UID y GID del propietario para los volúmenes montados y reduce los privilegios antes de ejecutar los comandos `init`, `build`, `serve` o `dev`. Los archivos escritos en los montajes del anfitrión conservan la propiedad del usuario anfitrión.

```bash
docker run -v $(pwd):/workspace -w /workspace ghcr.io/docmd-io/docmd:0.9.0 init
```

## Dockerfile multietapa generado

Genera un `Dockerfile` personalizado utilizando la [CLI del Deployer](./deployer):

```bash
npx @docmd/core deploy --docker
```

El `Dockerfile` multietapa generado realiza:
1. **Etapa de compilación**: Instala la versión fijada de `@docmd/core` y compila los recursos estáticos HTML/CSS/JS.
2. **Etapa de servicio**: Copia la salida compilada en una imagen ligera de `nginx:alpine`.

Para generar las configuraciones de Docker y NGINX conjuntamente:

```bash
npx @docmd/core deploy --docker --nginx
```

### Compilación y ejecución del contenedor

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Accede al sitio servido en `http://localhost:8080`.
