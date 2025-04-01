'use client';

import styles from './styles/PricingSection.module.scss';

export default function PricingSection() {
  return (
    <section id="tarification" className={styles.section}>
      <div className={styles.title}>
        <h2>Tarification</h2>
        <p>
          ReqVet c’est une tarification unique, avec un accès illimité à toutes nos fonctionnalités
        </p>
      </div>

      <div className={styles.container}>
        <ul className={styles.features}>
          <li>Génération de vos comptes-rendus</li>
          <li>Option de régénération du CR</li>
          <li>DogBot</li>
          <li>Modèles personnalisés illimités</li>
        </ul>

        <div className={styles.priceBox}>
          <p className={styles.price}>24€ TTC/mois /utilisateur</p>
          <p className={styles.subPrice}>20€ HT (TVA 20% applicable)</p>
        </div>
      </div>

      <div className={styles.cta}>
        <p>Obtenez 10 CR gratuits pour tester ReqVet</p>
        <p>Inscription directe, sans CB</p>
        <a href="https://app.reqvet.com/signup" target="_blank" rel="noopener noreferrer">
          <button>Tester ReqVet gratuitement</button>
        </a>
      </div>
    </section>
  );
}
