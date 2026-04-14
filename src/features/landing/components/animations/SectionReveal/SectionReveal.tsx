"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./SectionReveal.module.scss";

type RevealVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delayMs?: number;
  once?: boolean;
};

export function SectionReveal({
  children,
  className,
  variant = "fadeUp",
  delayMs = 0,
  once = true,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, reducedMotion]);

  const style = {
    "--reveal-delay": `${delayMs}ms`,
  } as CSSProperties;

  const isShown = visible || reducedMotion;

  return (
    <div
      ref={rootRef}
      className={`${styles.reveal} ${styles[variant]}${isShown ? ` ${styles.visible}` : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
