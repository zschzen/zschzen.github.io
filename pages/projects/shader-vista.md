---
title: Shader.Vista - WebGL Shader Library
display: Shader.Vista
subtitle: WebGL library for fragment shaders, multipass rendering, and textures
description: Shader.Vista (since renamed Actis) is a lightweight WebGL library for fragment shaders, rendering passes, and textures, with React integration.
---

Shader.Vista, since renamed **Actis**, is a lightweight WebGL rendering library that makes it easy to work with fragment shaders, rendering passes, and textures. Where [Shader.One](/projects/shader-one) is an editor, this is a library: the machinery for running shader pipelines inside your own web apps.

## Features

- **Simple API** for setting up WebGL rendering contexts
- **Multipass rendering**: chain named passes (`bufferA`, `bufferB`, and so on) that read each other as textures
- **React integration** for modern web apps
- Published on **npm** as `@actis/core`

## Tech

- **TypeScript** for the library
- **WebGL** fragment shaders with the usual uniforms (`u_time`, `u_resolution`, `u_mouse`)
- **React** bindings

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Managing WebGL state and framebuffer ping-pong across multiple passes.
- Designing a library API that stays out of React's way.
- Packaging and publishing a typed npm library.

## Links

- [Source on GitHub](https://github.com/SOHNE/Shader.Vista)
