---
title: Vulkano - Vulkan Rendering Library
display: Vulkano
subtitle: A simple Vulkan rendering library
description: Vulkano is a simple Vulkan rendering library written in C++.
---

Vulkano is a simple Vulkan rendering library written in C++, developed under [SOHNE](https://github.com/SOHNE). It is the Vulkan sibling of [LeveGL](/projects/levegl): the same appetite for small, readable rendering code, pointed at an explicit, modern API.

It is at an early stage, with no public documentation yet.

<!-- TODO: screenshots. Drop files into public/projects/ and reference them here. -->

## Tech

- **C++** for the library
- **Vulkan** as the rendering API
- **CMake** as the build system

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- How much of Vulkan is deliberate ceremony: instance, device, queues, and swapchain before the first pixel.
- Explicit synchronization with fences and semaphores, and why the driver no longer saves you.

## Links

- [Source on GitHub](https://github.com/SOHNE/Vulkano)
