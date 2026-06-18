---
title: "SEO-Plugin"
description: "Optimieren Sie Ihre Dokumentation für Suchmaschinen und steuern Sie den Zugriff von KI-Crawlern mit nativer Meta-Tag-Generierung."
---

Das `@docmd/plugin-seo`-Plugin erzeugt hochwertige Metadaten für jede Seite. Es stellt sicher, dass Ihre Dokumentation nicht nur von menschlichen Lesern in Suchmaschinen entdeckt wird, sondern auch korrekt von KI-Modellen und Social-Media-Plattformen interpretiert wird.

## Konfiguration

Konfigurieren Sie site-weite SEO-Standards in Ihrer `docmd.config.json`. Seiteneinstellungen haben immer Vorrang vor globalen Standards.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | Fallback-Beschreibung für Seiten ohne Frontmatter-Beschreibungen. |
| `aiBots` | `boolean` | `true` | Erlaubt (`true`) oder blockiert (`false`) KI-Trainings-Bots. Bei `false` werden GPTBot, ChatGPT-User, Google-Extended, CCBot und andere KI-Crawler blockiert. |
| `openGraph` | `object` | `null` | Open Graph-Einstellungen für soziale Medien (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card-Einstellungen einschließlich Benutzername und Kartentyp. |

### Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "seo": {
      "defaultDescription": "Comprehensive documentation for the docmd ecosystem.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Funktionen

- **Automatische `robots.txt`**: wird erzeugt, wenn fehlend, mit Sitemap-Referenz und KI-Bot-Direktiven.
- **Intelligente Fallbacks**: extrahiert die ersten 150 Zeichen der Prosa, wenn keine Beschreibung gesetzt ist.
- **KI-Bot-Verwaltung**: standardmäßig können KI-Bots Inhalte indizieren. Setzen Sie `aiBots: false`, um KI-Trainings-Crawler zu blockieren, während traditionelle Suchmaschinen weiterhin erlaubt bleiben.
- **Kanonische URLs**: emittiert `<link rel="canonical">`, um Duplicate-Content-Probleme zu verhindern.
- **Social Previews**: native Open Graph- und Twitter-Karten.
- **Strukturierte Daten**: LD+JSON Article-Schema für umfangreiche Such-Snippets.

## robots.txt-Auto-Generierung

Das Plugin generiert automatisch eine `robots.txt`-Datei während des Build-Prozesses, wenn keine in Ihrem Ausgabeverzeichnis vorhanden ist.

**Generierte Inhalte umfassen:**

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://your-domain.com/sitemap.xml
```

**KI-Trainings-Bots blockieren:**

Wenn `aiBots: false` gesetzt ist, enthält die generierte `robots.txt`:

```txt
# Block AI training bots
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
# ... (additional AI crawlers)
```

### robots.txt-Position-Strategie

Das Plugin behandelt `robots.txt` intelligent über mehrere Speicherorte hinweg:

**Prioritätsreihenfolge:**
1. **Site-Root** (`site/robots.txt`) - zuerst geprüft, höchste Priorität
2. **Assets-Ordner** (`site/assets/robots.txt`) - bei Fund in den Site-Root kopiert

**Verhalten:**

- Wenn `robots.txt` im **Site-Root** existiert: erhalten, keine Aktion
- Wenn `robots.txt` im **Assets-Ordner** existiert: automatisch in den Site-Root kopiert (empfohlener Speicherort für SEO)
- Wenn `robots.txt` nicht gefunden: automatisch basierend auf der SEO-Konfiguration generiert

**Empfohlene Praxis:**

Platzieren Sie Ihre benutzerdefinierte `robots.txt` im `assets/`-Ordner Ihrer Dokumentationsquelle. Das Plugin kopiert sie während des Builds in den Site-Root:

```
your-docs/
├── assets/
│   └── robots.txt    ← Place here
├── index.md
└── docmd.config.json
```

Nach dem Build erscheint sie am richtigen Speicherort:

```
site/
├── robots.txt        ← Copied here (SEO standard location)
├── assets/
│   └── robots.txt    ← Also preserved here
└── index.html
```

::: callout tip "Warum der Site-Root?"
Suchmaschinen erwarten `robots.txt` im Domain-Root (`https://example.com/robots.txt`). Das Plugin stellt sicher, dass sich Ihre Datei immer am richtigen Speicherort befindet, unabhängig davon, ob Sie eine benutzerdefinierte bereitstellen oder automatisch generieren lassen.
:::

## Überschreibungen auf Seitenebene

Feinabstimmung der Einstellungen für einzelne Seiten über das Frontmatter:

```markdown
---
title: "Advanced Configuration"
noindex: true # Hide from all search engines
seo:
  keywords: ["docmd", "javascript", "ssg"]
  aiBots: true # Override global block for this page
  ldJson: true # Enable Article Schema
---
```

::: callout tip "Suchmaschinen-Entdeckung"
Für beste Ergebnisse stellen Sie sicher, dass Ihre `url` im Stammverzeichnis der Konfiguration definiert ist. Ohne Basis-URL kann das Plugin keine absoluten kanonischen Links oder Social-Image-Pfade generieren.
:::
