import Link from "next/link";
import ThemeToggle from "@/components/molecules/ThemeToggle";

import styles from "@/styles/components/organisms/_header.module.scss";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <Link href="/">
        <h1 className={styles["header__title"]}>🚀 RateMyStartup</h1>
      </Link>

      <div className={styles["header__toggle"]}>
        <ThemeToggle />
      </div>
    </header>
  );
}
