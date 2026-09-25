import assert from "node:assert/strict";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { fetchShows } from "../src/utils/fetch-shows";

test("loads shows with validated date, asset, URL, and nested DJ data", async () => {
	const shows = await fetchShows(pathToFileURL("tests/res/shows.json"));

	assert.deepEqual(shows, [
		{
			id: 1,
			title: "Test Show",
			date: "2026-05-25T00:00:00.000Z",
			duration: 3600,
			image: "images/shows/1.jpg",
			djs: [{ id: 2, title: "Test DJ", image: "images/djs/2.jpg" }],
			tagIds: [1, 2],
			url: "https://www.mixcloud.com/example/test-show/",
		},
	]);
});

test("rejects shows with an invalid date", async () => {
	await assert.rejects(
		fetchShows(pathToFileURL("tests/res/invalid-show-date.json")),
		/Show data has an unexpected format/,
	);
});

test("rejects shows with a negative duration", async () => {
	await assert.rejects(
		fetchShows(pathToFileURL("tests/res/invalid-show-duration.json")),
		/Show data has an unexpected format/,
	);
});

test("rejects shows with an invalid image reference", async () => {
	await assert.rejects(
		fetchShows(pathToFileURL("tests/res/invalid-show-image.json")),
		/Show data has an unexpected format/,
	);
});

test("rejects shows with an invalid playback URL", async () => {
	await assert.rejects(
		fetchShows(pathToFileURL("tests/res/invalid-show-url.json")),
		/Show data has an unexpected format/,
	);
});
