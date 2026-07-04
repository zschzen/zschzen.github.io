---
title: Projects | Leandro Peres
display: Projects
description: List of my personal projects that I am proud of
wrapperClass: 'text-center'

projects:
  Current Focus:
    - name: 'Dura2D'
      link: 'https://github.com/SOHNE/Dura2D'
      path: '/projects/dura2d'
      desc: '2D Game physics engine'
      icon: dura2d
      tags: ['C++', 'Physics', 'WebAssembly']

    - name: 'LeveGL'
      link: 'https://github.com/SOHNE/LeveGL'
      path: '/projects/levegl'
      desc: 'Simple OpenGL+ES rendering library'
      icon: levegl
      tags: ['C99', 'OpenGL ES']

    - name: 'Vulkano'
      link: 'https://github.com/SOHNE/Vulkano'
      path: '/projects/vulkano'
      desc: 'Vulkan Rendering Library'
      icon: vulkano
      tags: ['C++', 'Vulkan']

  Games:
    - name: 'Kwartz'
      link: 'https://gamejolt.com/games/Kwartz/451321'
      path: '/projects/kwartz'
      desc: "2D dark‑fantasy side‑scrolling strategy tower‑defense game"
      image: '/projects/kwartz.webp'
      tags: ['Unity', 'C#']

    - name: 'Free Breeze'
      link: 'https://gamejolt.com/games/free-breeze/551443'
      path: '/projects/free-breeze'
      desc: "Cute, colorful multiplayer nature strategy shooter indie game"
      image: '/projects/free-breeze.webp'
      tags: ['Unity', 'Multiplayer']

    - name: 'Robots Fight At Night'
      link: 'https://gamejolt.com/games/Robots-Fight/506349'
      path: '/projects/robots-fight-at-night'
      desc: "Cyberpunk isometric 3D team-based action shooter"
      image: '/projects/robots-fight-at-night.webp'
      tags: ['Unity', '3D']

    - name: 'The Ashes of Jorge'
      link: 'https://github.com/zschzen/The-ashes-of-Jorge'
      path: '/projects/the-ashes-of-jorge'
      desc: "2D side‑scrolling beat‑'em‑up action brawler with retro arcade flair"
      tags: ['Unity', 'C#']

  Tools:
    - name: 'slidev-addon-cpp-runner'
      link: 'https://github.com/SOHNE/slidev-addon-cpp-runner'
      path: '/projects/slidev-addon-cpp-runner'
      desc: 'Addon for running C + C++ code in Slidev slides'
      tags: ['TypeScript', 'Slidev']

    - name: 'Run, Coliru! Run.'
      link: 'https://github.com/zschzen/run-coliru'
      path: '/projects/run-coliru'
      desc: 'A lightweight front-end for Coliru'
      tags: ['Next.js', 'Cloudflare']

    - name: 'Shader.One'
      link: 'https://shader.one'
      path: '/projects/shader-one'
      desc: 'Fragment shader web-based editor'
      tags: ['WebGL', 'GLSL']

    - name: 'Shader.Vista'
      link: 'https://github.com/SOHNE/Shader.Vista'
      path: '/projects/shader-vista'
      desc: 'WebGL library for fragment shaders, multipass rendering, and textures'
      tags: ['TypeScript', 'WebGL']

    - name: 'Colorblindness'
      link: 'https://github.com/SOHNE/Colorblindness'
      path: '/projects/colorblindness'
      desc: 'Unity3D post‑processing manager for simulating color‑blind palettes'
      tags: ['Unity', 'Accessibility']

  Emulators:
    - name: 'Chip0u'
      link: 'https://github.com/SOHNE/Chip0u'
      path: '/projects/chip0u'
      desc: 'CHIP-8 written in C++20'
      tags: ['C++20', 'CHIP-8']

    - name: 'CameBoy'
      link: 'https://github.com/SOHNE/CameBoy'
      path: '/projects/cameboy'
      desc: 'GameBoy written in C99'
      tags: ['C99', 'SDL2']

    - name: 'ae6502'
      link: 'https://github.com/SOHNE/ae6502'
      path: '/projects/ae6502'
      desc: 'MOS 6502 Assembler and Emulator written in TypeScript'
      tags: ['TypeScript', '6502']

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
