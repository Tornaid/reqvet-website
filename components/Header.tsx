"use client";

import Image from "next/image";
import styles from "./styles/Header.module.scss";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import ScrollFadeIn from "./animations/ScrollFadeIn";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavBar />
      <motion.div className={styles.content}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Soignez. Parlez. C’est rédigé.</h1>
          <h2>
            Reqvet est un outil simple et rapide, qui simplifie votre quotidien
            en automatisant la rédaction de vos comptes-rendus de consultation.
            Concentrez-vous sur le soin, et rentrez chez vous à l&apos;heure.
          </h2>
          <a href="https://app.reqvet.com/signup" className={styles.cta}>
            Démarrez votre essai gratuit
          </a>
        </motion.div>

        {/* Version mobile du bouton + texte fixé en bas */}
        <div className={styles.ctaMobileContainer}>
          <a href="https://app.reqvet.com/signup" className={styles.ctaMobile}>
            Démarrez votre essai gratuit
          </a>
          <p className={styles.ctaText}>
            10 CR gratuits <br />
            Pas de CB requise
          </p>
        </div>

        <div className={styles.right}>
          <ScrollFadeIn>
            <div className={styles.imageWrapper}>
              <Image
                src="/demo-header.png"
                alt="Aperçu ReqVet"
                width={1200}
                height={800}
                priority
              />
            </div>
          </ScrollFadeIn>
        </div>
      </motion.div>
    </header>
  );
}
