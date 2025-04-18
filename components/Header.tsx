"use client";

import Image from "next/image";
import styles from "./styles/Header.module.scss";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import ScrollFadeIn from "./animations/ScrollFadeIn";
import { PawPrint } from "lucide-react";

export default function Header() {
  return (
    <header className={styles.header}>
      <NavBar />
      <motion.div className={styles.content}>
        <div className={styles.leftTextBlock}>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Soignez. Parlez. C’est rédigé.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Reqvet est un outil simple et rapide, qui simplifie votre quotidien
            en automatisant la rédaction de vos comptes-rendus de consultation.
            Concentrez-vous sur le soin, et rentrez chez vous à l&apos;heure.
          </motion.h2>

          <motion.div
            className={styles.rightButtonBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://app.reqvet.com/signup" className={styles.cta}>
              Démarrez votre essai gratuit
            </a>
            <p className={styles.ctaText}>
              10 CR gratuits{" "}
              <PawPrint size={15} style={{ marginLeft: 5, marginRight: 5 }} />{" "}
              Pas de CB requise
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.rightImageBlock}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <ScrollFadeIn>
            {/* Version desktop */}
            <div className={styles.imageDesktop}>
              <Image
                src="/header-laptop-phone.png"
                alt="Aperçu ReqVet Desktop"
                width={1200}
                height={800}
                priority
              />
            </div>

            {/* Version mobile */}
            <div className={styles.imageMobile}>
              <Image
                src="/mobile.png"
                alt="Aperçu ReqVet Mobile"
                width={250}
                height={325}
                priority
              />
            </div>
          </ScrollFadeIn>
        </motion.div>
      </motion.div>
    </header>
  );
}
