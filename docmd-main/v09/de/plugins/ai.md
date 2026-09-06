---
title: "KI-Assistent-Plugin"
description: "Aktivieren Sie einen interaktiven, suchbasierten KI-Dokumentationsassistenten, angetrieben durch die aiplug Multi-Provider-Integration."
---

Das `@docmd/plugin-ai`-Plugin fügt Ihrer Dokumentationsseite ein interaktives KI-Assistenten-Overlay hinzu. Es nutzt die vorkompilierten Indizes von `@docmd/plugin-search`, um Retrieval-Augmented Generation (RAG) durchzuführen und gezielte Dokumentationsabschnitte abzufragen, um kontextbezogene Antworten mit direkten Quelllinks zu liefern.

## Hauptfunktionen

* **Schwebender Trigger & Glassmorphism-Drawer**: Sauberer Pill-Trigger (`⌘K`-Tastenkürzel), der sich in ein themenbewusstes Chat-Panel ausklappt.
* **Suchbasiertes RAG**: Fragt vorgebaute `search-index.json`-Daten ab, um LLM-Antworten direkt in der Dokumentation Ihrer Website zu verankern.
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

## Optionenreferenz

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Aktiviert oder deaktiviert den interaktiven KI-Assistenten-Trigger. |
| `projectId` | `string` | `undefined` | Projekt-ID von [docmd Cloud](https://cloud.docmd.io) für das kostenlose serverlose Relay auf statischen Websites. |
| `cloud` | `object` | `undefined` | Cloud-Relay-Optionsobjekt (z. B. `{ "projectId": "docmd_ai..." }`). |
| `endpoint` | `string` | `'https://api.docmd.io/v1/ai/chat'` (wenn `projectId` gesetzt) | Benutzerdefinierte AI-Chat-Relay-Endpunkt-URL. |
| `captcha` | `boolean` | `false` | Aktiviert Open-Source Proof-of-Work Anti-Bot-CAPTCHA-Herausforderungen vor der Ausführung von Anfragen. |
| `provider` | `string` | `'openai'` | LLM-Anbieter für selbst gehostete Server (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Anbieter-Standard | Spezifische Modell-ID (z. B. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Bildschirmoberfläche des schwebenden Pill-Triggers (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'Wie kann ich...'` | Erste Begrüßungsnachricht im Chat-Panel. |
| `placeholder` | `string` | `'Frage an die KI...'` | Platzhaltertext des Chat-Eingabefelds. |
| `suggestions` | `string[]` | Standardfragen | Empfohlene Schnelleingabe-Schaltflächen. |
| `contextLimit` | `number` | `5` | Maximale Anzahl an RAG-Dokumentations-Blocks, die in das LLM-Kontextfenster übergeben werden. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding-Window-Ratenbegrenzung zum Schutz von LLM-Modellen vor API-Überlastung. |

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
::: /callout

Beim Betrieb als Node.js-Server setzen Sie die Umgebungsschlüssel des Anbieters vor dem Serverstart:

```bash
export OPENAI_API_KEY="sk-..."
# oder
export ANTHROPIC_API_KEY="sk-ant-..."
# oder generischer Fallback
export AI_API_KEY="ihr-api-schlüssel"
```

## Architektur-Ausführungsfluss

1. **Registrierung von Aktionen zur Build-Zeit**: Während der Website-Kompilierung registriert `@docmd/plugin-ai` serverseitige RPC-Aktionshandler (`ai:chat`) oder injiziert den Cloud-Relay-Client mit Ihrer `projectId`.
2. **Retrieval-Augmented Generation (RAG)**: Wenn ein Leser eine Frage sendet:
   - Der Client fragt den von `@docmd/plugin-search` kompilierten Suchindex oder MCP-Tools ab.
   - Passende Dokumentenüberschriften und Textabschnitte werden basierend auf Vektor-/Schlüsselwortdistanz ausgewählt.
   - Relevante Abschnitte und Tool-Ergebnisse werden an das Relay oder den Server-Endpunkt übertragen.
3. **Provider-Verarbeitung & Zitate**: Die Anfrage wird sicher an den festgelegten Modellanbieter weitergeleitet. Antworten werden in Echtzeit gestreamt, inklusive Links auf Quellanker.
