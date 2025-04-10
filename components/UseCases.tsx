"use client";

import Image from "next/image";
import styles from "./styles/UseCases.module.scss";
import ScrollFadeIn from "./animations/ScrollFadeIn";

export default function UseCases() {
  return (
    <section className={styles.useCases}>
      <ScrollFadeIn>
        <h2>Intégrez ReqVet dans votre routine</h2>
        <p>
          En consultation ou entre deux rendez-vous, ReqVet s’adapte à votre
          rythme. Choisissez la méthode qui vous convient : enregistrement en
          direct ou dictée différée.
        </p>
      </ScrollFadeIn>

      <div className={styles.cards}>
        {/* CARD 1 */}
        <ScrollFadeIn>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src="/consult.png"
                alt="Consultation en direct"
                width={600}
                height={400}
                className={styles.img}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.description}>
                <h4>En direct pendant la consultation</h4>
                <p>
                  Utilisez ReqVet pendant l’échange avec le propriétaire pour
                  générer un compte-rendu.
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* CARD 2 */}
        <ScrollFadeIn>
          <div className={styles.card}>
            <div className={styles.image}>
              <Image
                src="/dictee.png"
                alt="Dictée après consultation"
                width={600}
                height={400}
                className={styles.img}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.description}>
                <h4>En différé, à voix haute</h4>
                <p>
                  En fin de journée ou entre deux consultations, dictez simplement
                  vos notes et souvenirs à l’oral. <br />
                  Laissez ReqVet générer le compte-rendu pour vous. <br />
                  <br />
                  <strong>
                    Idéal et recommandé après les longues consultations.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
