import type { DJ } from "../utils/fetch-djs";

type Props = {
	djs: DJ[];
};

export default function DJsPane({ djs }: Props) {
	if (djs.length === 0) {
		return <p>No DJs found.</p>;
	}

	return (
		<ul>
			{djs.map((dj) => (
				<li key={dj.id}>{dj.title}</li>
			))}
		</ul>
	);
}
