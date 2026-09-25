import assert from "node:assert/strict";
import test from "node:test";
import { formatDate } from "../src/components/shows/ShowCard";

test("formats a show date in UTC", () => {
	assert.equal(formatDate("2026-05-25T00:00:00.000Z"), "May 25, 2026");
});
