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
      <Link href={`/startup/${startup.id}`}>
        <span className={styles["startup-item__link"]}>{startup.name}</span>
      </Link>
      <p className={styles["startup-item__rating"]}>
        ⭐ {startup.rating.toFixed(1)} / 5
      </p>
    </li>
  );
}
