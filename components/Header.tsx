'use client';

import Image from 'next/image';
import styles from './styles/Header.module.scss';
import NavBar from './NavBar';

export default function Header() {
  return (
    <header className={styles.header}>
      <NavBar />

      <div className={styles.content}>
        <h1>Soignez. Parlez. C’est rédigé.</h1>
        <p>
        Un outil simple et rapide, pensé pour vous libérer de la rédaction des comptes-rendus et vous faire gagner du temps au quotidien.
        </p>

        <a href="https://app.reqvet.com/signup" className={styles.cta}>
          Tester Gratuitement
        </a>

        <div className={styles.imageWrapper}>
          <Image
            src="/demo-header.png"
            alt="Aperçu ReqVet"
            width={1200}
            height={800}
            priority
          />
          <Image
            src="/demo-overlay.png"
            alt="Interface consultation"
            width={300}
            height={400}
            className={styles.overlay}
          />
        </div>
      </div>
    </header>
  );
}
