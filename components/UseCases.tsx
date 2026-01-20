"use client";

import Image from "next/image";
import styles from "./styles/UseCases.module.scss";
import ScrollFadeIn from "./animations/ScrollFadeIn";

export default function UseCases() {
  return (
    <section className={styles.useCases}>
      <ScrollFadeIn>
        <div className={styles.header}>
          <h2>ReqVet s’intègre à votre quotidien</h2>
          <p>
            En consultation ou entre deux rendez-vous, ReqVet s’adapte à votre
            rythme. Utilisez-le <strong>en temps réel</strong> ou en{" "}
            <strong>dictée différée</strong>, selon votre organisation.
          </p>
        </div>
      </ScrollFadeIn>

      <div className={styles.cards}>
        {/* ===== CAS 1 ===== */}
        <ScrollFadeIn>
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src="/consult.png"
                alt="Utilisation en consultation"
                width={600}
                height={400}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h4>Pendant la consultation</h4>
                <p>
                  Lancez l’enregistrement pendant l’échange avec le propriétaire.
                  ReqVet structure automatiquement le compte-rendu à partir de
                  vos propos.
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>

        {/* ===== CAS 2 ===== */}
        <ScrollFadeIn>
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src="/dictee.png"
                alt="Dictée après consultation"
                width={600}
                height={400}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h4>En différé, à votre rythme</h4>
                <p>
                  Entre deux consultations ou en fin de journée, dictez
                  simplement vos notes à voix haute. ReqVet se charge du
                  compte-rendu.
                </p>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
