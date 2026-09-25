import { readFile } from "node:fs/promises";
import { isMatching, P } from "ts-pattern";

const ShowPattern = {
	id: P.number,
	title: P.string,
	date: P.string, // TODO: regex
	duration: P.number,
	image: P.string, // TODO: regex
	djs: P.array({
		id: P.number,
		title: P.string,
		image: P.string,
	}),
	tagIds: P.array(P.number),
	url: P.string, // TODO: URL regex
};

export type Show = P.infer<typeof ShowPattern>;

// TODO: write tests
export const fetchShows = async (url: URL): Promise<Show[]> => {
	const source = await readFile(url, "utf8");
	const data: unknown = JSON.parse(source);

	if (!isMatching(P.array(ShowPattern), data)) {
		throw new Error("Show data has an unexpected format.");
	}

	return data;
};
