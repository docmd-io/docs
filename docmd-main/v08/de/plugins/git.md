---
title: "Git-Plugin"
description: "Repository-bewusste Metadaten, Zeitstempel der letzten Aktualisierung und automatische Edit-Links aus der Git-Historie."
---

Das `@docmd/plugin-git`-Plugin fügt Ihrer Dokumentation Repository-Intelligenz hinzu. Es extrahiert Daten zur Build-Zeit direkt aus der Git-Historie. Es zeigt an, wann eine Seite zuletzt geändert wurde, wer beigetragen hat, und stellt einen optionalen „Diese Seite bearbeiten"-Link bereit.

## Konfiguration

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Repository-URL (z. B. `https://github.com/org/repo`). Für Edit-Links erforderlich. |
| `branch` | `string` | `'main'` | Branchname für Edit-Links. |
| `editLink` | `boolean` | `true` | „Diese Seite bearbeiten"-Link anzeigen, wenn `repo` gesetzt ist. |
| `lastUpdated` | `boolean` | `true` | Zeitstempel der letzten Aktualisierung anzeigen. |
| `commitHistory` | `boolean` | `true` | Commit-Historie-Tooltip beim Hover anzeigen. |
| `maxCommits` | `number` | `5` | Maximale Anzahl der im Tooltip angezeigten Commits (wenn `commitHistory` true ist). |
| `dateFormat` | `string` | `'relative'` | Zeitstempelformat: `relative` (Standard), `iso` oder `locale-aware`. |

### Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/org/repo",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## Funktionen

- **Zeitstempel der letzten Aktualisierung**: im Seitenfuß angezeigt.
- **Commit-Historie-Tooltip**: Hover über den Zeitstempel, um die letzten Commits für die Seite zu sehen.
- **Edit-Links**: optionale Links zur Bearbeitung der Quelldatei auf GitHub, GitLab oder Bitbucket.
- **Build-Zeit-Caching**: Git-Historie wird einmal abgefragt und zwischengespeichert, sodass die Site-Performance nicht beeinträchtigt wird.

## Verhalten

Sobald konfiguriert, arbeitet das Plugin automatisch. Zeitstempel und Edit-Links erscheinen im Seitenfuß.

### Footer-Beispiel

::: callout info "Rendering-Ergebnis"
Der Footer dieser Seite wird vom Git-Plugin gerendert. Scrollen Sie nach unten, um es in Aktion zu sehen. Bewegen Sie den Mauszeiger über das Datum **Zuletzt aktualisiert**, um die Commit-Historie zu sehen.
:::

## Pro-Seite-Steuerung

Deaktivieren Sie Git-Funktionen für bestimmte Seiten über das Frontmatter:

```markdown
---
title: "Interne Notizen"
plugins:
  git: false
---
```

## CI/CD-Integration

Das Git-Plugin liest Ihre Repository-Historie zur Build-Zeit über lokale Git-Befehle. Viele CI/CD-Anbieter verwenden standardmäßig „Shallow Clones" (nur den letzten Commit abrufen). Dies führt dazu, dass das Plugin auf allen Seiten nur die letzte Änderung anzeigt.

Um genaue Zeitstempel und Historie zu gewährleisten, konfigurieren Sie Ihre CI-Umgebung so, dass ein vollständiger Fetch durchgeführt wird.

::: tabs

== tab "GitHub Actions"

Fügen Sie `fetch-depth: 0` zu Ihrem Checkout-Schritt hinzu:

```yaml ".github/workflows/docs.yml"
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

Setzen Sie die Variable `GIT_DEPTH` auf `0`:

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify ruft standardmäßig die vollständige Historie ab. Wenn Probleme auftreten, stellen Sie sicher, dass Ihr Build-Befehl Zugriff auf das `.git`-Verzeichnis hat.

:::

::: callout warning "Git-Datenanforderung"
Das `.git`-Verzeichnis muss in der Build-Umgebung vorhanden sein. Wenn Sie in einem Docker-Container oder einer eingeschränkten CI-Umgebung bauen, stellen Sie sicher, dass die Git-Historie erhalten bleibt und das `git`-Binary installiert ist.
:::

## Lokalisierung

Das Plugin enthält eingebaute Übersetzungen für Englisch, Deutsch und Chinesisch. Benutzerdefinierte Zeichenfolgen können über das [UI-Lokalisierung](../configuration/localisation/ui-strings.md)-System bereitgestellt werden.