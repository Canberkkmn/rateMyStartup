"use client";

import { useId } from "react";
import clsx from "clsx";

import styles from "@/styles/components/atoms/_input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  className,
  required,
  disabled,
  ...props
}) => {
  const inputId = id || useId();
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={clsx(styles["input"], className)}>
      {label && (
        <label htmlFor={inputId} className={styles["input__label"]}>
          {label}
        </label>
      )}
      <input
        className={clsx(styles["input__field"], {
          [styles["input__field--error"]]: error,
        })}
        aria-invalid={!!error}
        aria-describedby={errorId}
        required={required}
        disabled={disabled}
        id={inputId}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className={styles["input__error-message"]}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
