---
title: "LLM Context Plugin"
description: "Optimieren Sie Ihre Dokumentation für den KI-Konsum mit automatisierter Generierung von llms.txt und llms-full.txt."
---

Das `@docmd/plugin-llms`-Plugin stellt sicher, dass Ihre Dokumentation perfekt für Large Language Models (LLMs) und KI-Agenten optimiert ist. Es folgt dem wachsenden Industriestandard, eine übergeordnete Zusammenfassung und eine umfassende Kontextdatei bereitzustellen, die KI-Tools einlesen können, um Ihr Projekt mit minimalen Halluzinationen zu verstehen.

## Konfiguration

Das LLM-Plugin ist standardmäßig aktiviert. Damit es korrekt funktioniert, müssen Sie eine `url` in Ihrer `docmd.config.js` angeben.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.example.com',
  plugins: {
    llms: {
      fullContext: true // Generiert llms-full.txt
    }
  }
});
```

### Eine Seite ausschließen

Wenn eine Seite sensible Informationen oder interne Notizen enthält, die KI-Modelle nicht lernen sollen, verwenden Sie das Flag `llms: false` in Ihrem Frontmatter:

```yaml
---
title: "Interne Entwicklergeheimnisse"
llms: false
---
```

::: callout tip "Maximierung der KI-Genauigkeit :robot:"
Detaillierte Best Practices zur Strukturierung Ihres Markdowns (semantische Überschriften, Alt-Text usw.) finden Sie in unserem Leitfaden [Optimierung für KI-Agenten](../guides/ai-optimisation/generating-ai-ready-docs.md).
:::