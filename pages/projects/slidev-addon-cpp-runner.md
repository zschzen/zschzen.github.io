---
title: slidev-addon-cpp-runner - Run C and C++ in Slides
display: slidev-addon-cpp-runner
subtitle: Run C and C++ code inside Slidev presentations
description: A Slidev addon that compiles and runs C and C++ code blocks live inside presentations, powered by Coliru's compilation API.
---

A C and C++ execution addon for [Slidev](https://sli.dev)'s Monaco Runner, powered by [Coliru](https://coliru.stacked-crooked.com/)'s compilation API. Mark a code block with `{monaco-run}` and the slide compiles and runs it live, in front of the audience.

![slidev-addon-cpp-runner running C++ inside a slide](https://github.com/SOHNE/slidev-addon-cpp-runner/raw/main/.github/assets/screenshot-light.png)

## Features

- **In-slide execution**: write, compile, and run C/C++ without leaving the presentation.
- **Configurable toolchain**: compiler, standard (C2x, C++20, and friends), optimization level, flags, and linked libraries, all from frontmatter.
- **Per-slide overrides** on top of the global configuration.
- **Compiler output filtering**: show the noise only when it matters.

## Tech

- **TypeScript** on top of Slidev's addon system
- **Coliru API** for remote compilation
- Published on **npm** as `slidev-addon-cpp-runner`

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- How Slidev's Monaco Runner addon architecture works from the inside.
- Wrapping a remote compilation API with sane defaults and type-safe configuration.
- Publishing and maintaining a reusable addon on npm.

## Links

- [Source on GitHub](https://github.com/SOHNE/slidev-addon-cpp-runner)
- [Package on npm](https://www.npmjs.com/package/slidev-addon-cpp-runner)
