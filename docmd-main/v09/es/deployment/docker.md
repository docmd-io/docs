---
title: "Contenedorización con Docker"
description: "Ejecuta docmd dentro de entornos en contenedores utilizando imágenes oficiales o Dockerfiles generados."
---

docmd genera recursos estáticos, lo que lo hace ideal para despliegues en contenedores. Puedes descargar la imagen oficial precompilada o generar un `Dockerfile` personalizado a través de la CLI del Deployer.

## Imagen de contenedor oficial

La imagen de contenedor precompilada permite compilar sitios y previsualizarlos localmente sin necesidad de instalar Node.js en el sistema anfitrión. Las imágenes se publican para arquitecturas `linux/amd64` y `linux/arm64`.

### Comandos de inicio rápido

```bash
# Descargar imagen de versión fija
docker pull ghcr.io/docmd-io/docmd:0.9.0

# Compilar salida estática (monta el directorio local docs)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# Iniciar servidor de previsualización local
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0
```

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

### Especificaciones de la imagen

| Propiedad | Especificaciones |
| :--- | :--- |
| **Sistema operativo base** | Alpine Linux |
| **Mapeo de identidad de usuario** | Remapea la identidad root del contenedor al UID/GID del anfitrión mediante `su-exec` automáticamente. |
| **Directorio de trabajo predeterminado** | `/docs` (personalizable mediante la opción `-w`). |
| **Arquitecturas** | `linux/amd64`, `linux/arm64` |

### Directorio de trabajo y permisos personalizados

El punto de entrada detecta automáticamente el UID y GID del propietario para los volúmenes montados y reduce los privilegios antes de ejecutar los comandos `init`, `build` o `dev`. Los archivos escritos en los montajes del anfitrión conservan la propiedad del usuario anfitrión.

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
