---
title: "Engine-Architektur"
description: "Technische Aufschlüsselung der docmd-assistant Engine-Architektur, Ausführungspipeline und des Event-Modells."
---

`docmd-assistant` arbeitet als entkoppelte Headless-Engine. Sie trennt die Verwaltung des Konversationsstatus, die System-Prompt-Synthese, die Multi-Provider-Modellkommunikation und die Client-Tool-Ausführung von der Benutzeroberfläche.

## Architektur-Übersicht

```
                                ┌─────────────────────────────┐
                                │       Anwendungsschicht     │
                                │ (React, Vue, CLI, Custom UI)│
                                └──────────────┬──────────────┘
                                               │ sendMessage()
                                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DocmdAssistantEngine                                  │
│                                                                                        │
│  ┌───────────────────────┐   ┌───────────────────────┐   ┌──────────────────────────┐  │
│  │    Verlaufs-Status    │   │ System-Prompt-Manager │   │    Werkzeug-Registrie   │  │
│  └───────────────────────┘   └───────────────────────┘   └──────────────────────────┘  │
│                                                                                        │
│                             Turn-Verarbeitungspipeline                                 │
└────────────────────────────────────────┬───────────────────────────────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
        ┌────────────────────────┐             ┌────────────────────────┐
        │      Direkt-Modus      │             │      Relay-Modus       │
        │  (aiplug LLM Adapter)  │             │   (Cloud Relay API)    │
        └────────────────────────┘             └────────────────────────┘
```

## Schritte einer Konversationsrunde

Wenn `sendMessage(text)` aufgerufen wird, verarbeitet die Engine die Runde in fünf Schritten:

::: steps

### Schritt 1 – Erfassung der Benutzernachricht

Der Eingabestring wird als Benutzernachricht an den internen Verlauf angehängt und ein Event `'message'` wird ausgelöst.

### Schritt 2 – Kontext-Zusammenstellung

Die Engine kombiniert den aktiven System-Prompt, den Nachrichtenverlauf und die registrierten Werkzeugdefinitionen zu einem Konversations-Payload.

### Schritt 3 – Ausführungs-Routing

- **Direkt-Modus**: Wenn ein `apiKey` oder ein lokaler Provider erkannt wird, initialisiert `docmd-assistant` einen `aiplug`-Adapter für die direkte Kommunikation.
- **Relay-Modus**: Wenn `relayUrl` oder `endpoint` verwendet wird, sendet die Engine einen JSON-Payload mit der Abfrage, Seiten-URL, Seitentitel und Verlauf per POST an den Relay-Endpunkt.

### Schritt 4 – Werkzeug-Ausführungsschleife

Wenn das Modell einen Werkzeugaufruf anfordert (wie `search_documentation`), führt `docmd-assistant` den registrierten Werkzeug-Handler aus, löst `'tool_call'`- und `'tool_result'`-Events aus und gibt das Ergebnis zurück.

### Schritt 5 – Antwort-Ausgabe

Der Antworttext des Assistenten wird an den Verlauf angehängt und über den `'message'`-Eventbus ausgegeben.

:::

## Eventbus-Referenz

`docmd-assistant` enthält einen integrierten Eventbus. Registrieren Sie Listener mit `on(event, listener)`:

| Event-Typ | Ausgelöst wenn | Daten-Payload-Schema |
| :--------- | :------------- | :------------------ |
| `'message'` | Benutzer- oder Assistentennachricht hinzugefügt wird | `ChatMessage`-Objekt |
| `'tool_call'` | Engine die Ausführung eines Werkzeugs startet | `{ name: string, args: any }` |
| `'tool_result'`| Werkzeug-Handler die Ausführung beendet | `{ name: string, args: any, result: any }` |
| `'error'` | Ein Fehler oder Relay-Fehlschlag auftritt | Fehlerobjekt oder Details |
| `'clear'` | Konversationsverlauf zurückgesetzt wird | `null` |

```typescript
// Subskription von Engine-Events
assistant.on('message', (event) => {
  console.log(`Nachricht von ${event.data.sender}:`, event.data.content);
});

assistant.on('tool_result', (event) => {
  console.log(`Werkzeug ${event.data.name} lieferte:`, event.data.result);
});
```

## Im Relay-Modus gesendete Kontextdaten

Im Relay-Modus erfasst `docmd-assistant` automatisch Kontextdetails des Browsers bei jeder Anfrage:

```json
{
  "projectId": "prj_my_docs_site",
  "siteId": "prj_my_docs_site",
  "message": "Wie konfiguriere ich die Búsqueda?",
  "pageUrl": "https://docs.example.com/setup",
  "pageTitle": "Setup & Konfiguration",
  "history": [
    { "sender": "user", "text": "Hallo" },
    { "sender": "assistant", "text": "Hallo! Wie kann ich Ihnen heute helfen?" }
  ],
  "systemPrompt": "Sie sind docmd Assistent...",
  "reasoning": false
}
```

::: callout info "Automatischer Seitenkontext"
Das Erfassen von `pageUrl` und `pageTitle` ermöglicht seitenbezogene Antworten auf Server-Seite ohne manuelle Client-Konfiguration.
:::

## Fehlerbehandlung & Fallbacks

Die Engine fängt Netzwerkfehler, Authentifizierungsfehler und Ausführungs-Exceptions ab:

- **Werkzeug-Ausführungsfehler**: Werden abgefangen und über `'error'` ausgegeben, ohne den Prozess abzubrechen. Ein Fehlerobjekt wird an das Modell zurückgegeben.
- **Relay-Fehler**: Werden sauber behandelt und mit aussagekräftigen Fehlermeldungen ausgegeben.
- **Nicht-konfigurierter Relay-Status**: Wenn ein Cloud-Relay `{ unconfigured: true }` zurückgibt, liefert die Engine ein `ChatResponse`-Objekt mit `unconfigured: true`.
