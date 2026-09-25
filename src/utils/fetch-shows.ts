import { readFile } from "node:fs/promises";
import { isMatching, P } from "ts-pattern";
import {
	AssetReferencePattern,
	HttpUrlPattern,
	IsoDatePattern,
} from "./patterns";

const ShowPattern = {
	id: P.number,
	title: P.string,
	date: IsoDatePattern,
	duration: P.number,
	image: AssetReferencePattern,
	djs: P.array({
		id: P.number,
		title: P.string,
		image: P.string,
	}),
	tagIds: P.array(P.number),
	url: HttpUrlPattern,
};

export type Show = P.infer<typeof ShowPattern>;

const isValidShow = (show: Show): boolean => show.duration >= 0;

export const fetchShows = async (url: URL): Promise<Show[]> => {
	const source = await readFile(url, "utf8");
	const data: unknown = JSON.parse(source);

	if (!isMatching(P.array(ShowPattern), data) || !data.every(isValidShow)) {
		throw new Error("Show data has an unexpected format.");
	}

	return data;
};
