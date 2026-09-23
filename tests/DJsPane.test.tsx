import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import DJsPane from "../src/components/DJsPane";

const djs = [
	{ id: 11, title: "DJ AKĀSHA", image: "images/djs/11.jpg" },
	{ id: 16, title: "DJ Emocean", image: "images/djs/16.png" },
];

test("renders an empty message when no DJs are supplied", () => {
	const markup = renderToStaticMarkup(
		<DJsPane base="/archive-site/" djs={[]} />,
	);

	assert.equal(markup, "<p>No DJs found.</p>");
});

test("renders base-aware links for supplied DJs", () => {
	const markup = renderToStaticMarkup(
		<DJsPane base="/archive-site/" djs={djs} />,
	);

	assert.match(markup, /href="\/archive-site\/djs\/11"/);
	assert.match(markup, /href="\/archive-site\/djs\/16"/);
	assert.match(markup, />DJ AKĀSHA</);
	assert.match(markup, />DJ Emocean</);
});
