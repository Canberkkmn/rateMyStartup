import Link from "next/link";
import ThemeToggle from "@/components/molecules/ThemeToggle";

import styles from "@/styles/components/organisms/_header.module.scss";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <nav aria-label="Main Navigation" className={styles["header__nav"]}>
        <Link href="/" className={styles["header__link"]}>
          <span
            className={styles["header__title"]}
            role="heading"
            aria-level={1}
          >
            🚀 RateMyStartup
          </span>
        </Link>
      </nav>

      <div className={styles["header__toggle"]}>
        <ThemeToggle />
      </div>
    </header>
  );
}
