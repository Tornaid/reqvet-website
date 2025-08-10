"use client";

import ScrollFadeIn from "./animations/ScrollFadeIn";
import NavBar from "./NavBar";
import styles from "./styles/PricingSection.module.scss";
import { Mail, PawPrint } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="tarification" className={styles.section}>
      <NavBar />
      <ScrollFadeIn>
        <div className={styles.title}>
          <h2>Tarification</h2>
          <p>
            Les 10 premiers CR gratuits
            <PawPrint size={15} style={{ marginLeft: 10, marginRight: 10 }} />
            Accès complet sans restrictions
          </p>
          <a
            href="https://app.reqvet.com/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.ctaButton}>
              Tester ReqVet gratuitement
            </button>
          </a>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className={styles.container}>
          {/* Colonne de gauche : offre standard */}
          <div className={styles.standardOffer}>
            <h3>Offre Cliniciens - Offre de lancement !</h3>

            <div className={styles.standardContent}>
              {/* Colonne gauche : fonctionnalités */}
              {/* <ul className={styles.features}>
                <li>Génération de vos comptes-rendus</li>
                <li>Option de régénération du CR</li>
                <li>DogBot</li>
                <li>Modèles personnalisés illimités</li>
              </ul> */}

              {/* Colonne droite : prix + bouton */}
              <div className={styles.priceBlock}>
                <div className={styles.priceBox}>
                  <p className={styles.oldPrice}>
                    <s>44,40€ TTC</s>
                  </p>
                  <p className={styles.price}>34,80€ TTC / mois*</p>
                  <p className={styles.subPrice}>29€ HT</p>
                </div>

                <div className={styles.cta}>
                  <p>
                    * Sur une période de <strong>6 mois</strong>, pour toute souscription
                    antérieure au 30/11/2025. Passé ce délai, le tarif standard
                    de 44,40€ TTC / mois s’appliquera automatiquement.
                  </p>
                  <br />
                  <p>
                    Obtenez 10 CR gratuits pour tester Reqvet, vous pourrez
                    souscrire par la suite.
                  </p>
                  <p>
                    <em>Inscription immédiate, sans CB requise.</em>
                  </p>
                  <a
                    href="https://app.reqvet.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.ctaButton}>
                      Tester ReqVet gratuitement
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite : offre étudiant */}
          {/* <div className={styles.studentOffer}>
            <h3>Offre Etudiants / Internes</h3>
            <p>
              Vous êtes étudiant ou interne en santé animale ? <br />
              Bénéficiez de 20 CR gratuits / mois pendant toute la durée de
              votre formation.
            </p>
            <p className={styles.studentPrice}>0 € / mois</p>
            <p className={styles.subInfo}>Accès complet</p>

            <a
              href="https://reqvet.com/contact"
              rel="noopener noreferrer"
            >
              <button className={styles.ctaButton}>
                Faire une demande
              </button>
            </a>
          </div> */}
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
                <a href="mailto:contact@reqvet.fr">contact@reqvet.fr</a>
              </p>

              {/* <p>
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
                <button className={styles.ctaButton}>
                  Réserver un rendez-vous
                </button>
              </a> */}
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
