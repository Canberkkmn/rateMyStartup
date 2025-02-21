import Link from "next/link";
import { Suspense } from "react";
import StartupList from "@/components/organisms/StartupList";
import SearchInput from "@/components/molecules/SearchInput";
import Button from "@/components/atoms/Button";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

import styles from "@/styles/pages/_home.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Startups</h1>

        <Suspense fallback={<LoadingSpinner text="Loading search input..." />}>
          <SearchInput />
        </Suspense>

        <Link href="/add-startup">
          <Button variant="secondary">+ Add Startup</Button>
        </Link>
      </div>

      <Suspense fallback={<LoadingSpinner text="Loading startup list..." />}>
        <StartupList />
      </Suspense>
    </>
  );
}
