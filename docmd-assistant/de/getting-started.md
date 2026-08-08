---
title: "Erste Schritte"
description: "Schnellstartanleitung zur Installation und Initialisierung von docmd-assistant in Ihrer Anwendung."
---

Installieren Sie `docmd-assistant` und erstellen Sie Ihre erste Konversationsrunde in unter zwei Minuten.

## Systemanforderungen

::: callout info "Voraussetzungen"
- **Node.js 20.0.0+**
- Browser-Unterstützung: Moderne Webbrowser (Chrome, Firefox, Safari, Edge)
- Läuft auf macOS, Linux und Windows
:::

## Installation

::: tabs
== tab "npm" icon:package
```bash
npm install docmd-assistant
```
== tab "pnpm" icon:zap
```bash
pnpm add docmd-assistant
```
== tab "yarn" icon:package
```bash
yarn add docmd-assistant
```
:::

## Initialisierung der Engine

::: steps

### Schritt 1 – Engine-Instanz erstellen

Importieren Sie `DocmdAssistantEngine` und übergeben Sie die Konfigurationsoptionen:

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  provider: 'openai',
  model: 'gpt-4o-mini',
  apiKey: process.env.OPENAI_API_KEY,
  systemPrompt: 'Sie sind ein Experte für diese Dokumentationswebsite.'
});
```

### Schritt 2 – Benutzernachricht senden

Rufen Sie `sendMessage()` auf, um eine Konversation auszuführen:

```typescript
const response = await assistant.sendMessage('Wie konfiguriere ich die Búsqueda?');

console.log('Antwort des Assistenten:', response.message);
```

### Schritt 3 – Antwortobjekt prüfen

Das zurückgegebene Antwortobjekt enthält den Antworttext und den aktualisierten Verlauf:

```typescript
console.log('Nachricht:', response.message);
console.log('Verlaufslänge:', response.history.length);
```

:::

## Verbindungsmodi

`docmd-assistant` unterstützt zwei Verbindungsmodi:

::: grid

::: card "Direkt-Modus (aiplug)" icon:zap
Übergabe eines Anbieter-API-Schlüssels (`apiKey`) oder lokaler Provider-Optionen (`provider: 'ollama'`). Die Engine nutzt `aiplug` für die direkte Kommunikation.
:::

::: card "Cloud-Relay-Modus" icon:cloud
Übergabe von `relayUrl` oder `endpoint` (z. B. `https://api.docmd.io/v1/ai/chat`) zusammen mit einer `projectId`. Die Engine sendet Payloads an Ihren Backend-Endpunkt, um Schlüssel zu schützen.
:::

:::

### Beispiel für den Cloud-Relay-Modus

```typescript
import { DocmdAssistantEngine } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  relayUrl: 'https://api.docmd.io/v1/ai/chat',
  projectId: 'prj_my_docs_site',
  systemPrompt: 'Unterstützen Sie Benutzer bei Fragen zu Konfigurationsdateien.'
});

const response = await assistant.sendMessage('Was ist der Standard-Ausgabeordner?');
console.log(response.message);
```

## Events abonnieren

Hören Sie auf Echtzeit-Events für Nachrichtenaktualisierungen, Werkzeugausführung und Fehler:

```typescript
// Ausgelöst, wenn eine Benutzer- oder Assistentennachricht hinzugefügt wird
assistant.on('message', (event) => {
  const msg = event.data;
  console.log(`[${msg.sender.toUpperCase()}]: ${msg.content}`);
});

// Ausgelöst, wenn ein Werkzeug die Ausführung startet
assistant.on('tool_call', (event) => {
  console.log('Werkzeug ausführen:', event.data.name, event.data.args);
});

// Ausgelöst, wenn die Werkzeugausführung beendet ist
assistant.on('tool_result', (event) => {
  console.log('Werkzeugergebnis:', event.data.result);
});

// Ausgelöst, wenn ein Fehler auftritt
assistant.on('error', (event) => {
  console.error('Engine-Fehler:', event.data);
});
```

## Nächste Schritte

- [Engine-Architektur](how-it-works) – Erfahren Sie mehr über den Ausführungszyklus und die Kontextzusammenstellung
- [Konfiguration](configuration) – Erkunden Sie alle Optionen, Modellauswahlen und Runtime-Updates
- [Werkzeug-System](tools) – Registrieren Sie benutzerdefinierte Werkzeuge und Dokumentations-Suchhelfer
