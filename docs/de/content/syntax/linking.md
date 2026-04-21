---
title: "Verlinkung & Referenzierung"
description: "Meistern Sie interne Querverweise, externe Ressourcen und die zuverlässige Referenzierung von Assets."
---

`docmd` bietet ein robustes, dateisystembasiertes Verlinkungssystem. Durch die Verwendung relativer Pfade zu Ihren Quell-`.md`-Dateien stellen Sie sicher, dass Links innerhalb Ihrer IDE (z. B. VS Code) funktionsfähig bleiben und für das Produktions-Deployment automatisch umgeschrieben werden.

::: callout info "Erweiterungsneutralität"
Während des Build-Prozesses löst die Engine `.md`-Erweiterungen automatisch in ihre entsprechenden relativen HTML-Pendants auf. Dies garantiert, dass interne Dokumentationslinks niemals brechen, unabhängig davon, ob Sie den lokalen Quellcode oder die kompilierte Produktionswebsite durchsuchen.
:::

## Interne Pfadauflösung

| Strategie | Markdown-Syntax |
| :--- | :--- |
| **Gleiches Verzeichnis** | `[Systemübersicht](overview.md)` |
| **Unterverzeichnis** | `[API-Referenz](api/node-api.md)` |
| **Übergeordnetes Verzeichnis**| `[Zurück zum Start](../index.md)` |

## Abschnittsanker (Deep Linking)

Navigieren Sie direkt zu bestimmten Überschriften unter Verwendung von Standard-URL-Slugs.

*   **Anker auf derselben Seite**: `[Zum Fahrplan springen](#projekt-roadmap)`
*   **Seitenübergreifender Anker**: `[CLI-Flags prüfen](../cli-commands.md#verfügbare-flags)`

## Protokolle & externe Ressourcen

Die Engine respektiert die Standard-Browserprotokolle für globale Ressourcen.

*   **Globales HTTPS**: `[docmd Homepage](https://docmd.io)`
*   **Mail-Protokoll**: `[Support-Kanal](mailto:help@docmd.io)`
*   **Asset-Protokoll**: `[CLI-Binärdatei herunterladen](/assets/bin/docmd-mac.zip)`

## Referenzierung statischer Assets

Um Downloads bereitzustellen oder auf Rohdateien zu verweisen, platzieren Sie diese im `assets/`-Verzeichnis Ihres Projekts. Der `docmd`-Builder stellt sicher, dass diese Dateien ohne Pfadänderungen in das Produktionsverzeichnis verschoben werden.

```markdown
[Handbuch als PDF herunterladen](/assets/pdf/handbook.pdf)
[Globale Konfiguration ansehen](/assets/config/docmd.config.js)
```

::: callout tip "Semantische Verknüpfung für KI"
Bevorzugen Sie beim Querverweisen technischer Module **aussagekräftige Ankertexte** (z. B. `[PWA-Caching optimieren](../plugins/pwa.md)`) gegenüber generischem Text (z. B. `[Hier lesen](../plugins/pwa.md)`). Detaillierte Link-Beschriftungen liefern KI-Agenten eine präzise Karte der semantischen Beziehungen zwischen verschiedenen Dokumentationsknoten im `llms-full.txt`-Kontext.
:::