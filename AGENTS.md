## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Before making changes, read the relevant guidance in [`docs/`](docs/):

- [`docs/architecture.md`](docs/architecture.md) before structural changes.
- [`docs/development-workflow.md`](docs/development-workflow.md) for chunk
  boundaries, review checkpoints, and verification.
- [`docs/typescript.md`](docs/typescript.md) for TypeScript and component
  contract conventions.

Implement one small, independently reviewable feature or behavior at a time.
Include focused verification and documentation in the same chunk, then stop
for review before beginning unrelated follow-up work.

## Documentation

Repository architecture reference: [docs/architecture.md](docs/architecture.md). Read it before making structural changes and keep it current when the site architecture evolves.

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
