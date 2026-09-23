import type { DJ } from "../utils/fetch-djs";

type Props = {
	base: string;
	djs: DJ[];
};

export default function DJsPane({ base, djs }: Props) {
	const detailBase = base.replace(/\/$/, "");

	if (djs.length === 0) {
		return <p>No DJs found.</p>;
	}

	return (
		<ul>
			{djs.map((dj) => (
				<li key={dj.id}>
					<a href={`${detailBase}/djs/${dj.id}`}>{dj.title}</a>
				</li>
			))}
		</ul>
	);
}
