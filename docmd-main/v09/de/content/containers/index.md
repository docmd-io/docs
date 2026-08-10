---
title: "Benutzerdefinierte Interaktive Container"
description: "Ein umfassendes Verzeichnis struktureller UI-Container und interaktiver Komponenten in docmd."
---

Standard-Markdown eignet sich hervorragend für grundlegende Textformatierung, aber technische Dokumentation benötigt strukturelle Komponenten. `docmd` erweitert Markdown um eine Reihe **isomorpher Container**.

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::

::: callout tip "Migration von anderen Dokumentations-Engines?" icon:sparkles
`docmd` unterstützt Syntax-Aliase von **VitePress** und **Docusaurus** direkt ab Werk. Container wie `:::tip`, `:::warning`, `:::note`, `:::details` und `:::caution` funktionieren ohne Anpassung.
:::

## Einheitliche Block-Syntax-Referenz

Alle Container nutzen eine einheitliche, tiefenbewusste Block-Syntax mit expliziten Öffnungs- und Schließungs-Tags, Inline-Kommentaren und universellen Key-Value-Attributen:

```markdown
::: containerTyp title:"Header-Titel" icon:rocket # Container-Header mit Kommentar
::: subContainer title:"Eintrags-Titel" icon:code-2 # Expliziter Sub-Container
Dies ist der Hauptinhaltsbereich.
Er unterstützt **Markdown**, Bilder und verschachtelte Komponenten.
::: /subContainer # Expliziter Sub-Container Schließer
::: /containerTyp # Expliziter übergeordneter Schließer
```

| Komponente | Schlüsselwort | Primärer Anwendungsfall |
| :--- | :--- | :--- |
| **[Callouts](callouts.md)** | `callout` | Semantische Hinweise für Tipps, Warnungen und kritische Hinweise. |
| **[Cards](cards.md)** | `card` | Gerahmte Struktur-Container für Funktionsraster und Landing-Layouts. |
| **[Grids](grids.md)** | `grids` | Sich automatisch anpassende mehrspaltige Flexbox-Gruppen. |
| **[Tabs](tabs.md)** | `tabs` | Interaktive umschaltbare Bereiche mit expliziten `::: tab`-Elementen. |
| **[Steps](steps.md)** | `steps` | Visuelle nummerierte Zeitleisten mit expliziten `::: step`-Elementen. |
| **[Collapsibles](collapsible.md)** | `collapsible` | Interaktive Akkordeon-Schalter für FAQs und detaillierte Daten. |
| **[Buttons](buttons.md)** | `button` | Selbstschließende Handlungsaufforderungs-Links. |
| **[Tags](tags.md)** | `tag` | Selbstschließende, farbige Badges für Versionstags oder Statusbeschriftungen. |
| **[Hero Sections](hero.md)** | `hero` | Landing-Page-Header mit Geteilt- und `::: slide`-Unterstützung. |
| **[URL Embeds](embed.md)** | `embed` | Einbettungen für Videos, soziale Netzwerke und interaktive Medien über `embed-lite`. |
| **[Changelogs](changelogs.md)** | `changelog` | Zeitleistenbasierte Versionshistorien mit expliziten `::: log`-Elementen. |
| **[Mermaid Diagramme](mermaid.md)** | `mermaid` | Flussdiagramme, Sequenzdiagramme und Architekturkarten mit Steuerung pro Diagramm. |
| **[Verschachtelte Container](nested-containers.md)** | - | Rekursive Muster für komplexe Komponenten-Layouts. |

## Universelles Attribut- & Key-Value-Parsing

Alle Container-Header unterstützen Positionsparameter, benannte Key-Value-Attribute und nachfolgende Inline-Kommentare (`# Kommentar`):

```markdown
::: button title:"Dokumentation" url:"/docs/getting-started" icon:book color:#3b82f6 # Benannte Attribute
::: card title:"Architektur-Übersicht" icon:cpu # Titel & Icon
::: callout warning title:"Sicherheitspolitik" # Titel & Kommentar
```

- **Positions-Fallback**: Anführungszeichen-Strings (`"Mein Titel"`) werden je nach Container-Typ automatisch `title` oder `url` zugeordnet.
- **Benannte Overrides**: `title:"..."`, `url:"..."`, `icon:...`, `color:#...` erlauben die Angabe von Attributen in beliebiger Reihenfolge.
- **Inline-Kommentare**: `# Kommentar` am Ende der Header-Zeile wird vor dem Parsing entfernt.

## Strategische Vorteile von Containern

Container bieten mehr als nur visuellen Feinschliff; sie liefern hochpräzise **semantische Signale** an den `docmd`-Compiler und nachgelagerte KI-Agenten:

1. **KI-Kontext-Zuordnung**: Die Kennzeichnung eines Blocks als `callout warning` weist LLMs explizit an, diese Warnung beim Schlussfolgern zu priorisieren.
2. **Strukturelle Integrität**: Die Kombination von `cards` und `grids` ermöglicht das Verfassen komplexer Landing-Pages direkt in Markdown ohne HTML-Bloat.
3. **Quellcode-Wartbarkeit**: Hält `.md`-Dateien sauber, lesbar und maschinell analysierbar.

## Rekursive Verschachtelung & Explizite Schließer

`docmd` unterstützt **unbegrenzte Verschachtelungstiefe** und deterministisches Auflösen von Schließungs-Tags über benannte Schließer (`::: /card`, `::: /tabs`):

```markdown
::: card title:"Architektur-Übersicht" # Übergeordnete Karte
    ::: callout info title:"Asynchrones I/O" # Innere Callout
    Dieses Modul nutzt eine asynchrone, nicht-blockierende I/O-Pipeline.
    ::: /callout # Schließt innere Callout
    ::: button title:"Kern-Engine erkunden" url:"/#architecture"
::: /card # Schließt übergeordnete Karte
```

[Leitfaden für verschachtelte Container lesen](nested-containers.md)