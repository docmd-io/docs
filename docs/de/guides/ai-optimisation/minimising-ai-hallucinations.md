---
title: "Dokumentation schreiben, die KI-Halluzinationen minimiert"
description: "KI-Halluzinationen vermeiden."
---

## Problem
Ohne explizite Variablendefinitionen erfinden KIs imports nach Industriestandards, die oft falsch sind.

## Warum es wichtig ist
Halluzinierter Code bricht das Vertrauen in Ihre Dokumentation.

## Ansatz
Nutzen Sie **defensive Dokumentation**. Immer vollständige Import-Anweisungen und echte Strings statt Platzhalter angeben.

## Implementierung
Zeigen Sie in jedem Snippet Import-Anweisungen, nutzen Sie konkrete Magische Strings ("production" statt "dein_env") und dokumentieren Sie Regeln als inline Code-Kommentare.

## Kompromisse
Die Beispiele werden länger und redundanter für menschliche Leser.
