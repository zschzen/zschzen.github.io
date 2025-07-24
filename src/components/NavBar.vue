<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <!-- Logo / Home -->
    <RouterLink
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>

    <!-- Scroll to top button -->
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>

    <!-- Navigation -->
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <!-- Primary navigation -->
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-folder-6-line md:hidden />
        </RouterLink>
        <RouterLink to="/posts" title="Posts">
          <span class="lt-md:hidden">Posts</span>
          <div i-ri-pencil-line md:hidden />
        </RouterLink>
        <RouterLink to="/notes" title="Notes" class="lt-md:hidden">
          <span>Notes</span>
        </RouterLink>

        <!-- External links -->
        <a href="https://resume.peres.dev" target="_blank" title="Resume">
          <span i-ri-file-download-line md:hidden />
          <span class="lt-md:hidden btn-[#EE5396]"><span i-ri-file-download-line /> Résumé</span>
        </a>

        <RouterLink to="/lab" title="Lab & Experiments">
          <div i-material-symbols-science-outline />
        </RouterLink>
        <a href="https://github.com/zschzen" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <a href="https://linkedin.com/in/leandroperes" target="_blank" title="LinkedIn" class="lt-md:hidden">
          <div i-uil-linkedin-alt />
        </a>
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-ri-rss-line />
        </a>

        <!-- Theme toggle -->
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="css">
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
