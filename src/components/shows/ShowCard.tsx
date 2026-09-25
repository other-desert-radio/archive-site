import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";
import TagContainer from "../TagContainer";
import styles from "./ShowCard.module.css";

type Props = {
	show: Show;
	base: string;
	tags: TagMap;
};

export const formatDate = (date: string): string =>
	new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	}).format(new Date(date));

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
				<time className={styles["show-date"]} dateTime={show.date}>
					{formatDate(show.date)}
				</time>
				<TagContainer tagIds={show.tagIds} tags={tags} />
				{show.djs.map((dj) => (
					<a
						key={dj.id}
						href={`${base}/djs/${dj.id}`}
						className={styles["dj-container"]}
						aria-label={`View ${dj.title}`}
					>
						<div className={styles["placeholder-dj-image"]} />
						<span className={styles["dj-name-title"]}>{dj.title}</span>
					</a>
				))}
			</div>
		</article>
	);
}
