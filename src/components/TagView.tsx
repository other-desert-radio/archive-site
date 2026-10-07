import type { Tag } from "../utils/fetch-tags";

type Props = {
	tag: Tag;
	size: "normal" | "large";
};

export default function TagView({ tag, size }: Props) {
	return (
		<div
			className={size === "large" ? "tag tag-large" : "tag"}
			style={{ backgroundColor: tag.color }}
		>
			{tag.title}
		</div>
	);
}
