import type { DJ } from "../../utils/fetch-djs";
import type { TagMap } from "../../utils/fetch-tags";
import TagContainer from "../TagContainer";
import styles from "./DJCard.module.css";

type Props = {
	dj: DJ;
	base: string;
	tags: TagMap;
};

export default function DJCard({ dj, base, tags }: Props) {
	return (
		<a href={`${base}/djs/${dj.id}`} className={styles["dj-card"]}>
			<div className={styles["placeholder-image"]} />

			<div className={styles["trailing-content"]}>
				<h2 className={styles["dj-title"]}>{dj.title}</h2>
				<TagContainer tagIds={dj.tagIds} tags={tags} />
			</div>
		</a>
	);
}
