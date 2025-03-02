import Link from "next/link";
import styles from "@/styles/components/molecules/_startup-item.module.scss";

interface StartupItemProps {
  startup: {
    id: string;
    name: string;
    rating: number;
  };
}

export default function StartupItem({ startup }: StartupItemProps) {
  return (
    <li className={styles["startup-item"]}>
      <Link
        href={`/startup/${startup.id}`}
        aria-label={`View details for ${startup.name}`}
        aria-describedby={`rating-${startup.id}`}
      >
        <span className={styles["startup-item__link"]}>{startup.name}</span>
      </Link>
      <p id={`rating-${startup.id}`} className={styles["startup-item__rating"]}>
        ⭐ {startup.rating.toFixed(1)} / 5
      </p>
    </li>
  );
}
