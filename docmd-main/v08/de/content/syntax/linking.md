---
title: "Verlinkung & Referenzierung"
description: "Meistern Sie interne Querverweise, externe Ressourcen, das Verhalten beim Öffnen in neuen Tabs und die Referenzierung statischer Assets."
---

`docmd` bietet ein zuverlässiges, Dateisystem-bewusstes Verlinkungssystem. Schreiben Sie Links zu Ihren Quell-`.md`-Dateien ganz natürlich in jedem beliebigen Format - die Engine normalisiert diese automatisch in saubere, SEO-optimierte URLs.

::: callout info "Natürlich schreiben, perfekt ausliefern"
Sie müssen keine speziellen Verlinkungskonventionen befolgen. Schreiben Sie `overview.md`, `overview/` oder `overview` - die Build-Engine erzeugt in jedem Fall die exakt gleiche saubere URL mit abschließendem Schrägstrich.
:::

## URL-Normalisierung

Während des Build-Prozesses normalisiert die Engine jeden internen Link automatisch. Dies gilt für Markdown-Texte, Button-Container, Tags und die Navigationskonfiguration.

| Was Sie schreiben | Was gerendert wird | Warum |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | `.md`-Erweiterung entfernt, abschließender Schrägstrich `/` hinzugefügt. |
| `overview` | `overview/` | Abschließender Schrägstrich `/` wird automatisch hinzugefügt. |
| `overview/` | `overview/` | Bereits korrekt. Keine Änderung. |
| `api/commands.md` | `api/commands/` | Link im Unterverzeichnis normalisiert. |
| `localisation/index.md` | `localisation/` | `index` entfernt - der Ordner ist die kanonische URL. |
| `../index.md` | `../` | Parent-Verzeichnis-Index sauber aufgelöst. |
| `overview.md#settings` | `overview/#settings` | Hash-Fragment bleibt erhalten. |
| `https://example.com` | `https://example.com` | Externe Links bleiben unberührt. |

## Interne Links

Verlinken Sie auf andere Seiten über relative Pfade zu den Quell-`.md`-Dateien. Die Engine löst diese unabhängig von der Verzeichnistiefe korrekt auf.

| Ziel | Beispiel |
| :--- | :--- |
| **Geschwister-Seite** | `[Systemübersicht](overview.md)` |
| **Unterverzeichnis-Seite** | `[API-Referenz](api/node-api.md)` |
| **Unterverzeichnis-Index**| `[Lokalisierung](localisation/index.md)` |
| **Eltern-Verzeichnis** | `[Zurück zur Startseite](../index.md)` |

## Abschnitts-Anker (Deep Linking)

Navigieren Sie direkt zu einer bestimmten Überschrift mit Standard-URL-Hash-Fragmenten.

```markdown
<!-- Anker auf derselben Seite -->
[Zum Roadmap springen](#project-roadmap)

<!-- Anker auf anderer Seite -->
[CLI-Flags prüfen](../api/cli-commands.md#available-flags)
```

Hash-Fragmente bleiben bei der Normalisierung erhalten. Der obige seitenübergreifende Link wird in der Produktion als `../api/cli-commands/#available-flags` gerendert.

## In einem neuen Tab öffnen

Setzen Sie das Präfix `external:` vor eine beliebige Link-URL, um das Öffnen in einem neuen Browser-Tab zu erzwingen. Dies funktioniert in Standard-Markdown-Links, Buttons und Tags.

```markdown
[In neuem Tab öffnen](external:./configuration/overview.md)
[GitHub](external:https://github.com/docmd-io/docmd)
```

Das Präfix `external:` wird aus der gerenderten URL entfernt. Standardmäßig werden alle Links im selben Fenster geöffnet.

## Verlinkung zu Rohdateien (Raw Files)

Verwenden Sie das Präfix `raw:`, um die Normalisierung zu umgehen und direkt auf eine herunterladbare Datei zu verlinken. Die Erweiterung und der Pfad bleiben exakt so erhalten, wie sie geschrieben wurden.

```markdown
[Quellcode anzeigen](raw:docs/readme.md)
```

## Buttons & Tags

Die Container `::: button` und `::: tag` unterstützen alle Standard-Verlinkungskonventionen, einschließlich der Präfixe `external:` und `raw:`:

```markdown
::: button "Erste Schritte" ./getting-started/quick-start.md icon:rocket
::: button "Auf GitHub anzeigen" external:https://github.com/docmd-io/docmd icon:github
::: button "Quelle herunterladen" raw:docs/readme.md icon:download

::: tag "v0.8.2" link:release-notes/0-8-2.md icon:tag color:#22c55e
::: tag "Extern öffnen" link:external:./configuration/overview.md icon:external-link
```

## Navigationskonfiguration

In `navigation.json` und `docmd.config.json` definierte Pfade werden zur Build-Zeit normalisiert. Schreiben Sie sie in einem beliebigen Format - alle drei Einträge unten erzeugen die identische kanonische URL.

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

Für Elemente, die in einem neuen Tab geöffnet werden sollen, setzen Sie das Flag `external`.

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

<!-- Funktioniert auch -->
[Lokalisierung](localisation/index.md)
```
:::

## Protokolle & Externe Ressourcen

Die Engine respektiert Standard-Browserprotokolle für externe Ressourcen und ändert diese Links niemals.

*   **HTTPS** - `[docmd Homepage](https://docmd.io)` - öffnet sich im selben Tab.
*   **Mail** - `[Support](mailto:help@docmd.io)` - öffnet den E-Mail-Client.
*   **Assets** - `[CLI-Binary herunterladen](/assets/bin/docmd-mac.zip)` - wird nicht normalisiert.

## Statische Assets

Platzieren Sie herunterladbare Dateien im Verzeichnis `assets/` Ihres Projekts. Der Builder verschiebt diese Dateien ohne Pfadänderungen in das Produktions-Root.

```markdown
[Dokumentations-PDF herunterladen](/assets/pdf/handbook.pdf)
[Globale Konfiguration anzeigen](/assets/config/docmd.config.json)
```

::: callout tip "Semantische Verknüpfung für KI"
Verwenden Sie bei Querverweisen vorrangig **beschreibenden Ankertext** (z. B. `[PWA-Caching optimieren](../plugins/pwa.md)`) anstelle von generischen Labels (z. B. `[Mehr lesen](../plugins/pwa.md)`). Ausführliche Link-Labels bieten KI-Agenten eine hochpräzise Karte der semantischen Beziehungen im `llms.txt`-Stream.
:::