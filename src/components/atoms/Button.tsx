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

/**
 rateMyStartup-main/
│── prisma/  
│── public/  
│── src/  
│   ├── app/  
│   │   ├── layout.tsx  
│   │   ├── page.tsx  
│   │   ├── add-startup/  
│   │   │   ├── page.tsx  
│   │   ├── startup/  
│   │       ├── [id]/  
│   │       │   ├── page.tsx  
│   ├── components/  # 📌 **Atomic Design Klasörü**  
│   │   ├── atoms/  
│   │   │   ├── Button.tsx  
│   │   │   ├── Input.tsx  
│   │   │   ├── LoadingSpinner.tsx  
│   │   ├── molecules/  
│   │   │   ├── CommentForm.tsx  
│   │   │   ├── StartupItem.tsx  
│   │   ├── organisms/  
│   │   │   ├── Header.tsx  
│   │   │   ├── StartupList.tsx  
│   │   │   ├── StartupDetails.tsx  
│   │   ├── templates/  
│   │   │   ├── MainLayout.tsx  
│   │   │   ├── StartupDetailLayout.tsx  
│   ├── redux/  
│   │   ├── ReduxProvider.tsx  
│   │   ├── startupSlice.ts  
│   │   ├── store.ts  
│   ├── styles/  
│   │   ├── globals.scss  # Global stiller  
│   │   ├── abstracts/  # **SCSS Değişkenleri, Mixins ve Fonksiyonlar**  
│   │   │   ├── _variables.scss  
│   │   │   ├── _mixins.scss  
│   │   ├── base/  # **Genel site stilleri**  
│   │   │   ├── _reset.scss  
│   │   │   ├── _typography.scss  
│   │   ├── pages/  # **Sayfa bazlı stiller**  
│   │   │   ├── _home.module.scss  
│   │   │   ├── _add-startup.module.scss  
│   │   │   ├── _startup-detail.module.scss  
│   │   ├── components/  # **Bileşen bazlı stiller**  
│   │   │   ├── atoms/  
│   │   │   │   ├── _button.module.scss  
│   │   │   │   ├── _input.module.scss  
│   │   │   ├── molecules/  
│   │   │   │   ├── _comment-form.module.scss  
│   │   │   │   ├── _startup-item.module.scss  
│   │   │   ├── organisms/  
│   │   │   │   ├── _header.module.scss  
│   │   │   │   ├── _startup-list.module.scss  
│   │   │   │   ├── _startup-details.module.scss  
│   │   ├── templates/  
│   │   │   ├── _main-layout.module.scss  
│   │   │   ├── _startup-detail-layout.module.scss  
│── tailwind.config.ts  
│── tsconfig.json  
│── package.json  
│── README.md  

 */
