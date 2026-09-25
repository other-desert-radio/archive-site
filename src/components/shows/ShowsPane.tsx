import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";

type Props = {
	shows: Show[];
	tags: TagMap;
};

export default function ShowsPane({ shows }: Props) {
	if (shows.length === 0) {
		return <p>No shows found.</p>;
	}

	return (
		<div>
			{shows.map((show) => (
				<div key={show.id}>{show.title}</div>
			))}
		</div>
	);
}
