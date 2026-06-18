---
title: "Cookie-Zustimmung"
description: "Optionaler Cookie-Zustimmungsdialog im Standard-UI. Speichert die Auswahl in localStorage, unterstützt Übersetzungen und emittiert ein docmd:cookie-consent CustomEvent, auf das Plugins und Templates reagieren können."
---

# Cookie-Zustimmung

> **Neu in 0.8.7.** Der Cookie-Zustimmungsdialog ist eine eingebaute Funktion des Standard-`@docmd/ui`-Pakets. Keine Plugin-Installation erforderlich. **Opt-in** — es wird nichts gerendert, sofern Sie nicht `config.cookie` setzen.

Ein minimalistischer, barrierefreier Dialog im GDPR-Stil. Die Auswahl des Nutzers wird in `localStorage` mit konfigurierbarer TTL gespeichert. Nach der Auswahl wird auf `window` ein `docmd:cookie-consent`-`CustomEvent` ausgelöst, sodass Plugins und Templates reagieren können (z. B. Analytics aktivieren, Drittanbieter-Skripte laden).

## In 30 Sekunden aktivieren

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

Erstellen Sie die Site, und der Dialog erscheint beim ersten Besuch. Folgebesuche respektieren die gespeicherte Auswahl.

## Konfigurationsreferenz

| Feld | Standard | Beschreibung |
|---|---|---|
| `enabled` | `true` (sofern `cookie`-Objekt vorhanden) | Hauptschalter. |
| `message` | Übersetzungsschlüssel `cookieMessage` | Text des Dialogs. Inline-HTML über den `t()`-Helper erlaubt. |
| `acceptText` | Übersetzungsschlüssel `cookieAccept` | Beschriftung der Akzeptieren-Schaltfläche. |
| `declineText` | Übersetzungsschlüssel `cookieDecline` | Beschriftung der Ablehnen-Schaltfläche. |
| `policyUrl` | `null` | Optionaler Link zu Ihrer Datenschutzerklärung. |
| `position` | `"bottom"` | `"bottom"` \| `"bottom-left"` \| `"bottom-right"` \| `"center"` |
| `dismissible` | `true` | Schließen-Schaltfläche (X) anzeigen. |
| `expiryDays` | `180` | Wie lange die Auswahl in `localStorage` gespeichert bleibt. |

### Positionswerte

| Wert | Wirkung |
|---|---|
| `bottom` | Horizontal zentriert am unteren Rand. |
| `bottom-left` | An der unteren linken Ecke verankert. |
| `bottom-right` | An der unteren rechten Ecke verankert. |
| `center` | Zentriertes Modal. |

## Lokalisierung

Alle nutzerseitigen Strings unterstützen das bestehende `t(key)`-Übersetzungssystem. Überschreiben Sie die Schlüssel in Ihren `translations/<locale>.json`-Dateien:

```json "translations/fr.json"
{
  "cookieMessage": "Cette page utilise des cookies pour vous offrir la meilleure expérience.",
  "cookieAccept": "Accepter",
  "cookieDecline": "Refuser",
  "cookiePolicy": "Politique de confidentialité",
  "cookieConsent": "Consentement aux cookies"
}
```


## Auf eine Auswahl reagieren

Nach Akzeptieren, Ablehnen oder Schließen wird auf `window` ein `CustomEvent` mit dem Namen `docmd:cookie-consent` ausgelöst:

```js
window.addEventListener('docmd:cookie-consent', (e) => {
  if (e.detail.value === 'accept') {
    // Analytics, Marketing-Skripte usw. laden
  }
});
```

`detail.value` ist einer der Werte `"accept"`, `"decline"` oder `"dismissed"`. Wenn Sie die Auswahl synchron lesen müssen (z. B. bevor andere Skripte laufen), liefert `localStorage.getItem('docmd-cookie-consent')` dieselbe Payload.

## Neu stylen

Der Dialog verwendet BEM-Klassen auf dem Wurzelelement `.docmd-cookie-banner`. Skinen Sie ihn über `customCss` neu (gewinnt immer mit Priorität 15):

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


## Deaktivieren

Um den Dialog vollständig zu entfernen, löschen Sie einfach den `cookie`-Schlüssel aus Ihrer Konfiguration. Es gibt kein Plugin zum Deaktivieren.

::: callout tip "GDPR-Best Practice"
Wenn Sie GDPR unterliegen, lassen Sie den Dialog **standardmäßig aktiviert** und verlinken Sie über `policyUrl` auf eine echte Datenschutzerklärung. Die Standardnachricht ist absichtlich generisch gehalten, sodass Sie sie über `message` oder das Übersetzungssystem selbst bereitstellen können.
:::