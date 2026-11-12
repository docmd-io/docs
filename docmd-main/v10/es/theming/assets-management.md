---
title: "Gestión de recursos"
description: "Descubra cómo docmd replica archivos CSS, JavaScript e imágenes desde sus directorios de origen hacia el sitio compilado."
---

`docmd` emplea una arquitectura de replicación directa para los recursos estáticos. Esto asegura que las rutas de archivos utilizadas durante el desarrollo local coincidan fielmente con las del sitio compilado final.

## Estructura de directorios

Por defecto, `docmd` procesa un directorio `assets/` ubicado en la raíz de su proyecto:

```bash
mi-documentacion/
  ├── assets/          # Recursos fuente (Imágenes, Tipografías, CSS, JS)
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Archivos de contenido en Markdown
  ├── docmd.config.json
  └── site/            # Salida compilada de producción (Replicada automáticamente)
```

## Replicación automática de recursos

Al ejecutar `npx @docmd/core build` o `npx @docmd/core dev`:

1. **Lógica de replicación**: Todo el contenido de `assets/` se copia recursivamente en `site/assets/`.
2. **Estabilidad en compilación**: La copia de recursos se apoya en un motor asíncrono con reintentos progresivos para evitar bloqueos del sistema de archivos en macOS y discos SSD.
3. **Referencias en enlaces**: Vincule sus recursos en Markdown y en la configuración mediante rutas **relativas a la raíz**:
    ```markdown
    ![Diagrama de arquitectura](/assets/images/architecture.png)
    ```

## Integración de CSS y JS personalizados

Enlace hojas de estilo o scripts adicionales en todas las páginas mediante la configuración del tema en `docmd.config.json`:

```json "docmd.config.json"
{
  "theme": {
    "customCss": ["/assets/css/branding.css"],
    "customJs": ["/assets/js/analytics.js"]
  }
}
```

::: callout tip "Organización para indexadores de IA" icon:lightbulb
* **Subdirectorios dedicados**: Separe `/css`, `/js` e `/images`. Una jerarquía limpia permite a los agentes de IA localizar activos específicos sin confusión.
* **Nombres descriptivos**: Asignar nombres como `authentication-flow-diagram.png` aporta valioso contexto a los indexadores y rastreadores de `llms.txt` en comparación con nombres genéricos como `image1.png`.
:::

## Recursos públicos y estáticos de raíz (`public/`)

Para aquellos archivos que deben residir directamente en la raíz de su sitio web y no bajo `/assets/` (como `robots.txt`, `CNAME`, `funding.json`, favicons o manifiestos a nivel de dominio), `docmd` incorpora una canalización de **Public Root Assets** de primer nivel.

### Detección automática (Zero-Config)

Basta con crear un directorio `public/` en la raíz de su proyecto (o dentro de su carpeta de contenido `docs/`):

```bash
mi-documentacion/
  ├── public/                  # Recursos estáticos de raíz (Zero-Config)
  │   ├── CNAME                # -> https://example.com/CNAME
  │   ├── robots.txt           # -> https://example.com/robots.txt
  │   ├── funding.json         # -> https://example.com/funding.json
  │   ├── .well-known/
  │   │   └── funding.json     # -> https://example.com/.well-known/funding.json
  │   └── work/
  │       └── fund.json        # -> https://example.com/work/fund.json
  ├── assets/                  # Recursos web (Replicados a /assets/)
  ├── docs/                    # Documentación Markdown
  ├── docmd.config.json
  └── site/                    # Salida compilada final
```

Todos los archivos y carpetas anidadas dentro de `public/` se transfieren automáticamente a la raíz de la salida compilada (`site/`), manteniendo su estructura intacta.

### Configuración personalizada (`static`)

Puede definir qué archivos o directorios se copian en la raíz empleando la propiedad `static` en `docmd.config.json`:

```json "docmd.config.json"
{
  "static": ["work", "funding.json", "CNAME"]
}
```

* **Preserva la jerarquía de carpetas**: Especificar un directorio como `"work"` lo mantiene íntegro bajo `site/work/...` (por ejemplo, `work/fund.json` se resuelve como `https://example.com/work/fund.json`).
* **Entrada única o múltiple**: Proporcione un texto o un arreglo con las rutas de directorios o archivos individuales.
* **Compilación segura (a prueba de fallos)**: Si una ruta configurada no existe en disco, `docmd` muestra un aviso en el registro (`[static] Configured path "..." does not exist, skipping.`) y completa la compilación con éxito sin detenerse.
* **Desactivación**: Si desea desactivar por completo la copia de recursos estáticos en la raíz, configure `"static": false`.

### Actualización en vivo con el servidor de desarrollo

Durante el desarrollo local con `docmd dev`, el servidor supervisa automáticamente `public/` y cualquier directorio estático configurado. Cualquier archivo creado, editado o eliminado reactiva de inmediato la compilación y actualiza su navegador.
