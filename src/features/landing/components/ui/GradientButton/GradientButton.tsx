import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./GradientButton.module.scss";

type GradientButtonBaseProps = {
  wide?: boolean;
  className?: string;
};

type GradientButtonAsButton = GradientButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type GradientButtonAsAnchor = GradientButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type GradientButtonProps = GradientButtonAsButton | GradientButtonAsAnchor;

export function GradientButton({ wide = false, className, children, ...props }: GradientButtonProps) {
  const classes = `${styles.button}${wide ? ` ${styles.wide}` : ""}${className ? ` ${className}` : ""}`;

  if ("href" in props && typeof props.href === "string") {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
