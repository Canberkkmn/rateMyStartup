import styles from "@/styles/components/molecules/_error-message.module.scss";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={styles["error-message"]}>{message}</p>;
}
