---
title: rhio - C99 Render Hardware Interface
display: rhio
subtitle: A single-header Render Hardware Interface for OpenGL, OpenGL ES and Vulkan
description: rhio is a single-header Render Hardware Interface written in C99, with explicit vtables and backends for OpenGL 3.3, OpenGL ES 2.0/3.0 and Vulkan 1.4.
category: Engines
year: 2026–Present
role: Personal, open source
tags: [C99, Vulkan, OpenGL ES]
link: https://github.com/zschzen/rhio
linkLabel: Source on GitHub
facts:
  Started: April 2026
  Language: C99
  Backends: OpenGL 3.3, OpenGL ES 2.0/3.0, Vulkan 1.4
  Distribution: Single header
---

rhio is a minimal Render Hardware Interface (RHI) built around an explicit device/backend contract. It lets rendering code stay portable across graphics APIs without hiding backend ownership or lifecycle rules behind a heavy framework.

It picks up where [LeveGL](/projects/levegl) and [Vulkano](/projects/vulkano) left off: one C API over both the OpenGL family and Vulkan.

## Features

- **Header-only**: drop in `rhio.h` and define `RHIO_IMPLEMENTATION` in one translation unit.
- **Pure C99** for portability across compilers and platforms.
- **Backend chosen at device creation**: OpenGL 3.3, OpenGL ES 2.0/3.0 or Vulkan 1.4.
- **Thin vtable dispatch**: explicit function tables, small binary footprint, manual resource management.
- **Extensible**: custom backends plug into the same vtable hooks.

## Tech

- **C99** for the whole library
- **OpenGL**, **OpenGL ES** and **Vulkan** backends
- Example suite under `examples/`

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Drawing the line between a portable API and what each backend has to own.
- Mapping OpenGL's implicit state onto Vulkan's explicit resources, and the other way round.
- Keeping a vtable-based C API small enough to read in one sitting.

## Links

- [Source on GitHub](https://github.com/zschzen/rhio)
- [Documentation](https://peres.dev/rhio/)
