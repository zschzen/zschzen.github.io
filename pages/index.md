---
title: Leandro Peres
display: ''
description: Leandro Peres is a graphics and engine programmer who builds game engines from first principles and shares what he learns through free, hands-on tutorials.
hero:
  headline: I build game engines from first principles, and share what I learn.
  text: From Goiânia, Brazil, with 10+ years of games shipped in Unity and Unreal. These days, physics, rendering and emulators in C and C++.
experience:
  - position: Indie Generalist Game Developer
    org: SOHNE
    dates: 2011 – Present
    description: Custom engines, rendering and physics libraries (Dura2D, LeveGL, rhio, Actis), emulators and jam games. Led teams of five from concept to launch.
  - position: Generalist Game Programmer
    org: LabTIME/UFG
    dates: 2021 – 2023
    description: Shipped five AA titles on mobile, PC and web in Unity and Unreal, ran the UE5 virtual production pipeline, cut GPU cost 20% with HLSL/Cg work, and mentored junior programmers.
    projects:
      - /projects/simulador-arduino
      - /projects/game-da-cidadania
      - /projects/parque-da-matematica
      - /projects/ilha-das-pedras-falantes
  - position: Delphi Programmer
    org: Inforsystem Tecnologia
    dates: 2020
    description: Maintained and refactored legacy Delphi modules and MySQL schemas in Scrum sprints.
  - position: Full-stack Developer
    org: Saúde em Goiás
    dates: 2014
    description: REST APIs, SQL databases and PHP/WordPress plugins for a regional health media platform.
education:
  - position: Technologist in Digital Games
    org: Senac
    dates: 2018 – 2020
    description: Game design, graphics, multiplayer, AI and physics across five semester-long game projects.
skills:
  - label: Graphics
    value: Vulkan, OpenGL / ES, WebGL 2, GLSL / HLSL / Slang, RenderDoc
  - label: Engines
    value: Unreal, Unity, Raylib, Emscripten
  - label: Languages
    value: C (C99), C++, C#, TypeScript, Python, Lua, x86 / 6502 assembly
  - label: Focus
    value: Render hardware interfaces, constraint-based physics, emulators, memory arenas
---

<!-- @layout-full-width -->

<script setup>
import { usePosts, useProjects } from '~/logics/content'
import { site } from '~/site'

const posts = usePosts().filter(p => p.kind !== 'poem').slice(0, 5)
const projects = useProjects()
const sideProjects = projects.filter(p => !p.featured).slice(0, 6)
// Lab clips already shown under Selected work stay out of the lab rail.
const featuredLabs = projects.filter(p => p.featured).flatMap(p => p.media ?? []).map(m => m.lab)
</script>

<section class="col flex flex-col gap-6 pt-10 lg:gap-8 lg:pt-24">
  <div class="flex items-center gap-4 lg:gap-5">
    <img src="/avatar.webp" alt="Portrait of Leandro Peres" width="320" height="320" class="h-20 w-20 shrink-0 rounded-full bg-secondary object-cover lg:h-28 lg:w-28">
    <p class="flex flex-col leading-[1.4]">
      <span class="text-[17px] font-medium lg:text-xl">{{ site.name }}</span>
      <span class="text-[15px] text-muted-foreground lg:text-base">{{ site.role }}</span>
    </p>
  </div>
  <div class="flex flex-col gap-3 lg:gap-4">
    <h1 class="h-display">{{ frontmatter.hero.headline }}</h1>
    <p class="text-base leading-[1.55] text-muted-foreground lg:text-[17px] lg:leading-[1.6]">{{ frontmatter.hero.text }}</p>
  </div>
  <div class="flex flex-col gap-4 pt-2 lg:flex-row lg:items-center lg:gap-6 lg:pt-0">
    <div class="flex gap-2.5">
      <a :href="`mailto:${site.email}`" class="btn-primary flex-1 lg:flex-none">Email me</a>
      <a :href="site.resume" target="_blank" rel="noopener" class="btn-secondary flex-1 lg:flex-none">Resume <span class="i-ph-download-simple h-4! w-4!" aria-hidden="true" /></a>
    </div>
    <ProfileLinks />
  </div>
</section>

<section id="work" class="section flex flex-col gap-6 lg:gap-10">
  <h2 class="col h-section">Selected work</h2>
  <SelectedWork />
</section>

<section id="side-projects" class="section flex flex-col gap-5 lg:gap-8">
  <div class="section-head">
    <h2 class="h-section">Side projects</h2>
    <RouterLink to="/projects" class="link-arrow py-2.5 lg:py-0">All projects <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" /></RouterLink>
  </div>
  <ul v-drag-scroll class="rail">
    <ProjectCard v-for="p in sideProjects" :key="p.path" :project="p" />
  </ul>
</section>

<section id="experience" class="section flex flex-col gap-6 lg:gap-8">
  <div class="section-head">
    <h2 class="h-section">Experience</h2>
    <a :href="site.resume" target="_blank" rel="noopener" class="link-arrow py-2.5 lg:py-0">Resume <span class="i-ph-download-simple h-4! w-4!" aria-hidden="true" /></a>
  </div>
  <ol class="col flex flex-col gap-6 lg:gap-8">
    <ExperienceItem v-for="item in frontmatter.experience" :key="item.org" v-bind="item" />
  </ol>
  <div class="col flex flex-col gap-3">
    <h3 class="text-[15px] font-medium leading-[1.4] text-muted-foreground">Education</h3>
    <ol>
      <ExperienceItem v-for="item in frontmatter.education" :key="item.org" v-bind="item" />
    </ol>
  </div>
</section>

<section id="about" class="section flex flex-col gap-4 lg:gap-5">
<h2 class="col h-section">About</h2>
<div class="prose col">

**By day**, I build [projects](/projects), share experiments from the [lab](/lab), and write [posts](/posts) and study [notes](/notes) about game development, rendering, emulation, physics, and programming.

**After hours**, I spend time with my husband and family, solve math puzzles, read, write [poems](/poems), and crochet <code>( ⸝⸝´꒳`⸝⸝)</code>. That's where many of my best ideas begin.

</div>
<dl class="col flex flex-col gap-2 pt-2">
  <div v-for="s in frontmatter.skills" :key="s.label" class="flex flex-col gap-0.5 text-[15px] leading-[1.5] sm:flex-row sm:gap-4">
    <dt class="shrink-0 font-medium sm:w-30">{{ s.label }}</dt>
    <dd class="text-muted-foreground">{{ s.value }}</dd>
  </div>
</dl>
</section>

<section id="writing" class="section flex flex-col gap-4 lg:gap-5">
  <div class="section-head">
    <h2 class="h-section">Writing</h2>
    <RouterLink to="/posts" class="link-arrow py-2.5 lg:py-0">All notes &amp; posts <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" /></RouterLink>
  </div>
  <ul class="col">
    <PostRow v-for="p in posts" :key="p.path" :post="p" show-year />
  </ul>
</section>

<section id="lab" class="section flex flex-col gap-5 lg:gap-8">
  <div class="section-head">
    <h2 class="h-section">Lab</h2>
    <RouterLink to="/lab" class="link-arrow py-2.5 lg:py-0">All experiments <span class="i-ph-arrow-right h-4! w-4!" aria-hidden="true" /></RouterLink>
  </div>
  <ListLabs :limit="4" :exclude="featuredLabs" />
</section>
