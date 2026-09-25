import type { ID, Tag, TagMap } from "./fetch-tags";

type TaggedEntity = {
	id: ID;
	tagIds: ID[];
};

export function hydrateTags(entity: TaggedEntity, tags: TagMap): Tag[] {
	const entityKind = "date" in entity ? "Show" : "DJ";

	return entity.tagIds.flatMap((id) => {
		const tag = tags.get(id);

		if (tag === undefined) {
			console.error(
				`Tag ${id} referenced by ${entityKind} ${entity.id} does not exist.`,
			);
			return [];
		}

		return [tag];
	});
}
