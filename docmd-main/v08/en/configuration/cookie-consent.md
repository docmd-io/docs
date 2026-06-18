---
title: "Cookie Consent"
description: "Opt-in cookie consent dialog shipped with the default UI. Stores the user's choice in localStorage, supports translations, and emits a docmd:cookie-consent CustomEvent so plugins and templates can react."
---

# Cookie Consent

> **New in 0.8.7.** The cookie consent dialog is a built-in feature of the default `@docmd/ui` package. No plugin install required. **Opt-in** — nothing is rendered unless you set `config.cookie`.

A minimal, accessible GDPR-style consent dialog. The user's choice is persisted in `localStorage` with a configurable TTL. A `docmd:cookie-consent` `CustomEvent` fires on `window` after a choice is made so plugins and templates can react (e.g. enable analytics, load third-party scripts).

## Enable in 30 seconds

```json
{
  "cookie": {
    "enabled": true,
    "message": "We use cookies to ensure you get the best experience.",
    "policyUrl": "/privacy",
    "position": "bottom-right"
  }
}
```

Build, and the dialog appears on first visit. Subsequent visits respect the stored choice.

## Configuration reference

| Field | Default | Description |
|---|---|---|
| `enabled` | `true` (when `cookie` object is present) | Master switch. |
| `message` | Translation key `cookieMessage` | Dialog body text. Inline HTML allowed via the `t()` helper. |
| `acceptText` | Translation key `cookieAccept` | Accept button label. |
| `declineText` | Translation key `cookieDecline` | Decline button label. |
| `policyUrl` | `null` | Optional link to your privacy policy. |
| `position` | `"bottom"` | `"bottom"` \| `"bottom-left"` \| `"bottom-right"` \| `"center"` |
| `dismissible` | `true` | Show an "X" close button. |
| `expiryDays` | `180` | How long the choice is remembered in `localStorage`. |

### Position values

| Value | Effect |
|---|---|
| `bottom` | Centered horizontally along the bottom edge. |
| `bottom-left` | Anchored to the bottom-left corner. |
| `bottom-right` | Anchored to the bottom-right corner. |
| `center` | Centered modal. |

## Localisation

All user-facing strings support the existing `t(key)` translation system. Override the keys in your `translations/<locale>.json` files:

```json
{
  "cookieMessage": "Cette page utilise des cookies pour vous offrir la meilleure expérience.",
  "cookieAccept": "Accepter",
  "cookieDecline": "Refuser",
  "cookiePolicy": "Politique de confidentialité",
  "cookieConsent": "Consentement aux cookies"
}
```

Templates may supply their own copy via `translations(localeId)` on their plugin descriptor; that path is unchanged from previous releases.

## Reacting to a choice

A `CustomEvent` named `docmd:cookie-consent` is dispatched on `window` after the user accepts, declines, or dismisses:

```js
window.addEventListener('docmd:cookie-consent', (e) => {
  if (e.detail.value === 'accept') {
    // Load analytics, marketing scripts, etc.
  }
});
```

The `detail.value` is one of `"accept"`, `"decline"`, or `"dismissed"`. If you need to read the choice synchronously (e.g. before any other script runs), `localStorage.getItem('docmd-cookie-consent')` returns the same payload.

## Re-styling

The dialog is built from BEM-style classes on the `.docmd-cookie-banner` root. Re-skin it via `customCss` (always wins at priority 15):

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

Templates can re-style the dialog by overriding `templates/partials/cookie-consent.ejs` in their package. The defaults ship from `@docmd/ui`.

## Disabling

To remove the dialog entirely, simply remove the `cookie` key from your config. There is no plugin to disable.

::: callout tip "GDPR best practice"
If you are subject to GDPR, leave the dialog **enabled by default** and link to a real privacy policy via `policyUrl`. The default message is intentionally generic so you can supply your own via `message` or the translation system.
:::