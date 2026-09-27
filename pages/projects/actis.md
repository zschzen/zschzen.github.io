---
title: Actis - WebGL Multipass Shader Library
display: Actis
subtitle: WebGL library for fragment shaders, multipass rendering, and textures
description: Actis is a lightweight WebGL library for fragment shaders, chained rendering passes, and textures, with React integration.
category: Tools
year: 2024–Present
role: SOHNE, open source
tags: [TypeScript, WebGL]
link: https://github.com/SOHNE/Actis
linkLabel: Source on GitHub
facts:
  Started: May 2024
  Language: TypeScript
  Package: '@actis/core'
media:
  - lab: '2024-11-11'
    caption: Multi-pass shader web editor
---

Actis, first released as Shader.Vista, is a lightweight WebGL rendering library that makes it easy to work with fragment shaders, rendering passes, and textures. Where [Shader.One](/projects/shader-one) is an editor, this is a library: the machinery for running shader pipelines inside your own web apps. The shader demos on this site run on it.

## Features

- **Simple API**: create a WebGL context, add passes and bind textures with a few calls
- **Multipass rendering**: named passes (`bufferA`, `bufferB`, and so on) chain automatically and read each other as textures
- **React integration**: hooks and components for using shaders in any view
- Published on **npm** as `@actis/core`

## Tech

- **TypeScript** for the library, on top of **twgl.js**
- **WebGL** fragment shaders with the usual uniforms (`u_time`, `u_resolution`, `u_mouse`)
- **React** bindings
- **CodeMirror 6** and **UnoCSS** for the playground

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Managing WebGL state and framebuffer ping-pong across multiple passes.
- Designing a library API that stays out of React's way.
- Packaging and publishing a typed npm library.

## Links

- [Source on GitHub](https://github.com/SOHNE/Actis)
- [Playground](https://actisgl.netlify.app)
- [@actis/core on npm](https://www.npmjs.com/package/@actis/core)
