import type { Show } from "../../utils/fetch-shows";
import type { TagMap } from "../../utils/fetch-tags";
import TagContainer from "../TagContainer";
import styles from "./ShowCard.module.css";

type Props = {
	show: Show;
	base: string;
	tags: TagMap;
};

/**
 * Formats a show timestamp for display in the archive.
 *
 *   ISO timestamp --> "Month day, year"
 */
export const formatDate = (date: string): string =>
	new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	}).format(new Date(date));

/**
 * Renders the compact DJ links associated with a show.
 */
const renderDJs = (djs: Show["djs"], base: string) =>
	djs.map((dj) => (
		<a
			key={dj.id}
			href={`${base}/djs/${dj.id}`}
			className={styles["dj-container"]}
			aria-label={`View ${dj.title}`}
		>
			<div
				className={`${styles["placeholder-dj-image"]} image-border-primary`}
			/>
			<span className={styles["dj-name-title"]}>{dj.title}</span>
		</a>
	));

/**
 * Renders one archive show with its date, tags, and associated DJs.
 */
export default function ShowCard({ show, base, tags }: Props) {
	const detailBase = base.replace(/\/$/, "");

	return (
		<article className={styles["show-card"]}>
			<div className={`${styles["placeholder-widget"]} image-border-primary`} />
			<div className={styles["trailing-content"]}>
				<a
					href={`${detailBase}/shows/${show.id}`}
					className={styles["show-title"]}
					aria-label={`View ${show.title}`}
				>
					{show.title}
				</a>
				<time className={styles["show-date"]} dateTime={show.date}>
					{formatDate(show.date)}
				</time>
				<TagContainer tagIds={show.tagIds} tags={tags} />
				{renderDJs(show.djs, detailBase)}
			</div>
		</article>
	);
}
