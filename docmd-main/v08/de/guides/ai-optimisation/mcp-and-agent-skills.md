---
title: "MCP & Agent Skills"
description: "Optimieren Sie Ihren Dokumentations-Workspace für AI-Entwicklungsagenten mit dem Model Context Protocol und benutzerdefinierten Skills."
---

Die Integration von AI-Entwicklungsagenten in Ihren Workflow erfordert strukturierte Schnittstellen, die es Modellen ermöglichen, Dokumentationskontext effizient abzufragen, zu lesen und zu schreiben. `docmd` erfüllt diese Anforderungen über einen nativen **Model Context Protocol (MCP)**-Server und eine erweiterbare **Agent Skills**-Datenbank.

## Model Context Protocol (MCP)-Einrichtung

Das Model Context Protocol verbindet LLM-Umgebungen direkt mit den Tools Ihres lokalen Workspaces.

### 1. Claude Desktop-Integration

Fügen Sie Folgendes zu Ihrer Desktop-Konfigurationsdatei hinzu (typischerweise unter `~/Library/Application Support/Claude/claude_desktop_config.json` auf macOS oder `%APPDATA%\Claude\claude_desktop_config.json` auf Windows):

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

### 2. IDE-Integration (Cursor / Windsurf)

Fügen Sie in den MCP-Einstellungen Ihres Editors einen neuen Server mit dem `stdio`-Transport hinzu:

-   **Command**: `npx @docmd/core mcp`
-   **Transport**: `stdio`

## Verfügbare MCP-Tools

Sobald die Verbindung steht, stehen dem Agenten die folgenden Tools zur Verfügung:

1.  `search_docs(query)`: Führt eine Workspace-weite Volltextsuche durch.
2.  `read_doc(route)`: Ruft den rohen Markdown-Inhalt einer bestimmten Route ab.
3.  `validate_docs()`: Lintet die gesamte Dokumentation und gibt Validierungsfehler zurück (z. B. defekte Links).
4.  `get_llms_context()`: Ruft die konsolidierte `llms-full.txt`-Kontextdatei ab.

## Agent Skills (`SKILL.md`) nutzen

Wenn Sie `docmd init` in Ihrem Projekt ausführen, generiert die Engine automatisch eine `SKILL.md`-Datei im Stammverzeichnis Ihres Workspaces. Diese Datei dient als Prompt-Anweisungskarte für jeden AI-Agenten, der in Ihrem Repository arbeitet.

### Best Practices für AI-Agenten

1.  **Lies zuerst SKILL.md**: Weisen Sie Ihre Agenten an, die `SKILL.md` zu Beginn einer Coding-Session zu lesen. Sie bringt dem Modell benutzerdefinierte Callouts, OpenAPI-Markup und Datei-Strukturen bei.
2.  **Nach Bearbeitungen validieren**: Wenn ein Agent Markdown-Dateien verändert, sollte er das `validate_docs`-Tool aufrufen (oder `npx @docmd/core validate` ausführen), um sicherzustellen, dass keine relativen Links oder Anker-Pfade defekt sind.
3.  **Sprachen synchronisieren**: Wenn das Projekt Versionierung oder mehrere Sprachen verwendet, sollten Agenten die Vergleichsmatrix nutzen, um sicherzustellen, dass alle Übersetzungen synchron bleiben.