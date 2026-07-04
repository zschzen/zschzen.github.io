---
title: LeveGL - Minimal C99 Rendering Library
display: LeveGL
subtitle: A simple rendering library for a simpler world
description: LeveGL is a lightweight rendering library written in C99, inspired by the simplicity of Raylib and the robustness of liblava.
---

LeveGL is a lightweight rendering library written in C99, developed under [SOHNE](https://github.com/SOHNE). It draws inspiration from the simplicity of [Raylib](https://github.com/raysan5/raylib) and the robustness of [liblava](https://github.com/liblava/liblava): a handful of calls gets you a window, a frame loop, and shapes on screen.

It started as a study project, and the API is still unstable and moving. That is part of the point: the codebase stays small and clear enough to learn from.

![Basic shapes rendered with LeveGL](https://github.com/user-attachments/assets/9c34d665-8b42-44ad-9cf4-acc414f27277)

## Features

- **Raylib-style API**: `InitWindow`, `SetTargetFPS`, draw, repeat. No boilerplate before the first triangle.
- **Immediate-mode drawing**: shapes and primitives are drawn directly inside the frame loop.
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
