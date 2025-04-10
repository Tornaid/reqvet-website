"use client";
import styles from "@/components/styles/HowItWorks.module.scss";
import Image from "next/image";
import { useState } from "react";

const steps = [
  {
    title: "1. Renseignez les infos et sélectionnez un modèle",
    description:
      "Indiquez le nom de l’animal, du propriétaire et choisissez le modèle de compte-rendu souhaité.",
    image: "/htw1.png",
  },
  {
    title: "2. Démarrez votre consultation",
    description:
      "Démarrez l’enregistrement et conduisez votre consultation normalement, ou dictez vos remarques vocalement à mesure.",
    image: "/htw2.png",
  },
  {
    title: "3. Générez le compte-rendu en un clic",
    description:
      "Une fois la consultation terminée, cliquez pour obtenir un compte-rendu structuré en quelques minutes.",
    image: "/htw3.png",
  },
];

export default function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="outil" className={styles.section}>
      <div className={styles.text}>
        <h2>Comment ça marche ?</h2>
        <p>
          En enregistrant simplement vos consultations, notre outil se charge de
          la transcrire et de générer automatiquement un compte-rendu complet et
          structuré selon vos préférences, en quelques minutes.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={steps[activeIndex].image}
            alt={`Étape ${activeIndex + 1}`}
            width={500}
            height={500}
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}
