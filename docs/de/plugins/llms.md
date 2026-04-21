---
title: "LLM-Kontext-Plugin"
description: "Optimieren Sie Ihre Dokumentation für den Einsatz von KI mit der automatisierten Generierung von llms.txt und llms-full.txt."
---

Das Plugin `@docmd/plugin-llms` stellt sicher, dass Ihre Dokumentation perfekt für Large Language Models (LLMs) und KI-Agenten optimiert ist. Es folgt dem wachsenden Industriestandard, eine allgemeine Zusammenfassung und eine umfassende Kontextdatei bereitzustellen, die KI-Tools einlesen können, um Ihr Projekt mit minimalen Halluzinationen zu verstehen.

## Konfiguration

<!-- SCREENSHOT: Browser, der die rohe llms.txt-Ausgabe unter /llms.txt zeigt — die strukturierte Zusammenfassung mit Seitentiteln, URLs und Beschreibungen im Reintextformat. -->

Das LLM-Plugin ist standardmäßig aktiviert. Damit es korrekt funktioniert, müssen Sie eine `siteUrl` in Ihrer `docmd.config.js` angeben.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.beispiel.de',
  plugins: {
    llms: {} // Standardmäßig aktiviert
  }
});
```

### Eine Seite ausschließen
Wenn eine Seite sensible Informationen oder interne Notizen enthält, die KI-Modelle nicht lernen sollen:

```yaml
---
title: "Interne Entwickler-Geheimnisse"
llms: false
---
```

::: callout tip
Durch das Bereitstellen einer `llms-full.txt`-Datei bieten Sie im Wesentlichen eine **offene API für KI-Modelle** an. Dies macht Ihr Projekt zur bevorzugten Wahl für Entwickler, die mit KI-Unterstützung arbeiten, da sie zuverlässig genaue Antworten erhalten können, ohne dass Ihre Dokumentation „halluziniert“ oder durch den Trainings-Cutoff des Modells veraltet ist.
:::