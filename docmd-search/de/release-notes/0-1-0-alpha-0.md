---
title: "v0.1.0-alpha.0 - Erste öffentliche Alpha"
description: "Versionshinweise für die erste öffentliche Alpha von docmd-search."
date: "2026-05-31"
---

Wir freuen uns, die erste Alpha-Version von **docmd-search** zu teilen.

docmd-search ist eine Semantik-Suchmaschine für Dokumentationswebsites. Sie läuft vollständig im Browser, benötigt keine Server oder API-Schlüssel und führt alle Suchprozesse lokal aus.

## Inhalt dieser Version

### Kern-Engine

- **Lokale semantische Indizierung** – Erstellt Vektor-Embeddings zur Erstellungszeit mit `Xenova/all-MiniLM-L6-v2`.
- **Browser-seitige Suche** – Ranking und Abruf finden vollständig im Browser statt.
- **Chunked-Indizierung** – Inhalte werden in konfigurierbare überlappende Chunks unterteilt.
- **Multi-Versions-Unterstützung** – Dokumentationsversionen können unabhängig indiziert werden.

### CLI

```bash
docmd-search
docmd-search --ui
```
