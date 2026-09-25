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
		<a
			href={`${base}/shows/${show.id}`}
			className={styles["show-card"]}
			aria-label={`View ${show.title}`}
		>
			<div className={styles["placeholder-widget"]} />
			<div className={styles["trailing-content"]}>
				<span className={styles["show-title"]}>{show.title}</span>
				<div className={styles["tag-date-container"]}>
					<TagContainer tagIds={show.tagIds} tags={tags} />
					<span className={styles["show-date"]}>{show.date}</span>
				</div>
			</div>
		</a>
	);
}
