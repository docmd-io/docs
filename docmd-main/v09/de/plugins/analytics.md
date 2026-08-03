---
title: "Analytics-Plugin"
description: "Integrieren Sie Google Analytics 4 oder das ältere Universal Analytics und verfolgen Sie Nutzerinteraktionen automatisch."
---

Das `@docmd/plugin-analytics`-Plugin ermöglicht die einfache Integration von Google Analytics in Ihre Dokumentation. Es unterstützt den modernen Google Analytics 4 (GA4)-Standard, das ältere Universal Analytics (UA) und bietet native Ereignisverfolgung für interaktionsintensive Dokumentations-Sites.

## Konfiguration

Aktivieren Sie Analytics, indem Sie Ihre Tracking-Anmeldedaten zum `plugins`-Abschnitt Ihrer `docmd.config.json` hinzufügen.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4-Konfiguration (erfordert `measurementId`). |
| `googleUA` | `object` | `null` | Universal Analytics-Konfiguration (erfordert `trackingId`). |
| `autoEvents` | `boolean` | `true` | Klicks, Downloads und TOC-Interaktionen automatisch verfolgen. |
| `trackSearch` | `boolean` | `true` | Von Lesern verwendete Suchbegriffe verfolgen. |

### Beispiel

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

## Verfolgte Ereignisse

Wenn `autoEvents` aktiviert ist, erfasst das Plugin automatisch die folgenden Interaktionen:

- **Externe Links**: ausgehende Klicks zu anderen Domains.
- **Downloads**: Klicks auf Links mit dem `download`-Attribut oder gängigen Dateiendungen.
- **TOC-Klicks**: Abschnitts-Engagement über die rechte Navigation.
- **Überschriften-Anker**: Klicks auf Permalink-Links pro Abschnitt.
- **Suchanfragen**: in die Suchleiste eingegebene Schlüsselwörter (1 Sekunde entprellt).

::: callout info "Datenschutz & DSGVO"
Standardmäßig anonymisiert dieses Plugin IP-Adressen nicht, da dies nun nativ von GA4 gehandhabt wird. Wenn Sie eine erweiterte Cookie-Zustimmungsverwaltung benötigen, können Sie Skripte manuell über einen benutzerdefinierten Plugin-Hook injizieren.
:::