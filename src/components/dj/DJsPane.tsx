import type { DJ } from "../../utils/fetch-djs";
import type { TagMap } from "../../utils/fetch-tags";
import DJCard from "./DJCard";
import styles from "./DJsPane.module.css";

type Props = {
	base: string;
	djs: DJ[];
	tags: TagMap;
};

export default function DJsPane({ base, djs, tags }: Props) {
	const detailBase = base.replace(/\/$/, "");

	if (djs.length === 0) {
		return <p>No DJs found.</p>;
	}

	return (
		<div className={styles["djs-container-grid"]}>
			{djs.map((dj) => (
				<DJCard key={dj.id} base={detailBase} dj={dj} tags={tags} />
			))}
		</div>
	);
}
