---
title: "Reduzierung der JavaScript-Nutzdaten für schnellere Sites"
description: "Optimierte JS Ladezeiten."
---

## Problem
React-Dokumentationen kompilieren ein 250kb JS-Paket, was die Metrik 'Time to Interactive' zunichte macht.

## Warum es wichtig ist
Wartet ein User auf Reaktionen bei Mausklick (sog. Geisterklicks), entsteht Frust.

## Ansatz
Vanila JS. Keinen Virtual DOM für statische Texterfahrungen verwenden. 

## Implementierung
Die `docmd` Engine übermittelt kaum 20kb Vanilla JS in der Engine. Verderben Sie das nicht, indem Sie schwere Tracker integrieren. Falls Chat-Widgets unerlässlich sind, laden Sie diese verzögert (`defer`/`async`).

## Kompromisse
Manuelle DOM-Manipulation im Vanilla JS für Menüs statt deklarative React-Steuerung.
