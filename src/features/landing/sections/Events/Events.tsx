"use client";

import { TouchEventHandler, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { events } from "../../data/landingData";
import styles from "./Events.module.scss";

const MULTI_CARD_BREAKPOINT = 1080;

export function Events() {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [activeSlide, setActiveSlide] = useState(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const touchStartX = useRef(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setCardsPerPage(width <= MULTI_CARD_BREAKPOINT ? 1 : 2);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const maxSlide = Math.max(0, events.length - cardsPerPage);
  const clampedActiveSlide = Math.min(activeSlide, maxSlide);
  const sliderSteps = useMemo(() => Array.from({ length: maxSlide + 1 }, (_, index) => index), [maxSlide]);

  useEffect(() => {
    const trackNode = trackRef.current;
    const viewportNode = viewportRef.current;
    if (!trackNode || !viewportNode) {
      return;
    }

    const targetCard = cardRefs.current[clampedActiveSlide];
    const targetOffset = targetCard?.offsetLeft ?? 0;
    const maxOffset = Math.max(0, trackNode.scrollWidth - viewportNode.clientWidth);
    const translateX = Math.min(targetOffset, maxOffset);

    gsap.to(trackNode, {
      x: -translateX,
      duration: 0.78,
      ease: "power3.out",
    });
  }, [cardsPerPage, clampedActiveSlide, viewportWidth]);

  const handlePrev = () => {
    setActiveSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => Math.min(maxSlide, prev + 1));
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;

    if (Math.abs(deltaX) < 42 || maxSlide < 1) {
      return;
    }

    if (deltaX > 0) {
      handlePrev();
      return;
    }

    handleNext();
  };

  return (
    <section className={styles.section}>
      <LayoutContainer>
        <div className={styles.header}>
          <h2 className={styles.title}>Последние мероприятия</h2>

          {maxSlide > 0 ? (
            <div className={styles.controls}>
              <button
                className={styles.controlButton}
                onClick={handlePrev}
                type="button"
                aria-label="Предыдущий слайд"
                disabled={clampedActiveSlide <= 0}
              >
                <svg className={`${styles.controlIcon} ${styles.controlIconPrev}`} viewBox="0 0 20 20" aria-hidden focusable="false">
                  <path d="M7 4.5L13 10L7 15.5" />
                </svg>
              </button>
              <button
                className={styles.controlButton}
                onClick={handleNext}
                type="button"
                aria-label="Следующий слайд"
                disabled={clampedActiveSlide >= maxSlide}
              >
                <svg className={styles.controlIcon} viewBox="0 0 20 20" aria-hidden focusable="false">
                  <path d="M7 4.5L13 10L7 15.5" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <div className={styles.slider} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div ref={viewportRef} className={styles.viewport}>
            <div ref={trackRef} className={styles.track}>
              {events.map((event, cardIndex) => (
                <article
                  className={styles.card}
                  key={`${event.title}-${cardIndex}`}
                  ref={(node) => {
                    cardRefs.current[cardIndex] = node;
                  }}
                >
                  <div className={styles.imageWrap}>
                    <Image src={event.image} alt={event.title} width={470} height={470} />
                  </div>
                  <p className={styles.cardTitle}>{event.title}</p>
                  <p className={styles.cardText}>{event.description}</p>
                </article>
              ))}
            </div>
          </div>

          {maxSlide > 0 ? (
            <div className={styles.dots} aria-label="Пагинация слайдера">
              {sliderSteps.map((step) => (
                <button
                  key={step}
                  className={`${styles.dot}${step === clampedActiveSlide ? ` ${styles.dotActive}` : ""}`}
                  onClick={() => setActiveSlide(step)}
                  type="button"
                  aria-label={`Слайд ${step + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </LayoutContainer>
    </section>
  );
}
