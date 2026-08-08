---
title: "Verlinken & Referenzieren"
description: "Meistern Sie interne Querverweise, URL-Normalisierung, externe Neue-Tab-Auslöser und statische Asset-Referenzen in docmd."
---

`docmd` bietet ein dateisystembewusstes Verlinkungssystem. Schreiben Sie Links mit Referenzen auf `.md`-Quelldateien ganz natürlich — der Compiler normalisiert Zielpfade automatisch in saubere, kanonische URLs.

::: callout info "Automatische Pfadnormalisierung" icon:info
Schreiben Sie Zielpfade mit `.md`-Erweiterungen, nachgestellten Schrägstrichen oder direkten Dateinamen (`overview.md`, `overview/` oder `overview`). Der Build-Compiler löst sie in identische kanonische URLs auf.
:::

## Mechanik der URL-Normalisierung

Während der Build-Kompilierung normalisiert `docmd` interne Linkziele automatisch über Markdown-Fließtext, Button-Container, Tags und Navigationsbäume hinweg:

| Eingabepfad | Kompilierte Ausgabe-URL | Auflösungsregel |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | Entfernt `.md`-Erweiterung, fügt nachgestellten `/` an. |
| `overview` | `overview/` | Fügt nachgestellten `/` automatisch an. |
| `overview/` | `overview/` | Behält das bestehende kanonische Format bei. |
| `api/commands.md` | `api/commands/` | Normalisiert Unterverzeichnis-Route. |
| `localisation/index.md` | `localisation/` | Entfernt `index`, löst Verzeichnis-Stamm auf. |
| `../index.md` | `../` | Löst übergeordneten Verzeichnis-Stamm auf. |
| `overview.md#settings` | `overview/#settings` | Behält URL-Hash-Fragment bei. |
| `https://example.com` | `https://example.com` | Behält externe URL unverändert bei. |

## Interne Dokumentenlinks

Referenzieren Sie interne Dokumente unter Verwendung relativer Dateisystempfade:

| Link-Ziel | Syntax-Beispiel |
| :--- | :--- |
| **Gleichrangige Seite** | `[System Overview](overview.md)` |
| **Unterverzeichnis-Seite** | `[API Reference](api/node-api.md)` |
| **Verzeichnis-Index** | `[Localisation](localisation/index.md)` |
| **Übergeordnetes Verzeichnis** | `[Back to Home](../index.md)` |

## Abschnitts-Anker-Links

Navigieren Sie zu bestimmten Dokument-Überschriften unter Verwendung von URL-Hash-Fragmenten:

```markdown
<!-- Seiteninterner Anker -->
[Jump to Roadmap](#project-roadmap)

<!-- Seitenübergreifender Anker -->
[Review CLI Flags](../api/cli-commands.md#available-flags)
```

Hash-Fragmente bleiben durch die URL-Normalisierung erhalten. Der seitenübergreifende Link oben kompiliert zu `../api/cli-commands/#available-flags`.

## Öffnen externer Links in neuen Tabs

Stellen Sie `external:` vor jedes URL-Ziel, um das Öffnen des Links in einem neuen Browser-Tab zu erzwingen (`target="_blank"`):

```markdown
[Open in New Tab](external:./configuration/overview.md)
[GitHub Repository](external:https://github.com/docmd-io/docmd)
```

Die Präfix-Zeichenfolge `external:` wird aus den gerenderten HTML-href-Attributen entfernt.

## Direkte unverarbeitete Asset-Links (`raw:`)

Verwenden Sie das Präfix `raw:`, um die URL-Normalisierung zu umgehen und direkt auf statische herunterladbare Dateien zu verweisen:

```markdown
[Download Raw Source](raw:docs/readme.md)
```

## Reichhaltige Container & interaktive Elemente

Button- (`::: button`) und Tag- (`::: tag`) Container unterstützen alle Verlinkungs-Präfixe, einschließlich der Modifikatoren `external:` und `raw:`:

```markdown
::: button "Quick Start Guide" ./getting-started/quick-start.md icon:rocket
::: button "GitHub Repository" external:https://github.com/docmd-io/docmd icon:github
::: button "Download Manifest" raw:docs/manifest.json icon:download

::: tag "v0.9.0 Release" link:release-notes/0-9-0.md icon:tag color:#22c55e
::: tag "External Site" link:external:https://docmd.io icon:external-link
:::
```

## Navigations-Konfigurations-Links

Routeneinträge in `navigation.json` und `docmd.config.json` werden während der Build-Kompilierung automatisch normalisiert:

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

Um das Öffnen eines Navigationselements in einem neuen Tab zu erzwingen, setzen Sie `"external": true`:

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout tip "Verlinkung zu Kategorie-Verzeichnissen" icon:lightbulb
Wenn Sie auf die Indexseite eines Unterverzeichnisses verlinken, referenzieren Sie den Ordnerpfad direkt (`localisation/`), anstatt `index.md` anzuhängen.
:::

## Protokolle & Asset-Pfade

Der Compiler behält standardmäßige Netzwerkprotokolle und statische Asset-Pfade bei:

- **HTTPS-Protokolle**: `[docmd Homepage](https://docmd.io)` (öffnet im selben Tab, außer `external:` ist vorangestellt).
- **Mail-Protokolle**: `[Support Desk](mailto:help@docmd.io)` (löst E-Mail-Client aus).
- **Statische Assets**: `[Download Asset](/assets/bin/docmd-mac.zip)` (umgeht URL-Normalisierung).

::: callout tip "Beschreibende Anker für KI-Kontext" icon:sparkles
Verwenden Sie **beschreibenden Ankertext** (`[PWA-Caching konfigurieren](../plugins/pwa.md)`) anstelle generischer Beschriftungen (`[Mehr lesen](../plugins/pwa.md)`). Expliziter Linktext verbessert das semantische Verständnis für Such-Indexierer und KI-Agenten.
:::