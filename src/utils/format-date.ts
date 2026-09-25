/**
 * Formats a show timestamp for display in the archive.
 *
 * ISO timestamp --> "Month day, year"
 */
export const formatDate = (date: string): string =>
	new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	}).format(new Date(date));
