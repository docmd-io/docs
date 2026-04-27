---
title: "Tags"
description: "Verwenden Sie den Tag-Container, um Versionen oder Status zu kennzeichnen oder kurze Textausschnitte nahtlos im Fließtext hervorzuheben."
---

Der `tag`-Container ist eine selbstschließende Komponente, mit der kleine, pillenförmige Badges direkt in Ihren Text eingefügt werden können. Im Gegensatz zu Block-Containern erben Tags keine massiven Größen von übergeordneten Elementen wie Überschriften; sie behalten ihre kompakten, sauberen Proportionen bei, egal wo sie platziert werden.

## Grundlegende Verwendung

Um einen einfachen Tag zu erstellen, geben Sie einfach den Text an, den Sie anzeigen möchten:

::: tabs
    == tab "Vorschau"
        Diese Funktion wurde in ::: tag "v0.7.4" color:blue hinzugefügt und funktioniert perfekt.
    == tab "Markdown-Quelle"
        ```markdown
        Diese Funktion wurde in ::: tag "v0.7.4" hinzugefügt und funktioniert perfekt.
        ```
:::

## Farben anpassen

Sie können das Standard-Tag-Styling überschreiben, indem Sie einen beliebigen gültigen CSS-Farbstring (z. B. `#ff0000`, `blue` oder `hsl(...)`) über das Attribut `color:` angeben. `docmd` berechnet automatisch einen schönen getönten Hintergrund mit perfekt kontrastiertem Text und Rahmen!

::: tabs

== tab "Vorschau"
::: tag "Veraltet" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stabil" color:#22c55e
== tab "Markdown-Quelle"
````markdown
::: tag "Veraltet" color:#ef4444
::: tag "Beta" color:#eab308
::: tag "Stabil" color:#22c55e
````

:::

## Icons hinzufügen

Genau wie bei Buttons und Callouts können Sie ganz einfach ein Icon aus der `docmd`-Icon-Bibliothek über das Attribut `icon:` hinzufügen.

::: tabs

== tab "Vorschau"
::: tag "Verifiziert" icon:check-circle color:#10b981
== tab "Markdown-Quelle"
````markdown
::: tag "Verifiziert" icon:check-circle color:#10b981
````

:::

## Tags verlinken

Wenn Ihr Tag als Hyperlink fungieren soll (z. B. um einen Versions-Tag direkt mit seinen Versionshinweisen zu verknüpfen), können Sie das Attribut `link:` verwenden. Externe Links werden automatisch erkannt und in einem neuen Tab geöffnet.

::: tabs

== tab "Vorschau"
Sehen Sie sich die neuesten ::: tag "Versionshinweise" icon:external-link link:/release-notes/0-7-4 an.
== tab "Markdown-Quelle"
````markdown
Sehen Sie sich die neuesten ::: tag "Versionshinweise" icon:external-link link:/release-notes/0-7-4 an.
````

:::

## Tags in Überschriften verwenden

Da Tags echte Inline-Elemente sind, sehen sie hervorragend aus, wenn sie zur Kennzeichnung von Hauptüberschriften verwendet werden. Sie richten sich automatisch an der Grundlinie aus, ohne die massive Schriftgröße der Überschrift zu erben.

::: tabs

== tab "Vorschau"
# Suchfilterung ::: tag "Neu" color:#8b5cf6
== tab "Markdown-Quelle"
````bash
# Suchfilterung ::: tag "Neu" color:#8b5cf6
````

:::
