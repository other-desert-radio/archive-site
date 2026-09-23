import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { fetchDJs } from "../src/utils/fetch-djs";

test("loads the validated DJ archive summaries from a file URL", async () => {
	const djs = await fetchDJs(pathToFileURL("tests/res/djs.json"));

	assert.deepEqual(
		djs.map(({ id, title, image, tagIds }) => ({ id, title, image, tagIds })),
		[
			{
				id: 1,
				title: "Test DJ One",
				image: "images/djs/1.jpg",
				tagIds: [1, 2],
			},
			{ id: 2, title: "Test DJ Two", image: "images/djs/2.png", tagIds: [] },
		],
	);
});

test("rejects malformed DJ archive summaries", async () => {
	await assert.rejects(
		fetchDJs(pathToFileURL("tests/res/invalid-djs.json")),
		/DJ summary data has an unexpected format/,
	);
});

test("rejects DJ archive summaries without tag IDs", async () => {
	await assert.rejects(
		fetchDJs(pathToFileURL("tests/res/invalid-tag-djs.json")),
		/DJ summary data has an unexpected format/,
	);
});
