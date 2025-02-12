import StartupList from "@/components/StartupList";
import AddStartupButton from "@/components/AddStartupButton";

import styles from "@/styles/pages/_home.module.scss";

export default async function Home() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Startups</h1>
        <AddStartupButton />
      </div>
      <StartupList />
    </>
  );
}
