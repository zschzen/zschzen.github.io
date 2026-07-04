---
title: Colorblindness - Unity Color-blindness Simulation
display: Colorblindness
subtitle: Unity post-processing for simulating color-blind palettes
description: A Unity URP/HDRP package that simulates eight types of color blindness through the post-processing volume system.
---

Colorblindness is a Unity package that simulates how a scene looks to color-blind players. It plugs into the Scriptable Render Pipeline's volume system and applies color matrices through the Channel Mixer, covering eight profiles: protanopia, protanomaly, deuteranopia, deuteranomaly, tritanopia, tritanomaly, achromatopsia, and achromatomaly.

It was used in [Robots Fight At Night](/projects/robots-fight-at-night) to check palette readability.

## Features

- **Eight color-blindness profiles**, based on published color-matrix simulations
- **Runtime switching**: cycle filters in-game with a hotkey (F1 by default)
- **Persistence**: the chosen filter is saved via PlayerPrefs
- **Scene-proof**: filters re-apply automatically to volumes across scene loads
- **Easy install**: UPM git URL or .unitypackage

## Tech

- **Unity** (2018.4 LTS+) with **C#**
- **URP / LWRP** and **HDRP**, via the post-processing Channel Mixer

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- How color-blindness simulation reduces to well-studied color matrices.
- Working with Unity's SRP volume and post-processing stack.
- Packaging for the Unity Package Manager: UPM branches, versioning, and installs.

## Links

- [Source on GitHub](https://github.com/SOHNE/Colorblindness)
