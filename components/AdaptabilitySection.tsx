"use client";

import styles from "./styles/AdaptabilitySection.module.scss";
import { motion } from "framer-motion";
import {
  Stethoscope,
  ClipboardList,
  Settings,
  FileText,
} from "lucide-react";

export default function AdaptabilitySection() {
  return (
    <section className={styles.section}>
      {/* ===== HEADER ===== */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Un outil qui s’adapte à votre pratique</h2>
        <p>
          ReqVet accompagne toutes les spécialités vétérinaires, grâce à des
          modèles de comptes-rendus prêts à l’emploi ou entièrement
          personnalisables.
        </p>
      </motion.div>

      {/* ===== CONTENT GRID ===== */}
      <div className={styles.grid}>
        {/* ===== GENERIC MODELS ===== */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.icon}>
            <ClipboardList />
          </div>

          <h3>Des modèles adaptés à chaque spécialité et à chaque espèce</h3>
          <p>
            Utilisez des structures de comptes-rendus génériques, pensées pour
            les principales pratiques vétérinaires. Prêts à l’emploi, sans
            configuration préalable.
          </p>

          <div className={styles.tags}>
            <span>Généraliste</span>
            <span>Comportement</span>
            <span>Médecine</span>
            <span>Echographie</span>
            <span>…</span>
          </div>
        </motion.div>

        {/* ===== CUSTOM MODELS ===== */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.icon}>
            <Settings />
          </div>

          <h3>Ou une personnalisation complète</h3>
          <p>
            Créez vos propres modèles de comptes-rendus, adaptez la structure,
            les rubriques et les consignes médicales pour refléter exactement
            votre façon de travailler.
          </p>

          <ul className={styles.features}>
            <li>
              <FileText /> Structure libre du compte-rendu
            </li>
            <li>
              <Stethoscope /> Consignes médicales personnalisées
            </li>
            <li>
              <ClipboardList /> Réutilisable pour chaque consultation
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
