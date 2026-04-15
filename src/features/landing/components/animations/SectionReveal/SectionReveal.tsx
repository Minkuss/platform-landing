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
  threshold?: number | number[];
  rootMargin?: string;
  responsiveMaxWidth?: number;
  responsiveThreshold?: number | number[];
  responsiveRootMargin?: string;
};

export function SectionReveal({
  children,
  className,
  variant = "fadeUp",
  delayMs = 0,
  once = true,
  threshold = 0.2,
  rootMargin = "0px 0px -12% 0px",
  responsiveMaxWidth,
  responsiveThreshold,
  responsiveRootMargin,
}: SectionRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return window.innerWidth;
  });
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
    if (responsiveMaxWidth === undefined) {
      return;
    }

    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, [responsiveMaxWidth]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reducedMotion) {
      return;
    }

    const useResponsiveThreshold =
      responsiveMaxWidth !== undefined &&
      viewportWidth !== null &&
      viewportWidth <= responsiveMaxWidth;

    const observerThreshold =
      useResponsiveThreshold && responsiveThreshold !== undefined ? responsiveThreshold : threshold;
    const observerRootMargin =
      useResponsiveThreshold && responsiveRootMargin !== undefined ? responsiveRootMargin : rootMargin;

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
        threshold: observerThreshold,
        rootMargin: observerRootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [
    once,
    reducedMotion,
    responsiveMaxWidth,
    responsiveRootMargin,
    responsiveThreshold,
    rootMargin,
    threshold,
    viewportWidth,
  ]);

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
