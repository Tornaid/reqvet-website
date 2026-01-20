"use client";

import styles from "./styles/HowItWorks.module.scss";
import { motion } from "framer-motion";
import { Mic, FileText, CheckCircle } from "lucide-react";

export default function HowItWorksFlow() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Un workflow simple, fluide et maîtrisé</h2>
      </motion.div>

      <div className={styles.flowWrapper}>
        {/* ===== SVG CHEMIN ===== */}
        <svg
          className={styles.flowPath}
          viewBox="0 0 900 200"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M200 180 C 50 200, 50 0, 350 50 S 550 230, 800 100"
            fill="none"
            stroke="#00b976"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </svg>

        {/* ===== BLOCS ===== */}
        <div className={styles.cards}>
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepIcon}>
              <Mic />
            </div>

            <h3>Vous consultez</h3>
            <p>
              Vous parlez naturellement pendant ou après la consultation. ReqVet
              vous écoute.
            </p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepIcon}>
              <FileText />
            </div>

            <h3>ReqVet rédige</h3>
            <p>
              Le compte-rendu est structuré automatiquement selon vos habitudes.
            </p>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.stepIcon}>
              <CheckCircle />
            </div>
            <h3>Vous validez</h3>
            <p>Vous relisez, ajustez si besoin, puis partagez en un clic.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
