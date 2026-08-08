---
title: "Consentimiento de cookies"
description: "Configure el diálogo accesible de consentimiento de cookies GDPR de docmd con expiración personalizada, localización e integraciones de CustomEvent."
---

`docmd` incluye un banner de consentimiento de cookies GDPR accesible y sin dependencias integrado directamente en el motor de la interfaz de usuario. Almacena las preferencias del usuario en `localStorage` con TTL configurable y emite un evento DOM personalizado para activadores de scripts de analítica.

## Configuración rápida

Habilite el consentimiento de cookies en su manifiesto `docmd.config.json`:

```json "docmd.config.json"
{
  "cookie": {
    "enabled": true,
    "message": "Utilizamos cookies para garantizar que obtenga la mejor experiencia.",
    "policyUrl": "/privacy",
    "position": "bottom-right"
  }
}
```

El banner se muestra en la visita inicial. Las preferencias de elección se persisten en el almacenamiento local del navegador a través de las cargas de página.

## Referencia de configuración

| Campo | Predeterminado | Descripción |
| :--- | :--- | :--- |
| `enabled` | `true` (cuando existe el objeto `cookie`) | Interruptor principal para el banner de consentimiento. |
| `message` | Clave de traducción `cookieMessage` | Texto principal para el aviso de cookies. Admite HTML integrado. |
| `acceptText` | Clave de traducción `cookieAccept` | Etiqueta del botón Aceptar. |
| `declineText` | Clave de traducción `cookieDecline` | Etiqueta del botón Rechazar. |
| `policyUrl` | `null` | Enlace opcional a su página de política de privacidad. |
| `position` | `"bottom"` | Posición del modal (`"bottom"`, `"bottom-left"`, `"bottom-right"`, `"center"`). |
| `dismissible` | `true` | Cuando es `true`, renderiza un botón de cierre (X). |
| `expiryDays` | `180` | Número de días antes de que las elecciones de consentimiento expiren en `localStorage`. |

### Modos de posición

| Valor | Comportamiento de renderizado |
| :--- | :--- |
| `bottom` | Centrado horizontalmente a lo largo del borde inferior de la ventana gráfica. |
| `bottom-left` | Anclado a la esquina inferior izquierda de la ventana gráfica. |
| `bottom-right` | Anclado a la esquina inferior derecha de la ventana gráfica. |
| `center` | Superposición de modal flotante centrado. |

## Localización (i18n)

Todas las cadenas orientadas al usuario admiten el sistema de traducción de `docmd`. Anule las claves de consentimiento en sus archivos `translations/<locale>.json`:

```json "translations/fr.json"
{
  "cookieMessage": "Esta página utiliza cookies para ofrecerle la mejor experiencia.",
  "cookieAccept": "Aceptar",
  "cookieDecline": "Rechazar",
  "cookiePolicy": "Política de privacidad",
  "cookieConsent": "Consentimiento de cookies"
}
```

## Reacción a eventos de consentimiento del usuario

Se envía un `CustomEvent` llamado `docmd:cookie-consent` en el objeto `window` cuando un usuario acepta, rechaza o descarta el banner:

```javascript
window.addEventListener('docmd:cookie-consent', (event) => {
  if (event.detail.value === 'accept') {
    // Inicializar scripts de analítica, marketing o seguimiento
  }
});
```

La propiedad `detail.value` devuelve `"accept"`, `"decline"` o `"dismissed"`.

## Estilos y temas personalizados

El banner utiliza nombres de clase BEM con el prefijo `.docmd-cookie-banner`. Personalice los estilos a través de reglas CSS personalizadas:

```css
.docmd-cookie-banner {
  --accent-color: #ff5a5f;
  border-radius: 16px;
}
.docmd-cookie-banner__btn--accept {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}
```

## Desactivación del consentimiento de cookies

Para desactivar el banner de cookies, omita o elimine el bloque de configuración `cookie` de `docmd.config.json`.

::: callout tip "Mejor práctica de cumplimiento del RGPD" icon:shield-check
Para el cumplimiento del RGPD, mantenga habilitado el consentimiento de cookies y proporcione un enlace a su política de privacidad a través de `policyUrl`.
:::