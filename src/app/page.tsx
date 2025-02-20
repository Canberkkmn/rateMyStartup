import Link from "next/link";
import { Suspense } from "react";
import StartupList from "@/components/organisms/StartupList";
import SearchInput from "@/components/molecules/SearchInput";
import Button from "@/components/atoms/Button";

import styles from "@/styles/pages/_home.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Startups</h1>

        {/* SearchInput Suspense içinde olmalı */}
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchInput />
        </Suspense>

        <Link href="/add-startup">
          <Button variant="secondary">+ Add Startup</Button>
        </Link>
      </div>

      {/* StartupList Suspense içinde olmalı */}
      <Suspense fallback={<div>Loading startups...</div>}>
        <StartupList />
      </Suspense>
    </>
  );
}
