import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { LiquidGlassCard } from "../../components/ui/LiquidGlassCard/LiquidGlassCard";
import { audienceCards } from "../../data/landingData";
import styles from "./Benefits.module.scss";
import Image from "next/image";

export function Benefits() {
  const spots = [
    "rgba(255, 108, 36, 0.40)",
    "rgba(255, 128, 52, 0.38)",
    "rgba(255, 96, 28, 0.42)",
  ];

  return (
    <section className={styles.section}>
      <LayoutContainer>
        <h2 className={styles.title}>Платформа для тебя, если ты</h2>

        <div className={styles.grid}>
          {audienceCards.map((card, index) => (
            <LiquidGlassCard key={card.text} className={styles.card} spotColor={spots[index % spots.length]}>
                <div
                    className={styles.content}
                >
                    <div className={styles.iconWrapper}>
                        <Image className={styles.icon} src={card.icon} alt="" width={50} height={50} />
                    </div>
                    <p>{card.text}</p>
                </div>
            </LiquidGlassCard>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
