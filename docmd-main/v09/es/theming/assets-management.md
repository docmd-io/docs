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
    "customCss": ["/assets/css/branding.css"]
  },
  "customJs": ["/assets/js/analytics.js"]
}
```

::: callout tip "Organización para indexadores de IA" icon:lightbulb
* **Subdirectorios dedicados**: Separe `/css`, `/js` e `/images`. Una jerarquía limpia permite a los agentes de IA localizar activos específicos sin confusión.
* **Nombres descriptivos**: Asignar nombres como `authentication-flow-diagram.png` aporta valioso contexto a los indexadores y rastreadores de `llms.txt` en comparación con nombres genéricos como `image1.png`.
:::
