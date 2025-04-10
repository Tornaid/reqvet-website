'use client';

import Image from 'next/image';
import styles from './styles/Header.module.scss';
import NavBar from './NavBar';
import { motion } from 'framer-motion';
import ScrollFadeIn from './animations/ScrollFadeIn';

export default function Header() {
  return (
    <header className={styles.header}>
      <NavBar />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1>Soignez. Parlez. C’est rédigé.</h1>
        <h2>
          Un outil simple et rapide, pensé pour vous faciliter la rédaction des
          comptes-rendus et vous faire gagner du temps au quotidien.
        </h2>
        <p>Obtenez 10 CR gratuits pour tester ReqVet</p>

        <a href="https://app.reqvet.com/signup" className={styles.cta}>
          Tester Gratuitement
        </a>

        <ScrollFadeIn>
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
        </ScrollFadeIn>
      </motion.div>
    </header>
  );
}
