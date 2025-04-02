"use client";

import styles from "./styles/UseCases.module.scss";

export default function UseCases() {
  return (
    <section className={styles.useCases}>
      <h2>Intégrez ReqVet dans votre routine</h2>
      <p>
        En consultation ou entre deux rendez-vous, ReqVet s’adapte à votre
        rythme. Choisissez la méthode qui vous convient : enregistrement en
        direct ou dictée différée.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src="/consult.png" alt="Consultation en direct" />

            <div className={styles.description}>
              <h4>En direct pendant la consultation</h4>
              <p>
                Utilisez ReqVet pendant l’échange avec le propriétaire pour
                générer un compte-rendu.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.image}>
            <img src="/dictee.png" alt="Dictée après consultation" />

            <div className={styles.description}>
              <h4>En différé, à voix haute</h4>
              <p>
                En fin de journée ou entre deux consultations, dictez simplement
                vos notes et souvenirs à l’oral. <br/> Laissez ReqVet générer le compte-rendu pour vous.<br /><br />
                <strong>Idéal et recommandé après les longues consultations.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
