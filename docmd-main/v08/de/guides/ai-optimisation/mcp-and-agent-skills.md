---
title: "MCP & Agent-Skills"
description: "Optimieren Sie Ihren Dokumentations-Workspace für KI-Entwicklungs-Agenten mithilfe des Model Context Protocols und benutzerdefinierter Skills."
---

Die Integration von KI-Entwicklungs-Agenten in Ihren Arbeitsablauf erfordert strukturierte Schnittstellen, über die Modelle den Dokumentationskontext effizient abfragen, lesen und schreiben können. `docmd` erfüllt diese Anforderung durch einen nativen **Model Context Protocol (MCP)** Server und eine erweiterbare **Agent Skills**-Datenbank.

## Einrichtung des Model Context Protocols (MCP)

Das Model Context Protocol verbindet LLM-Umgebungen direkt mit den Tools Ihres lokalen Workspaces.

### 1. Claude Desktop Integration

Fügen Sie Folgendes zu Ihrer Desktop-Konfigurationsdatei hinzu (normalerweise unter `~/Library/Application Support/Claude/claude_desktop_config.json` unter macOS oder `%APPDATA%\Claude\claude_desktop_config.json` unter Windows):

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

### 2. IDE-Integration (Cursor / Windsurf)

Fügen Sie im MCP-Einstellungsbereich Ihres Editors einen neuen Server hinzu, der den `stdio`-Transport verwendet:

-   **Befehl (Command)**: `npx @docmd/core mcp`
-   **Transport**: `stdio`

## Verfügbare MCP-Werkzeuge

Nach erfolgreicher Verbindung stehen dem Agenten folgende Tools zur Verfügung:

1.  `search_docs(query)`: Führt eine workspace-weite Volltextsuche durch.
2.  `read_doc(route)`: Ruft den rohen Markdown-Inhalt einer bestimmten Route ab.
3.  `validate_docs()`: Linter für die gesamte Dokumentation und gibt Validierungsfehler zurück (z. B. fehlerhafte Links).
4.  `get_llms_context()`: Ruft die konsolidierte Kontextdatei `llms-full.txt` ab.

## Nutzung von Agent-Skills (`SKILL.md`)

Wenn Sie `docmd init` in Ihrem Projekt ausführen, generiert die Engine automatisch eine `SKILL.md`-Datei in Ihrem Workspace-Stammverzeichnis. Diese Datei dient als Prompt-Instruktionskarte für jeden KI-Agenten, der an Ihrem Repository arbeitet.

### Best Practices für KI-Agenten

1.  **Zuerst SKILL.md lesen**: Weisen Sie Ihre Agenten an, zu Beginn einer Codierungssitzung die Datei `SKILL.md` zu lesen. Dies vermittelt dem Modell die Nutzung von benutzerdefinierten Callouts, OpenAPI-Markup und Dateistrukturen.
2.  **Nach Bearbeitungen validieren**: Wann immer ein Agent Markdown-Dateien ändert, sollte er das Tool `validate_docs` aufrufen (oder `npx @docmd/core validate` ausführen), um sicherzustellen, dass keine relativen Links oder Ankerpfade fehlerhaft sind.
3.  **Sprachen synchronisieren**: Wenn das Projekt Versionierung oder mehrere Sprachen verwendet, sollten Agenten die Vergleichsmatrix nutzen, um sicherzustellen, dass alle Übersetzungen synchron bleiben.
