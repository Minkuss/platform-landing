import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { Brand } from "../../components/ui/Brand/Brand";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LayoutContainer>
        <div className={styles.row}>
          <Brand text="платформа" logoWidth={58} logoHeight={36} className={styles.brand} />

          <div className={styles.contacts}>
            <p>адрес: ул. Серышева 47</p>
            <p>телефон: +7999 999 99 99</p>
          </div>

          <a
            className={styles.socials}
            href="https://vk.com/pl4tformakhv"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть Платформа во ВКонтакте"
          >
            <span>@</span>
            <span>VK</span>
          </a>
        </div>
      </LayoutContainer>
    </footer>
  );
}
