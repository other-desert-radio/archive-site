import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import DJsPane from "../src/components/DJsPane";

const djs = [
	{ id: 11, title: "DJ AKĀSHA", image: "images/djs/11.jpg", tagIds: [1] },
	{ id: 16, title: "DJ Emocean", image: "images/djs/16.png", tagIds: [] },
];

const tags = new Map([[1, { id: 1, title: "Ambient", color: "#000000" }]]);

test("renders an empty message when no DJs are supplied", () => {
	const markup = renderToStaticMarkup(
		<DJsPane base="/archive-site/" djs={[]} tags={tags} />,
	);

	assert.equal(markup, "<p>No DJs found.</p>");
});

test("renders base-aware links for supplied DJs", () => {
	const markup = renderToStaticMarkup(
		<DJsPane base="/archive-site/" djs={djs} tags={tags} />,
	);

	assert.match(markup, /href="\/archive-site\/djs\/11"/);
	assert.match(markup, /href="\/archive-site\/djs\/16"/);
	assert.match(markup, />DJ AKĀSHA</);
	assert.match(markup, />DJ Emocean</);
	assert.match(markup, />Ambient</);
});

test("logs an error and skips a missing tag", () => {
	const originalError = console.error;
	const errors: string[] = [];
	console.error = (message: string) => errors.push(message);

	try {
		const markup = renderToStaticMarkup(
			<DJsPane base="/archive-site/" djs={djs} tags={new Map()} />,
		);

		assert.doesNotMatch(markup, />Ambient</);
		assert.deepEqual(errors, ["Tag 1 referenced by DJ 11 does not exist."]);
	} finally {
		console.error = originalError;
	}
});
