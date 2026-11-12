---
title: "Cookie-Zustimmung"
description: "Konfigurieren Sie den barrierefreien DSGVO-Cookie-Zustimmungsdialog von docmd mit benutzerdefinierter Ablaufzeit, Lokalisierung und CustomEvent-Integrationen."
---

`docmd` enthält einen barrierefreien DSGVO-Cookie-Zustimmungsbanner ohne Abhängigkeiten, der direkt in die UI-Engine integriert ist. Er speichert Benutzereinstellungen im `localStorage` mit konfigurierbarer TTL und löst ein benutzerdefiniertes DOM-Ereignis für Analytics-Skript-Trigger aus.

## Schnelleinrichtung

Aktivieren Sie die Cookie-Zustimmung in Ihrem `docmd.config.json`-Manifest:

```json "docmd.config.json"
{
  "cookie": {
    "enabled": true,
    "message": "Wir verwenden Cookies, um sicherzustellen, dass Sie die beste Erfahrung erhalten.",
    "policyUrl": "/privacy",
    "position": "bottom-right"
  }
}
```

Der Banner wird beim ersten Besuch angezeigt. Auswahlpräferenzen werden im lokalen Browserspeicher über Seitenaufrufe hinweg beibehalten.

## Konfigurationsreferenz

| Feld | Standard | Beschreibung |
| :--- | :--- | :--- |
| `enabled` | `true` (wenn `cookie`-Objekt existiert) | Hauptschalter für den Zustimmungsbanner. |
| `message` | Übersetzungsschlüssel `cookieMessage` | Haupttext für die Cookie-Aufforderung. Unterstützt Inline-HTML. |
| `acceptText` | Übersetzungsschlüssel `cookieAccept` | Beschriftung der Akzeptieren-Schaltfläche. |
| `declineText` | Übersetzungsschlüssel `cookieDecline` | Beschriftung der Ablehnen-Schaltfläche. |
| `policyUrl` | `null` | Optionaler Link zu Ihrer Datenschutzerklärung. |
| `position` | `"bottom"` | Modal-Position (`"bottom"`, `"bottom-left"`, `"bottom-right"`, `"center"`). |
| `dismissible` | `true` | Wenn `true`, wird eine Schließen-Schaltfläche (X) gerendert. |
| `expiryDays` | `180` | Anzahl der Tage, bevor die Zustimmungsauswahl im `localStorage` abläuft. |

### Positionsmodi

| Wert | Rendering-Verhalten |
| :--- | :--- |
| `bottom` | Horizontal zentriert am unteren Rand des Viewports. |
| `bottom-left` | An der unteren linken Ecke des Viewports verankert. |
| `bottom-right` | An der unteren rechten Ecke des Viewports verankert. |
| `center` | Zentriertes schwebendes Modal-Overlay. |

## Lokalisierung (i18n)

Alle benutzerseitigen Zeichenfolgen unterstützen das Übersetzungssystem von `docmd`. Überschreiben Sie Zustimmungsschlüssel in Ihren `translations/<locale>.json`-Dateien:

```json "translations/fr.json"
{
  "cookieMessage": "Cette page utilise des cookies pour vous offrir la meilleure expérience.",
  "cookieAccept": "Accepter",
  "cookieDecline": "Refuser",
  "cookiePolicy": "Politique de confidentialité",
  "cookieConsent": "Consentement aux cookies"
}
```

## Reagieren auf Benutzer-Zustimmungsereignisse

Ein `CustomEvent` namens `docmd:cookie-consent` wird auf dem `window`-Objekt ausgelöst, wenn ein Benutzer den Banner akzeptiert, ablehnt oder schließt:

```javascript
window.addEventListener('docmd:cookie-consent', (event) => {
  if (event.detail.value === 'accept') {
    // Initialisieren Sie Analytics-, Marketing- oder Tracking-Skripte
  }
});
```

Die Eigenschaft `detail.value` gibt `"accept"`, `"decline"` oder `"dismissed"` zurück.

## Benutzerdefinierte Stile & Themes

Der Banner verwendet BEM-Klassennamen mit dem Präfix `.docmd-cookie-banner`. Passen Sie Stile über benutzerdefinierte CSS-Regeln an:

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

## Deaktivieren der Cookie-Zustimmung

Um den Cookie-Banner zu deaktivieren, lassen Sie den `cookie`-Konfigurationsblock in `docmd.config.json` weg oder entfernen Sie ihn.

::: callout tip "Best Practice für DSGVO-Compliance" icon:shield-check
Lassen Sie für die DSGVO-Compliance die Cookie-Zustimmung aktiviert und stellen Sie über `policyUrl` einen Link zu Ihrer Datenschutzerklärung bereit.
:::