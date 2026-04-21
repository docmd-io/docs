---
title: "Benutzerdefinierte interaktive Container"
description: "Ein umfassendes Verzeichnis der interaktiven UI-Bausteine, die in docmd zur Verfügung stehen."
---

Standard-Markdown glänzt bei der grundlegenden Textformatierung, aber professionelle technische Dokumentationen erfordern reichhaltige strukturelle Komponenten, um komplexe Logik effektiv zu vermitteln. `docmd` erweitert Markdown um eine Reihe von **isomorphen Containern**, die in responsive, hochwertige UI-Elemente gerendert werden.

<!-- SCREENSHOT: Montage aller Containertypen auf einer einzigen Seite — Callouts (Info, Warning, Danger, Tip), Tabs mit Code, Schritte (Steps), Karten-Raster (Cards Grid), Hero-Abschnitt und ausklappbare Abschnitte. -->

## Referenz für die Block-Syntax

Alle Container verwenden eine konsistente Block-Syntax, was eine vorhersehbare Authoring-Erfahrung über Ihr gesamtes Projekt hinweg gewährleistet.

```markdown
::: typ "Optionaler Titel"
Dies ist der Hauptinhaltsbereich.
Er unterstützt **Markdown**, Bilder und tiefe Verschachtelungen von Komponenten.
:::
```

| Komponente | Schlüsselwort | Primärer Anwendungsfall |
| :--- | :--- | :--- |
| **[Callouts](./callouts)** | `callout` | Semantische Hervorhebungen für Tipps, Warnungen und Alarme. |
| **[Karten](./cards)** | `card` | Eingerahmte Strukturblöcke für Feature-Raster und Layoutsteuerung. |
| **[Raster](./grids)** | `grids` | Automatisch anpassbare, mehrspaltige Strukturgruppen. |
| **[Tabs](./tabs)** | `tabs` | Interaktive, umschaltbare Bereiche für plattformspezifische Anweisungen. |
| **[Schritte](./steps)** | `steps` | Visuelle, nummerierte Zeitachsen für Anleitungen ("How-to") und Tutorials. |
| **[Buttons](./buttons)** | `button` | Selbstschließende, prominente Call-to-Action-Navigationslinks. |
| **[Ausklappbar](./collapsible)**| `collapsible`| Interaktive Akkordeon-Umschalter für FAQs und technische Vertiefungen. |
| **[Changelogs](./changelogs)** | `changelog` | Strukturierte, zeitachsenbasierte Versionshistorie und Release-Notes. |
| **[Hero](./hero)** | `hero` | Eindrucksvolle Landingpage-Abschnitte mit Layout- und Slider-Unterstützung. |

## Die strategische Bedeutung von Containern

Container ermöglichen mehr als nur visuelles Design; sie liefern hochwertige **semantische Signale** an die `docmd`-Engine und nachgelagerte KI-Agenten:

1.  **KI-Kontext-Mapping**: Die Kennzeichnung eines Blocks als `callout warning` teilt LLMs explizit mit, diese Information während der Argumentations- und Generierungsphase zu priorisieren.
2.  **Strukturelle Integrität**: Die Kombination von `cards` mit Standard-CSS ermöglicht die Erstellung anspruchsvoller Landingpages, ohne die Markdown-Umgebung verlassen zu müssen.
3.  **Wartbarkeit der Quelle**: Eliminiert „HTML-Aufblähung“ in Ihrer Dokumentationsquelle und hält Ihre `.md`-Dateien sauber und maschinenlesbar.

## Rekursive Komposition (Verschachtelung)

`docmd` unterstützt **unbegrenzte Verschachtelungstiefe**. Sie können jeden Container innerhalb eines anderen kombinieren, um komplexe, interaktive Dokumentationsknoten rein in Markdown zu erstellen.

```markdown
::: card "Architektur-Übersicht"
    ::: callout info
        Dieses Modul nutzt eine asynchrone I/O-Pipeline.
    :::
    ::: button "Tauchgang in die Core-Engine" /advanced/developer-guide
:::
```

[Meistern Sie den Leitfaden zur Verschachtelung →](./nested-containers)