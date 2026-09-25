import assert from "node:assert/strict";
import test from "node:test";
import { hydrateTags } from "../src/utils/hydrate-tags";

test("hydrates an entity's tag IDs from the lookup map", () => {
	const tags = new Map([
		[1, { id: 1, title: "Electronic", color: "#c2c5c5" }],
		[2, { id: 2, title: "House", color: "#de3b54" }],
	]);

	assert.deepEqual(hydrateTags({ id: 7, tagIds: [2, 1] }, tags), [
		{ id: 2, title: "House", color: "#de3b54" },
		{ id: 1, title: "Electronic", color: "#c2c5c5" },
	]);
});

test("omits missing tags and reports the referencing entity", () => {
	const errors: string[] = [];
	const originalError = console.error;
	console.error = (message: string) => errors.push(message);

	try {
		assert.deepEqual(
			hydrateTags(
				{ id: 7, tagIds: [1, 2] },
				new Map([[1, { id: 1, title: "Electronic", color: "#c2c5c5" }]]),
			),
			[{ id: 1, title: "Electronic", color: "#c2c5c5" }],
		);
		assert.deepEqual(errors, ["Tag 2 referenced by DJ 7 does not exist."]);
	} finally {
		console.error = originalError;
	}
});
