import { readFile } from "node:fs/promises";
import { isMatching, P } from "ts-pattern";

const DJPattern = {
	id: P.number,
	title: P.string,
	image: P.string,
};

export type DJ = P.infer<typeof DJPattern>;

export async function fetchDJs(): Promise<DJ[]> {
	const source = await readFile("public/archive/djs_brief.json", "utf8");
	const data: unknown = JSON.parse(source);

	if (!isMatching(P.array(DJPattern), data)) {
		throw new Error("DJ summary data has an unexpected format.");
	}

	return data;
}
