"use client";

import styles from "./styles/DogbotSection.module.scss";
import Image from "next/image";
import { PawPrint } from "lucide-react";
import ScrollFadeIn from "./animations/ScrollFadeIn";

export default function DogbotSection() {
  return (
    <section id="dogbot" className={styles.section}>
      <ScrollFadeIn>
        <div className={styles.text}>
          <h2>
            Découvrez Dogbot <PawPrint size={30} />
          </h2>
          <p>
            Un assistant virtuel à votre disposition pour approfondir l’analyse
            de la consultation et son suivi en rédigeant pour vous des mails ou
            résumés à destination des propriétaires mais aussi de vos consoeurs
            et confrères.
          </p>
        </div>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <div className={styles.imageWrapper}>
          <Image
            src="/dogbot-demo.png" // à placer dans /public
            alt="Aperçu de Dogbot"
            width={1000}
            height={600}
          />
        </div>
      </ScrollFadeIn>
    </section>
  );
}
