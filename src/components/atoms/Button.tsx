import React from "react";
import clsx from "clsx";

import styles from "@/styles/components/atoms/_button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[`button--${variant}`], className)}
      disabled={disabled || isLoading}
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