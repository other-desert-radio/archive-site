# Development workflow

This repository is intentionally small and static-first. Build changes in
small, reviewable chunks so each change has a clear purpose and can be checked
independently.

## Work in small chunks

- Implement one narrowly scoped feature or behavior at a time.
- Keep unrelated routing, content, styling, and interaction changes separate.
- Add or update documentation in the same chunk when behavior or workflow
  changes.
- Add or update focused automated tests whenever introducing a feature or
  changing existing behavior. If a behavior cannot be tested practically,
  explain why in the handoff.
- Place headless tests in the top-level `tests/` directory.
- Run the smallest relevant verification commands before handing off the
  chunk.
- Stop after the chunk is complete so it can be reviewed before the next
  feature begins.

A good chunk should be understandable from its diff, have a clear acceptance
condition, and leave the site in a buildable state. If a task contains several
independent outcomes, split them into separate chunks rather than hiding them
behind one large implementation.

## Preserve the site boundaries

- Keep the site static unless a concrete requirement needs a server runtime.
- Put routes in `src/pages/` and shared page shells in `src/layouts/`.
- Move genuinely reusable presentation into `src/components/`.
- Keep browser-only behavior in a React component or a small client-side
  script; do not add a runtime dependency for a static page.
- Keep generated `.astro/` and `dist/` output out of manual edits.

Read [`architecture.md`](architecture.md) before making structural changes.
Update it when the routing, rendering flow, source layout, or deployment model
changes materially.

## Verification by change type

- `bun run format` applies Biome formatting, safe lint fixes, and import
  organization. The pre-commit hook runs it before staging the resulting
  changes.
- Astro pages, layouts, or content: `bun run check`
- TypeScript, CSS, JavaScript, or configuration: `bun run lint`
- Unit-tested behavior: `bun run test`
- Routing, deployment configuration, or production behavior: `bun run build`
- Broad changes: run `bun run lint`, `bun run check`, and `bun run build`

Use the existing repository scripts rather than introducing one-off local
commands. Keep the verification result with the handoff so the next review
starts from a known state.
