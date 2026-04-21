---
title: "Threads-Plugin"
description: "Fügen Sie Ihrer Dokumentation Inline-Diskussionsthreads hinzu — direkt in Ihren Markdown-Dateien gespeichert."
---

Das **Threads-Plugin** bringt kollaborative Inline-Kommentare in Ihre Dokumentation. Wählen Sie einen beliebigen Text auf der Seite aus, hinterlassen Sie einen Kommentar und starten Sie eine Diskussion — alles wird direkt in Ihren Markdown-Quelldateien gespeichert, ganz ohne Datenbank.

Ursprünglicher Autor: [@svallory](https://github.com/svallory)

::: callout info "Alpha-Release"
Dieses Plugin befindet sich in der Alpha-Phase. Die API und das Speicherformat sind stabil, aber die Benutzeroberfläche wird aktiv weiterentwickelt.
:::

## Setup

```bash
docmd add threads
```

```javascript
plugins: {
  threads: {}
}
```

### Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `sidebar` | `boolean` | `false` | Wenn `true`, werden Threads am Ende der Seite gruppiert. Wenn `false` (Standard), werden Threads direkt neben dem markierten Text positioniert. |

```javascript
// Threads am Ende der Seite behalten statt inline
plugins: {
  threads: {
    sidebar: true
  }
}
```

## Funktionsweise

<!-- SCREENSHOT: Der Ablauf der Thread-Erstellung — (1) Text auf der Seite ausgewählt, (2) Kommentar-Popover erscheint, (3) markierter Text mit Thread-Karte darunter. Zeige den Ablauf in 3 nummerierten Schritten. -->

1. **Text auswählen** auf einer beliebigen Dokumentationsseite während `docmd dev`.
2. Ein **Kommentar-Popover** erscheint — schreiben Sie Ihren Kommentar und senden Sie ihn ab.
3. Der ausgewählte Text wird mit einer **Thread-Markierung hervorgehoben**.
4. Threads werden als `::: threads`-Blöcke am Ende der Markdown-Datei gespeichert.
5. **Keine Datenbank** — Ihre Markdown-Dateien sind die Basis (Source of Truth).

## Vorschau

So sehen Threads auf einer Live-Seite aus. Text mit Diskussionen wird <span class="threads-preview-highlight">wie hier markiert</span> und Thread-Karten erscheinen darunter.

<div class="threads-preview-card">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 2 Tagen</div>
    <div class="threads-preview-body">Dieser Abschnitt könnte ein Diagramm vertragen, um die Architektur zu erklären. Was denkt ihr?</div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">B</div>
    <div class="threads-preview-meta"><strong>Bob</strong>&nbsp;·&nbsp;vor 1 Tag</div>
    <div class="threads-preview-body">Gute Idee — ich füge ein Mermaid-Flussdiagramm hinzu. Funktioniert <code>sequenceDiagram</code> hier?</div>
    <div class="threads-preview-reactions">
      <div class="threads-preview-reaction">👍 <span>2</span></div>
      <div class="threads-preview-reaction">🚀 <span>1</span></div>
    </div>
  </div>
  <div class="threads-preview-comment threads-preview-reply">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 12 Stunden</div>
    <div class="threads-preview-body">Perfekt. Ein einfaches Flussdiagramm wäre ideal.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Und hier ist eine <span class="threads-preview-highlight-blue">zweite Markierung mit einer anderen Farbe</span> — Threads durchlaufen automatisch eine Farbpalette.

<div class="threads-preview-card threads-preview-card-blue">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">C</div>
    <div class="threads-preview-meta"><strong>Charlie</strong>&nbsp;·&nbsp;vor 3 Tagen</div>
    <div class="threads-preview-body">Sollten wir hier die Abwärtskompatibilität erwähnen?</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

Gelöste Threads erscheinen ausgegraut:

<div class="threads-preview-card threads-preview-card-resolved">
  <div class="threads-preview-comment">
    <div class="threads-preview-avatar">A</div>
    <div class="threads-preview-meta"><strong>Alice</strong>&nbsp;·&nbsp;vor 5 Tagen&nbsp;&nbsp;<span class="threads-preview-resolved-badge">✓ Gelöst</span></div>
    <div class="threads-preview-body">Tippfehler im Konfigurationsbeispiel korrigiert.</div>
  </div>
  <div class="threads-preview-footer">
    <div class="threads-preview-footer-btn">+ Neuer Kommentar</div>
  </div>
</div>

In der unteren rechten Ecke erscheint eine schwebende **Diskussions-Schaltfläche** <span class="threads-preview-fab">💬<span class="threads-preview-fab-badge">2</span></span>, die die Anzahl der offenen Threads anzeigt. Klicken Sie darauf, um zum ersten Thread auf der Seite zu springen.

## Speicherformat

Threads werden unter Verwendung der docmd-Container-Syntax in Ihr Markdown eingebettet:

```markdown
# Meine Dokumentationsseite

Inhalt mit einem ==markierten Text=={t-a1b2c3d4}, der einen Thread hat.

::: threads
  ::: thread t-a1b2c3d4
    ::: comment c-e5f6a7b8 "Alice" "2026-04-09"
      Dieser Text benötigt eine Klärung.
    :::
    ::: comment c-d9e0f1a2 "Bob" "2026-04-09" reply-to c-e5f6a7b8
      Habe es aktualisiert — passt das so?

      ::: reactions
        - 👍 Alice
      :::
    :::
  :::
:::
```

Die Syntax `==text=={threadId}` verknüpft markierten Text im Dokumentenkörper mit einem spezifischen Thread.

## Funktionen

| Funktion | Beschreibung |
| :--- | :--- |
| **Textauswahl** | Beliebigen Text markieren, um einen neuen Thread zu starten |
| **Antworten** | Verschachtelte Antwortketten innerhalb jedes Threads |
| **Reaktionen** | Emoji-Reaktionen auf einzelne Kommentare |
| **Bearbeiten / Löschen** | Modifizieren oder Entfernen Ihrer Kommentare |
| **Lösen (Resolve)** | Threads als gelöst markieren mit Autor + Zeitstempel |
| **Autorenprofile** | Git-basierte Autorenerkennung mit Gravatar-Unterstützung |
| **Hervorhebungsmarker** | Visuelle Indikatoren auf der Seite, die zeigen, wo Threads verankert sind |
| **Floating Button** | Schnellzugriff-Schaltfläche mit Anzeige der offenen Threads |
| **Scroll-Erhalt** | Die Seitenposition bleibt nach dem Hinzufügen von Kommentaren erhalten |

## Actions API

Das Threads-Plugin stellt die folgenden Aktionen über das WebSocket RPC-System zur Verfügung. Diese können von Browser-Plugins mittels `docmd.call()` aufgerufen werden:

| Aktion | Beschreibung |
| :--- | :--- |
| `threads:get-threads` | Alle Threads aus einer Datei auslesen und zurückgeben |
| `threads:add-thread` | Einen neuen Thread mit dem ersten Kommentar erstellen |
| `threads:add-comment` | Einen Kommentar zu einem bestehenden Thread hinzufügen |
| `threads:edit-comment` | Den Inhalt eines bestehenden Kommentars bearbeiten |
| `threads:delete-comment` | Einen Kommentar aus einem Thread entfernen |
| `threads:delete-thread` | Einen kompletten Thread entfernen und Markierungen bereinigen |
| `threads:resolve-thread` | Status gelöst/ungelöst umschalten |
| `threads:toggle-reaction` | Eine Emoji-Reaktion auf einen Kommentar umschalten |
| `threads:get-authors` | Die Map der Autorenprofile lesen |
| `threads:upsert-author` | Ein Autorenprofil erstellen oder aktualisieren |

## Autorenprofile

Autoreninformationen werden in `<docsRoot>/.threads/authors.json` gespeichert:

```json
{
  "alice@example.com": {
    "name": "Alice",
    "avatarUrl": "https://gravatar.com/avatar/..."
  }
}
```

Während der Entwicklung erkennt das Plugin automatisch Ihren Git-Benutzernamen und Ihre E-Mail zur Autorenidentifikation.

::: callout tip "Freundlich zur Versionskontrolle"
Da Threads in Ihren Markdown-Dateien gespeichert werden, werden sie automatisch mit Git versioniert. Prüfen Sie Kommentare in Pull Requests, verfolgen Sie die Diskussionshistorie und arbeiten Sie über Ihren bestehenden Workflow zusammen.
:::