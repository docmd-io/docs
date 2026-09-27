---
title: "MCP-Server"
description: "Model Context Protocol (MCP) Server-Referenz zur Integration mit KI-Entwicklungs-Tools."
---

docmd enthält einen nativen Model Context Protocol (MCP)-Server, der es KI-Entwicklungsagenten ermöglicht, programmatisch und über lokale Transportkanäle mit Ihrem Dokumentations-Workspace zu interagieren.

## Technische Übersicht

Das [Model Context Protocol](external:https://modelcontextprotocol.io/) ist ein offener Standard zur Anbindung von KI-Modellen an lokale Workspace-Tools. docmd implementiert die `stdio`-Transportschicht, Clients starten `docmd mcp` als Unterprozess und tauschen JSON-RPC 2.0-Nachrichten über Standard-Ein-/Ausgabe-Streams aus.

## Start & Konfiguration

```bash
docmd mcp
```

### Claude Desktop Integration

Fügen Sie zu Ihrer `claude_desktop_config.json` hinzu:

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/pfad/zu/ihrem/docs/projekt"
    }
  }
}
```

### Cursor & IDE Einstellungen

In den MCP-Einstellungen des Editors konfigurieren:

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## Verfügbare Tool-Handler

Der MCP-Server stellt folgende primäre Tool-Handler bereit:

| Tool | Technischer Zweck |
| :--- | :--- |
| **`search_docs`** | Volltextsuche über Markdown-Quelldateien ausführen. Gibt Dateipfade und passende Zeilennummern zurück. Respektiert `config.exclude` — ausgeschlossene Dateien erscheinen nie in den Ergebnissen. |
| **`list_docs`** | Relative Markdown-Dateipfade im Workspace auflisten (optional auf Unterverzeichnisse beschränkt). Respektiert `config.exclude`. |
| **`read_doc`** | Rohe Markdown-Quellinhalte für angegebene Dateipfade lesen. Zugriff ist strikt auf das Projekt-Root beschränkt. |
| **`get_config`** | Aufgelöste Konfigurationsparameter (`docmd.config.json`) inspizieren. Sensible Schlüssel (API-Tokens, Secret IDs) werden automatisch geschwärzt. |
| **`validate_docs`** | Link-Validierungsprüfungen über Markdown-Quellen ausführen. Gibt Berichte über defekte Links zurück. Respektiert `config.exclude`. |
| **`get_llms_context`** | Konsolidierte `llms-full.txt`-Kontextinhalte abrufen, die für LLM-Prompt-Ingestion optimiert sind. |

## Details zur Protokollkonformität

docmd unterstützt die Standard-MCP-Spezifikation:

* **Transportmechanismus**: `stdio` (JSON-RPC 2.0-Nachrichten über Standard I/O).
* **Logging**: Out-of-Band-Diagnoseprotokolle über `stderr`.
* **Lebenszyklus-Ablauf**: `initialize` : `notifications/initialized` : Tool-Aufrufe.
* **Funktionen**: Stellt `tools`, `resources` und `prompts` bereit.

## Sicherheitskontrollen

* **Lokale Prozess-Sandbox**: Läuft strikt als Unterprozess, ohne externe Netzwerk-Ports zu öffnen.
* **Pfadgrenzen-Verifizierung**: Datei-I/O-Operationen sind auf das Projekt-Root-Verzeichnis beschränkt.
* **`config.exclude`-Durchsetzung**: `search_docs`, `list_docs` und `validate_docs` respektieren die in der Konfiguration definierten `config.exclude`-Glob-Muster — Dateien und Verzeichnisse, die vom Site-Build ausgeschlossen sind, werden gleichermaßen aus MCP-Tool-Ergebnissen ausgeschlossen. Dies stellt sicher, dass KI-Agenten nur absichtlich veröffentlichte Dokumentation sehen.

::: callout tip "MCP vs llms.txt Nutzung" icon:zap
Verwenden Sie **MCP**, wenn KI-Agenten während der Codebearbeitung interaktiven Tool-Zugriff zum Suchen von Dateien oder Validieren von Links benötigen. Verwenden Sie **`llms-full.txt`**, wenn vollständige Website-Kontextinhalte in einzelnen Prompt-Operationen geliefert werden.
:::
