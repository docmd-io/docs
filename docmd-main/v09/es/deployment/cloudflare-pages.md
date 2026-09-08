---
title: "Despliegue en Cloudflare Pages"
description: "Despliega sitios de documentación estática de docmd en el alojamiento edge de Cloudflare Pages."
---

[Cloudflare Pages](https://pages.cloudflare.com/) aloja sitios de documentación estática de docmd en toda la red edge global de Cloudflare con integración CI/CD de Git incorporada.

## Pasos de configuración en el panel de control

1. Navega a **Workers & Pages → Create → Pages** en el panel de control de Cloudflare.
2. Vincula la cuenta de tu proveedor de Git y selecciona el repositorio de destino.
3. Configura las variables de compilación:

| Parámetro de ajuste | Valor de configuración |
| :--- | :--- |
| **Ajuste preestablecido de framework** | `None` |
| **Comando de compilación** | `npx @docmd/core build` |
| **Directorio de salida de compilación** | `site` |

4. Guarda y despliega.

## Configuración de dominios personalizados

Añade dominios personalizados en **Pages → Project → Custom domains**. Los certificados TLS se aprovisionan automáticamente.

Establece la propiedad `url` en `docmd.config.json` para que coincida con tu dominio:

```json "docmd.config.json"
{
  "url": "https://docs.example.com"
}
```

::: callout info "Ejecución de la compilación en CI/CD" icon:info
Al ejecutar `npx @docmd/core build` en entornos de compilación de Cloudflare se descarga `@docmd/core` bajo demanda. Si `@docmd/core` figura en las `devDependencies` de tu `package.json`, Cloudflare utiliza la versión instalada automáticamente.
:::
