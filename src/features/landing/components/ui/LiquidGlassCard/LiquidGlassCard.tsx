"use client";

import { CSSProperties, PointerEvent, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./LiquidGlassCard.module.scss";

type LiquidGlassCardProps = {
  children: ReactNode;
  className?: string;
  spotColor?: string;
  as?: "article" | "div";
  overflowVisible?: boolean;
};

type Point = {
  x: number;
  y: number;
};

export function LiquidGlassCard({
  children,
  className,
  spotColor = "rgba(255, 114, 36, 0.42)",
  as = "article",
  overflowVisible = false,
}: LiquidGlassCardProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const currentRef = useRef<Point>({ x: 50, y: 50 });
  const targetRef = useRef<Point>({ x: 50, y: 50 });
  const isReturningRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setAutoPlay(coarseQuery.matches && !reducedMotionQuery.matches);
    };

    update();
    coarseQuery.addEventListener("change", update);
    reducedMotionQuery.addEventListener("change", update);

    return () => {
      coarseQuery.removeEventListener("change", update);
      reducedMotionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const renderFrame = () => {
    const el = rootRef.current;
    if (!el) {
      rafRef.current = null;
      return;
    }

    const smoothness = isReturningRef.current ? 0.075 : 0.2;
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothness;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothness;

    el.style.setProperty("--spot-x", `${currentRef.current.x}%`);
    el.style.setProperty("--spot-y", `${currentRef.current.y}%`);

    const dx = Math.abs(targetRef.current.x - currentRef.current.x);
    const dy = Math.abs(targetRef.current.y - currentRef.current.y);

    if (dx + dy > 0.12) {
      rafRef.current = window.requestAnimationFrame(renderFrame);
      return;
    }

    rafRef.current = null;
  };

  const scheduleFrame = () => {
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(renderFrame);
    }
  };

  const updateTarget = (x: number, y: number, isReturning = false) => {
    isReturningRef.current = isReturning;
    targetRef.current.x = Math.max(0, Math.min(100, x));
    targetRef.current.y = Math.max(0, Math.min(100, y));
    scheduleFrame();
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (autoPlay || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    updateTarget(x, y, false);
  };

  const handlePointerLeave = () => {
    if (autoPlay) {
      return;
    }
    updateTarget(50, 50, true);
  };

  const cssVars = {
    "--spot-color": spotColor,
  } as CSSProperties;

  if (as === "div") {
    return (
      <div
        ref={(node) => {
          rootRef.current = node;
        }}
        className={`${styles.liquidCard}${className ? ` ${className}` : ""}`}
        data-autoplay={autoPlay ? "true" : "false"}
        data-overflow={overflowVisible ? "true" : "false"}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={cssVars}
      >
        <div className={styles.effectClip} aria-hidden>
          <span className={styles.spot} />
          <span className={styles.shine} />
        </div>
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }

  return (
    <article
      ref={(node) => {
        rootRef.current = node;
      }}
      className={`${styles.liquidCard}${className ? ` ${className}` : ""}`}
      data-autoplay={autoPlay ? "true" : "false"}
      data-overflow={overflowVisible ? "true" : "false"}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={cssVars}
    >
      <div className={styles.effectClip} aria-hidden>
        <span className={styles.spot} />
        <span className={styles.shine} />
      </div>
      <div className={styles.inner}>{children}</div>
    </article>
  );
}
