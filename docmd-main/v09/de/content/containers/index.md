---
title: "Benutzerdefinierte interaktive Container"
description: "Ein umfassendes Verzeichnis struktureller UI-Container und interaktiver Komponenten in docmd."
---

Standard-Markdown zeichnet sich durch grundlegende Textformatierung aus, aber technische Dokumentation erfordert strukturelle Komponenten zur Vermittlung komplexer Logik. `docmd` erweitert Markdown um eine Reihe von **isomorphen Containern**, die in responsive, hochpräzise UI-Elemente gerendert werden.

::: callout tip "Migration von anderen Dokumentations-Engines?" icon:sparkles
`docmd` unterstützt Syntax-Aliase von **VitePress** und **Docusaurus** direkt. Container wie `:::tip`, `:::warning`, `:::note`, `:::details` und `:::caution` funktionieren ohne Änderung. Leerzeichenlose Syntax (z. B. `:::tabs` anstelle von `::: tabs`) wird ebenfalls über alle Container hinweg unterstützt.
:::

## Block-Syntax-Referenz

Alle Container nutzen eine konsistente Block-Syntax, die eine vorhersehbare Erstellungserfahrung in Ihrem gesamten Projekt gewährleistet.

```markdown
::: type "Optionaler Header-Titel"
Dies ist der primäre Inhaltsbereich.
Er unterstützt **Markdown**, Bildmaterial und tiefe Komponentenverschachtelung.
:::
```

| Komponente | Schlüsselwort | Primärer Anwendungsfall |
| :--- | :--- | :--- |
| **[Callouts](callouts.md)** | `callout` | Semantische Warnmeldungen für Tipps, Warnungen und kritische Hinweise. |
| **[Cards](cards.md)** | `card` | Gerahmte strukturelle Container für Feature-Grids und Landing-Layouts. |
| **[Grids](grids.md)** | `grids` | Sich automatisch anpassende mehrspaltige Flexbox-Gruppen. |
| **[Tabs](tabs.md)** | `tabs` | Interaktive umschaltbare Bereiche für alternative Plattformanweisungen. |
| **[Steps](steps.md)** | `steps` | Visuelle nummerierte Zeitachsen für Schritt-für-Schritt-Anleitungen. |
| **[Collapsibles](collapsible.md)** | `collapsible` | Interaktive Akkordeon-Umschalter für FAQs und vertiefende technische Daten. |
| **[Buttons](buttons.md)** | `button` | Selbstschließende, prominente Call-to-Action-Navigationslinks. |
| **[Tags](tags.md)** | `tag` | Selbstschließende, farbige Badges für Versions-Tags oder Status-Labels. |
| **[Hero-Bereiche](hero.md)** | `hero` | Wirkungsvolle Landingpage-Header mit Split- und Slider-Unterstützung. |
| **[URL-Einbettungen](embed.md)** | `embed` | Einbettungen mit minimaler Ladezeit für Video-, Social- und interaktive Medien über `embed-lite`. |
| **[Changelogs](changelogs.md)** | `changelog` | Zeitachsenbasierte Versionshistorien und Release-Notes. |
| **[Verschachtelte Container](nested-containers.md)** | - | Rekursive Kompositionsmuster für Multi-Komponenten-Layouts. |

## Strategische Vorteile von Containern

Container bieten mehr als nur optischen Feinschliff; sie liefern hochpräzise **semantische Signale** an den `docmd`-Compiler und nachgeschaltete KI-Agenten:

1. **KI-Kontext-Mapping**: Die Kennzeichnung eines Blocks als `callout warning` weist LLMs explizit an, diese Warnung während des Denkprozesses und der Antwortgenerierung zu priorisieren.
2. **Strukturelle Integrität**: Die Kombination von `cards` und `grids` ermöglicht die Erstellung komplexer Landingpages direkt in Markdown ohne rohen HTML-Overhead.
3. **Quellcode-Wartbarkeit**: Eliminiert rohes HTML-Markup und hält Ihre `.md`-Dateien sauber, lesbar und maschinenlesbar.

## Rekursive Komposition

`docmd` unterstützt **unendliche Verschachtelungstiefe**. Komponieren Sie jeden Container innerhalb eines anderen, um mehrschichtige Dokumentationskomponenten aufzubauen:

```markdown
::: card "Architecture Overview"
    ::: callout info
    Dieses Modul nutzt eine asynchrone I/O-Pipeline.
    :::
    ::: button "Explore Core Engine Architecture" ./#architecture
:::
```

[Meistern Sie die Verschachtelungs-Anleitung](nested-containers.md)