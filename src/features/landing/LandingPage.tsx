import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { Benefits } from "./sections/Benefits/Benefits";
import { Events } from "./sections/Events/Events";
import { Vk } from "./sections/Vk/Vk";
import { Partners } from "./sections/Partners/Partners";
import { Subscribe } from "./sections/Subscribe/Subscribe";
import { Footer } from "./sections/Footer/Footer";
import { SectionReveal } from "./components/animations/SectionReveal/SectionReveal";
import styles from "./LandingPage.module.scss";

export function LandingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.glowTop} aria-hidden />
      <div className={styles.glowBottom} aria-hidden />

      <SectionReveal variant="fadeDown">
        <Header />
      </SectionReveal>
      <main>
        <SectionReveal variant="fadeRight" delayMs={60}>
          <Hero />
        </SectionReveal>
        <SectionReveal variant="fadeUp" delayMs={40}>
          <Benefits />
        </SectionReveal>
        <SectionReveal variant="fadeLeft" delayMs={40}>
          <Events />
        </SectionReveal>
        <SectionReveal variant="fadeRight" delayMs={40}>
          <Vk />
        </SectionReveal>
        <SectionReveal variant="scale" delayMs={40}>
          <Partners />
        </SectionReveal>
        <SectionReveal variant="fadeUp" delayMs={40}>
          <Subscribe />
        </SectionReveal>
      </main>
      <Footer />
    </div>
  );
}
