import StartupForm from "@/components/organisms/StartupForm";

import styles from "@/styles/pages/_add-startup.module.scss";

export default function AddStartupPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚀 Add a New Startup</h1>
      <StartupForm />
    </div>
  );
}
