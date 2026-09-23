import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { fetchDJ } from "../src/utils/fetch-dj";

test("loads a validated hydrated DJ from a file URL", async () => {
	const dj = await fetchDJ(pathToFileURL("tests/res/dj.json"));

	assert.deepEqual(dj, {
		id: 1,
		title: "Test DJ One",
		image: "images/djs/1.jpg",
		bio: "<p>Test biography.</p>",
		socials: "<p>@testdjone</p>",
		showTitle: "Test Transmission",
		showDescription: "A test DJ show.",
		shows: [],
		tagIds: [1, 2],
	});
});
