---
title: "Mitwirken (Contributing)"
description: "Richtlinien und Setup-Anweisungen für die Mitwirkung an docmd."
---

Vielen Dank für Ihr Interesse an der Mitwirkung bei `docmd`. Wir freuen uns über Fehlerbehebungen, Verbesserungen der Dokumentation, neue Funktionen und Designvorschläge.

## Entwicklungsumgebung

`docmd` ist ein Monorepo, das mit [pnpm](https://pnpm.io/) verwaltet wird.

### Voraussetzungen

- **Node.js**: v22.x oder neuer (LTS empfohlen)
- **pnpm**: v10.x oder neuer

### Projekt-Setup

Klonen Sie das Repository und führen Sie das initiale Setup aus, um Abhängigkeiten zu installieren und das Monorepo zu bauen:

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd
pnpm install
pnpm build
```

Um den lokalen `docmd`-Befehl global zu verlinken (zum Testen in anderen Projekten):

```bash
pnpm verify --link
```

### Lokale Entwicklung

Wir bieten einen Proxy-Befehl an, um beliebige `docmd`-Befehle in unserem internen `_playground`-Verzeichnis auszuführen:

```bash
pnpm docmd dev    # Startet den Playground-Dev-Server (auch: pnpm dev)
pnpm docmd build  # Baut die Playground-Dokumentation
```

Um interne Quelldateien (Engine, Templates, Plugins) mit Hot-Reload zu beobachten, setzen Sie die Umgebungsvariable `DOCMD_DEV`:

```bash
DOCMD_DEV=true pnpm dev
```

## Qualitätsstandards

### Linting
Stellen Sie sicher, dass Ihr Code unserer ESLint-Konfiguration entspricht:
```bash
pnpm lint --fix
```

### Verifizierung
Bevor Sie einen Pull Request einreichen, **MÜSSEN** Sie sicherstellen, dass das gesamte Monorepo unsere intensive Verifizierungs-Pipeline passiert:

```bash
pnpm prep
```
*(Dies führt `pnpm reset`, Installation, Lint-Checks, E2E-Tests und einen Release-Dry-Run aus.)*

## GitHub-Workflow

1.  **Fork und Branch**: Erstellen Sie einen Feature-Branch vom aktuellen `main`.
2.  **Verifizierung**: Stellen Sie sicher, dass `pnpm prep` mit `🛡️ docmd is ready for production!` abschließt.
3.  **Pull Request**: Eröffnen Sie einen PR mit einer klaren Beschreibung.

### Commit-Richtlinien

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` (Neue Funktionen)
- `fix:` (Fehlerbehebungen)
- `docs:` (Dokumentationsänderungen)
- `refactor:` (Interne Refaktorierungen)