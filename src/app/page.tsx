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

        <Button variant="secondary">
          <Link href="/add-startup" tabIndex={-1}>
            + Add Startup
          </Link>
        </Button>
      </div>

      <Suspense fallback={<LoadingSpinner text="Loading startup list..." />}>
        <StartupList />
      </Suspense>
    </>
  );
}
