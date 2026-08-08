---
title: "Analytics-Plugin"
description: "Integrieren Sie Google Analytics 4 (GA4) oder das ältere Universal Analytics mit automatisierter Ereignisverfolgung."
---

Das `@docmd/plugin-analytics`-Plugin integriert Google Analytics-Tracking-Skripte in Ihre Dokumentationsseiten. Es unterstützt Google Analytics 4 (GA4) und das ältere Universal Analytics (UA) und bietet eine automatische Interaktionsverfolgung für technische Dokumentationsportale.

## Konfigurationsoptionen

Konfigurieren Sie Analytics-Tracking-IDs in `docmd.config.json`:

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4-Konfigurationsobjekt (erfordert `measurementId`). |
| `googleUA` | `object` | `null` | Universal Analytics-Konfigurationsobjekt (erfordert `trackingId`). |
| `autoEvents` | `boolean` | `true` | Externe Links, Downloads, Anker-Klicks und TOC-Navigation automatisch verfolgen. |
| `trackSearch` | `boolean` | `true` | In Such-Modals eingegebene Suchbegriffe automatisch erstatten. |

### Globales Analytics-Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "analytics": {
      "googleV4": {
        "measurementId": "G-XXXXXXX"
      },
      "autoEvents": true,
      "trackSearch": true
    }
  }
}
```

## Automatisch verfolgte Ereignisse

Wenn `autoEvents` auf `true` gesetzt ist, erfasst das Analytics-Plugin Benutzerinteraktionen ohne benutzerdefinierte Skripte:

* **Externe ausgehende Links**: Klicks auf Links, die zu externen Domainzielen navigieren.
* **Dateidownloads**: Klicks auf Assets mit `download`-Attributen oder gängigen binären Dateiendungen (`.zip`, `.pdf`, `.gz`).
* **Inhaltsverzeichnis-Engagement**: Navigationssprünge über das rechte Inhaltsverzeichnis-Panel (TOC).
* **Abschnitts-Überschriftenanker**: Klicks auf Permalink-Anker von Überschriften.
* **Suchbegriffe**: In das Such-Modal eingegebene Suchschlüsselwörter (1 Sekunde entprellt).

::: callout info "Datenschutz & Daten-Compliance" icon:shield-check
Google Analytics 4 handhabt die IP-Anonymisierung von Haus aus nativ. Wenn Ihre Organisation explizite Cookie-Einwilligungsbanner oder DSGVO-Opt-in-Steuerelemente benötigt, injizieren Sie benutzerdefinierte Skripte über benutzerdefinierte Plugin-Hooks.
:::