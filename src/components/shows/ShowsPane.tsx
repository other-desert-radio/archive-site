import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";
import ShowCard from "./ShowCard";

type Props = {
	shows: Show[];
	tags: TagMap;
	base: string;
};

export default function ShowsPane({ base, shows }: Props) {
	if (shows.length === 0) {
		return <p>No shows found.</p>;
	}

	return (
		<div>
			{shows.map((show) => (
				<ShowCard key={show.id} show={show} base={base} />
			))}
		</div>
	);
}
