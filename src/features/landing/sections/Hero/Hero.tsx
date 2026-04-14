import Image from "next/image";
import { GradientButton } from "../../components/ui/GradientButton/GradientButton";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { heroWaves } from "../../data/landingData";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <LayoutContainer>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.brand}>платформа</p>
            <p className={styles.description}>
                Платформа  – это двухкомпонентная система: с одной стороны – структурированное обучение, с другой – серия конкурсных заданий для отработки навыков от реальных заказчиков.
            </p>
            <GradientButton>Узнать подробнее</GradientButton>
          </div>

          <div className={styles.waves}>
            <Image src={heroWaves.back} alt="" width={710} height={600} className={styles.waveBack} priority aria-hidden />
            <Image src={heroWaves.middle} alt="" width={730} height={607} className={styles.waveMiddle} priority aria-hidden />
            <Image src={heroWaves.front} alt="" width={730} height={607} className={styles.waveFront} priority aria-hidden />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
