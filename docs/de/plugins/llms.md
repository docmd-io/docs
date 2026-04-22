---
title: "LLM-Kontext-Plugin"
description: "Optimieren Sie Ihre Dokumentation für den Einsatz von KI mit der automatisierten Generierung von llms.txt und llms-full.txt."
---

Das Plugin `@docmd/plugin-llms` stellt sicher, dass Ihre Dokumentation perfekt für Large Language Models (LLMs) und KI-Agenten optimiert ist. Es folgt dem wachsenden Industriestandard, eine allgemeine Zusammenfassung (`llms.txt`) und eine umfassende Kontextdatei (`llms-full.txt`) bereitzustellen, die KI-Tools einlesen können, um Ihr Projekt mit minimalen Halluzinationen zu verstehen.

## Konfiguration

Das LLM-Plugin ist standardmäßig aktiviert. Damit es korrekt funktioniert, müssen Sie eine `url` in Ihrer `docmd.config.js` angeben.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.beispiel.de',
  plugins: {
    llms: {
      fullContext: true // Generiert die llms-full.txt
    }
  }
});
```

### Eine Seite ausschließen

Wenn eine Seite sensible Informationen oder interne Notizen enthält, die KI-Modelle nicht lernen sollen, verwenden Sie das Flag `llms: false` in Ihrem Frontmatter:

```yaml
---
title: "Interne Entwickler-Geheimnisse"
llms: false
---
```

::: callout tip "KI-Genauigkeit maximieren"
Detaillierte Best Practices zur Strukturierung Ihres Markdowns (semantische Überschriften, Alt-Texte usw.), um die KI-Inhaltsaufnahme zu verbessern, finden Sie in unserem Recipe [Optimierung für KI-Agenten](../recipes/ai-optimization).
:::