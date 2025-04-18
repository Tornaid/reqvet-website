"use client";

import styles from "@/components/styles/HowItWorks.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    image: "/htw1.png",
    alt: "Enregistrement",
    title: "Enregistrez votre consultation",
    description:
      "Depuis votre téléphone, tablette ou PC, démarrez l’enregistrement actif de la consultation, ou dictez simplement vos notes à l’oral. Générez le compte-rendu à la fin de l’enregistrement.",
    imageLeft: true,
  },
  {
    image: "/htw2.png",
    alt: "Consultation",
    title: "Votre compte-rendu en quelques minutes",
    description:
      "Vous pouvez le consulter, vérfier son contenu et le modifier à votre guise. Vous gardez le contrôle.",
    imageLeft: false,
  },
  {
    image: "/htw3.png",
    alt: "Partage",
    title: "Partagez le compte-rendu",
    description:
      "Une fois terminé, vous pouvez transférer le compte-rendu directement par email, le télécharger en PDF ou le copier en un clic pour le transférer vers votre logiciel de gestion.",
    imageLeft: true,
  },
];

export default function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Une automatisation en 3 étapes</h2>
      </div>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className={`${styles.stepBlock} ${
            step.imageLeft ? styles.left : styles.right
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.image}>
            <Image
              src={step.image}
              alt={step.alt}
              width={600}
              height={400}
              className={styles.stepImage}
            />
          </div>

          <div className={styles.text}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
