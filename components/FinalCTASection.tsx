'use client';

import styles from './styles/FinalCTASection.module.scss';

export default function FinalCTASection() {
  return (
    <section className={styles.finalCta}>
      <h2>Gagnez du temps dès aujourd’hui</h2>
      <p>
        Inscrivez-vous et profitez de <strong>14 jours d&apos;essais gratuits</strong>.
        <br />
        Sans carte bancaire. Accès immédiat.
      </p>
      <a
        href="https://app.reqvet.com/signup"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Démarrez votre essai gratuit</button>
      </a>
    </section>
  );
}
