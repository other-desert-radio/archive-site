import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import TagContainer from "../src/components/TagContainer";

test("renders each resolved tag", () => {
	const markup = renderToStaticMarkup(
		<TagContainer
			tagIds={[1]}
			tags={new Map([[1, { id: 1, title: "Ambient", color: "#000000" }]])}
		/>,
	);

	assert.match(markup, />Ambient</);
});

test("logs and skips missing tags", () => {
	const originalError = console.error;
	const errors: string[] = [];
	console.error = (message: string) => errors.push(message);

	try {
		const markup = renderToStaticMarkup(
			<TagContainer tagIds={[1]} tags={new Map()} />,
		);

		assert.doesNotMatch(markup, />Ambient</);
		assert.deepEqual(errors, ["Tag 1 does not exist."]);
	} finally {
		console.error = originalError;
	}
});
