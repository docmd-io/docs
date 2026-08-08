---
title: "Cookie Consent"
description: "Configure docmd's accessible GDPR cookie consent dialog with custom expiration, localisation, and CustomEvent integrations."
---

`docmd` includes an accessible, zero-dependency GDPR cookie consent banner built directly into the UI engine. It stores user preferences in `localStorage` with configurable TTL and emits a custom DOM event for analytics script triggers.

## Quick Setup

Enable cookie consent in your `docmd.config.json` manifest:

```json "docmd.config.json"
{
  "cookie": {
    "enabled": true,
    "message": "We use cookies to ensure you get the best experience.",
    "policyUrl": "/privacy",
    "position": "bottom-right"
  }
}
```

The banner displays on initial visit. Choice preferences are persisted in local browser storage across page loads.

## Configuration Reference

| Field | Default | Description |
| :--- | :--- | :--- |
| `enabled` | `true` (when `cookie` object exists) | Master toggle for the consent banner. |
| `message` | Translation key `cookieMessage` | Body text for the cookie prompt. Supports inline HTML. |
| `acceptText` | Translation key `cookieAccept` | Accept button label. |
| `declineText` | Translation key `cookieDecline` | Decline button label. |
| `policyUrl` | `null` | Optional link to your privacy policy page. |
| `position` | `"bottom"` | Modal position (`"bottom"`, `"bottom-left"`, `"bottom-right"`, `"center"`). |
| `dismissible` | `true` | When `true`, renders a close (X) button. |
| `expiryDays` | `180` | Number of days before consent choices expire in `localStorage`. |

### Position Modes

| Value | Rendering Behaviour |
| :--- | :--- |
| `bottom` | Centered horizontally along the bottom edge of the viewport. |
| `bottom-left` | Anchored to the bottom-left corner of the viewport. |
| `bottom-right` | Anchored to the bottom-right corner of the viewport. |
| `center` | Centered floating modal overlay. |

## Localisation (i18n)

All user-facing strings support `docmd`'s translation system. Override consent keys in your `translations/<locale>.json` files:

```json "translations/fr.json"
{
  "cookieMessage": "Cette page utilise des cookies pour vous offrir la meilleure expérience.",
  "cookieAccept": "Accepter",
  "cookieDecline": "Refuser",
  "cookiePolicy": "Politique de confidentialité",
  "cookieConsent": "Consentement aux cookies"
}
```

## Reacting to User Consent Events

A `CustomEvent` named `docmd:cookie-consent` is dispatched on the `window` object when a user accepts, declines, or dismisses the banner:

```javascript
window.addEventListener('docmd:cookie-consent', (event) => {
  if (event.detail.value === 'accept') {
    // Initialise analytics, marketing, or tracking scripts
  }
});
```

The `detail.value` property returns `"accept"`, `"decline"`, or `"dismissed"`.

## Custom Styling & Themes

The banner uses BEM class naming prefixed with `.docmd-cookie-banner`. Customise styling via custom CSS rules:

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

## Disabling Cookie Consent

To disable the cookie banner, omit or remove the `cookie` configuration block from `docmd.config.json`.

::: callout tip "GDPR Compliance Best Practice" icon:shield-check
For GDPR compliance, keep cookie consent enabled and provide a link to your privacy policy via `policyUrl`.
:::