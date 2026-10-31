---
title: Übersicht über Variablen & Dynamische Laufzeit
description: Erfahren Sie, wie die docmd Variablen- und Personalisierungs-Engine dynamische, wartbare und interaktive Dokumentationen zur Build-Zeit und im Browser ermöglicht.
---

# Übersicht über Variablen & Dynamische Laufzeit

docmd bietet eine leistungsstarke **Variablen- und Personalisierungs-Engine**, die statische Build-Zeit-Interpolation mit reaktiver clientseitiger Personalisierung nahtlos vereint.

Anstatt Firmennamen, API-Endpunkte, Versionsnummern oder Copyright-Jahre manuell in Dutzenden von Markdown-Dateien zu pflegen, können Sie dynamische Platzhalter über einfache Template-Ausdrücke einbinden.

```markdown
Willkommen zur Dokumentation von **\{{ site.title }}** v\{{ docmd.version }}!
Aktuelles Copyright: © \{{ docmd.buildYear }}.
```

::: callout info "Live ausgewertete Variablen in diesem Build" icon:sparkles
Die folgenden Werte wurden vom docmd-Compiler während dieses Dokumentations-Builds live aufgelöst:
- **Site-Titel:** {{ site.title }}
- **Compiler-Version:** v{{ docmd.version }}
- **Build-Jahr:** © {{ docmd.buildYear }}
- **Aktueller Git-Branch:** {{ docmd.gitBranch || "main" }}
- **Aktueller Git-Commit:** {{ docmd.gitCommit || "HEAD" }}
- **Aktueller Seiten-Slug:** `{{ page.slug }}`
:::

## Template-Syntax

Die Variablen-Engine verwendet eine übersichtliche geschweifte Klammer-Syntax:

```markdown
\{{ variableName }}
```

### Fallback-Standardwerte

Falls eine Variable nicht definiert ist (etwa in lokalen Entwicklungsumgebungen), können Sie mit dem `||`-Operator einen Standardwert angeben:

```markdown
Verbinden Sie sich mit unserem Server unter `\{{ server.endpoint || "https://api.example.com" }}`.
Willkommen zurück, \{{ user.name || 'Gast' }}!
Erstellt für Version \{{ targetVersion || 2.0 }}.
```

Als Fallback unterstützt werden:
* Einfach formatierte Strings: `'beispiel'`
* Doppelt formatierte Strings: `"beispiel"`
* Zahlen: `42` oder `2.0`
* Bezeichner: `default`

### Leerzeichen-Toleranz

Ausdrücke tolerieren beliebige Leerzeichen um Variablennamen und Operatoren:

```markdown
\{{   myVar   }}
\{{ env.PORT || "8080" }}
```

## Variablen-Lebenszyklus: Build-Zeit vs. Laufzeit

docmd trennt den Variablen-Lebenszyklus sauber in zwei aufeinander aufbauende Phasen:

::: mermaid title:"Variablen-Auflösungs-Pipeline" icon:workflow align:center zoom:true
graph TD
    subgraph Quelle["1. Eingaben & Definitionen"]
        B1["docmd.config.json<br/><code>variables</code> Block"]
        B2["Git & Umgebung<br/><code>env.*</code>, <code>DOCMD_VAR_*</code>, Git Root"]
        B3["Integrierte Metadaten<br/><code>version</code>, <code>buildYear</code>, <code>page.slug</code>"]
    end

    subgraph Compiler["2. Statische Build-Zeit-Auflösung"]
        Quelle --> VReg["VariableRegistry (@docmd/parser)"]
        VReg --> Interp["Markdown & Config Interpolator"]
        Interp --> HTML["Statisches HTML (Null JS-Overhead)"]
        Interp --> Markers["Dynamische Marker &lt;span data-docmd-var&gt;"]
    end

    subgraph Laufzeit["3. Clientseitige reaktive Laufzeit"]
        Markers --> DRuntime["docmd-runtime.js (window.docmd)"]
        DRuntime --> DOM["Live-Rehydrierung & Codeblöcke"]
        DRuntime --> Events["Cross-Frame postMessage & Events"]
    end
::: /mermaid

::: grids
    ::: grid
        ::: card "Statische Build-Zeit-Variablen" icon:cpu
        Statische Variablen werden während `docmd build` direkt in das HTML kompiliert. Sie verursachen keinerlei JavaScript-Ausführungszeit im Browser und keinen Layout-Shift (CLS).
        :::
    :::
    ::: grid
        ::: card "Reaktive Laufzeit-Variablen" icon:sparkles
        Dynamische Benutzersitzungswerte (wie API-Schlüssel oder Benutzernamen) werden von `docmd-runtime.js` live im DOM synchronisiert. Bei Eingaben aktualisieren sich alle Codeblöcke sofort.
        :::
    :::
::: /grids

### Statische Build-Zeit-Variablen

Variablen, die zur Build-Zeit feststehen, werden direkt in fertigen HTML-Code eingesetzt. Es entsteht keinerlei Overhead für den Besucher.

### Reaktive dynamische Variablen

Variablen, die als dynamisch konfiguriert sind oder Benutzersitzungsdaten enthalten (wie `user.name` oder `user.apiKey`), werden in reaktive Markierungs-Elemente gekapselt:

```html
<span data-docmd-var="user.name" class="docmd-var">Gast</span>
```

Im Browser aktualisiert `docmd-runtime.js` diese Werte bei Benutzerinteraktionen, SPA-Seitenwechseln und Session-Änderungen automatisch.

## Architektur: Trennung von Engine und UI

Um maximale Geschwindigkeit und Stabilität zu garantieren, wahrt docmd eine strikte Grenze zwischen Präsentation und Laufzeit-Engine:

* **`docmd-runtime.js`**: Die schlanke, headless Dynamic Engine, die in alle Templates (`default`, `summer` etc.) eingebunden wird. Sie verwaltet Registrierungen, Abonnements und Events, ohne in Styles oder UI einzugreifen.
* **`docmd-main.js`**: Das UI-Präsentationsskript für Theme-Wechsel, mobile Navigation und DOM-Interaktionen. Nach jedem SPA-Übergang ruft es `window.docmd.sync()` auf.

::: callout tip "Universelle Template-Kompatibilität" icon:check-circle
Da `docmd-runtime.js` universell in allen Layouts eingebunden wird, erhalten auch eigene Themes und Community-Templates die volle Personalisierungsunterstützung automatisch.
:::

## Nächste Schritte

Erkunden Sie die vollständigen Anleitungen zu allen Themen:

::: grids
    ::: grid
        ::: card "Integrierte Variablen" icon:terminal
        System-Variablen für Versionen, Build-Jahre, Datumsangaben und Git-Metadaten.
        [Leitfaden lesen](./built-in-variables.md)
        :::
    :::
    ::: grid
        ::: card "Konfigurations-Variablen" icon:settings
        Variablen in `docmd.config.json` deklarieren und in Fußzeilen, Bannern und Markdown nutzen.
        [Leitfaden lesen](./config-variables.md)
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "Umgebungsvariablen" icon:server
        CI/CD-Integration und Zero-Prefix-Promotion via `DOCMD_VAR_*`.
        [Leitfaden lesen](./environment-variables.md)
        :::
    :::
    ::: grid
        ::: card "Client-Laufzeit & Personalisierung" icon:sparkles
        Client-SDK (`window.docmd`), reaktive Benutzersitzungen und interaktive Codebeispiele.
        [Leitfaden lesen](./runtime-personalisation.md)
        :::
    :::
::: /grids
