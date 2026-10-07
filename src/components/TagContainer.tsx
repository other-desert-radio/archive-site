import type { TagMap } from "../utils/fetch-tags";
import TagView from "./TagView";

type Props = {
	tagIds: number[];
	tags: TagMap;
	size: "normal" | "large";
};

export default function TagContainer({ tagIds, tags, size }: Props) {
	return (
		<div className="tag-container">
			{tagIds.map((id) => {
				const tag = tags.get(id);

				if (tag === undefined) {
					console.error(`Tag ${id} does not exist.`);
					return null;
				}

				return <TagView key={tag.id} tag={tag} size={size} />;
			})}
		</div>
	);
}
