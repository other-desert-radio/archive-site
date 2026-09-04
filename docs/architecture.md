# Architecture overview

This repository is a small static Astro site. The current implementation is intentionally minimal, so this document describes both what exists today and the boundaries to preserve as the site grows.

## Runtime and build

- Astro is the application framework and build tool.
- `astro.config.mjs` sets `output: "static"`, so production output is pre-rendered into `dist/` and does not require a server runtime.
- `@astrojs/react` is configured for interactive React components when they are needed; the current page does not use one.
- The project targets Node.js `>=22.12.0` and uses Bun for package scripts and lockfile management.

## Source layout

```text
src/
└── pages/              File-based routes; `index.astro` is `/`

public/                 Static assets copied to the site root unchanged
└── background.jpeg

scripts/                Repository maintenance scripts
└── setup-hooks.sh

astro.config.mjs        Astro configuration and integrations
package.json            Commands, dependencies, and runtime requirements
dist/                   Generated static build output (do not edit by hand)
.astro/                 Astro-generated types and development metadata
```

## Request and rendering flow

For the current site, a browser requests `/`, Astro resolves that URL to `src/pages/index.astro`, and the build emits a static `dist/index.html`. Files in `public/` are available at root-relative URLs, such as `/background.jpeg`.

As routes are added, place them under `src/pages/` using Astro's file-based routing. Shared presentation should move into `src/components/`; reusable data or content can live in a dedicated `src/` module or Astro content collection when the project needs one. Keep browser-only interactivity isolated to React components or client-side scripts rather than introducing a runtime dependency for otherwise static pages.

## Development and quality checks

- Start development with `astro dev --background` as documented in the repository instructions.
- Use `astro dev status`, `astro dev logs`, and `astro dev stop` to manage the background server.
- `bun run build` creates the production static site.
- `bun run lint` runs formatting, shell syntax, ESLint, and TypeScript checks.

When changing routing, components, styling, content, or internationalization, consult the relevant Astro guide linked from `AGENTS.md` and update this document if the architecture changes materially.
