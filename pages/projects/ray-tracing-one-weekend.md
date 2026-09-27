---
title: Ray Tracing in One Weekend in C99
display: Ray Tracing in One Weekend
subtitle: A C99 port of Peter Shirley's ray tracer
description: A pure C99 implementation of the ray tracer from Peter Shirley's Ray Tracing in One Weekend, built with CMake and running down to a PSP 3000.
category: Studies
year: 2025–2026
role: Personal, open source
tags: [C99, Ray tracing]
link: https://github.com/zschzen/RayTracing-One-Week
linkLabel: Source on GitHub
facts:
  Started: June 2025
  Language: C99
  Build: CMake, CPM.cmake
  Platforms: Linux, macOS, Windows, PSP
media:
  - lab: '2025-07-04'
    caption: Ray Tracing in One Weekend
  - lab: '2026-04-17'
    caption: Running on a PSP 3000
---

A C99 implementation of the ray tracer from Peter Shirley's [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html). It follows the book's progression step by step, in plain, portable C instead of C++, and writes the result to a PNG.

## Features

- **Pure C99**: no C++ features to lean on, so vectors, materials and the camera are all plain structs and functions
- **Cross-platform**: builds on Linux, macOS and Windows, with CI on GitHub Actions
- **Runs on a PSP 3000**

## Tech

- **C99**
- **CMake** 3.26+ with **CPM.cmake** for dependencies

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Translating the book's C++ class hierarchy into C99 structs and function tables.
- Where a CPU ray tracer spends its time, and what that means on constrained hardware.

## Links

- [Source on GitHub](https://github.com/zschzen/RayTracing-One-Week)
