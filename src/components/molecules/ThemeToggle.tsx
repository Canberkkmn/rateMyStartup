"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/atoms/Button";

import styles from "@/styles/components/molecules/_theme-toggle.module.scss";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark" | null) || "light"
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        styles["toggle-button"],
        styles[`toggle-button--${theme}`],
        className
      )}
    >
      <span className={styles["toggle-button__icon"]}>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;
