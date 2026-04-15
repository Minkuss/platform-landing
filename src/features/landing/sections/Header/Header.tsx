"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { navItems } from "../../data/landingData";
import { Brand } from "../../components/ui/Brand/Brand";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { LiquidGlassCard } from "../../components/ui/LiquidGlassCard/LiquidGlassCard";
import styles from "./Header.module.scss";

const emptySubscribe = () => () => {};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const portalTarget = isHydrated ? document.body : null;

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1270) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={styles.headerWrap}>
        <LayoutContainer>
          <div className={styles.headerRow}>
            <Brand />

            <LiquidGlassCard
              as="div"
              className={styles.navPill}
              spotColor="rgba(255, 148, 72, 0.32)"
            >
              <nav className={styles.nav}>
                {navItems.map((item) => (
                  <a key={item} href="#">
                    {item}
                  </a>
                ))}
              </nav>
            </LiquidGlassCard>

            <button
              className={`${styles.burger}${isMenuOpen ? ` ${styles.burgerOpen}` : ""}`}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </LayoutContainer>
      </header>

      {portalTarget
        ? createPortal(
            <>
              <div
                className={`${styles.mobileBackdrop}${isMenuOpen ? ` ${styles.mobileBackdropOpen}` : ""}`}
                onClick={closeMenu}
                aria-hidden
              />
              <div
                id="mobile-nav"
                className={`${styles.mobileMenu}${isMenuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Мобильная навигация"
                aria-hidden={!isMenuOpen}
              >
                <nav className={styles.mobileNav}>
                  {navItems.map((item, index) => (
                    <a
                      key={item}
                      href="#"
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                      style={{ transitionDelay: `${80 + index * 55}ms` }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </>,
            portalTarget,
          )
        : null}
    </>
  );
}
