"use client";

import styles from "@/styles/components/molecules/_error-message.module.scss";

interface ErrorMessageProps {
  message: string;
  id?: string;
}

export default function ErrorMessage({ message, id }: ErrorMessageProps) {
  return (
    <p
      id={id}
      className={styles["error-message"]}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
}
