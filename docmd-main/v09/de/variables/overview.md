---
title: Übersicht über Variablen & Dynamische Laufzeit
description: Erfahren Sie, wie die docmd Variablen- und Personalisierungs-Engine dynamische, wartbare und interaktive Dokumentationen zur Build-Zeit und Client-Laufzeit ermöglicht.
---

# Variablen & Dynamische Laufzeit

docmd bietet eine **Variablen- und Personalisierungs-Engine**, die statische Build-Zeit-Interpolation mit clientseitiger reaktiver Personalisierung vereint.

Anstatt Firmennamen, API-URLs, Release-Jahre oder Versionen über Dutzende von Markdown-Dateien hinweg fest zu codieren, können Sie dynamische Variablen mithilfe sauberer Vorlagenausdrücke referenzieren.

```markdown
Willkommen zur Dokumentation für **{{ site.title }}** v{{ docmd.version }}!
Aktuelles Copyright: © {{ docmd.buildYear }}.
```

## Vorlagensyntax

Die Variablen-Engine verwendet geschweifte Klammern:

```markdown
{{ variableName }}
```

### Fallback-Standardwerte

Falls eine Variable nicht immer definiert ist, geben Sie einen Standardwert mit dem `||`-Operator an:

```markdown
Verbinden Sie sich mit unserem Server unter `{{ server.endpoint || "https://api.example.com" }}`.
Willkommen zurück, {{ user.name || 'Gast' }}!
Erstellt für Version {{ targetVersion || 2.0 }}.
```

Der Fallback kann sein:
* Einfach formatierte Zeichenkette: `'beispiel'`
* Doppelt formatierte Zeichenkette: `"beispiel"`
* Zahl: `42` oder `2.0`
* Bezeichner: `default`

### Leerzeichentolerant

Ausdrücke tolerieren Leerzeichen um Variablennamen und Fallback-Operatoren:

```markdown
{{   myVar   }}
{{ env.PORT || "8080" }}
```

## Variablen-Lebenszyklus: Build-Zeit vs. Laufzeit

docmd trennt den Lebenszyklus von Variablen sauber in zwei Phasen:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BUILD-ZEIT-AUFLÖSUNG                            │
│  - Integrierte dynamische Variablen (docmd.version, docmd.buildYear)   │
│  - System-Umgebungsvariablen (env.NAME, DOCMD_VAR_*)                   │
│  - docmd.config.json Variablen (statische Strings, Konfiguration)      │
│  - Direktes Rendern in statisches HTML während docmd build             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT-LAUFZEIT                                 │
│  - Bereitgestellt durch docmd-runtime.js (window.docmd)                │
│  - Rehydriert dynamische Marker (<span data-docmd-var="...">)          │
│  - Interaktive Personalisierung: Live-API-Schlüssel, Benutzersitzungen │
│  - Cross-Frame postMessage & Event-Dispatching                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Statische Build-Zeit-Variablen

Variablen, die während `docmd build` aufgelöst werden, werden direkt in statisches HTML kompiliert. Es entsteht kein clientseitiger JavaScript-Overhead oder Layout-Shift.

### Reaktive dynamische Variablen

Variablen, die als dynamisch deklariert sind oder Benutzersitzungsattribute enthalten (wie `user.name` oder `user.apiKey`), werden in reaktive DOM-Marker eingebettet:

```html
<span data-docmd-var="user.name" class="docmd-var">Gast</span>
```

Zur Laufzeit füllt `docmd-runtime.js` diese Werte automatisch aus und synchronisiert sie über die gesamte Seite, in Code-Blöcken und bei SPA-Seitenübergängen ohne Neuladen der Seite.

## Architektur: Trennung von Engine und UI

Um maximale Geschwindigkeit und Stabilität zu garantieren, hält docmd eine strikte Trennung zwischen UI-Darstellung und der headless Laufzeit aufrecht:

* **`docmd-runtime.js`**: Headless Laufzeit-Engine, die in alle Vorlagen (`default`, `summer` usw.) eingebunden wird. Sie verwaltet Variablen-Registrierungen, Subscriptions, Client-Speicher und Cross-Window-Events, ohne DOM-Animationen oder Stylings zu stören.
* **`docmd-main.js`**: Das UI-Präsentationsskript, das für Themenwechsel, mobile Menüs, SPA-Navigation und DOM-Interaktionen zuständig ist. Bei jedem SPA-Seitenwechsel ruft es `window.docmd.sync()` auf, um sicherzustellen, dass dynamische Variablen vollständig rehydriert bleiben.

## Nächste Schritte

Erkunden Sie die vollständige Dokumentation zu allen Themen:

* [Integrierte Variablen](./built-in-variables.md) — Integrierte Systemvariablen für Build-Jahre, Datumsangaben, Versionen und Git-Metadaten.
* [Konfigurations- & benutzerdefinierte Variablen](./config-variables.md) — Variablen in `docmd.config.json` deklarieren und in Fußzeile, Bannern und Dokumenten nutzen.
* [Umgebungsvariablen](./environment-variables.md) — CI/CD-Umgebungsvariablen und `DOCMD_VAR_*`-Promotion.
* [Client-Laufzeit & Personalisierung](./runtime-personalisation.md) — Clientseitiges Runtime-SDK (`window.docmd`), reaktive Sitzungen und interaktive Code-Blöcke.
