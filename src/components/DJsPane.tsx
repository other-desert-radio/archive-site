import type { DJ } from "../utils/fetch-djs";
import type { TagMap } from "../utils/fetch-tags";

type Props = {
	base: string;
	djs: DJ[];
	tags: TagMap;
};

const renderDJ = (base: string, dj: DJ, tags: TagMap) => {
	return (
		<li key={dj.id}>
			<a href={`${base}/djs/${dj.id}`}>{dj.title}</a>
			{dj.tagIds.map((id) => {
				const tag = tags.get(id);

				if (!tag) {
					console.error(`Tag ${id} referenced by DJ ${dj.id} does not exist.`);
					return undefined;
				}

				return <p key={tag.id}>{tag.title}</p>;
			})}
		</li>
	);
};
export default function DJsPane({ base, djs, tags }: Props) {
	const detailBase = base.replace(/\/$/, "");

	if (djs.length === 0) {
		return <p>No DJs found.</p>;
	}

	return <ul>{djs.map((dj) => renderDJ(detailBase, dj, tags))}</ul>;
}
