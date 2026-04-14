import { ButtonHTMLAttributes } from "react";
import styles from "./GradientButton.module.scss";

type GradientButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  wide?: boolean;
};

export function GradientButton({ wide = false, className, children, ...props }: GradientButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button}${wide ? ` ${styles.wide}` : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
