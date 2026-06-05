---
title: "Benutzerdefinierte interaktive Container"
description: "Ein umfassendes Verzeichnis der in docmd verfügbaren interaktiven UI-Bausteine."
---

Standard-Markdown eignet sich hervorragend für die grundlegende Textformatierung, aber eine professionelle technische Dokumentation erfordert reichhaltige strukturelle Komponenten, um komplexe Logik effektiv zu vermitteln. `docmd` erweitert Markdown um eine Reihe von **isomorphen Containern**, die in responsive, hochpräzise UI-Elemente gerendert werden.

::: callout tip "Migration von anderen Dokumentations-Engines?"
`docmd` unterstützt Syntax-Aliase von **VitePress** und **Docusaurus** direkt. Container wie `:::tip`, `:::warning`, `:::note`, `:::details` und `:::caution` funktionieren ohne Änderung. Die leerzeichenlose Syntax (z. B. `:::tabs` statt `::: tabs`) wird ebenfalls für alle Container unterstützt.
:::

## Block-Syntax-Referenz

Alle Container nutzen eine konsistente Block-Syntax, die eine vorhersehbare Bearbeitungserfahrung im gesamten Projekt gewährleistet.

```markdown
::: typ "Optionaler Titel für die Kopfzeile"
Dies ist der primäre Inhaltsbereich.
Er unterstützt **Markdown**, Bilder und tiefe Verschachtelung von Komponenten.
:::
```

| Komponente | Schlüsselwort | Primärer Anwendungsfall |
| :--- | :--- | :--- |
| **[Callouts](callouts.md)** | `callout` | Semantische Hervorhebungen für Tipps, Warnungen und Alarme. |
| **[Cards](cards.md)** | `card` | Gerahmte strukturelle Blöcke für Feature-Grids und Layout-Steuerung. |
| **[Grids](grids.md)** | `grids` | Sich automatisch anpassende, mehrspaltige Strukturgruppen. |
| **[Tabs](tabs.md)** | `tabs` | Interaktive, umschaltbare Fenster für alternative Anweisungen. |
| **[Steps](steps.md)** | `steps` | Visuelle, nummerierte Zeitachsen für "How-to"-Anleitungen und Tutorials. |
| **[Collapsibles](collapsible.md)** | `collapsible` | Interaktive Akkordeon-Umschalter für FAQs und vertiefende technische Daten. |
| **[Buttons](buttons.md)** | `button` | Selbstschließende, prominente Call-to-Action-Navigationslinks. |
| **[Tags](tags.md)** | `tag` | Selbstschließende, farbige Labels für Versionen, Status oder Hervorhebungen. |
| **[Hero](hero.md)** | `hero` | Wirkungsvolle Landingpage-Abschnitte mit Layout- und Slider-Unterstützung. |
| **[URL-Einbettungen](embed.md)** | `embed` | Sichere Einbettungen mit minimaler Ladezeit für Videos, Social Media und interaktive Inhalte. |
| **[Changelogs](changelogs.md)** | `changelog` | Strukturierte, zeitachsenbasierte Versionshistorie und Versionshinweise. |
| **[Verschachtelte Container](nested-containers.md)** | - | Rekursive Kompositionsmuster für komplexe Layouts aus mehreren Komponenten. |

## Die strategische Bedeutung von Containern

Container bieten mehr als nur optischen Glanz; sie liefern hochpräzise **semantische Signale** an die `docmd`-Engine und nachgeschaltete KI-Agenten:

1.  **KI-Kontext-Mapping**: Das Markieren eines Blocks als `callout warning` signalisiert LLMs explizit, diese Informationen während der Denk- und Generierungsphasen zu priorisieren.
2.  **Strukturelle Integrität**: Die Kombination von `cards` mit Standard-CSS ermöglicht die Erstellung anspruchsvoller Landingpages, ohne die Markdown-Umgebung zu verlassen.
3.  **Wartbarkeit des Quellcodes**: Eliminiert "HTML-Aufblähung" in Ihrem Dokumentationsquellcode und hält Ihre `.md`-Dateien sauber und maschinenlesbar.

## Rekursive Komposition

`docmd` unterstützt **unendliche Verschachtelungstiefe**. Sie können jeden Container in einem anderen kombinieren, um komplexe, interaktive Dokumentationsknoten rein in Markdown zu erstellen.

```markdown
::: card "Architektur-Übersicht"
    ::: callout info
        Dieses Modul nutzt eine asynchrone I/O-Pipeline.
    :::
    ::: button "Tiefes Eintauchen in den Core" /advanced/developer-guide
:::
```

[Meistern Sie die Verschachtelungs-Anleitung](nested-containers.md)