"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/atoms/Button";

import styles from "@/styles/components/molecules/_theme-toggle.module.scss";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");

    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      className={clsx(
        styles["theme-toggle"],
        styles[`theme-toggle--${theme}`],
        className
      )}
      isLoading={!mounted}
    >
      <span className={styles["theme-toggle__icon"]}>
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </Button>
  );
};

export default ThemeToggle;
