# TypeScript conventions

These conventions adapt the backend TypeScript guidance to Astro components,
React components, and static-site data. The checked-in Biome and TypeScript
configuration are the source of truth when a rule is enforced automatically.

## Prefer type aliases

Use `type` aliases for object shapes, component props, unions, and other new
type definitions. Do not add new `interface` declarations.

```ts
type ArchiveEntry = {
	id: number;
	title: string;
};
```

Astro component props should be explicit and defined near the component:

```astro
---
type Props = {
	title: string;
	description?: string;
};

const { title, description } = Astro.props;
---
```

## Make finite states explicit

Use discriminated unions for component state and `switch` statements when
branching over a finite set of known cases. This keeps loading, empty, error,
and success states visible in the type system and makes new cases harder to
forget.

```ts
type LoadState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "ready"; entries: ArchiveEntry[] };
```

Use exhaustive handling where practical. Keep the data and the branch that
renders it together instead of passing loosely typed flags through several
components.

## Respect optional values

Prefer `undefined` and optional properties when a value is absent. Do not add
`null` as a second representation of absence without an integration reason.
When data comes from an API, CMS, or content source that uses `null`, normalize
it at that boundary before passing it through the site.

Do not use unchecked casts to make external data fit a type. Validate or
normalize external data at the boundary, then keep internal component props
strongly typed. Use `unknown` when the shape is not yet trusted.

Use `ts-pattern`'s `isMatching` and `P` patterns for runtime validation of
external JSON when the dependency is available. This validates the value and
narrows its TypeScript type in the same branch.

```ts
import { isMatching, P } from "ts-pattern";

const entryPattern = P.array({ id: P.number, title: P.string });

if (!isMatching(entryPattern, data)) {
	throw new Error("Archive data has an unexpected format.");
}
```

## Keep module boundaries intentional

Import shared components and helpers from stable module paths. A barrel
`index.ts` is appropriate for a coherent public module with multiple exports,
but it is not required for every directory. Prefer direct imports for a small
private component or when a barrel would obscure ownership or create a cycle.

Do not copy backend-only patterns into the site automatically. Fastify route
generics, Kysely database types, and PostgreSQL `NULL` handling belong at
their respective integration boundaries. Add an equivalent site convention
only when the site gains that kind of boundary.
