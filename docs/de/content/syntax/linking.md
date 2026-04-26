---
title: "Verlinkung & Referenzierung"
description: "Meistern Sie die automatische URL-Normalisierung von docmd für interne Querverweise, externe Ressourcen und zuverlässige Asset-Referenzierung."
---

`docmd` bietet ein robustes, dateisystembasiertes Verlinkungssystem. Schreiben Sie Links zu Ihren `.md`-Quelldateien ganz natürlich — in jedem Format, das Sie bevorzugen — und die Engine normalisiert sie automatisch zu sauberen, SEO-optimierten URLs für die Produktion.

::: callout info "Natürlich schreiben, perfekt ausliefern"
Sie müssen keine speziellen Verlinkungskonventionen befolgen. Ob Sie `overview.md`, `overview/` oder einfach nur `overview` schreiben — die Build-Engine erzeugt dieselbe saubere URL mit abschließendem Schrägstrich. Jeder interne Link wird zur Build-Zeit automatisch normalisiert, sodass Sie sich auf den Inhalt konzentrieren können.
:::

## Wie die URL-Normalisierung funktioniert

Während des Build-Prozesses wendet die Engine einheitliche Regeln auf jeden internen Link an — ob im Markdown-Text, in Button-Containern, Tags oder in der Navigationskonfiguration:

| Was Sie schreiben | Was gerendert wird | Warum |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md`-Erweiterung entfernt, `/` angehängt |
| `overview` | `overview/` | Abschließender `/` automatisch hinzugefügt |
| `overview/` | `overview/` | Bereits korrekt — keine Änderung |
| `api/commands.md` | `api/commands/` | Unterverzeichnis-Link normalisiert |
| `localisation/index.md` | `localisation/` | `index` entfernt — der Ordner ist die kanonische URL |
| `../index.md` | `../` | Übergeordnetes Verzeichnis korrekt aufgelöst |
| `overview.md#settings` | `overview/#settings` | Hash-Fragment beibehalten |
| `./guide.md` | `./guide/` | Relativer Präfix beibehalten |
| `https://example.com` | `https://example.com` | Externe Links werden direkt durchgereicht |

::: callout tip "SEO Best Practice"
Alle internen Seiten werden als Verzeichnis-URLs mit abschließendem Schrägstrich bereitgestellt (z. B. `/configuration/overview/`). Dies ist der Industriestandard für statische Websites, verhindert 301-Weiterleitungsketten und stellt konsistente kanonische URLs sicher.
:::

## Interne Linkauflösung

Verlinken Sie auf andere Seiten mit relativen Pfaden zu den `.md`-Quelldateien. Die Engine löst sie unabhängig von der Verzeichnistiefe korrekt auf.

| Zielstrategie | Markdown-Syntax |
| :--- | :--- |
| **Seite auf gleicher Ebene** | `[Systemübersicht](overview.md)` |
| **Unterverzeichnis** | `[API-Referenz](api/node-api.md)` |
| **Unterverzeichnis-Index** | `[Lokalisierung](localisation/index.md)` |
| **Übergeordnetes Verzeichnis** | `[Zurück zur Startseite](../index.md)` |

## Abschnittsanker (Deep Linking)

Navigieren Sie direkt zu bestimmten Überschriften mit Standard-URL-Hash-Fragmenten.

*   **Seiteninterne Anker**: `[Zur Roadmap springen](#project-roadmap)`
*   **Seitenübergreifende Anker**: `[CLI-Flags ansehen](../cli-commands.md#available-flags)`

Hash-Fragmente bleiben durch den Normalisierungsprozess hindurch erhalten. Der obige Link wird in der Produktion als `../cli-commands/#available-flags` gerendert.

## Links in neuem Tab öffnen

Verwenden Sie das `external:`-Präfix bei jedem Link, um ihn in einem neuen Tab zu öffnen. Dies funktioniert universell — in Standard-Markdown-Links, Button-Containern, Tags und überall sonst, wo Sie eine URL schreiben können.

```markdown
<!-- Standard-Markdown -->
[Extern öffnen](external:https://github.com/docmd-io/docmd)

<!-- Funktioniert auch für interne Links, die in einem neuen Tab geöffnet werden sollen -->
[In neuem Tab öffnen](external:./configuration/overview.md)
```

Links, die mit `https://` oder `http://` beginnen, werden automatisch als extern erkannt und ohne `external:`-Präfix in einem neuen Tab geöffnet.

Das `external:`-Präfix wird aus der gerenderten URL **entfernt** — es ist rein ein Build-Zeit-Signal.

## Verlinkung auf Rohdateien

Standardmäßig entfernt die Engine `.md`-Erweiterungen und normalisiert Pfade. Wenn Sie tatsächlich auf eine rohe `.md`-Datei verlinken müssen (z. B. eine herunterladbare Quelldatei), verwenden Sie das `raw:`-Präfix:

```markdown
[Rohquelle anzeigen](raw:docs/readme.md)
```

Das `raw:`-Präfix umgeht die gesamte Normalisierung — Erweiterung und Pfad bleiben exakt wie geschrieben erhalten. Wie bei `external:` wird das Präfix selbst aus der gerenderten URL entfernt.

## Button-Container

Der `::: button`-Container unterstützt dieselben Verlinkungskonventionen — einschließlich `external:` und `raw:`:

```markdown
::: button "Erste Schritte" ./getting-started/quick-start.md icon:rocket

::: button "Auf GitHub ansehen" https://github.com/docmd-io/docmd icon:github

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

In `navigation.json` und `docmd.config.js` definierte Pfade werden ebenfalls zur Build-Zeit normalisiert:

```json "navigation.json"
[
  { "title": "Übersicht", "path": "configuration/overview" },
  { "title": "Übersicht", "path": "configuration/overview.md" },
  { "title": "Übersicht", "path": "configuration/overview/" }
]
```

Alle drei Einträge erzeugen dieselbe kanonische URL: `/configuration/overview/`.

Für Navigationseinträge, die in einem neuen Tab geöffnet werden sollen, verwenden Sie das `external`-Flag:

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
Wenn Sie auf die Indexseite eines Verzeichnisses verlinken, verwenden Sie den Ordnerpfad anstelle einer expliziten Referenz auf `index.md`:

```markdown
<!-- Empfohlen -->
[Lokalisierung](localisation/)

<!-- Funktioniert ebenfalls (automatisch normalisiert) -->
[Lokalisierung](localisation/index.md)
```
:::

## Protokolle & externe Ressourcen

Die Engine respektiert Standard-Browserprotokolle. Diese Links werden automatisch als extern erkannt (öffnen in neuem Tab).

*   **Globales HTTPS**: `[docmd-Homepage](https://docmd.io)`
*   **Mail-Protokoll**: `[Support-Kanal](mailto:help@docmd.io)` — öffnet nicht in neuem Tab
*   **Asset-Protokoll**: `[CLI-Binary herunterladen](/assets/bin/docmd-mac.zip)` — wird nicht normalisiert

## Statische Asset-Referenzierung

Platzieren Sie Downloads im `assets/`-Verzeichnis. Der Builder verschiebt diese Dateien ohne Pfadänderungen in das Produktionswurzelverzeichnis.

```markdown
[Dokumentations-PDF herunterladen](/assets/pdf/handbook.pdf)
[Globale Konfiguration anzeigen](/assets/config/docmd.config.js)
```

::: callout tip "Semantische Verlinkung für KI"
Beim Querverlinken technischer Module priorisieren Sie **beschreibende Anker** (z. B. `[PWA-Caching optimieren](../plugins/pwa.md)`) gegenüber generischem Text (z. B. `[Mehr erfahren](../plugins/pwa.md)`). Detaillierte Link-Labels bieten KI-Agenten eine hochauflösende Karte der semantischen Beziehungen im `llms-full.txt`-Kontext.
:::