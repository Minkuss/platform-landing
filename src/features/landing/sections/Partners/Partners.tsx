import Image from "next/image";
import { LiquidGlassCard } from "../../components/ui/LiquidGlassCard/LiquidGlassCard";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { partners } from "../../data/landingData";
import styles from "./Partners.module.scss";

export function Partners() {
  const spots = [
    "rgba(255, 104, 34, 0.36)",
    "rgba(255, 130, 54, 0.34)",
    "rgba(236, 96, 26, 0.38)",
  ];

  return (
    <section id="partners" className={styles.section}>
      <LayoutContainer>
        <h2 className={styles.title}>Партнеры</h2>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <LiquidGlassCard
              className={styles.card}
              key={index}
              spotColor={spots[index % spots.length]}
              overflowVisible
            >
              <div className={styles.logoCircle}>
                <Image src={partner.logo} alt={partner.subtitle} width={130} height={46} />
              </div>

              <p className={styles.subtitle}>{partner.subtitle}</p>
              <p className={styles.text}>{partner.text}</p>
            </LiquidGlassCard>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
