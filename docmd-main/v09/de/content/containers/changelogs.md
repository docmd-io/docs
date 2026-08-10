---
title: "Änderungsprotokolle (Changelogs)"
description: "Erstellen Sie strukturierte, zeitleistenbasierte Versionshistorien und Release-Notes in docmd."
---

Der `changelog`-Container bietet ein spezialisiertes Layout zur Dokumentation der Projektentwicklung. Er parst Versions- oder Datumsangaben in vertikale Zeitleisteneinträge.

## Container-Syntax

```markdown
::: changelog # Äußerer Release-Historien-Container Öffner
::: log [title:"v1.0.0 (TT.MM.JJJJ)"] # Einzelner Versionseintrag Öffner
Release-Details (Markdown-Überschriften, Stichpunkte, Hinweisfelder)...
::: /log # Expliziter Log-Eintrag Schließer

::: log [title:"v0.9.0 (TT.MM.JJJJ)"] # Zweiter Versionseintrag Öffner
Release-Notes...
::: /log
::: /changelog # Expliziter Changelog Schließer
```

## Funktionen & Unterstützte Attribute

| Parameter / Element | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Versions-Beschriftung** | `"String"` \| `title:"..."` | Versionsnummer oder Datum als Badge am linken Rand. |
| **Sub-Container** | `::: log` ... `::: /log` | Explizite Versionseintrags-Wrapper. Alte `== Datum` Syntax wird unterstützt. |
| **Schließ-Tags** | `::: /changelog`, `::: /log`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

```markdown
::: changelog # Produktions-Release-Historie
::: log "v2.0.0 (15.03.2026)" # Hauptrelease
### Große Überholung des Systems
Die Kern-Engine wurde für isomorphe Ausführung neu architektoniert.

*   **SPA Router** für seitenfreie Navigation implementiert.
*   **Isomorphe Plugin**-Architektur eingeführt.

::: callout success
Dieses Release bietet eine 40%ige Verbesserung der anfänglichen Kompilierungsgeschwindigkeit.
::: /callout
::: /log

::: log "v1.5.1 (10.12.2025)" # Patch-Update
### Sicherheitspatch
*   Sicherheitslücke im internen Parser behoben.
*   Abhängigkeiten aktualisiert.
::: /log
::: /changelog
```

::: changelog # Produktions-Release-Historie
::: log "v2.0.0 (15.03.2026)" # Hauptrelease
### Große Überholung des Systems
Die Kern-Engine wurde für isomorphe Ausführung neu architektoniert.

*   **SPA Router** für seitenfreie Navigation implementiert.
*   **Isomorphe Plugin**-Architektur eingeführt.

::: callout success
Dieses Release bietet eine 40%ige Verbesserung der anfänglichen Kompilierungsgeschwindigkeit.
:::
::: /log

::: log "v1.5.1 (10.12.2025)" # Patch-Update
### Sicherheitspatch
*   Sicherheitslücke im internen Parser behoben.
*   Abhängigkeiten aktualisiert.
::: /log
::: /changelog

::: callout note "Legacy == Eintrags-Marker-Syntax" icon:archive
Bestehende Dokumentationen mit `==`-Eintragsmarkern werden weiterhin verarbeitet:

```markdown
::: changelog
== v1.0.0 (01.05.2024)
Erstveröffentlichung.
::: /changelog
```
:::