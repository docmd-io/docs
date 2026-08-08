---
title: "KI-Assistent-Plugin"
description: "Aktivieren Sie einen interaktiven, suchbasierten KI-Dokumentationsassistenten, angetrieben durch die aiplug Multi-Provider-Integration."
---

Das `@docmd/plugin-ai`-Plugin fügt Ihrer Dokumentationsseite ein interaktives KI-Assistenten-Overlay hinzu. Es nutzt die vorkompilierten Indizes von `@docmd/plugin-search`, um Retrieval-Augmented Generation (RAG) durchzuführen und gezielte Dokumentationsabschnitte abzufragen, um kontextbezogene Antworten mit direkten Quelllinks zu liefern.

## Hauptfunktionen

* **Schwebender Trigger & Glassmorphism-Drawer**: Sauberer Pill-Trigger (`⌘K`-Tastenkürzel), der sich in ein themenbewusstes Chat-Panel ausklappt.
* **Suchbasiertes RAG**: Fragt vorgebaute `search-index.json`-Daten ab, um LLM-Antworten direkt in der Dokumentation Ihrer Website zu verankern.
* **BYOK-Serversicherheit**: API-Schlüssel werden ausschließlich in Serverumgebungen (`AI_API_KEY`, `OPENAI_API_KEY`) aufgelöst, was eine Null-Credential-Offenlegung in Client-Web-Bundles garantiert.
* **Multi-Provider-Integration**: Angetrieben von `aiplug` mit nativer Unterstützung für OpenAI, Anthropic, Gemini, DeepSeek, Groq und lokale Ollama-Instanzen.
* **Themen-Neutralität**: Passt sich an helle und dunkle Themenmodi über alle integrierten und benutzerdefinierten Vorlagen hinweg an.

## Konfigurationsoptionen

Konfigurieren Sie Assistentenoptionen und Provider-Anmeldeinformationen in `docmd.config.json`:

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

## Optioneneferenz

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Aktiviert oder deaktiviert den interaktiven KI-Assistenten-Trigger. |
| `captcha` | `boolean` | `false` | Aktiviert Open-Source Proof-of-Work Anti-Bot-CAPTCHA-Herausforderungen vor der Ausführung von Anfragen. |
| `provider` | `string` | `'openai'` | LLM-Anbieter (`'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, `'ollama'`). |
| `model` | `string` | Anbieter-Standard | Spezifische Modell-ID (z. B. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Bildschirmoberfläche des schwebenden Pill-Triggers (`'bottom-center'`, `'bottom-right'`, `'bottom-left'`). |
| `greeting` | `string` | `'Wie kann ich...'` | Erste Begrüßungsnachricht im Chat-Panel. |
| `placeholder` | `string` | `'Frage an die KI...'` | Platzhaltertext des Chat-Eingabefelds. |
| `suggestions` | `string[]` | Standardfragen | Empfohlene Schnelleingabe-Schaltflächen. |
| `contextLimit` | `number` | `5` | Maximale Anzahl an RAG-Dokumentations-Blocks, die in das LLM-Kontextfenster übergeben werden. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Sliding-Window-Ratenbegrenzung zum Schutz von LLM-Modellen vor API-Überlastung. |

## Serverseitige Sicherheit (Bring-Your-Own-Key)

::: callout warning "Kein Verlust von Anmeldeinformationen" icon:alert-triangle
`@docmd/plugin-ai` verarbeitet API-Anmeldeinformationen strikt serverseitig. Provider-API-Schlüssel werden niemals im Client-HTML oder in statischen JavaScript-Bundles gerendert.
:::

Setzen Sie die Umgebungsschlüssel des Anbieters vor dem Start Ihres Dokumentationsservers:

```bash
export OPENAI_API_KEY="sk-..."
# oder
export ANTHROPIC_API_KEY="sk-ant-..."
# oder generischer Fallback
export AI_API_KEY="ihr-api-schlüssel"
```

## Architektur-Ausführungsfluss

1. **Registrierung von Aktionen zur Build-Zeit**: Während der Website-Kompilierung registriert `@docmd/plugin-ai` serverseitige RPC-Aktionshandler (`ai:chat`) und injiziert ein leichtes Client-Trigger-Skript.
2. **Retrieval-Augmented Generation (RAG)**: Wenn ein Leser eine Frage sendet:
   - Der RPC-Endpunkt fragt den von `@docmd/plugin-search` kompilierten Suchindex ab.
   - Passende Dokumentenüberschriften und Textabschnitte werden basierend auf Vektor-/Schlüsselwortdistanz ausgewählt.
   - Relevante Ausschnitte werden zusammen mit dem Gesprächsverlauf des Benutzers in einen strukturierten System-Prompt kompiliert.
3. **Provider-Verarbeitung & Zitate**: Die Anfrage wird über `aiplug` an den angegebenen Anbieter weitergeleitet. Ausgabeantworten werden mit Markdown-Links zurückgegeben, die auf referenzierte Dokumentationsanker verweisen.
