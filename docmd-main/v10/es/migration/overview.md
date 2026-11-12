---
title: "Visión general de la migración"
description: "Aprende cómo migrar fácilmente tu proyecto de documentación existente a docmd utilizando el motor de migración de CLI integrado."
---

`docmd` proporciona un **motor de migración** automatizado que transfiere tu documentación desde plataformas heredadas con un solo comando. El motor elimina el copiado manual de archivos y la reestructuración de directorios.

## Cómo funciona

::: steps

1. **Detectar configuración de origen**: El motor identifica los archivos de configuración de frameworks existentes (por ejemplo, `docusaurus.config.js`, `mkdocs.yml`, `.vitepress/config.js` o `astro.config.mjs`).
2. **Extraer metadatos y estructura del proyecto**: Las propiedades esenciales del sitio como `title`, rutas de salida y bloques de navegación de nivel superior se extraen automáticamente.
3. **Proteger archivos existentes**: Tu directorio de proyecto original (excluyendo `node_modules`, `.git`, `package.json` y archivos de bloqueo de gestores de paquetes) se respalda de forma segura en un directorio `*-backup/`.
4. **Restaurar contenido de documentación**: El contenido fuente de Markdown se extrae y se mueve al directorio raíz estándar `docs/` de `docmd`.
5. **Generar `docmd.config.json`**: Se genera un `docmd.config.json` nuevo con las opciones extraídas directamente de tu configuración original.

:::

::: callout tip "Vista previa de migración sin cambios (Dry Run)" icon:help-circle
Añade `--dry-run` a cualquier comando de migración para previsualizar los movimientos de archivos planificados y la configuración generada sin escribir cambios en el disco:
```bash
npx @docmd/core migrate --docusaurus --dry-run
```
:::

Puedes ejecutar `npx @docmd/core dev` inmediatamente después de la migración para ver tu sitio.

## Matriz de compatibilidad en la migración de características

| Característica | Soporte automatizado | Detalles |
| :--- | :---: | :--- |
| **Archivos Markdown** | ✅ Sí | Mueve todo el contenido `.md` y `.mdx` a `docs/` |
| **Estructura de directorios** | ✅ Sí | Preserva la jerarquía de carpetas existente |
| **Metadatos del sitio** | ✅ Sí | Extrae el `title` del sitio y directorios de salida |
| **Sintaxis de contenedores** | ✅ Sí | Compatibilidad nativa con contenedores de avisos de VitePress y Docusaurus |
| **Navegación / Barra lateral** | ⚠️ Parcial | Traduce automáticamente bloques `nav:` de MkDocs; otros frameworks requieren `navigation.json` |
| **Localización (i18n)** | ⚠️ Manual | Requiere mapear los códigos de idioma de directorios en `docmd.config.json` |
| **Control de versiones** | ⚠️ Manual | Requiere ubicar el contenido versionado en subdirectorios `vXX/` |
| **Componentes de React / Vue** | ❌ Manual | Los componentes de framework deben reemplazarse con contenedores nativos de `docmd` |

::: callout success "Compatibilidad con la sintaxis de contenedores" icon:check-circle
La sintaxis de contenedores de **VitePress** (`:::tip`, `:::warning`, `:::danger`, `:::info`, `:::details`) y de **Docusaurus** (`:::note`, `:::caution`) funciona de inmediato sin modificaciones. Las llamadas de atención existentes se renderizan sin edición manual.

**MkDocs** utiliza la sintaxis `!!!`, que requiere convertirse al formato estándar `:::`.
:::

## Configuración de navegación y localización

Dado que cada framework estructura las barras laterales de navegación, traducciones y versiones múltiples de forma diferente, `docmd` mueve tu contenido de forma segura para que puedas configurar la navegación y la internacionalización (i18n) utilizando el esquema JSON de `docmd`:

- **Navegación:** Aprende cómo definir enlaces de la barra lateral en la [Guía de navegación](../configuration/navigation.md).
- **Localización:** Configura documentación multilingüe en la [Guía de localización](../configuration/localisation/index.md).
- **Control de versiones:** Estructura documentación versionada en la [Configuración de versiones](../configuration/versioning.md).

## Destinos de migración compatibles

::: grids
    ::: grid
        ::: card "Docusaurus" icon:arrow-right-left
        Migra desde sitios de documentación de React con Docusaurus v2/v3.
        [Leer guía](./docusaurus.md)
        :::
    :::
    ::: grid
        ::: card "MkDocs" icon:arrow-right-left
        Migra desde proyectos en Python con MkDocs y Material for MkDocs.
        [Leer guía](./mkdocs.md)
        :::
    :::
    ::: grid
        ::: card "VitePress" icon:arrow-right-left
        Migra desde configuraciones de documentación de VitePress impulsadas por Vue.
        [Leer guía](./vitepress.md)
        :::
    :::
    ::: grid
        ::: card "Astro Starlight" icon:arrow-right-left
        Migra desde proyectos basados en el framework Astro Starlight.
        [Leer guía](./starlight.md)
        :::
    :::
:::
