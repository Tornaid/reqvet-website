"use client";

import Image from "next/image";
import styles from "./styles/Header.module.scss";
import NavBar from "./NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Play, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Fermeture avec ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className={styles.header}>
      <NavBar />

      <motion.div className={styles.content}>
        <div className={styles.heroGrid}>
          {/* IMAGE */}
          <motion.div
            className={styles.imageBlock}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.imageDesktop}>
              <Image
                src="/requiem_veto.png"
                alt="Requiem, assistant vétérinaire ReqVet"
                fill
                priority
                sizes="(max-width: 900px) 80vw, 420px"
              />
            </div>
          </motion.div>

          {/* TEXTE */}
          <motion.div
            className={styles.textBlock}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={styles.catchPhrase}>
              Le coéquipier pensé pour simplifier votre pratique
            </p>

            <p className={styles.mission}>
              ReqVet automatise la rédaction de vos comptes-rendus pour
              <strong> vous faire gagner du temps</strong> et
              <strong> rentrer chez vous à l’heure</strong>, sans compromis sur
              la qualité médicale.
            </p>

            <p className={styles.subMission}>
              Projet issu d’une thèse vétérinaire, récompensé par le
              <strong> Prix Vet in Tech – Numanima 2025</strong>.<br/>Pensé par une vétérinaire, pour les vétérinaires.
            </p>

            {/* CTA */}
            <div className={styles.ctaBlock}>
              <div className={styles.ctaRow}>
                <a
                  href="https://app.reqvet.com/signup"
                  className={styles.cta}
                >
                  Démarrer l’essai gratuit
                </a>

                <button
                  className={styles.videoButton}
                  onClick={() => setIsVideoOpen(true)}
                >
                  <Play size={18} />
                  Voir la démo
                </button>
              </div>

              <p className={styles.ctaText}>
                <strong>14 jours gratuits</strong>
                <PawPrint size={15} />
                Sans carte bancaire
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= MODALE VIDÉO ================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className={styles.videoOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className={styles.videoModal}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setIsVideoOpen(false)}
              >
                <X size={22} />
              </button>

              <video
                src="/demo.mp4"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
