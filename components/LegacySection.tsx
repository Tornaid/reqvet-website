'use client';

import styles from './styles/LegacySection.module.scss';
import Image from 'next/image';

export default function LegacySection() {
  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>Partenaire de confiance</h2>
        <p>
          Parce que la protection des données personnelles est essentielle, nous nous engageons
          envers vous à maîtriser tout le processus de traitement de la donnée et nous conformer
          aux normes RGPD en vigueur.
        </p>
      </div>

      <div className={styles.content}>
        <ul className={styles.list}>
          <li>Conforme aux normes RGPD</li>
          <li>Nous n’utilisons pas les données de vos consultations pour quelconque traitement</li>
          <li>Données chiffrées en transit et en stockage</li>
          <li>
            Audios conservés 24h<br />
            Comptes-rendus conservés 30 jours
          </li>
        </ul>

        <div className={styles.image}>
          <Image
            src="/rgpd.png" // à placer dans /public
            alt="Logo RGPD"
            width={300}
            height={200}
          />
        </div>
      </div>
    </section>
  );
}
