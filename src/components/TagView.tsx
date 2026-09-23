import type { Tag } from "../utils/fetch-tags";

type Props = {
	tag: Tag;
};

export default function TagView({ tag }: Props) {
	return (
		<div className="tag" style={{ backgroundColor: tag.color }}>
			{tag.title}
		</div>
	);
}
