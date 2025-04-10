"use client";

import ScrollFadeIn from "./animations/ScrollFadeIn";
import styles from "./styles/PricingSection.module.scss";
import { Mail, PawPrint } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="tarification" className={styles.section}>
      <ScrollFadeIn>
        <div className={styles.title}>
          <h2>Tarification</h2>
          <p>
            ReqVet c’est une tarification unique, avec un accès illimité à
            toutes nos fonctionnalités
          </p>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className={styles.container}>
          <ul className={styles.features}>
            <li>Génération de vos comptes-rendus</li>
            <li>Option de régénération du CR</li>
            <li>DogBot</li>
            <li>Modèles personnalisés illimités</li>
          </ul>

          <div className={styles.priceBox}>
            <p className={styles.price}>24€ TTC/mois /utilisateur</p>
            <p className={styles.subPrice}>20€ HT (TVA 20% applicable)</p>
          </div>
        </div>

        <div className={styles.cta}>
          <p>Obtenez 10 CR gratuits pour tester ReqVet</p>
          <p>Inscription directe, sans CB</p>
          <a
            href="https://app.reqvet.com/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Tester ReqVet gratuitement</button>
          </a>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className={styles.clinicOffer}>
          <h3 className={styles.clinicTitle}>
            Vous représentez une clinique, une organisation ?
          </h3>

          <div className={styles.clinicContent}>
            <div className={styles.clinicText}>
              <p>
                Pour une commande multi-utilisateurs, bénéficiez d’une offre sur
                mesure avec facturation annuelle, trimestrielle ou mensuelle.
              </p>
              <p>
                Nous nous adaptons à vos besoins et créons vos comptes
                utilisateurs à la demande, sans inscription en ligne.
              </p>
              <p>
                Prenez le temps de tester ReqVet gratuitement avant de décider.
                <PawPrint size={18} style={{ marginLeft: "8px" }} />
              </p>
            </div>

            <div className={styles.clinicContact}>
              <p>
                <strong>Contact direct :</strong>
              </p>
              <p>
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  style={{ marginRight: "8px" }}
                />
                <a href="mailto:contact@reqvet.com">contact@reqvet.com</a>
              </p>

              <p>
                <strong>Réserver un appel :</strong>
                <br />
                Un échange de 30 min pour vous présenter ReqVet, répondre à vos
                questions et imaginer ensemble une nouvelle façon de pratiquer
                avec notre outil.
              </p>

              <a
                href="https://calendly.com/contact-reqvet/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.secondTrialButton}>
                  Réserver un rendez-vous
                </button>
              </a>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
