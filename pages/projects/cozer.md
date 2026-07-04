---
title: Cozer - 2D Game Engine
display: Cozer
subtitle: 2D game engine with Lua scripting and ECS support
description: Cozer is a 2D game engine built around an entity-component-system core with Lua as the scripting layer.
---

Cozer is a 2D game engine built around two ideas: an entity-component-system core, and Lua as the scripting layer on top of it. Engine code stays structural; game code stays small and scriptable.

<!-- TODO: no public repository yet. Describe the architecture, add code samples, and drop screenshots into public/projects/. -->

## Tech

- **ECS** (entity-component-system) architecture
- **Lua** for gameplay scripting

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Structuring an engine around ECS: composition over inheritance, systems over God objects.
- Embedding Lua: bindings, lifetimes, and where the engine ends and the script begins.
