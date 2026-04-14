import Image from "next/image";
import { GradientButton } from "../../components/ui/GradientButton/GradientButton";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { socialImage } from "../../data/landingData";
import styles from "./Vk.module.scss";

export function Vk() {
  return (
    <section className={styles.section}>
      <LayoutContainer>
        <h2 className={styles.title}>Мы в ВК</h2>

        <div className={styles.coverWrap}>
          <Image src={socialImage} alt="Сообщество Платформа в VK" width={1260} height={572} />
        </div>

        <div className={styles.buttonWrap}>
          <GradientButton>Подписаться в ВК</GradientButton>
        </div>
      </LayoutContainer>
    </section>
  );
}
