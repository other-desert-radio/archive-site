import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";
import TagContainer from "../TagContainer";
import styles from "./ShowCard.module.css";

type Props = {
	show: Show;
	base: string;
	tags: TagMap;
};

export default function ShowCard({ show, base, tags }: Props) {
	return (
		<article className={styles["show-card"]}>
			<div className={styles["placeholder-widget"]} />
			<div className={styles["trailing-content"]}>
				<a
					href={`${base}/shows/${show.id}`}
					className={styles["show-title"]}
					aria-label={`View ${show.title}`}
				>
					{show.title}
				</a>
				<div className={styles["tag-date-container"]}>
					<TagContainer tagIds={show.tagIds} tags={tags} />
					<span className={styles["show-date"]}>{show.date}</span>
				</div>
				{show.djs.map((dj) => (
					<a
						key={dj.id}
						href={`${base}/djs/${dj.id}`}
						aria-label={`View ${dj.title}`}
					>
						{dj.title}
					</a>
				))}
			</div>
		</article>
	);
}
