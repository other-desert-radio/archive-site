import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { fetchTags } from "../src/utils/fetch-tags";

test("loads validated tags into an ID lookup map", async () => {
	const tags = await fetchTags(pathToFileURL("tests/res/tags.json"));

	assert.equal(tags.size, 2);
	assert.deepEqual(tags.get(1), {
		id: 1,
		title: "Electronic",
		color: "#c2c5c5",
	});
	assert.deepEqual(tags.get(2), {
		id: 2,
		title: "House",
		color: "#de3b54",
	});
});

test("rejects malformed tag data", async () => {
	await assert.rejects(
		fetchTags(pathToFileURL("tests/res/invalid-tags.json")),
		/Tag data has an unexpected format/,
	);
});
