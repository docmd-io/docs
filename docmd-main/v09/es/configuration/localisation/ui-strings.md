---
title: "Cadenas de UI y localización SEO"
description: "Personalice las cadenas de UI del sistema por idioma y comprenda las etiquetas meta SEO hreflang automatizadas en docmd."
---

`docmd` incluye traducciones integradas para cadenas del sistema comunes en los principales idiomas. Al configurar un idioma compatible, las etiquetas del sistema (como los marcadores de posición de búsqueda, botones de navegación y conmutadores de modo de tema) se traducen automáticamente.

Para idiomas no compatibles o frases personalizadas, el sistema recurre al inglés mientras permite anulaciones de cadenas personalizadas por idioma.

## Personalización de cadenas de interfaz de usuario

Defina etiquetas personalizadas en el objeto `translations` de cualquier configuración de idioma:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      {
        "id": "ar",
        "label": "العربية",
        "dir": "rtl",
        "translations": {
          "onThisPage": "في هذه الصفحة",
          "previous": "السابق",
          "next": "التالي",
          "search": "بحث",
          "toggleTheme": "تبديل المظهر",
          "editThisPage": "تعديل هذه الصفحة",
          "selectLanguage": "اختر اللغة",
          "selectVersion": "اختر الإصدار",
          "fallbackMessage": "هذه الصفحة غير متاحة بعد باللغة {active}. عرض اللغة الافتراضية ({default})."
        }
      }
    ]
  }
}
```

La resolución de la traducción sigue un orden de prioridad estricto: **valores predeterminados del sistema → cadenas de plugins → anulaciones de configuración**. La configuración del usuario siempre tiene la mayor prioridad.

## Claves de traducción disponibles

El conjunto completo de idiomas compatibles y claves de traducción del sistema está disponible directamente en el repositorio de código fuente principal:

**[Ver código fuente de traducciones en GitHub](external:https://github.com/docmd-io/docmd/tree/main/packages/ui/translations)**

La cadena `fallbackMessage` admite los marcadores de posición de plantilla `{active}` y `{default}`, que se sustituyen dinámicamente en el momento de la compilación con las etiquetas del idioma activo.

## Etiquetas meta SEO automatizadas (`hreflang`)

Cuando i18n está habilitado, `docmd` genera automáticamente etiquetas `<link rel="alternate" hreflang="...">` para cada página en todos los idiomas configurados. Al idioma predeterminado se le asigna la etiqueta de respaldo `x-default`:

```html
<!-- Inyectado automáticamente en los encabezados del documento HTML -->
<link rel="alternate" hreflang="en" href="/">
<link rel="alternate" hreflang="x-default" href="/">
<link rel="alternate" hreflang="hi" href="/hi/">
<link rel="alternate" hreflang="zh" href="/zh/">
```

No se requiere ninguna configuración manual; el motor inyecta estas etiquetas en todas las páginas estáticas generadas automáticamente.

::: callout info "Páginas personalizadas sin estilo" icon:info
El sistema de traducción de cadenas de la interfaz se aplica a las páginas con temas estándar. Para páginas HTML personalizadas independientes que usan `noStyle: true`, consulte las [Páginas de ejemplo sin estilo](../../content/no-style-example.md).
:::