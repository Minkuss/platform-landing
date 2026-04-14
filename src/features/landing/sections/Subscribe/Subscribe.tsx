import { GradientButton } from "../../components/ui/GradientButton/GradientButton";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import styles from "./Subscribe.module.scss";

export function Subscribe() {
  return (
    <section className={styles.section}>
      <LayoutContainer>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.title}>Подпишись</h2>
            <p className={styles.text}>На рассылку, чтобы узнавать новости от Платформы первым</p>
          </div>

          <form className={styles.form}>
            <label>
              Имя
              <input type="text" placeholder="Введите имя" />
            </label>

            <label>
              Почта
              <input type="email" placeholder="Введите почту" />
            </label>

            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>
                Я согласен с <strong>политикой обработки персональных данных</strong>
              </span>
            </label>

            <GradientButton wide>Подписаться</GradientButton>
          </form>
        </div>

        <div className={styles.outro}>
          <p className={styles.outroBrand}>платформа</p>
          <p className={styles.outroText}>это шанс именно для тебя</p>
        </div>
      </LayoutContainer>
    </section>
  );
}
