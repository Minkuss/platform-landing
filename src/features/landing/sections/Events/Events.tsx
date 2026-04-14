import Image from "next/image";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { events } from "../../data/landingData";
import styles from "./Events.module.scss";

export function Events() {
  return (
    <section className={styles.section}>
      <LayoutContainer>
        <h2 className={styles.title}>Последние мероприятия</h2>

        <div className={styles.grid}>
          {events.map((event, index) => (
            <article className={styles.card} key={`${event.title}-${index}`}>
              <div className={styles.imageWrap}>
                <Image src={event.image} alt={event.title} width={470} height={470} />
              </div>
              <p className={styles.cardTitle}>{event.title}</p>
              <p className={styles.cardText}>{event.description}</p>
            </article>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}
