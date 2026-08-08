---
title: "Werkzeug-System"
description: "Erstellen, Registrieren und Ausführen von benutzerdefinierten und Standard-Werkzeugen mit docmd-assistant."
---

`docmd-assistant` enthält ein Werkzeug-Ausführungssystem. Werkzeuge ermöglichen es dem Assistenten, Volltext-Suchanfragen durchzuführen, Dokumentenseiten zu lesen, URLs anzusteuern, Code-Snippets zu kopieren oder benutzerdefinierte Funktionen in Ihrer Anwendung aufzurufen.

## Werkzeug definieren

Eine Werkzeugdefinition erfordert einen Namen (`name`), eine Beschreibung (`description`), ein Schema für die Parameter (`parameters`) und eine Ausführungsfunktion (`execute` oder `handler`):

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: 'Ruft die aktuelle Wettervorhersage für eine Stadt ab.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Stadtname' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Temperatureinheit' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // API-Aufruf oder Anwendungslogik ausführen
    return { city, temperature: 22, unit, condition: 'Sonnig' };
  }
};
```

## Werkzeuge registrieren

Registrieren Sie Werkzeuge bei der Initialisierung oder dynamisch via `registerTool()`:

::: tabs
== tab "Bei Initialisierung" icon:settings
```typescript
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});
```
== tab "Dynamische Registrierung" icon:plus-circle
```typescript
assistant.registerTool({
  name: 'open_modal',
  description: 'Öffnet einen UI-Modaldialog',
  parameters: {
    type: 'object',
    properties: {
      modalId: { type: 'string' }
    },
    required: ['modalId']
  },
  execute: async ({ modalId }) => {
    document.getElementById(modalId)?.classList.add('visible');
    return { success: true };
  }
});
```
:::

## Standard-Dokumentationswerkzeuge

`docmd-assistant` exportiert die Factory-Funktion `createStandardTools()`, die vier Standard-Werkzeuge bereitstellt:

| Werkzeugname | Parameter | Beschreibung |
| :-------- | :--------- | :---------- |
| `search_documentation` | `{ query: string }` | Durchsucht Dokumentenindizes oder aktive DOM-Abschnitte |
| `read_documentation_page` | `{ path: string }` | Lädt und extrahiert den vollständigen Seitentext und Codeblöcke |
| `navigate_to_page` | `{ path: string }` | Navigiert den Browser zu einer URL oder einem Anker (`#section`) |
| `copy_code_snippet` | `{ code: string }` | Kopiert Code-Snippets direkt in die Zwischenablage des Benutzers |

### Initialisierung von Standard-Werkzeugen

```typescript
import { DocmdAssistantEngine, createStandardTools } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  tools: createStandardTools(
    // 1. Benutzerdefinierter Such-Callback (z. B. docmd-search, Algolia, Fuse.js oder Backend-API)
    async (query) => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
    },
    // 2. Benutzerdefinierter Seiten-Reader-Callback (CMS-API, Raw-Markdown-Endpunkt oder Datenbank)
    async (path) => {
      const res = await fetch(`/api/page?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      return { title: data.title, content: data.markdown };
    }
  )
});
```

## Such-Integrationsmodi

`createStandardTools()` unterstützt drei Such-Integrationsmodi:

::: grid

::: card "docmd Plugin-Modus" icon:puzzle
Bei Verwendung innerhalb einer `docmd`-Website via `@docmd/plugin-ai` delegiert die Suche direkt an `docmd-search` (`window.docmdSearch`), um vorkompilierte Statik-Indizes zu durchsuchen.
:::

::: card "Benutzerdefinierter Such-Callback" icon:search
Geben Sie eine `customSearch`-Funktion an, um externe Suchmaschinen wie Algolia, Fuse.js oder Server-Endpunkte einzubinden.
:::

::: card "DOM-Überschriften-Scraper" icon:code
Wenn kein benutzerdefinierter Callback angegeben ist, greift `search_documentation` auf einen Browser-DOM-Scraper zurück, der `<h1>`–`<h4>`-Überschriften und `<section>`-Tags durchsucht.
:::

:::

## Mechanismus des Seiten-Readers (`read_documentation_page`)

Wenn Suchergebnis-Snippets nicht ausreichen, ruft der Assistent automatisch `read_documentation_page({ path })` auf:

1. **Benutzerdefinierter Reader-Callback (`customReader`)**: Falls vorhanden, delegiert die Engine das Abrufen der Seite an Ihren benutzerdefinierten Loader.
2. **DOM-Parser-Fallback**: Falls kein Callback vorhanden ist, lädt das Werkzeug `window.location.origin + path` via `fetch()` und extrahiert Text aus `<main>`, `<article>` oder `[role="main"]` via `DOMParser()`.
3. **Zitations-Links**: Der zurückgegebene Seiteninhalt wird in den Kontext integriert, sodass das Modell klickbare Markdown-Links `[Seitentitel](path)` in seiner Antwort generieren kann.
