---
title: Konfigurations- & Benutzerdefinierte Variablen
description: Variablen in docmd.config.json definieren, externe Dateien laden und Platzhalter in Konfigurationen und Markdown einsetzen.
---

# Konfigurations- & Benutzerdefinierte Variablen

Sie können benutzerdefinierte Variablen direkt in `docmd.config.json` definieren, aus externen JSON-Dateien oder JavaScript-Modulen laden und in Ihrer gesamten Dokumentation verwenden.

## Variablen in `docmd.config.json` definieren

Fügen Sie Ihrer `docmd.config.json` einen `variables`-Block hinzu:

```json
{
  "title": "Acme Cloud Dokumentation",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "eu-central-1",
      "maxInstances": 50
    }
  }
}
```

### Zugriff in Markdown

Verschachtelte Eigenschaften werden mit gewohnter Punktnotation angesprochen:

```markdown
Unser Support-Team erreichen Sie unter [\{{ supportEmail }}](mailto:\{{ supportEmail }}).

Alle Anfragen richten Sie an unseren Endpunkt:
```bash
curl -X GET \{{ cloud.apiEndpoint }}/status \
  -H "X-Region: \{{ cloud.region }}"
```
```

Während des Builds wird dies aufgelöst zu:

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: eu-central-1"
```

## Variablen in Konfigurationsfeldern nutzen

docmd führt einen einheitlichen Variablen-Pass durch, **bevor** Layouts, Menüs und Fußzeilen gerendert werden.

Sie können integrierte Variablen wie `\{{ docmd.buildYear }}` oder `\{{ docmd.version }}` sowie eigene Werte direkt in Konfigurationsfeldern einsetzen:

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "Copyright © \{{ docmd.buildYear }} \{{ companyName }}. Alle Rechte vorbehalten."
  },
  "layout": {
    "banners": {
      "top": {
        "content": "**docmd v\{{ docmd.version }} ist live!** — Region: \{{ env.DEPLOY_REGION || 'global' }}."
      }
    }
  }
}
```

::: callout tip "Der einheitliche Auflösungs-Zyklus" icon:refresh-cw
1. **Registrierung**: Beim Start von `docmd build` registriert die `VariableRegistry` alle integrierten Variablen, Umgebungsvariablen und Konfigurationswerte.
2. **Konfigurations-Interpolation**: docmd durchläuft rekursiv `docmd.config.json` und ersetzt alle `{{ variable }}`-Ausdrücke.
3. **Markdown-Rendering**: Markdown-Prozessoren nutzen exakt denselben Registry-Bestand für die Seitengenerierung.
4. **Ergebnis**: Sowohl Fußzeile als auch Markdown-Inhalte sind stets synchron ohne manuelle Dopplung.
:::

## Externe Variablen-Dateien

Für größere Projekte oder geteilte Teamspezifikationen können Sie `"variables"` auf externe JSON- oder JavaScript-Dateien verweisen:

::: tabs
::: tab "Externe JSON-Datei" icon:file-json
Verweisen Sie auf eine JSON-Datei in Ihrem Repository:

```json
{
  "variables": "./data/variables.json"
}
```

Inhalt von `./data/variables.json`:

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token",
    "clientId": "acme-portal-production"
  },
  "limits": {
    "rateLimitPerMin": 1200
  }
}
```
::: /tab

::: tab "Dynamisches JavaScript-Modul" icon:file-code
Verweisen Sie auf eine JavaScript-Datei für dynamische Berechnungen:

```json
{
  "variables": "./data/variables.js"
}
```

Inhalt von `./data/variables.js`:

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString('de-DE'),
  sdkVersion: require('./package.json').version,
  activeServices: ['auth', 'billing', 'analytics']
};
```
::: /tab
::: /tabs

::: card "Best Practice: Zentrale Datenquelle" icon:check-circle
Über ein JavaScript-Modul können Sie Versionsnummern direkt aus der `package.json` importieren, sodass die Dokumentation stets mit Code-Releases übereinstimmt.
:::
