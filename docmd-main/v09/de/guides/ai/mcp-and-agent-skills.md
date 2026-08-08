---
title: "MCP & Agent Skills"
description: "Konfigurieren Sie Model Context Protocol (MCP) Server und KI-Agenten-Skills für docmd-Workspaces."
---

Die Integration von KI-Entwicklungsagenten in Ihren Workflow erfordert strukturierte Schnittstellen, die es Modellen ermöglichen, Dokumentationskontexte effizient abzufragen, zu lesen und zu validieren. docmd erfüllt diesen Bedarf über einen nativen **Model Context Protocol (MCP)** Server und automatisch generierte **Agent Skills**-Anweisungen.

## Model Context Protocol (MCP) Einrichtung

Das Model Context Protocol verbindet LLM-Umgebungen direkt über `stdio` mit Ihren lokalen Workspace-Tools.

### 1. Claude Desktop Integration

Fügen Sie Folgendes zu Ihrer `claude_desktop_config.json` hinzu:

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

### 2. IDE-Integration (Cursor / Windsurf)

Fügen Sie im MCP-Einstellungsbereich Ihres Editors einen neuen Server mit dem `stdio`-Transport hinzu:

* **Befehl**: `npx @docmd/core mcp`
* **Transport**: `stdio`

## Verfügbare MCP-Tools

Sobald verbunden, können Agenten 6 primäre Tool-Handler ausführen:

1. `search_docs(query)`: Führt Volltextsuchen über Workspace-Dateien hinweg aus.
2. `list_docs(subdir?)`: Listet relative Markdown-Dateipfade auf, optional auf Sprachversion oder Sprache beschränkt.
3. `read_doc(route)`: Liest rohe Markdown-Inhalte für eine geschützte Datei-Route.
4. `get_config()`: Inspeziert aufgelöste `docmd.config.json`-Optionen mit geschwärzten Geheimwerten.
5. `validate_docs()`: Prüft interne Link-Ziele und meldet defekte Anker.
6. `get_llms_context()`: Ruft den konsolidierten `llms-full.txt`-Kontext ab.

## Agent Skills nutzen (`SKILL.md`)

Die Ausführung von `docmd init` generiert eine `SKILL.md`-Datei im Root-Verzeichnis Ihres Repositories. Dieses Dokument dient als Bedienungsanleitung für KI-Agenten, die an Ihrer Codebasis arbeiten.

::: callout tip "Empfohlener Agenten-Workflow" icon:bot
1. **Kontext initialisieren**: Weisen Sie Agenten an, `SKILL.md` zu Beginn einer Sitzung zu prüfen, um eigene Callouts, OpenAPI-Markup und Dateistrukturen zu erlernen.
2. **Edits validieren**: Weisen Sie Agenten an, nach dem Bearbeiten von Markdown-Dateien `validate_docs` oder `npx @docmd/core validate` auszuführen, um kaputte Links zu verhindern.
:::
