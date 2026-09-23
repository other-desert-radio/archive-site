import { useEffect, useState } from "react";
import { isMatching, P } from "ts-pattern";

type DJ = {
	id: number;
	title: string;
};

type LoadState =
	| { status: "loading" }
	| { status: "error"; message: string }
	| { status: "ready"; djs: DJ[] };

const parseDJs = (input: unknown): DJ[] => {
	if (isMatching(P.array({ id: P.number, title: P.string }), input)) {
		return input;
	} else {
		throw new Error("DJs failed validation");
	}
};

export default function DJsPane() {
	const [state, setState] = useState<LoadState>({ status: "loading" });

	useEffect(() => {
		const controller = new AbortController();

		const loadDJs = async () => {
			try {
				const base = import.meta.env.BASE_URL.replace(/\/$/, "");
				const url = `${base}/archive/djs_brief.json`;

				const response = await fetch(url, { signal: controller.signal });

				if (!response.ok) {
					throw new Error(`Could not load DJs (${response.status}).`);
				}

				const data: unknown = await response.json();
				const djs = parseDJs(data);

				if (!controller.signal.aborted) {
					setState({ status: "ready", djs });
				}
			} catch (error) {
				if (controller.signal.aborted) return;

				setState({
					status: "error",
					message:
						error instanceof Error ? error.message : "Could not load DJs.",
				});
			}
		};

		void loadDJs();

		return () => controller.abort();
	}, []);

	switch (state.status) {
		case "loading": {
			return <p>Loading DJs...</p>;
		}
		case "error": {
			return <p>Error {state.message}</p>;
		}
		case "ready": {
			if (state.djs.length === 0) {
				return <p>No DJs found.</p>;
			}

			return (
				<ul>
					{state.djs.map((dj) => (
						<li key={dj.id}>{dj.title}</li>
					))}
				</ul>
			);
		}
	}
}
