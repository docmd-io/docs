---
title: "Despliegue con servidor Caddy"
description: "Despliega documentación de docmd utilizando el servidor web Caddy con aprovisionamiento automático de certificados TLS."
---

[Caddy](https://caddyserver.com/) proporciona alojamiento de archivos estáticos con aprovisionamiento automatizado de HTTPS a través de Let's Encrypt.

## Generación de Caddyfile

Genera un `Caddyfile` preconfigurado con los parámetros de tu proyecto:

```bash
npx @docmd/core deploy --caddy
```

El deployer configura:
* **Dirección del host**: Inyecta el nombre de dominio a partir de `config.url`.
* **Directorio raíz**: Apunta a `config.out` (`./site`).
* **Reglas SPA**: Añade directivas `try_files` condicionalmente cuando `layout.spa: true`.

## Esquema de configuración

```caddy "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # Reserva SPA (condicional según layout.spa)
    try_files {path} {path}/ /index.html

    # Cabeceras de seguridad
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Enrutamiento de 404 personalizado
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Caché de recursos estáticos
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

## Ejecución del despliegue

1. Compila la salida estática: `npx @docmd/core build`
2. Transfiere los recursos compilados y el `Caddyfile` al servidor de destino.
3. Inicia Caddy: `caddy run --config Caddyfile`

::: callout tip "Certificados TLS automáticos" icon:shield-check
Al especificar un dominio público en `url`, Caddy aprovisiona y renueva certificados TLS automáticamente sin necesidad de scripts externos.
:::
