---
title: "Git-basierte Workflows"
description: "Wie Sie Dokumentations-Beiträge mit Git, Pull Requests und automatisierten CI/CD-Checks effektiv verwalten."
---

## Problem

Direkte Pushes auf den Main-Branch zuzulassen führt zu defekten Links und unverifizierten Informationen. Zu viel Reibung aufzuerlegen — wie die Anforderung separater CMS-Accounts — schreckt Community-Mitglieder und interne Entwickler davon ab, beizutragen.

## Warum es wichtig ist

Zusammenarbeit ist die Lebensader großartiger Dokumentation. Findet ein Entwickler einen Tippfehler, sollte er in der Lage sein, in wenigen Minuten einen Fix einzureichen. Ein Git-basierter Workflow bietet eine vertraute, transparente und sichere Umgebung für Beiträge. Er stellt sicher, dass jede Änderung überprüft und validiert wird, bevor sie live geht.

## Ansatz

Implementieren Sie ein "Pull Request" (PR)-Modell, das durch automatisierte Validierung und Preview-Umgebungen unterstützt wird. docmd ist für diesen Workflow ausgelegt. Es arbeitet mit Standard-Markdown-Dateien, die sich mit vertrauten Git-Tools einfach diffen, reviewen und mergen lassen.

## Implementierung

### 1. "Diese Seite bearbeiten"-Links aktivieren

Sie können docmd so konfigurieren, dass "Diese Seite bearbeiten"-Links über das [Git-Plugin](../../plugins/git.md) generiert werden. Damit können Benutzer direkt von einer Dokumentationsseite zur entsprechenden Quelldatei in Ihrem Repository springen.

```json "docmd.config.json"
{
  "plugins": {
    "git": {
      "repo": "https://github.com/my-org/my-repo",
      "branch": "main",
      "editLink": true
    }
  }
}
```

### 2. Kontextbezogene Reviews mit Threads

Für komplexe Updates, die detailliertes Feedback erfordern, verwenden Sie das [Threads-Plugin](../../plugins/threads.md). Es erlaubt Autoren und Reviewern, während der Review-Phase Inline-Kommentare direkt im Markdown-Inhalt zu hinterlassen und so Diskussionen kontextbezogen zu halten.

```markdown
::: thread "Reviewer-Name"
Sollten wir hier ein Code-Beispiel für den neuen Authentifizierungs-Flow einfügen?
:::
```

### 3. Automatisierte Validierung in CI

Integrieren Sie docmd in Ihre CI/CD-Pipeline (z. B. [GitHub Actions](../../guides/integrations/github-actions-cicd.md)), um jeden PR zu validieren. Ihre Pipeline sollte mindestens den Build-Befehl ausführen, um sicherzustellen, dass keine Syntax-Fehler oder defekten Konfigurationen eingeführt werden.

```bash
# In Ihrer CI-Pipeline
npm install
npx @docmd/core build
```

## Abwägungen

Strenge Git-Workflows können kleinere Updates gelegentlich verlangsamen, etwa das Beheben eines Tippfehlers oder das Aktualisieren einer Service-Status-Meldung. Für Teams mit hoher Geschwindigkeit empfehlen wir, "Documentation Owners" zu bestimmen, die befugt sind, kleine Änderungen schnell durchzuwinken, während sie für wesentliche Updates weiterhin strenge Review-Standards aufrechterhalten.