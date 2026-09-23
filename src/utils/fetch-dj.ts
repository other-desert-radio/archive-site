import { readFile } from "node:fs/promises";
import { isMatching, P } from "ts-pattern";

const HydratedDJPattern = {
	id: P.number,
	title: P.string,
	image: P.string,
	bio: P.string,
	socials: P.string,
	showTitle: P.string,
	showDescription: P.string,
	shows: P.array(P.unknown),
	tagIds: P.array(P.number),
};

export type HydratedDJ = P.infer<typeof HydratedDJPattern>;

export const fetchDJ = async (id: number): Promise<HydratedDJ> => {
	// TODO: see if file exists first
	const source = await readFile(`public/archive/djs/${id}.json`, "utf8");
	const data: unknown = JSON.parse(source);

	if (!isMatching(HydratedDJPattern, data)) {
		throw new Error("Hydrated DJ data has an unexpected format.");
	}

	return data;
};
