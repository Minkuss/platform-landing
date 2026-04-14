"use client";

import { useEffect, useState } from "react";
import { navItems } from "../../data/landingData";
import { Brand } from "../../components/ui/Brand/Brand";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import styles from "./Header.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className={styles.headerWrap}>
      <LayoutContainer>
        <div className={styles.headerRow}>
          <Brand />

          <div className={styles.navPill}>
            <nav className={styles.nav}>
              {navItems.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </nav>
          </div>

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

        <div
          id="mobile-nav"
          className={`${styles.mobileMenu}${isMenuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Мобильная навигация"
        >
          <nav className={styles.mobileNav}>
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={closeMenu}
                style={{ transitionDelay: `${80 + index * 55}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </LayoutContainer>
    </header>
  );
}
