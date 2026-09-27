---
title: Chip0u - CHIP-8 Emulator
display: Chip0u
subtitle: CHIP-8 interpreter written in C++20
description: Chip0u is a learning-oriented CHIP-8 interpreter written in C++20, with a GUI for loading and running ROMs.
category: Emulators
year: 2024
role: SOHNE, open source
tags: [C++20, CHIP-8]
link: https://github.com/SOHNE/Chip0u
linkLabel: Source on GitHub
---

Chip0u is a learning-oriented dive into CHIP-8 emulation, the classic first step of emulator development. It loads assembled CHIP-8 ROMs through a GUI and aims only at simplicity, taking inspiration from the design and logic of existing interpreters.

It was developed alongside the community's best study material: the [CHIP-8 Research Facility](https://chip-8.github.io/), Tobias Langhoff's [Guide to making a CHIP-8 emulator](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/), and [Awesome CHIP-8](https://github.com/tobiasvl/awesome-chip-8).

## Features

- Runs assembled CHIP-8 ROMs, loaded through the GUI
- Small, readable interpreter core

## Tech

- **C++20** for the interpreter
- **CMake** as the build system

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- The fetch-decode-execute loop in its purest, most teachable form.
- Opcode dispatch, timers, and the display quirks every CHIP-8 guide warns about.
- Reading other emulators' source as literature.

## Links

- [Source on GitHub](https://github.com/SOHNE/Chip0u)
