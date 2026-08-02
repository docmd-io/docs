---
title: "Verlinken & Referenzieren"
description: "Meistern Sie interne Querverweise, externe Ressourcen, neue-Tab-Verhalten und statische Asset-Referenzen."
---

docmd bietet ein zuverlässiges, dateisystembewusstes Linksystem. Schreiben Sie Links zu Ihren `.md`-Quelldateien in beliebigem Format — die Engine normalisiert sie automatisch zu sauberen, SEO-optimierten URLs.

::: callout info "Natürlich schreiben, perfekt ausliefern"
Sie benötigen keine speziellen Link-Konventionen. Schreiben Sie `overview.md`, `overview/` oder `overview` — die Build-Engine erzeugt in jedem Fall exakt dieselbe saubere, nachgestellte-Schrägstrich-URL.
:::

## URL-Normalisierung

Während des Build-Prozesses normalisiert die Engine automatisch jeden internen Link. Dies gilt für Markdown-Text, Button-Container, Tags und Navigationskonfiguration.

| Was Sie schreiben | Was gerendert wird | Warum |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md`-Erweiterung entfernt, nachgestellter `/` hinzugefügt. |
| `overview` | `overview/` | Nachgestellter `/` automatisch hinzugefügt. |
| `overview/` | `overview/` | Bereits korrekt. Keine Änderung. |
| `api/commands.md` | `api/commands/` | Unterverzeichnis-Link normalisiert. |
| `localisation/index.md` | `localisation/` | `index` entfernt, der Ordner ist die kanonische URL. |
| `../index.md` | `../` | Übergeordneter Verzeichnisindex sauber aufgelöst. |
| `overview.md#settings` | `overview/#settings` | Hash-Fragment erhalten. |
| `https://example.com` | `https://example.com` | Externe Links bleiben unverändert. |

## Interne Links

Verlinken Sie zu anderen Seiten mit relativen Pfaden zu den `.md`-Quelldateien. Die Engine löst sie unabhängig von der Verzeichnistiefe korrekt auf.

| Ziel | Beispiel |
| :--- | :--- |
| Gleichrangige Seite | `[System Overview](overview.md)` |
| Unterverzeichnis-Seite | `[API Reference](api/node-api.md)` |
| Unterverzeichnis-Index | `[Localisation](localisation/index.md)` |
| Übergeordnetes Verzeichnis | `[Back to Home](../index.md)` |

## Abschnitts-Anker

Navigieren Sie direkt zu einer Überschrift mit Standard-URL-Hash-Fragmenten.

```markdown
<!-- Seiteninterner Anker -->
[Jump to Roadmap](#project-roadmap)

<!-- Seitenübergreifender Anker -->
[Review CLI Flags](../api/cli-commands.md#available-flags)
```

Hash-Fragmente bleiben durch die Normalisierung erhalten. Der seitenübergreifende Link oben wird in der Produktion als `../api/cli-commands/#available-flags` gerendert.

## In neuem Tab öffnen

Stellen Sie `external:` jedem Link-URL voran, um ihn in einem neuen Browser-Tab zu öffnen. Dies funktioniert in Standard-Markdown-Links, Buttons und Tags.

```markdown
[Open in New Tab](external:./configuration/overview.md)
[GitHub](external:https://github.com/docmd-io/docmd)
```

Das `external:`-Präfix wird aus der gerenderten URL entfernt. Standardmäßig öffnen alle Links im selben Fenster.

## Links zu Rohdateien

Verwenden Sie das `raw:`-Präfix, um die Normalisierung zu umgehen und direkt auf eine herunterladbare Datei zu verlinken. Erweiterung und Pfad bleiben genau wie geschrieben erhalten.

```markdown
[View Raw Source](raw:docs/readme.md)
```

## Buttons & Tags

Die `::: button`- und `::: tag`-Container unterstützen alle Standard-Link-Konventionen, einschließlich `external:`- und `raw:`-Präfixen.

```markdown
::: button "Get Started" ./getting-started/quick-start.md icon:rocket
::: button "View on GitHub" external:https://github.com/docmd-io/docmd icon:github
::: button "Download Source" raw:docs/readme.md icon:download

::: tag "v0.8.2" link:release-notes/0-8-2.md icon:tag color:#22c55e
::: tag "Open Externally" link:external:./configuration/overview.md icon:external-link
```

## Navigationskonfiguration

In `navigation.json` und `docmd.config.json` definierte Pfade werden zur Build-Zeit normalisiert. Schreiben Sie sie in beliebigem Format — alle drei folgenden Einträge erzeugen die identische kanonische URL.

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

Für Einträge, die in einem neuen Tab geöffnet werden sollen, setzen Sie das `external`-Flag.

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout warning "Indexseiten in der Navigation"
Wenn Sie auf die Indexseite eines Verzeichnisses verlinken, verwenden Sie den Ordnerpfad statt explizit auf `index.md` zu verweisen. Beides funktioniert identisch, aber der Ordnerpfad ist sauberer.

```markdown
<!-- Bevorzugt -->
[Localisation](localisation/)

<!-- Funktioniert auch -->
[Localisation](localisation/index.md)
```
:::

## Protokolle & externe Ressourcen

Die Engine respektiert Standard-Browser-Protokolle für externe Ressourcen und ändert diese Links niemals.

*   **HTTPS** - `[docmd Homepage](https://docmd.io)` - öffnet im selben Tab.
*   **E-Mail** - `[Support](mailto:help@docmd.io)` - öffnet den E-Mail-Client.
*   **Assets** - `[Download CLI Binary](/assets/bin/docmd-mac.zip)` - wird nicht normalisiert.

## Statische Assets

Platzieren Sie herunterladbare Dateien im `assets/`-Verzeichnis Ihres Projekts. Der Builder verschiebt diese Dateien ohne Pfadänderungen in das Produktions-Root.

```markdown
[Download Documentation PDF](/assets/pdf/handbook.pdf)
[View Raw Global Config](/assets/config/docmd.config.json)
```

::: callout tip "Semantische Verlinkung für KI"
Bevorzugen Sie **beschreibende Ankertexte** (z. B. `[Optimise PWA caching](../plugins/pwa.md)`) gegenüber generischen Labels (z. B. `[Read more](../plugins/pwa.md)`). Detaillierte Link-Labels liefern KI-Agenten eine hochwertige Karte semantischer Beziehungen im `llms.txt`-Stream.
:::