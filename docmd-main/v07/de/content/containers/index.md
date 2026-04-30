---
title: "Container-Übersicht"
description: "Erweitern Sie Standard-Markdown mit integrierten interaktiven Komponenten, die Ihre Dokumentation von statischen Seiten in funktionsreiche Anwendungen verwandeln."
---

`docmd`-Container ermöglichen es Ihnen, komplexe UI-Elemente wie Buttons, Cards, ausklappbare Abschnitte und Tabs direkt in Ihre Dokumentationsquellen einzufügen, ohne HTML oder CSS schreiben zu müssen.

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
| **[Tabs](tabs.md)** | `tabs` | Interaktive, umschaltbare Fenster für alternative Anweisungen (z.B. Betriebssysteme). |
| **[Steps](steps.md)** | `steps` | Visuelle, nummerierte Zeitachsen für "How-to"-Anleitungen und Tutorials. |
| **[Tags](tags.md)** | `tag` | Selbstschließende, farbige Labels für Versionen, Status oder Hervorhebungen. |
| **[Buttons](buttons.md)** | `button` | Selbstschließende, prominente Call-to-Action-Navigationslinks. |
| **[Collapsibles](collapsible.md)**| `collapsible`| Interaktive Akkordeon-Umschalter für FAQs und vertiefende technische Daten. |
| **[Changelogs](changelogs.md)** | `changelog` | Strukturierte, zeitachsenbasierte Versionshistorie und Versionshinweise. |
| **[Hero](hero.md)** | `hero` | Wirkungsvolle Landingpage-Abschnitte mit Layout- und Slider-Unterstützung. |

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