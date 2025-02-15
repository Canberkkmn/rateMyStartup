import React from "react";
import clsx from "clsx";

import styles from "@/styles/components/atoms/_loading-spinner.module.scss";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text,
  className,
}) => {
  return (
    <div className={clsx(styles["spinner"], className)}>
      <div
        className={clsx(
          styles["spinner__icon"],
          styles[`spinner__icon--${size}`]
        )}
      />
      {text && <p className={styles["spinner__text"]}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
