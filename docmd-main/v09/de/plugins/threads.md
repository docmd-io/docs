---
title: "Threads-Plugin"
description: "Kollaborative Inline-Diskussionsthreads und Texthervorhebungen, die nativ in Markdown-Dateien gespeichert werden."
---

Das `@docmd/plugin-threads`-Plugin ermöglicht kollaboratives Inline-Kommentieren und Textannotationen auf allen Dokumentationsseiten. Hervorhebungen und Diskussionsthreads werden nativ in Markdown-Quelldateien mithilfe benutzerdefinierter Container-Blöcke (`::: threads`) gespeichert. Es ist keine externe Datenbank erforderlich.

Ursprünglicher Autor: [@svallory](external:https://github.com/svallory)

::: callout info "Alpha-Release" icon:flask
Dieses Plugin befindet sich derzeit in der Alpha-Phase. Kerne-APIs und Speicher-Schemas sind stabil, während UI-Komponenten aktiv iteriert werden.
:::

## Installation & Setup

Installieren Sie das Plugin über die CLI:

```bash
npx @docmd/core add threads
```

Aktivieren Sie die Thread-Konfiguration in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Bei `true` werden Threads in einem dedizierten Panel angezeigt; bei `false` werden Threads inline an Texthervorhebungen angehängt. |
| `devOnly` | `boolean` | `true` | Beschränkt Client-UI-Assets auf Live-Dev-Server-Builds (`docmd dev`). Werden in statischen Produktions-Builds (`docmd build`) weggelassen. |

### Live-Entwicklungs-Server-Anforderung

Die interaktive Kommentaroberfläche, Texthervorhebungs-Werkzeuge und Markdown-Persistenzaktionen erfordern einen aktiven lokalen Entwicklungs-Server (`docmd dev`) mit einer funktionierenden WebSocket-RPC-Verbindung.

Da Threads `requiresLiveServer: true` deklariert:
- **Entwicklung (`docmd dev`)**: Der Ausklapp-Tab, die Inline-Vorschaukarten, das Auswahl-Popover und die Thread-Seitenleiste sind vollständig geladen und funktionsfähig.
- **Statische Produktions-Builds (`docmd build`)**: Client-Skripte und CSS werden automatisch weggelassen, damit öffentliche Websites ultraschnell, schlank und frei von inaktiven UI-Elementen oder fehlerhaften WebSocket-Verbindungsversuchen bleiben. Vorhandene Markdown-Syntax (`::: threads` und `==Text=={t-...}`) wird weiterhin fehlerfrei geparst.
- **Manuelle Überschreibung**: Wenn Sie die Threads-Client-Assets ausdrücklich auch in statische Builds bündeln möchten, konfigurieren Sie `"devOnly": false` unter `plugins.threads`.

### Globales Konfigurationsbeispiel

```json "docmd.config.json"
{
  "plugins": {
    "threads": {
      "sidebar": true,
      "devOnly": true
    }
  }
}
```

## Workflow-Übersicht

1. **Textauswahl**: Wählen Sie während der lokalen Live-Entwicklung (`npx @docmd/core dev`) Fließtext aus.
2. **Kommentar-Popover**: Geben Sie Feedback im Popover-Modal ein.
3. **Anker-Injizierung**: Ausgewählter Fließtext wird mit einer Thread-Kennung hervorgehoben (`==hervorgehobener Text=={t-a1b2c3d4}`).
4. **Markdown-Persistenz**: Thread-Strukturen werden am Ende der Markdown-Datei als `::: threads`-Block angehängt.
5. **Git-Synchronisation**: Der Diskussionsverlauf wird in der Quellverwaltung zusammen mit Dokumentbearbeitungen gespeichert.

## Interaktive Vorschau

Text mit angehängten Diskussionen erhält <span class="threads-preview-highlight">Inline-Farbhervorhebungen</span>. Thread-Karten werden darunter gerendert:

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 2 Tagen</div>
    <div class="threads-preview-body">Dieser Abschnitt könnte ein Diagramm vertragen, um die Architektur zu erklären. Was meinst du?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;vor 1 Tag</div>
    <div class="threads-preview-body">Gute Idee - ich füge ein Mermaid-Ablaufdiagramm hinzu. Passt <code>sequenceDiagram</code> hier?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 12 Std.</div>
    <div class="threads-preview-body">Perfekt. Ein einfaches Flussdiagramm wäre ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Zusätzliche Hervorhebungen durchlaufen automatisch <span class="threads-preview-highlight-blue">verschiedene Farbpaletten</span>:

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;vor 3 Tagen</div>
    <div class="threads-preview-body">Sollten wir hier Abwärtskompatibilität erwähnen?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Gelöste Diskussionen werden im abgedunkelten Zustand angezeigt:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 5 Tagen&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Gelöst</span></div>
    <div class="threads-preview-body">Tippfehler im Konfigurationsbeispiel behoben.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Ein rechts verankertes Registerkarten-Element <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span> schmiegt sich an den rechten Bildschirmrand und zeigt die Anzahl ungelöster Threads an. Das Überfahren von markiertem Text öffnet direkt eine Inline-Vorschaukarte im Dokumentinhalt, während ein Klick auf die Registerkarte die Seitenleiste öffnet. Threads bleiben beim Öffnen und Schließen der Leiste nahtlos erhalten, ohne die Seite neu zu laden.

## Markdown-Speicherformat

Threads werden in Dokumentquelldateien mithilfe von Containerblock-Syntax gespeichert:

```markdown
# Engine-Übersicht

Kernarchitekturfunktionen ==hervorgehobener Text=={t-a1b2c3d4} mit angehängtem Thread.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      Dieser Text erfordert zusätzliche technische Details.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Mit zusätzlichen Spezifikationen aktualisiert.

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

## Hauptfunktionen

* **Textauswahl**: Heben Sie beliebigen Fließtext hervor, um neue Threads zu verankern.
* **Thread-Antworten**: Verschachtelte Konversationsthreads.
* **Emoji-Reaktionen**: Fügt Kommentaren Zähler für Reaktionen hinzu.
* **Auflösungsstatus**: Markiert Threads mit Autorenattributierung als gelöst.
* **Autorenidentität**: Lokale Git-Anmeldeinformationen lösen Avatar- und Profildetails automatisch auf.

## RPC-Aktionen-API

Das Threads-Plugin stellt WebSocket-RPC-Endpunkte bereit, die über `docmd.call()` zugänglich sind:

| RPC-Methode | Technische Beschreibung |
| :--- | :--- |
| `threads:get-threads` | Ruft alle geparsten Threads für einen bestimmten Dateipfad ab. |
| `threads:add-thread` | Verankert einen neuen Thread und einen ersten Kommentar. |
| `threads:add-comment` | Hängt eine Antwort an einen bestehenden Thread an. |
| `threads:edit-comment` | Aktualisiert den Kommentartext. |
| `threads:delete-comment` | Entfernt einen Kommentareintrag. |
| `threads:delete-thread` | Entfernt den Thread-Container und bereinigt Text-Hervorhebungsanker. |
| `threads:resolve-thread` | Schaltet den Status der Thread-Auflösung um. |
| `threads:toggle-reaction` | Fügt Emoji-Reaktionen hinzu oder entfernt sie. |

## Speicher für Autorenprofile

Autorenprofile werden in `<docsRoot>/.threads/authors.json` zwischengespeichert:

```json ".threads/authors.json"
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

::: callout tip "Git-Native Versionierung" icon:git-commit
Da Thread-Metadaten vollständig in `.md`-Dateien liegen, folgen Kommentare den Standard-Workflows für Git-Branching, Pull-Request-Reviews und Commit-Historien.
:::