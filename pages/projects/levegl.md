---
title: LeveGL - Minimal C99 Rendering Library
display: LeveGL
subtitle: A simple rendering library for a simpler world
description: LeveGL is a lightweight rendering library written in C99, inspired by the simplicity of Raylib and the robustness of liblava.
category: Engines
year: 2024–Present
role: SOHNE, open source
tags: [C99, OpenGL ES]
link: https://github.com/SOHNE/LeveGL
linkLabel: Source on GitHub
icon: levegl
facts:
  Started: November 2024
  Language: C99
  Graphics: OpenGL, OpenGL ES
  Build: CMake, CPM.cmake
  Platforms: Linux, macOS, Windows, Web, PSP
media:
  - lab: '2025-07-03'
    caption: Running on the PSP with Dura2D
---

LeveGL is a lightweight rendering library written in C99, developed under [SOHNE](https://github.com/SOHNE). It draws inspiration from the simplicity of [Raylib](https://github.com/raysan5/raylib) and the robustness of [liblava](https://github.com/liblava/liblava): a handful of calls gets you a window, a frame loop, and shapes on screen.

It started as a study project, and the API is still unstable and moving. That is part of the point: the codebase stays small and clear enough to learn from.

## Features

- **Raylib-style API**: `InitWindow`, `SetTargetFPS`, draw, repeat. No boilerplate before the first triangle.
- **Immediate-mode drawing**: shapes and primitives are drawn directly inside the frame loop.
- **Batched 2D shapes**: rectangles, circles and lines share batched draw calls behind an extensible API.
- **One API, two backends**: a unified layer over desktop OpenGL (through the GLAD loader) and OpenGL ES.
- **Swappable window backends**: the windowing layer is chosen at compile time, without touching user code.
- **Fetch and build**: CMake with CPM.cmake pulls every dependency, so a clone builds as is.
- **Small, readable core**: written to be read, not just linked against.

## Tech

- **C99** for the whole library
- **OpenGL / OpenGL ES** as rendering backends
- **CMake** as the build system

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- How Raylib-style APIs hide a state machine behind a handful of friendly calls.
- What it takes to sit one C API on top of both desktop OpenGL and OpenGL ES.
- Keeping a growing C99 codebase approachable: naming, headers, and discipline.

## Links

- [Source on GitHub](https://github.com/SOHNE/LeveGL)
