"use client";

import clsx from "clsx";

import styles from "@/styles/components/atoms/_button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ariaLabel,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[`button--${variant}`], className)}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-label={ariaLabel || undefined}
      tabIndex={isLoading ? -1 : 0}
      {...props}
    >
      {isLoading ? (
        <span className={styles["button__loader"]}></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
