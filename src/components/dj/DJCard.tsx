import type { DJ } from "../../utils/fetch-djs";
import type { TagMap } from "../../utils/fetch-tags";
import TagView from "../TagView";
import styles from "./DJCard.module.css";

type Props = {
	dj: DJ;
	base: string;
	tags: TagMap;
};

const renderTagContainer = (tagIds: number[], tags: TagMap, djId: number) => {
	return (
		<div className="tag-container">
			{tagIds.map((id) => {
				const tag = tags.get(id);

				if (tag === undefined) {
					console.error(`Tag ${id} referenced by DJ ${djId} does not exist.`);
					return null;
				}

				return <TagView key={tag.id} tag={tag} />;
			})}
		</div>
	);
};

export default function DJCard({ dj, base, tags }: Props) {
	return (
		<a href={`${base}/djs/${dj.id}`} className={styles["dj-card"]}>
			<div className={styles["placeholder-image"]} />

			<div className={styles["trailing-content"]}>
				<h2 className={styles["dj-title"]}>{dj.title}</h2>
				{renderTagContainer(dj.tagIds, tags, dj.id)}
			</div>
		</a>
	);
}
