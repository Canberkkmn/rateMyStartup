import React from "react";
import clsx from "clsx";

import styles from "@/styles/components/atoms/_input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className={clsx(styles["input"], className)}>
      {label && <label className={styles["input__label"]}>{label}</label>}
      <input
        className={clsx(styles["input__field"], {
          [styles["input__field--error"]]: error,
        })}
        {...props}
      />
      {error && <p className={styles["input__error-message"]}>{error}</p>}
    </div>
  );
};

export default Input;
