---
title: "Git-Integrations-Plugin"
description: "Fügen Sie Git-Repository-Intelligenz, Zeitstempel der letzten Aktualisierung, Commit-Historie-Tooltips und automatisierte Quell-Edit-Links ein."
---

Das `@docmd/plugin-git`-Plugin fügt Ihrer Dokumentationsseite Repository-Intelligenz hinzu. Es fragt während der Kompilierung die lokale Git-Historie ab, um Seitenänderungszeitstempel, Autorenbeiträge und automatisierte „Diese Seite bearbeiten"-Links anzuzeigen.

## Konfigurationsoptionen

Konfigurieren Sie Repository-Parameter in `docmd.config.json`:

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `repo` | `string` | `null` | Öffentliche Repository-URL (z. B. `https://github.com/org/repo`). Erforderlich für Bearbeitungslinks. |
| `branch` | `string` | `'main'` | Ziel-Branch für Quell-Bearbeitungslinks. |
| `editLink` | `boolean` | `true` | „Diese Seite bearbeiten"-Schaltfläche in Seitenfüßen anzeigen. |
| `lastUpdated` | `boolean` | `true` | Zeitstempel der letzten Aktualisierung in Seitenfüßen anzeigen. |
| `commitHistory` | `boolean` | `true` | Commit-Historie-Hover-Tooltip beim Hovern über den Zeitstempel anzeigen. |
| `maxCommits` | `number` | `5` | Maximale Anzahl der im Hover-Tooltip angezeigten Commits. |
| `dateFormat` | `string` | `'relative'` | Datumsausgabeformat: `relative` (Standard), `iso` oder `locale-aware`. |

### Beispielkonfiguration

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/docmd-io/docmd",
      "branch": "main",
      "editLink": true,
      "lastUpdated": true,
      "commitHistory": true,
      "maxCommits": 5
    }
  }
}
```

## Hauptfunktionen

* **Zeitstempel der letzten Aktualisierung**: Automatisch pro Datei berechnet und in den Seitenfüßen angezeigt.
* **Commit-Historie-Tooltips**: Beim Hovern über Zeitstempel werden aktuelle Commit-Hashes, Commit-Meldungen und Autoren-Avatare gerendert.
* **Automatisierte Bearbeitungslinks**: Generiert direkte Bearbeitungs-URLs, die auf GitHub, GitLab oder Bitbucket verweisen.
* **Build-Zeit-Caching**: Git-Abfragen werden während der Kompilierung ausgeführt und Ergebnisse lokal zwischengespeichert, was eine Laufzeitauswirkung von Null garantiert.

## Steuerung auf Seitenebene

Deaktivieren Sie Git-Funktionen für bestimmte Dokumente über [Seiten-Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Interne Notizen"
plugins:
  git: false
---
```

## Integration in CI/CD-Pipelines

Das Git-Plugin führt während der Website-Kompilierung lokale `git`-CLI-Befehle aus. Viele CI/CD-Runner (wie GitHub Actions oder GitLab CI) führen Flat-Clones durch (`fetch-depth: 1`), was die Commit-Historie abschneidet und dazu führt, dass alle Seiten identische Aktualisierungsdaten anzeigen.

Stellen Sie sicher, dass Ihr Build-Workflow die vollständige Git-Historie abruft:

::: tabs

== tab "GitHub Actions"

Fügen Sie `fetch-depth: 0` zu Ihrem Checkout-Schritt hinzu:

```yaml ".github/workflows/docs.yml"
- name: Checkout Repository
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

== tab "GitLab CI"

Setzen Sie die Umgebungsvariable `GIT_DEPTH` auf `0`:

```yaml ".gitlab-ci.yml"
variables:
  GIT_DEPTH: 0
```

== tab "Netlify"

Netlify ruft standardmäßig die vollständige Historie ab. Bei Verwendung benutzerdefinierter Build-Skripte stellen Sie sicher, dass das `.git`-Verzeichnis im Build-Workspace erhalten bleibt.

:::

::: callout warning "Verfügbarkeit der Git CLI" icon:alert-triangle
Das `.git`-Verzeichnis und das `git`-Binary müssen in Ihrem Kompilierungscontainer oder in Ihrer Build-Umgebung zugänglich sein.
:::

## Unterstützung für Lokalisierung

Das Git-Plugin unterstützt mehrsprachige Übersetzungstabellen für Fußzeilensprachen und Zeitstempelformate. Benutzerdefinierte Zeichenfolgen können über die [UI-Lokalisierung](../configuration/localisation/ui-strings.md)-Konfiguration bereitgestellt werden.