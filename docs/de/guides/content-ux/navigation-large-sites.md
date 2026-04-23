---
title: "Navigation entwerfen für Massendokumentationen"
description: "Architektur großer Navigationsbäume."
---

## Problem
Viele Folder-Ebenen tief verzweigt lässt den User als Sidebar-Katakombe zurück.

## Warum es wichtig ist
Gelingt die Navigation nicht, verlässt sich der User blind auf die Suchmaske.

## Ansatz
Top-Level Context Swapping in der Meta Navigation, flache interne Listen.

## Implementierung
Brechen Sie Menüs von 6 Ebenen Tiefe auf max. 2 Ebenen, gepaart mit TOC (Table of Contents) In-Page Navigation auf großen Anker-Seiten.

## Kompromisse
Das Zusammenfassen hunderter Subtopics in große Main-Pages erzwingt von Autoren eine rigide Markdown Header Hierarchie, um die rechte Seitenleiste optimal arbeiten zu lassen.
