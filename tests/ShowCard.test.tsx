import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ShowCard from "../src/components/shows/ShowCard";
import { formatDate } from "../src/utils/format-date";

test("formats a show date in UTC", () => {
	assert.equal(formatDate("2026-05-25T00:00:00.000Z"), "May 25, 2026");
});

test("renders normalized show and DJ detail links", () => {
	const markup = renderToStaticMarkup(
		<ShowCard
			base="/archive-site/"
			show={{
				id: 1,
				title: "Test Show",
				date: "2026-05-25T00:00:00.000Z",
				duration: 3600,
				image: "images/shows/1.jpg",
				djs: [{ id: 2, title: "Test DJ", image: "images/djs/2.jpg" }],
				tagIds: [],
				url: "https://www.mixcloud.com/example/test-show/",
			}}
			tags={new Map()}
		/>,
	);

	assert.match(markup, /href="\/archive-site\/shows\/1"/);
	assert.match(markup, /href="\/archive-site\/djs\/2"/);
	assert.doesNotMatch(markup, /\/archive-site\/\//);
});
