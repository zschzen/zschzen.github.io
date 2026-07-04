---
title: CameBoy - Game Boy Emulator
display: CameBoy
subtitle: A minimalist Game Boy emulator written in C99
description: CameBoy is a minimalist Game Boy emulator written in C99 with an SDL2 front-end, built for learning the bare mechanics of the classic handheld.
---

CameBoy is a raw dive into retro computing: a Game Boy emulator built in C99, pieced together from a patchwork of online insights to reveal the bare mechanics behind the classic handheld. No bells, no whistles; every line tries to be a lesson in minimalism.

![CameBoy running the bgbtest.gb demo ROM](https://github.com/user-attachments/assets/2c978054-81e3-4b64-828e-c6480615e974)

It already passes Blargg's `cpu_instrs` hardware test ROM, with instruction and memory timing still being brought in line.

## Features

- **C99 core**, separated from the front-end
- **SDL2 front-end** for video, input, and text (SDL2 + SDL2_ttf)
- **Test-ROM driven**: progress is measured against Blargg's hardware test ROMs
- **CI builds and tests** on GitHub Actions

## Tech

- **C99** with **CMake** (3.26+), dependencies managed by CPM.cmake
- **SDL2** and **SDL2_ttf**
- Project notes kept (in Portuguese) on [Notion](https://leandroperes.notion.site/Game-Boy-C-Emulator-1a2d6f68a3ab8093a418fff30b2c236b)

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- The Game Boy's memory map, and why emulation is mostly bookkeeping done honestly.
- Instruction accuracy versus timing accuracy: passing `cpu_instrs` is the easy half.
- Using hardware test ROMs as an executable specification.

## Links

- [Source on GitHub](https://github.com/SOHNE/CameBoy)
- [Releases](https://github.com/SOHNE/CameBoy/releases)
