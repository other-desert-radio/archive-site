import type { DJ } from "../../utils/fetch-djs";
import type { TagMap } from "../../utils/fetch-tags";
import TagView from "../TagView";
import styles from "./DJCard.module.css";

type Props = {
	dj: DJ;
	base: string;
	tags: TagMap;
};

const renderTagContainer = (tagIds: number[], tags: TagMap) => {
	return (
		<div className="tag-container">
			{tagIds.map((id) => {
				const tag = tags.get(id);

				if (tag === undefined) {
					console.error(`Tag ${id} does not exist.`);
					return null;
				}

				return <TagView key={tag.id} tag={tag} />;
			})}
		</div>
	);
};

export default function DJCard({ dj, base, tags }: Props) {
	return (
		<div key={dj.id} className={styles["dj-card"]}>
			<div className={styles["placeholder-image"]} />

			<div className={styles["trailing-content"]}>
				<a href={`${base}/djs/${dj.id}`}>{dj.title}</a>
				{renderTagContainer(dj.tagIds, tags)}
			</div>
		</div>
	);
}
