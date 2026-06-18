---
title: "MCP-Server"
description: "Verbinden Sie AI-Entwicklungsagenten über das Model Context Protocol mit Ihrem Dokumentations-Workspace."
---

docmd enthält einen nativen Model Context Protocol (MCP)-Server, der es AI-Entwicklungsagenten ermöglicht, programmatisch und über eine sichere lokale Verbindung mit Ihrem Dokumentations-Workspace zu interagieren.

## Was ist MCP?

Das [Model Context Protocol](external:https://modelcontextprotocol.io/) ist ein offener Standard, um AI-Modelle mit externen Tools und Datenquellen zu verbinden. Es verwendet JSON-RPC 2.0-Nachrichten über eine Transport-Schicht (stdio, HTTP). docmd implementiert den `stdio`-Transport — der Agent spawnt `docmd mcp` als Child-Process und kommuniziert via stdin/stdout.

## Schnellstart

```bash
docmd mcp
```

Dies startet den MCP-Server über `stdio`. Es werden keine Netzwerk-Ports geöffnet — die gesamte Kommunikation findet über Standard-Ein-/Ausgabe-Streams statt.

### Claude Desktop-Konfiguration

Fügen Sie dies zu Ihrer Claude Desktop `claude_desktop_config.json` hinzu:

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["@docmd/core", "mcp"],
      "cwd": "/path/to/your/docs/project"
    }
  }
}
```

### Cursor / Windsurf-Konfiguration

Fügen Sie dies zu den MCP-Einstellungen Ihres Editors hinzu:

```json "mcp_settings.json"
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## Verfügbare Tools

Der MCP-Server stellt vier Tools bereit, die Agenten aufrufen können:

| Tool | Beschreibung |
| :--- | :--- |
| **`search_docs`** | Volltextsuche über alle Dokumentations-Dateien. Gibt passende Zeilen mit Dateipfaden und Zeilennummern zurück. |
| **`read_doc`** | Liest den rohen Markdown-Inhalt einer beliebigen Dokumentations-Datei über ihren relativen Pfad. |
| **`validate_docs`** | Führt eine Link-Validierung über alle Markdown-Dateien aus. Gibt eine Liste defekter Links mit Datei, Zeile und Ziel zurück. |
| **`get_llms_context`** | Ruft den vollständigen `llms-full.txt`-Kontext ab — die vereinte Inhaltsdarstellung der gesamten Dokumentations-Site, optimiert für die LLM-Ingestion. |

### Tool-Schemas

#### `search_docs`

```json
{
  "name": "search_docs",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Der zu suchende Begriff oder Ausdruck." }
    },
    "required": ["query"]
  }
}
```

#### `read_doc`

```json
{
  "name": "read_doc",
  "inputSchema": {
    "type": "object",
    "properties": {
      "route": { "type": "string", "description": "Relativer Pfad zur Markdown-Datei (z. B. docs/getting-started.md)." }
    },
    "required": ["route"]
  }
}
```

#### `validate_docs` / `get_llms_context`

Keine Eingabeparameter erforderlich.

## Protokoll-Details

docmd implementiert die MCP-Spezifikation (Protokollversion `2025-03-26`):

- **Transport**: `stdio` — JSON-RPC 2.0-Nachrichten über stdin/stdout, eine pro Zeile
- **Diagnostik**: Geloggt nach `stderr` (greift nicht in den JSON-RPC-Stream ein)
- **Lebenszyklus**: `initialize` → `notifications/initialized` → Tool-Calls
- **Ping**: Antwortet auf `ping`-Anfragen mit `{}` (für Connection-Health-Checks erforderlich)
- **Capabilities**: Deklariert `tools`, `resources` und `prompts` (Tools sind die primäre Schnittstelle)

## Datenschutz & Sicherheit

- **Nur lokal**: Der Server läuft als Child-Process — keine Netzwerk-Exposition, keine geöffneten Ports
- **Sandboxed**: Datei-Operationen sind auf das Projekt-Arbeitsverzeichnis beschränkt
- **Keine Telemetrie**: Es werden keine Daten übertragen — die gesamte Verarbeitung findet auf Ihrer Maschine statt

## Ergänzende Features

Der MCP-Server arbeitet Hand in Hand mit anderen AI-First-Features in docmd:

- **`llms.txt` / `llms-full.txt`**: Zur Build-Zeit vom `llms`-Plugin generiert. Jeder Agent kann diese Dateien ohne MCP direkt von Ihrer deployed Site abrufen.
- **Copy-Context-Widget**: Ein Browser-UI-Button, der optimierten Seiten-Inhalt in die Zwischenablage kopiert, damit Sie ihn bequem in AI-Chat-Fenster einfügen können.
- **SKILL.md**: Beim `docmd init` automatisch generierte Agent-Anleitung. Sie verweist auf die Wissensdatenbank [docmd-skills](external:https://github.com/docmd-io/docmd-skills).

::: callout tip "Wann MCP vs. llms.txt"
Verwenden Sie **MCP**, wenn ein Agent während der Entwicklung interaktiv suchen, bestimmte Dateien lesen oder Links validieren muss. Verwenden Sie **llms-full.txt**, wenn ein Agent den gesamten Dokumentations-Kontext in einem einzigen Fetch benötigt (z. B. für RAG oder Pre-Prompting).
:::