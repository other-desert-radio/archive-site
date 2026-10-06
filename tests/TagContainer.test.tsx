import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import TagContainer from "../src/components/TagContainer";

test("renders each resolved tag", () => {
	const markup = renderToStaticMarkup(
		<TagContainer
			size="normal"
			tagIds={[1]}
			tags={new Map([[1, { id: 1, title: "Ambient", color: "#000000" }]])}
		/>,
	);

	assert.match(markup, />Ambient</);
	assert.doesNotMatch(markup, /tag-large/);
});

test("logs and skips missing tags", () => {
	const originalError = console.error;
	const errors: string[] = [];
	console.error = (message: string) => errors.push(message);

	try {
		const markup = renderToStaticMarkup(
			<TagContainer size="normal" tagIds={[1]} tags={new Map()} />,
		);

		assert.doesNotMatch(markup, />Ambient</);
		assert.deepEqual(errors, ["Tag 1 does not exist."]);
	} finally {
		console.error = originalError;
	}
});

test("passes large size to every resolved tag", () => {
	const markup = renderToStaticMarkup(
		<TagContainer
			size="large"
			tagIds={[1, 2]}
			tags={
				new Map([
					[1, { id: 1, title: "Ambient", color: "#000000" }],
					[2, { id: 2, title: "Electronic", color: "#ffffff" }],
				])
			}
		/>,
	);
	assert.equal((markup.match(/class="tag tag-large"/g) ?? []).length, 2);
});
