---
title: Dura2D - 2D Game Physics Engine
display: Dura2D
subtitle: An educational 2D game physics engine, written in C++
description: Dura2D is an educational 2D game physics engine with a constraint-based solver, warm starting, and dynamic AABB tree broad-phase.
---

Dura2D is an educational 2D physics engine developed under [SOHNE](https://github.com/SOHNE). Instead of hiding the machinery behind an API, it is built to expose how game physics actually works: how bodies integrate, how contacts are solved, and how collision detection scales.

![Dura2D interactive demo](https://github.com/SOHNE/Dura2D/raw/main/res/dura2d.gif)

<!-- TODO: more screenshots. Drop files into public/projects/dura2d/ and reference them here. -->

It runs natively on Linux, macOS, and Windows, and in the browser through WebAssembly.

## Features

- **Constraint-based solver**: joints and contacts are resolved as constraints, which keeps stacks and articulated bodies stable.
- **Warm starting**: solver impulses are carried over between frames, so the solution converges in fewer iterations.
- **Dynamic AABB tree**: broad-phase collision detection stays fast as the number of bodies grows.

## Tech

- **C++** for the engine core
- **CMake** (3.26+) as the build system
- **Emscripten** for the WebAssembly / HTML5 build
- **GitHub Actions** CI on Ubuntu, macOS, and Windows

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Why constraint-based dynamics beats naive impulse resolution once bodies start stacking.
- How warm starting exploits temporal coherence to make an iterative solver practical in real time.
- How a dynamic AABB tree turns collision detection from a quadratic scan into a logarithmic query.
- Shipping the same C++ codebase to native platforms and the web with CMake and Emscripten.

Study references that shaped the engine: [Pikuma's Game Physics course](https://pikuma.com/courses/game-physics-engine-programming), [Ming-Lun "Allen" Chou's Game Physics series](https://allenchou.net/game-physics-series/), [Box2D](https://box2d.org/), and Jason Gregory's _Game Engine Architecture_.

## Links

- [Source on GitHub](https://github.com/SOHNE/Dura2D)
