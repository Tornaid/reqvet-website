"use client";
import styles from "@/components/styles/HowItWorks.module.scss";
import Image from "next/image";

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2>Comment ça marche ?</h2>
        <p>
          En enregistrant simplement vos consultations, notre outil se charge de
          la transcrire et de générer automatiquement un compte-rendu complet et
          structuré selon vos préférences, en quelques minutes.
        </p>
      </div>

      <div className={styles.cardsWrapper}>
        <div className={styles.card}>
          <Image
            src="/htw1.png"
            alt="Étape 1"
            width={500}
            height={500}
            quality={100}
          />
          <div className={styles.overlay}>
            <span>1. Renseignez les infos et sélectionnez un modèle</span>
          </div>
        </div>

        <div className={styles.card}>
          <Image
            src="/htw2.png"
            alt="Étape 2"
            width={500}
            height={500}
            quality={100}
          />
          <div className={styles.overlay}>
            <span>2. Démarrez votre consultation sans prendre de note</span>
          </div>
        </div>

        <div className={styles.card}>
          <Image
            src="/htw3.png"
            alt="Étape 3"
            width={500}
            height={500}
            quality={100}
          />
          <div className={styles.overlay}>
            <span>3. Générez le compte-rendu en un clic, en quelques minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}
