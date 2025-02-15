import Link from "next/link";
import StartupList from "@/components/organisms/StartupList";
import SearchInput from "@/components/molecules/SearchInput";
import Button from "@/components/atoms/Button";

import styles from "@/styles/pages/_home.module.scss";

export default async function Home() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Startups</h1>
        <SearchInput />
        <Link href="/add-startup">
          <Button variant="secondary">+ Add Startup</Button>
        </Link>
      </div>
      <StartupList />
    </>
  );
}
