---
title: "KI-Assistent-Plugin"
description: "Interaktiver, suchbasierter KI-Dokumentationsassistent angetrieben durch aiplug Multi-Provider-Integration."
---

Das `@docmd/plugin-ai` Plugin bringt einen modernen KI-Assistenten in Ihre Dokumentation. Es nutzt den von `@docmd/plugin-search` erstellten Suchindex für Retrieval-Augmented Generation (RAG), um präzise Antworten mit anklickbaren Quellennachweisen zu liefern.

## Konfiguration

Das KI-Plugin ist in `v0.9.0` standardmäßig als Kern-Plugin aktiviert. Die Einstellungen können in der `docmd.config.json` angepasst werden.

```json "docmd.config.json"
{
  "plugins": {
    "ai": {
      "assistant": true,
      "captcha": false,
      "provider": "openai",
      "model": "gpt-4o-mini",
      "position": "bottom-center",
      "greeting": "Wie kann ich heute bei dieser Dokumentation helfen?",
      "placeholder": "Stelle eine Frage zur Dokumentation...",
      "suggestions": [
        "Wie starte ich?",
        "Zeige Konfigurationsbeispiele"
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

## Optionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `assistant` | `boolean` | `true` | Aktiviert oder deaktiviert den interaktiven KI-Assistenten. |
| `captcha` | `boolean` | `false` | Aktiviert Open-Source Proof-of-Work Bot-Schutz vor Anfragen. |
| `provider` | `string` | `'openai'` | LLM-Anbieter: `'openai'`, `'anthropic'`, `'gemini'`, `'deepseek'`, `'groq'`, oder `'ollama'`. |
| `model` | `string` | Anbieter-Standard | Modellbezeichnung (z. B. `gpt-4o-mini`, `claude-3-5-haiku-20241022`). |
| `position` | `string` | `'bottom-center'` | Position des Trigger-Pills: `'bottom-center'`, `'bottom-right'`, oder `'bottom-left'`. |
| `greeting` | `string` | `'Wie kann ich heute bei dieser Dokumentation helfen?'` | Begrüßungstext im Chat-Fenster. |
| `placeholder` | `string` | `'Stelle eine Frage zur Dokumentation...'` | Platzhaltertext für die Eingabe. |
| `suggestions` | `string[]` | Standard-Fragen | Liste von Schnellstart-Vorschlägen. |
| `contextLimit` | `number` | `5` | Maximale Anzahl von RAG-Dokumentations-Snippets für das LLM. |
| `rateLimit` | `object` | `{ maxRequests: 10, windowMs: 60000 }` | Ratenbegrenzung zum Schutz vor Überlastung. |
