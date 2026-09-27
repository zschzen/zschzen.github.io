---
title: GLASM - OpenGL in x64 NASM
display: GLASM
subtitle: An OpenGL triangle renderer written in x64 NASM assembly
description: GLASM renders a colored OpenGL triangle through GLFW, written entirely in x64 NASM assembly with a reusable macro library.
category: Studies
year: 2025
role: Personal, open source
tags: [NASM, OpenGL]
link: https://github.com/zschzen/GLASM
linkLabel: Source on GitHub
facts:
  Started: August 2025
  Language: x64 NASM
  Libraries: GLFW, OpenGL
media:
  - lab: '2025-08-13'
    caption: OpenGL in x64 NASM
---

GLASM is a small OpenGL demo written in x64 NASM assembly: open a window with GLFW, handle resizes and keyboard input, and draw a colored triangle, with no C in between.

It doubles as teaching material. A reusable macro library keeps the boilerplate down and the code readable, and the [notes on NASM `struc`](/notes/2025/nasm-struc) cover how the data layout is mapped.

## Features

- **GLFW** window management, resize handling and keyboard controls
- **Colored triangle** rendered through OpenGL
- **Macro library** that cuts calling-convention boilerplate
- **Cross-platform** Makefile build (macOS tested; Linux and Windows untested)

## Tech

- **NASM** 2.15+ for the assembly
- **GCC** as the linker
- **GLFW** and **OpenGL**

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Calling C libraries from assembly: calling conventions, stack alignment and shadow space.
- Using `struc` to keep memory layout explicit and readable.

## Links

- [Source on GitHub](https://github.com/zschzen/GLASM)
- [Notes: NASM struc](/notes/2025/nasm-struc)
