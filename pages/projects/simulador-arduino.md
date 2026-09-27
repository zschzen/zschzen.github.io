---
title: Simulador Arduino - Circuit Simulator in Unreal
display: Simulador Arduino
subtitle: Real-time Arduino Uno and circuit simulator built in Unreal Engine 4
description: Simulador Arduino is a real-time simulator for electronic circuits and the Arduino Uno, built in Unreal Engine 4 for LabTIME's Arduino course.
category: Games
year: 2022–2023
role: LabTIME/UFG
tags: [Unreal Engine 4, C++]
cover: /projects/simulador-arduino/sketch.webp
featured: true
order: 2
facts:
  Engine: Unreal Engine 4
  Language: C++, Blueprints
  My role: UI, NGSpice integration, architecture
media:
  - src: /projects/simulador-arduino/sketch.mp4
    poster: /projects/simulador-arduino/sketch.webp
    video: true
    duration: '0:27'
    caption: Writing a sketch and running the simulation
  - src: /projects/simulador-arduino/wiring.mp4
    poster: /projects/simulador-arduino/wiring.webp
    video: true
    duration: '0:30'
    caption: Wiring LEDs and resistors on the breadboard
---

Simulador Arduino is a real-time simulation tool for electronic circuits and the Arduino Uno, made for the teachers and students of an Arduino course offered by [LabTIME](https://labtime.ufg.br). Users build circuits from a tray of electronic components, write sketches for the Arduino Uno in a built-in editor, and the simulator compiles the code and runs it against the circuit.

## My work

- **Circuit simulation**: integrated the NGSpice third-party library, configured its build scripts, wrote the wrapper interfaces, and validated simulation accuracy.
- **UI**: built the code editor and responsive layouts with Slate and UMG.
- **Architecture**: refactored the game code into Unreal Engine modules for maintainability.

## Tech

- **Unreal Engine 4** with **C++** and **Blueprints**
- **Slate** and **UMG** for the UI
- **NGSpice** for circuit simulation

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Wrapping a native C simulation library for use inside Unreal.
- Building a text editor with Slate, where UMG stops being enough.
- Splitting a growing Unreal project into modules without breaking the build.
