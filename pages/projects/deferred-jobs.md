---
title: Deferred Jobs - Time Slicing in Unity and Unreal
display: Deferred Jobs
subtitle: Delayed result gathering and time slicing in Unity and Unreal
description: Unity and Unreal prototypes of Allen Chou's delayed result gathering and time slicing patterns, applied to deferred visibility queries.
category: Studies
year: 2023–2026
role: Personal, open source
tags: [Unreal, Unity, Multithreading]
link: https://github.com/zschzen/Unreal-Deferred-Jobs
linkLabel: Unreal source on GitHub
facts:
  Engines: Unity, Unreal Engine 5
  Languages: C#, C++
  Pattern: Time slicing, delayed gathering
media:
  - lab: '2024-04-22'
    caption: Unreal Engine 5
  - lab: '2023-04-19'
    caption: Unity
---

Two hands-on prototypes of the patterns from Allen Chou's articles on [Delayed Result Gathering](https://allenchou.net/2021/05/delayed-result-gathering/) and [Time Slicing](https://allenchou.net/2021/05/time-slicing/), one in Unity and one in Unreal.

Both use the same test case: an observer scans a grid with rays spread across frames. Results build an exposure map (red tiles are visible, green tiles are hidden), and a runner AI heads for the nearest hidden tile. The exposure map is only a test case: the point is to schedule work and gather its results frames later, so the main thread never blocks.

## Features

- **Unity**: time-sliced `RaycastCommand` batches, Burst-compiled setup and gather jobs, and a runtime ray-budget slider.
- **Unreal**: a generic `DeferredJobs` module (`ITimeSlicedJob` and `UDeferredWorkSystem`) that kicks one slice per tick and gathers the previous one without blocking, with live per-slice debug lines.
- **Live exposure visualization** in both engines.

## Tech

- **Unity** with **C#**, the Job System and Burst
- **Unreal Engine 5** with **C++**

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Separating scheduling from gathering, and what a frame of latency buys you.
- How the same pattern maps onto Unity's Job System and onto Unreal's game thread.

## Links

- [Unreal source on GitHub](https://github.com/zschzen/Unreal-Deferred-Jobs)
- [Unity source on GitHub](https://github.com/zschzen/Unity-Deferred-Jobs)
