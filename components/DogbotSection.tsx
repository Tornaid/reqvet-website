"use client";

import styles from "./styles/DogbotSection.module.scss";
import { PawPrint, Mail, FileText, Search } from "lucide-react";
import ScrollFadeIn from "./animations/ScrollFadeIn";

export default function DogbotSection() {
  return (
    <section id="dogbot" className={styles.section}>
      {/* ===== Titre ===== */}
      <ScrollFadeIn>
        <h2 className={styles.title}>
          Découvrez Dogbot <PawPrint size={28} />
        </h2>
      </ScrollFadeIn>

      {/* ===== Contenu principal ===== */}
      <div className={styles.content}>
        {/* Vidéo */}
        <ScrollFadeIn>
          <div className={styles.mediaWrapper}>
            <video
              className={styles.video}
              src="/Dogbot.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </ScrollFadeIn>

        {/* Texte + liste */}
        <ScrollFadeIn>
          <div className={styles.textBlock}>
            <p className={styles.subtitle}>
              Dogbot est votre assistant intelligent pour exploiter pleinement
              les informations de la consultation et faciliter la communication
              médicale au quotidien.
            </p>

            <ul className={styles.features}>
              <li>
                <Mail size={18} />
                Rédaction de mails ou courriers de référé à destination de vos
                consœurs et confrères
              </li>

              <li>
                <FileText size={18} />
                Synthèse claire et simplifiée du compte-rendu pour les
                propriétaires
              </li>

              <li>
                <Search size={18} />
                Approfondissement et clarification de notions médicales
                évoquées en consultation
              </li>

              <li className={styles.more}>
                …et bien plus à venir.
              </li>
            </ul>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
