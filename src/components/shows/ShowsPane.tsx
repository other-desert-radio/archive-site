import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";
import ShowCard from "./ShowCard";
import styles from "./ShowsPane.module.css";

type Props = {
	shows: Show[];
	tags: TagMap;
	base: string;
};

export default function ShowsPane({ base, shows, tags }: Props) {
	const detailBase = base.replace(/\/$/, "");

	if (shows.length === 0) {
		return <p>No shows found.</p>;
	}

	return (
		<div className={styles["show-container-grid"]}>
			{shows.map((show) => (
				<ShowCard key={show.id} show={show} base={detailBase} tags={tags} />
			))}
		</div>
	);
}
