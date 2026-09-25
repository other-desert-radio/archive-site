import type { Show } from "../../utils/fetch-shows";
import styles from "./ShowCard.module.css";

type Props = {
	show: Show;
	base: string;
};

export default function ShowCard({ show, base }: Props) {
	return (
		<a
			href={`${base}/shows/${show.id}`}
			className={styles["show-card"]}
			aria-label={`View ${show.title}`}
		>
			<span>{show.title}</span>
		</a>
	);
}
