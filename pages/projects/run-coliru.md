---
title: Run, Coliru! Run. - A Coliru Front-end
display: Run, Coliru! Run.
subtitle: A lightweight front-end for Coliru
description: A lightweight front-end for the Coliru online compiler, built with Next.js and deployed on Cloudflare Workers.
---

[Coliru](https://coliru.stacked-crooked.com/) is a beloved, no-frills online C++ compiler. Run, Coliru! Run. gives it a clean front-end: paste or load code, compile, read the output.

It is live at [coliru.peres.dev](https://coliru.peres.dev/).

## Features

- **Clean UI** for quick code submission
- **C and C++** snippets compiled through the Coliru API
- **GitHub Gist loading** for easy code sharing
- **Project zip download** with automatic Makefile generation

## Tech

- **Next.js** for the front-end
- **Cloudflare Workers** for serverless hosting
- **Coliru API** as the compilation backend

## What I learned

<!-- TODO: seeded from the project scope; rewrite in your own voice. -->

- Deploying Next.js on Cloudflare Workers.
- Designing a thin, honest wrapper over someone else's API.

## Links

- [Live at coliru.peres.dev](https://coliru.peres.dev/)
- [Source on GitHub](https://github.com/zschzen/run-coliru)
