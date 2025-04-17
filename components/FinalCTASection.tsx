'use client';

import styles from './styles/FinalCTASection.module.scss';

export default function FinalCTASection() {
  return (
    <section className={styles.finalCta}>
      <h2>Gagnez du temps dès aujourd’hui</h2>
      <p>
        Inscrivez-vous et recevez <strong>10 comptes-rendus gratuits</strong>.
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
