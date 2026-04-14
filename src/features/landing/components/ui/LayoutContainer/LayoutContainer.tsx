import { ReactNode } from "react";
import styles from "./LayoutContainer.module.scss";

type LayoutContainerProps = {
  children: ReactNode;
  className?: string;
};

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return <div className={`${styles.container}${className ? ` ${className}` : ""}`}>{children}</div>;
}
