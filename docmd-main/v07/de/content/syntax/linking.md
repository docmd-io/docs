---
title: "Verlinkung & Referenzierung"
description: "Meistern Sie interne Querverweise, externe Ressourcen und zuverlässige Asset-Referenzierung mit der automatischen URL-Normalisierung von docmd."
---

`docmd` bietet ein robustes, Dateisystem-bewusstes Verlinkungssystem. Schreiben Sie Links zu Ihren Quell-`.md`-Dateien ganz natürlich — in jedem Format, das Sie bevorzugen — und die Engine normalisiert diese automatisch in saubere, SEO-optimierte URLs für die Produktion.

::: callout info "Natürlich schreiben, perfekt ausliefern"
Sie müssen keine speziellen Verlinkungskonventionen befolgen. Egal, ob Sie `overview.md`, `overview/` oder nur `overview` schreiben, die Build-Engine erzeugt dieselbe saubere URL mit abschließendem Schrägstrich. Jeder interne Link wird zur Build-Zeit automatisch normalisiert, sodass Sie sich auf den Inhalt konzentrieren können, nicht auf die URL-Formatierung.
:::

## Wie die URL-Normalisierung funktioniert

Während des Build-Prozesses wendet die Engine eine konsistente Reihe von Regeln auf jeden internen Link an — egal ob in Markdown-Texten, Button-Containern, Tags oder der Navigationskonfiguration:

| Was Sie schreiben | Was gerendert wird | Warum |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md`-Erweiterung entfernt, abschließender `/` hinzugefügt |
| `overview` | `overview/` | Abschließender `/` wird automatisch hinzugefügt |
| `overview/` | `overview/` | Bereits korrekt — keine Änderung |
| `api/commands.md` | `api/commands/` | Link in Unterverzeichnis normalisiert |
| `localisation/index.md` | `localisation/` | `index` entfernt — der Ordner ist die kanonische URL |
| `../index.md` | `../` | Parent-Verzeichnis-Index sauber aufgelöst |
| `overview.md#settings` | `overview/#settings` | Hash-Fragment bleibt durch Normalisierung erhalten |
| `./guide.md` | `./guide/` | Relatives Präfix bleibt erhalten |
| `https://example.com` | `https://example.com` | Externe Links bleiben unberührt |

::: callout tip "SEO Best Practice"
Alle internen Seiten werden als URLs im Verzeichnisstil bereitgestellt, die mit einem abschließenden Schrägstrich enden (z. B. `/configuration/overview/`). Dies ist der Industriestandard für statische Websites, verhindert 301-Weiterleitungsketten und gewährleistet konsistente kanonische URLs für die Indizierung durch Suchmaschinen.
:::

## Interne Link-Auflösung

Verlinken Sie auf andere Seiten in Ihrer Dokumentation über relative Pfade zu den Quell-`.md`-Dateien. Die Engine löst diese unabhängig von der Verzeichnistiefe korrekt auf.

| Zielstrategie | Markdown-Syntax |
| :--- | :--- |
| **Geschwister-Seite** | `[Systemübersicht](overview.md)` |
| **Unterverzeichnis** | `[API-Referenz](api/node-api.md)` |
| **Unterverzeichnis-Index**| `[Lokalisierung](localisation/index.md)` |
| **Eltern-Verzeichnis** | `[Zurück zur Startseite](../index.md)` |

## Abschnitts-Anker (Deep Linking)

Navigieren Sie direkt zu bestimmten Überschriften mit Standard-URL-Hash-Fragmenten.

*   **Anker auf derselben Seite**: `[Zum Roadmap springen](#project-roadmap)`
*   **Anker auf anderer Seite**: `[CLI-Flags prüfen](../cli-commands.md#available-flags)`

Hash-Fragmente bleiben während des Normalisierungsprozesses erhalten. Der obige Link wird in der Produktion als `../cli-commands/#available-flags` gerendert.

## Links in einem neuen Tab öffnen

Verwenden Sie das Präfix `external:` bei jedem Link, um das Öffnen in einem neuen Tab zu erzwingen. Dies funktioniert universell — in Standard-Markdown-Links, Button-Containern, Tags und überall dort, wo Sie eine URL schreiben können.

```markdown
<!-- Öffnen in neuem Tab erzwingen -->
[In neuem Tab öffnen](external:./configuration/overview.md)

<!-- Externer Link zu GitHub -->
[GitHub](external:https://github.com/docmd-io/docmd)
```

Standardmäßig werden alle Links (einschließlich HTTP/HTTPS) im selben Fenster geöffnet. Verwenden Sie das Präfix `external:` nur, wenn Sie einen neuen Tab wünschen.

Das Präfix `external:` wird aus der gerenderten URL **entfernt** — es ist ein reines Signal für die Build-Zeit.

## Verlinkung zu Rohdateien (Raw Files)

Standardmäßig entfernt die Engine `.md`-Erweiterungen und normalisiert Pfade. Wenn Sie tatsächlich auf eine rohe `.md`-Datei verlinken müssen (zum Beispiel eine herunterladbare Quelldatei), verwenden Sie das Präfix `raw:`:

```markdown
[Quellcode anzeigen](raw:docs/readme.md)
```

Das Präfix `raw:` umgeht die gesamte Normalisierung — die Erweiterung und der Pfad bleiben exakt so erhalten, wie sie geschrieben wurden. Wie bei `external:` wird das Präfix selbst aus der gerenderten URL entfernt.

## Button-Container

Der `::: button`-Container unterstützt dieselben Verlinkungskonventionen wie Standard-Markdown-Links — einschließlich der Präfixe `external:` und `raw:`:

```markdown
::: button "Erste Schritte" ./getting-started/quick-start.md icon:rocket

::: button "Auf GitHub anzeigen" https://github.com/docmd-io/docmd icon:github

::: button "Quelle herunterladen" raw:docs/readme.md icon:download
```

## Tag-Links

Tags mit `link:`-Werten profitieren ebenfalls vom einheitlichen Normalisierer:

```markdown
::: tag "v0.7.6" link:release-notes/0-7-6.md icon:tag color:#22c55e

::: tag "GitHub" link:https://github.com/docmd-io/docmd icon:github

::: tag "Extern öffnen" link:external:./configuration/overview.md icon:external-link
```

## Navigationskonfiguration

Pfade, die in `navigation.json` und `docmd.config.js` definiert sind, werden ebenfalls zur Build-Zeit normalisiert. Sie können sie in jedem Format schreiben:

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

Alle drei obigen Einträge erzeugen dieselbe kanonische URL: `/configuration/overview/`.

Für Navigationselemente, die in einem neuen Tab geöffnet werden sollen, verwenden Sie das Flag `external`:

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout warning "Index-Seiten in der Navigation"
Wenn Sie auf die Index-Seite eines Verzeichnisses verlinken, verwenden Sie den Ordnerpfad, anstatt explizit auf `index.md` zu verweisen. Beides funktioniert identisch, aber der Ordnerpfad ist sauberer:

```markdown
<!-- Bevorzugt -->
[Lokalisierung](localisation/)

<!-- Funktioniert auch (auto-normalisiert) -->
[Lokalisierung](localisation/index.md)
```
:::

## Protokolle & Externe Ressourcen

Die Engine respektiert Standard-Browserprotokolle für externe Ressourcen. Diese Links werden niemals geändert.

*   **Globales HTTPS**: `[docmd Homepage](https://docmd.io)` — öffnet im selben Tab (Präfix `external:` für neuen Tab verwenden)
*   **Mail-Protokoll**: `[Support-Kanal](mailto:help@docmd.io)` — wird nicht in einem neuen Tab geöffnet
*   **Asset-Protokoll**: `[CLI-Binary herunterladen](/assets/bin/docmd-mac.zip)` — wird nicht normalisiert

## Referenzierung statischer Assets

Um Downloads bereitzustellen oder auf rohe Quelldateien zu verweisen, platzieren Sie diese im Verzeichnis `assets/` Ihres Projekts. Der `docmd`-Builder stellt sicher, dass diese Dateien ohne Pfadänderungen in das Produktions-Root verschoben werden.

```markdown
[Dokumentations-PDF herunterladen](/assets/pdf/handbook.pdf)
[Globale Konfiguration anzeigen](/assets/config/docmd.config.js)
```

::: callout tip "Semantische Verknüpfung für KI"
Verwenden Sie bei der Querverlinkung technischer Module vorrangig **beschreibende Anker** (z. B. `[PWA-Caching optimieren](../plugins/pwa.md)`) anstelle von generischem Text (z. B. `[Mehr lesen](../plugins/pwa.md)`). Detaillierte Link-Labels bieten KI-Agenten eine hochpräzise Karte der semantischen Beziehungen zwischen verschiedenen Dokumentationsknoten im `llms-full.txt`-Kontext.
:::