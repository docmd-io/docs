---
title: "MCP-Server"
description: "Verbinden Sie KI-Agenten mit Ihrem Dokumentations-Workspace über das Model Context Protocol."
---

docmd enthält einen nativen Model Context Protocol (MCP) Server, der es KI-Agenten ermöglicht, programmatisch mit Ihrem Dokumentations-Workspace zu interagieren.

## Was ist MCP?

Das [Model Context Protocol](external:https://modelcontextprotocol.io/) ist ein offener Standard zur Verbindung von KI-Modellen mit externen Werkzeugen und Datenquellen. Es verwendet JSON-RPC 2.0 Nachrichten über eine Transportschicht (stdio, HTTP). docmd implementiert den `stdio`-Transport — der Agent startet `docmd mcp` als Kindprozess und kommuniziert über stdin/stdout.

## Schnellstart

```bash
docmd mcp
```

Der MCP-Server wird über `stdio` gestartet. Es werden keine Netzwerk-Ports geöffnet — die gesamte Kommunikation erfolgt über Standard-Ein-/Ausgabeströme.

### Claude Desktop Konfiguration

Fügen Sie Folgendes zu Ihrer `claude_desktop_config.json` hinzu:

```json
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

### Cursor / Windsurf Konfiguration

```json
{
  "command": "npx @docmd/core mcp",
  "transport": "stdio"
}
```

## Verfügbare Werkzeuge

| Werkzeug | Beschreibung |
| :--- | :--- |
| **`search_docs`** | Volltextsuche über alle Dokumentationsdateien. |
| **`read_doc`** | Liest den rohen Markdown-Inhalt einer Datei anhand des relativen Pfads. |
| **`validate_docs`** | Führt eine Link-Validierung über alle Markdown-Dateien durch. |
| **`get_llms_context`** | Gibt den vollständigen `llms-full.txt`-Kontext zurück. |

## Protokolldetails

docmd implementiert die MCP-Spezifikation (Protokollversion `2025-03-26`):

- **Transport**: `stdio` — JSON-RPC 2.0 Nachrichten über stdin/stdout
- **Diagnose**: Wird nach `stderr` protokolliert
- **Lebenszyklus**: `initialize` → `notifications/initialized` → Werkzeugaufrufe
- **Ping**: Antwortet auf `ping`-Anfragen mit `{}` für Verbindungszustandsprüfungen

## Datenschutz & Sicherheit

- **Nur lokal**: Der Server läuft als Kindprozess — keine Netzwerkexposition
- **Sandboxed**: Dateioperationen sind auf das Projektverzeichnis beschränkt
- **Keine Telemetrie**: Es werden keine Daten gesendet

## Ergänzende Funktionen

- **`llms.txt` / `llms-full.txt`**: Wird zur Build-Zeit vom `llms`-Plugin generiert.
- **Kontext-kopieren-Widget**: Browser-Schaltfläche zum Kopieren von seitenoptimiertem KI-Kontext.
- **SKILL.md**: Von `docmd init` generiertes Agenten-Handbuch. Verweist auf [docmd-skills](external:https://github.com/docmd-io/docmd-skills).
