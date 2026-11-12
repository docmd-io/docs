---
title: "KI-Assistent-Plugin"
description: "Aktivieren Sie einen interaktiven, suchbasierten KI-Dokumentationsassistenten, angetrieben durch die aiplug Multi-Provider-Integration."
---

Das `@docmd/plugin-ai`-Plugin fügt Ihrer Dokumentationsseite ein interaktives KI-Assistenten-Overlay hinzu. Es nutzt die vorkompilierten Indizes von `@docmd/plugin-search`, um Retrieval-Augmented Generation (RAG) durchzuführen und gezielte Dokumentationsabschnitte abzufragen, um kontextbezogene Antworten mit direkten Quelllinks zu liefern.

## Hauptfunktionen

* **Schwebender Trigger & Glassmorphism-Drawer**: Sauberer Pill-Trigger (`Ctrl+K`-Tastenkürzel), der sich in ein themenbewusstes Chat-Panel ausklappt.
* **Deterministische Suche & Faktenprüfung**: Erzwingt einen zweistufigen Abruf (gezielte Suche, gefolgt vom vollständigen Lesen der maßgeblichen Seite) mit Live-Verfügbarkeitsprüfung für interne Pfade und externe URLs.
* **Externe URL-Abfrage & Cloud-Portal-Governance**: Ruft externe HTTP/HTTPS-Ressourcen ab, wenn in `docmd.config.json` aktiviert und durch die Richtlinien des docmd Cloud Relays freigegeben.
* **Unsichtbare Konversations-Kompaktierung**: Reduziert historische Dialogrunden im Hintergrund, sodass Nachrichtenlimits des Relays bei langen Sitzungen zuverlässig eingehalten werden.
* **Kostenloses docmd Cloud-Relay**: Bereitstellung auf statischen Hosts (GitHub Pages, Cloudflare Pages, Netlify, Vercel) ohne Backend-Server-Infrastruktur.
* **BYOK Server- & KMS-Sicherheit**: API-Schlüssel werden im Ruhezustand via KMS in docmd Cloud verschlüsselt oder serverseitig aufgelöst (`AI_API_KEY`, `OPENAI_API_KEY`), was eine Null-Credential-Offenlegung in Client-Web-Bundles garantiert.
* **Multi-Provider-Integration**: Angetrieben von `aiplug` mit nativer Unterstützung für OpenAI, Anthropic, Gemini, DeepSeek, Groq und lokale Ollama-Instanzen.
* **Themen-Neutralität**: Passt sich an helle und dunkle Themenmodi über alle integrierten und benutzerdefinierten Vorlagen hinweg an.

## Konfigurationsoptionen

Konfigurieren Sie Assistentenoptionen in `docmd.config.json`:

### Option A: Kostenloses docmd Cloud-Relay (Statische Websites)

Für statische Websites (GitHub Pages, Cloudflare Pages, Netlify, Vercel, S3) nutzen Sie docmds kostenlosen Cloud-Relay-Dienst mit Ihrer `projectId`:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "projectId": "docmd_aiv77jc8ms8qtpvd",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "Wie kann ich heute bei dieser Dokumentation helfen?",
      "placeholder": "Frage an die KI stellen...",
      "suggestions": [
        "Wie starte ich?",
        "Zeige Konfigurationsoptionen",
        "Erkläre Schlüsselkonzepte"
      ]
    }
  }
}
```

### Option B: Selbst gehosteter Server (BYOK-Umgebungsvariablen)

Wenn docmd als Node.js-Server oder Docker-Container betrieben wird:

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "allowExternalUrls": false,
      "greeting": "Wie kann ich heute bei dieser Dokumentation helfen?",
      "placeholder": "Frage an die KI stellen...",
      "suggestions": [
        "Wie starte ich?",
        "Zeige Konfigurationsoptionen",
        "Erkläre Schlüsselkonzepte"
      ],
      "contextLimit": 5,
      "rateLimit": {
        "maxRequests": 10,
        "windowMs": 60000
      }
    }
  }
}
```

## Optionsreferenz

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Aktiviert oder deaktiviert den interaktiven KI-Assistenten-Trigger. |
| `projectId` | `string` | `undefined` | Projekt-ID von [docmd Cloud](https://cloud.docmd.io) für das kostenlose serverlose Relay auf statischen Websites. |
| `cloud` | `object` | `undefined` | Cloud-Relay-Optionsobjekt (z. B. `{ "projectId": "docmd_ai..." }`). |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'` (wenn `projectId` gesetzt) | Benutzerdefinierte AI-Chat-Relay-Endpunkt-URL. |
| `allowExternalUrls` | `boolean` | `false` | Erlaubt dem Assistenten-Tool, externe HTTP/HTTPS-URLs abzurufen. |
| `captcha` | `boolean` | `false` | Aktiviert Open-Source Proof-of-Work Anti-Bot-CAPTCHA-Herausforderungen vor der Ausführung von Anfragen. |
| `provider` | `string` | `'openai'` | LLM-Anbieter für selbst gehostete Server (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Anbieter-Standard | Spezifische Modell-ID (z. B. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Bildschirmoberfläche des schwebenden Pill-Triggers (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'Wie kann ich...'` | Erste Begrüßungsnachricht im Chat-Panel. |
| `placeholder` | `string` | `'Frage an die KI...'` | Platzhaltertext des Chat-Eingabefelds. |
| `suggestions` | `string[]` | Standardfragen | Empfohlene Schnelleingabe-Schaltflächen. |
| `contextLimit` | `number` | `5` | Maximale Anzahl an RAG-Dokumentations-Blocks, die in das LLM-Kontextfenster übergeben werden. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding-Window-Ratenbegrenzung zum Schutz von LLM-Modellen vor API-Überlastung. |

## Externe URL-Abfragen & Cloud-Portal-Governance

Wenn Ihre Dokumentation auf externe Standards, Spezifikationen oder Partnersysteme verweist, aktivieren Sie das Abrufen externer URLs in Ihrer `docmd.config.json`:

```json
{
  "plugins": {
    "ai": {
      "allowExternalUrls": true
    }
  }
}
```

### Vorrangregel des Cloud-Relays

::: callout important title:"Vorrang der Cloud-Relay-Sicherheitsrichtlinien" icon:shield
Sicherheitsrichtlinien, die im docmd Cloud-Portal festgelegt wurden, haben stets Vorrang vor lokalen `docmd.config.json`-Einstellungen.
:::

Wenn Ihre Dokumentation über das docmd Cloud-Relay geroutet wird, bestimmt die Projektrichtlinie in der Cloud verbindlich, ob ausgehende HTTP-Abfragen erlaubt sind:

1. Melden Sie sich in Ihrem Dashboard auf [cloud.docmd.io](https://cloud.docmd.io) an.
2. Öffnen Sie **Projekteinstellungen (Project Configuration)** &rarr; **Berechtigungen & Funktionen (Permissions & Capabilities)**.
3. Schalten Sie **Externe URL-Abfragen erlauben (Allow External URL Fetching)** ein.
4. Ist diese Option im Cloud-Portal deaktiviert, blockiert das Relay externe Anfragen selbst dann, wenn `allowExternalUrls: true` lokal gesetzt ist.

### Fundierte Dokumentenüberprüfung

Der Assistent prüft vor jeder Zitation, ob eine Seite tatsächlich existiert. Wenn das Tool `read_documentation_page` aufgerufen wird:
* Wird geprüft, ob die Zieldatei oder die externe URL erreichbar ist.
* Wird ein 404-Fehler oder eine fehlende Ressource festgestellt, meldet der Assistent transparent, dass die Seite nicht existiert, anstatt Inhalte zu erfinden.

## Deterministische Retrieval-Pipeline & Konversations-Kompaktierung

Um sofortige Reaktionszeiten zu sichern und endlose Tool-Aufrufschleifen zu verhindern, folgt `@docmd/plugin-ai` einem deterministischen Ablauf:

1. **Gezielte Suche**: Der Assistent führt eine einzelne, präzise Suche via `search_documentation` durch.
2. **Autoritative Seitenlesung**: Er liest die am besten passende Seite vollständig via `read_documentation_page`.
3. **Direkte Synthese**: Er formuliert unmittelbar eine fundierte Antwort mit geprüften Code-Beispielen und Verweisen.

### Unsichtbare Konversations-Kompaktierung

Bei Unterhaltungen mit mehr als sechs Runden komprimiert der Assistent ältere Dialogteile automatisch im Hintergrund. Dies verhindert das Überschreiten von Zeichengrenzen (wie 50.000-Zeichen-Limits bei Relays), ohne dass der Kontext der Konversation verloren geht.

## Kostenlose docmd Cloud-Relay-Einrichtung

Wenn Sie Ihre Dokumentation als statische Dateien auf GitHub Pages, Cloudflare Pages, Netlify oder Vercel bereitstellen, ist kein separater Backend-Server erforderlich. docmd bietet einen kostenlosen Cloud-Relay-Dienst unter [cloud.docmd.io](https://cloud.docmd.io):

1. **Konto & Projekt erstellen**: Melden Sie sich bei [cloud.docmd.io](https://cloud.docmd.io) an und erstellen Sie ein neues Projekt.
2. **Zugehörige Domain festlegen**: Tragen Sie unter **Projekteinstellungen (Project Configuration)** Ihre Dokumentations-Domain ein (z. B. `docs.mycompany.com`). Nur Anfragen von dieser Domain werden zur Nutzung des Relays autorisiert.
3. **Localhost-Tests aktivieren (Entwicklung)**: Aktivieren Sie für lokale Tests die Option **Localhost-Tests aktivieren (127.0.0.1 / localhost)**. Deaktivieren Sie diese Option vor dem Live-Gang.
4. **Modell & BYOK-Schlüssel konfigurieren**: Wählen Sie unter **Assistenten-Modell & BYOK-Schlüssel-Einrichtung** Ihren KI-Anbieter (OpenAI, Anthropic, Gemini, Groq, DeepSeek etc.), geben Sie Modellname und API-Schlüssel ein, klicken Sie auf **Verbindung testen (Test Connection)** und anschließend auf **Schlüssel & Konfiguration speichern**. Alle Schlüssel werden mittels Hardware-Sicherheitsmodul (KMS) im Ruhezustand verschlüsselt.
5. **Projekt-ID zur Konfiguration hinzufügen**: Kopieren Sie im Tab **Integration** das `projectId`-Snippet in Ihre `docmd.config.json`:
   ```json
   {
     "plugins": {
       "ai": {
         "assistant": true,
         "projectId": "docmd_aiv77jc8ms8qtpvd"
       }
     }
   }
   ```

## Serverseitige Sicherheit (Selbst gehostetes BYOK)

::: callout warning title:"Kein Verlust von Anmeldeinformationen" icon:alert-triangle
`@docmd/plugin-ai` verarbeitet API-Anmeldeinformationen strikt serverseitig oder über das KMS-verschlüsselte Relay von docmd Cloud. Provider-API-Schlüssel werden niemals im Client-HTML oder in statischen JavaScript-Bundles gerendert.
:::

Wenn docmd als Node.js-Server ausgeführt wird, definieren Sie Umgebungsvariablen vor dem Start:

```bash
export OPENAI_API_KEY="sk-..."
# oder
export ANTHROPIC_API_KEY="sk-ant-..."
# oder generischer Fallback
export AI_API_KEY="your-api-key"
```

## Architektur und Ausführungsablauf

1. **Aktionsregistrierung zur Build-Zeit**: Während der Site-Kompilierung registriert `@docmd/plugin-ai` RPC-Handler (`ai:chat`) oder bindet den Cloud-Relay-Client mit Ihrer `projectId` ein.
2. **Retrieval-Augmented Generation (RAG)**: Bei Benutzeranfragen wird der Suchindex abgefragt, relevante Abschnitte selektiert und dem Modell übergeben.
3. **Antwort-Streaming**: Die Antwort wird in Echtzeit mit klickbaren Markdown-Links zu den zitierten Abschnitten übertragen.
