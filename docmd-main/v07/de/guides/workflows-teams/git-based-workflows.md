---
title: "Git-basierte Workflows"
description: "So verwalten Sie Dokumentationsbeiträge effektiv mit Git, Pull Requests und automatisierten CI/CD-Checks."
---

## Problem

Direkte Pushes in den Hauptzweig der Dokumentation führen oft zu fehlerhaften Links, inkonsistenter Formatierung und ungeprüften technischen Informationen. Gleichzeitig schreckt zu viel Reibung – etwa die Anforderung separater CMS-Accounts – Community-Mitglieder und interne Entwickler davon ab, wertvolle Updates beizusteuern.

## Warum es wichtig ist

Zusammenarbeit ist das Lebenselixier großartiger Dokumentation. Wenn ein Entwickler einen Tippfehler oder ein veraltetes Beispiel findet, sollte er in der Lage sein, innerhalb von Minuten eine Korrektur einzureichen. Ein Git-basierter Workflow bietet eine vertraute, transparente und sichere Umgebung für Beiträge und stellt sicher, dass jede Änderung vor der Veröffentlichung geprüft und validiert wird.

## Ansatz

Implementieren Sie ein "Pull Request" (PR)-Modell, das durch automatisierte Validierung und Preview-Umgebungen unterstützt wird. `docmd` ist für diesen Workflow konzipiert, da es auf Standard-Markdown-Dateien basiert, die mit vertrauten Git-Tools einfach verglichen (diff), geprüft und gemergt werden können.

## Implementierung

### 1. "Diese Seite bearbeiten"-Links aktivieren

Sie können `docmd` so konfigurieren, dass automatisch "Diese Seite bearbeiten"-Links in der Fußzeile oder Sidebar generiert werden. Dies ermöglicht es Benutzern, direkt von einer Dokumentationsseite zur entsprechenden Quelldatei in Ihrem Repository zu springen.

```javascript
// docmd.config.js
export default {
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/my-org/meine-docs/edit/main/docs',
    text: 'Änderung vorschlagen'
  }
};
```
Weitere Details finden Sie unter [Edit-Link-Konfiguration](../../configuration/overview.md#editlink).

### 2. Kontextbezogene Reviews mit Threads

Verwenden Sie für komplexe Updates, die detailliertes Feedback erfordern, das [Threads-Plugin](../../plugins/threads.md). Dies ermöglicht es Autoren und Reviewern, während der Review-Phase Inline-Kommentare direkt im Markdown-Inhalt zu hinterlassen, wodurch Diskussionen kontextbezogen bleiben.

```markdown
::: thread "Name des Reviewers"
Sollten wir hier ein Code-Beispiel für den neuen Authentifizierungs-Flow einfügen?
:::
```

### 3. Automatisierte Validierung in der CI

Integrieren Sie `docmd` in Ihre CI/CD-Pipeline (z. B. [GitHub Actions](../integrations/github-actions-cicd.md)), um jeden PR zu validieren. Ihre Pipeline sollte mindestens den Build-Befehl ausführen, um sicherzustellen, dass keine Syntaxfehler oder fehlerhafte Konfigurationen eingeführt werden.

```bash
# In Ihrer CI-Pipeline
npm install
npx @docmd/core build
```

## Abwägungen

Strikte Git-Workflows können gelegentlich kleinere Updates verlangsamen, wie das Beheben eines kritischen Tippfehlers oder das Aktualisieren einer Servicestatus-Meldung. Für Teams mit hoher Geschwindigkeit empfehlen wir die Benennung von "Documentation Owners", die die Befugnis haben, kleine Änderungen schnell durchzuwinken, während sie bei signifikanten technischen Updates strenge Review-Standards einhalten.
