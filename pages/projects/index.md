---
title: Projects | Leandro Peres
display: Projects
description: List of my personal projects that I am proud of
wrapperClass: 'text-center'

projects:
  Current Focus:
    - name: 'Dura2D'
      link: 'https://github.com/SOHNE/Dura2D'
      desc: '2D Game physics engine'
      icon: dura2d

    - name: 'LeveGL'
      link: 'https://github.com/SOHNE/LeveGL'
      desc: 'Simple OpenGL+ES rendering library'
      icon: levegl

    - name: 'Vulkano'
      link: 'https://github.com/SOHNE/Vulkano'
      desc: 'Vulkan Rendering Library'
      icon: vulkano

  Games:
    - name: 'Kwartz'
      link: 'https://gamejolt.com/games/Kwartz/451321'
      desc: 'Interactive Playground for learning Nuxt'

    - name: 'Free Breeze'
      link: 'https://gamejolt.com/games/free-breeze/551443'
      desc: 'Interactive Playground for learning Nuxt'

    - name: 'Robots Fight At Night'
      link: 'https://gamejolt.com/games/Robots-Fight/506349'
      desc: 'Interactive Playground for learning Nuxt'

    - name: 'The Ashes of Jorge'
      link: 'https://github.com/zschzen/The-ashes-of-Jorge'
      desc: 'Interactive Playground for learning Nuxt'

  Tools:
    - name: 'slidev-addon-cpp-runner'
      link: 'https://github.com/SOHNE/slidev-addon-cpp-runner'
      desc: 'Addon for running C + C++ code in Slidev slides'

    - name: 'Run, Coliru! Run.'
      link: 'https://github.com/zschzen/run-coliru'
      desc: 'A lightweight front-end for Coliru'

    - name: 'Shader.One'
      link: 'https://shader.one'
      desc: 'Fragment shader web-based editor'

    - name: 'Shader.Vista'
      link: 'https://github.com/SOHNE/Shader.Vista'
      desc: 'WebGL library for fragment shaders, multipass rendering, and textures'

    - name: 'Colorblindness'
      link: 'https://github.com/SOHNE/Colorblindness'
      desc: 'Unity3D post‑processing manager for simulating color‑blind palettes'

  Engines:
    - name: 'Vosgi / Ubura'
      desc: 'A text-based game engine'

    - name: 'Cozer'
      desc: '2D game engine with Lua scripting and ECS support'

  Emulators:
    - name: 'Chip0u'
      link: 'https://github.com/SOHNE/Chip0u'
      desc: 'CHIP-8 written in C++20'

    - name: 'CameBoy'
      link: 'https://github.com/SOHNE/CameBoy'
      desc: 'GameBoy written in C99'

    - name: 'ae6502'
      link: 'https://github.com/SOHNE/ae6502'
      desc: 'MOS 6502 Assembler and Emulator written in TypeScript'

    - name: 'Cix502'
      link: 'https://github.com/SOHNE/Cix502'
      desc: 'MOS 6502 Emulator written in C99'

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
