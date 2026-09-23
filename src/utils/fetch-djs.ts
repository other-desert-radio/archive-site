import { readFile } from "node:fs/promises";
import { isMatching, P } from "ts-pattern";

export type DJ = {
	id: number;
	title: string;
};

export async function fetchDJs(): Promise<DJ[]> {
	const source = await readFile("public/archive/djs_brief.json", "utf8");
	const data: unknown = JSON.parse(source);

	if (!isMatching(P.array({ id: P.number, title: P.string }), data)) {
		throw new Error("DJ summary data has an unexpected format.");
	}

	return data;
}
