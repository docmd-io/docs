---
title: "Despliegue con NGINX"
description: "Despliega documentación estática compilada con docmd en servidores web NGINX."
---

NGINX proporciona una entrega de archivos estáticos de alto rendimiento para las compilaciones de docmd.

## Generación del manifiesto

Genera un archivo `nginx.conf` preconfigurado adaptado a los ajustes de tu proyecto:

```bash
npx @docmd/core deploy --nginx
```

La configuración generada incluye:

* **`server_name`**: Extraído de la propiedad `url` en `docmd.config.json` (por defecto `localhost`).
* **Reserva SPA**: Incluye `try_files $uri $uri/ /index.html;` condicionalmente cuando `layout.spa: true`.
* **Seguridad y compresión**: Configura compresión GZIP y cabeceras de seguridad (`X-Content-Type-Options`, `X-Frame-Options`).

## Estructura de la configuración

```nginx "nginx.conf"
server {
    listen 80;
    server_name docs.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Cabeceras de seguridad
    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Compresión GZIP
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;

    # Reserva de enrutamiento SPA (condicional según layout.spa)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Controlador de 404 personalizado
    error_page 404 /404.html;

    # Almacenamiento en caché de recursos estáticos (6 meses, inmutable)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Pasos de despliegue

1. Compila el sitio: `npx @docmd/core build`
2. Transfiere los recursos compilados (`site/`) a la raíz web de tu servidor (por ejemplo, `/var/www/html/` o `/usr/share/nginx/html/`).
3. Copia `nginx.conf` a `/etc/nginx/conf.d/default.conf`.
4. Recarga NGINX: `sudo systemctl reload nginx`

::: callout tip "Regeneración" icon:refresh-cw
Al actualizar `url` o `layout.spa` en `docmd.config.json`, vuelve a ejecutar `npx @docmd/core deploy --nginx --force` para sincronizar los cambios de configuración.
:::
