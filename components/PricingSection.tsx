"use client";

import ScrollFadeIn from "./animations/ScrollFadeIn";
import NavBar from "./NavBar";
import styles from "./styles/PricingSection.module.scss";
import { Mail, PawPrint } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="tarification" className={styles.section}>
      <NavBar />

      {/* ================= TITLE ================= */}
      <ScrollFadeIn>
        <div className={styles.title}>
          <h2>Tarification</h2>
          <p>
            Les 14 premiers jours offerts
            <PawPrint size={15} style={{ margin: "0 10px" }} />
            Accès complet sans restriction
          </p>
        </div>
      </ScrollFadeIn>

      {/* ================= PRICING CARDS ================= */}
      <ScrollFadeIn>
        <div className={styles.container}>
          {/* ===== OFFRE CLINICIENS ===== */}
          <div className={styles.standardOffer}>
            <h3>Offre Cliniciens – Offre Fondateurs</h3>

            <div className={styles.standardContent}>
              <div className={styles.priceBlock}>
                <div className={styles.priceBox}>
                  <p className={styles.price}>34,80 € TTC / mois</p>
                  <p className={styles.subPrice}>soit 29 € HT</p>
                </div>

                <div className={styles.textContent}>
                  <p>
                    <strong>14 jours d’essai gratuit</strong>, puis abonnement
                    mensuel sans engagement.
                  </p>
                  <p>
                    <em>Inscription immédiate, sans carte bancaire.</em>
                  </p>
                  <p>
                    <strong>Création multi-comptes en autonomie</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.pricingCta}>
              <a
                href="https://app.reqvet.com/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Tester ReqVet gratuitement</button>
              </a>
            </div>
          </div>

          {/* ===== OFFRE ÉTUDIANT ===== */}
          <div className={styles.studentOffer}>
            <h3>Offre Étudiant – Freemium</h3>

            <div className={styles.textContent}>
              <p>
                Offre réservée aux <strong>étudiants vétérinaires</strong>, sur
                présentation d’un justificatif valide.
              </p>

              <p>
                Accédez gratuitement à ReqVet pendant votre formation et préparez
                votre pratique future.
              </p>

              <p className={styles.subInfo}>
                <strong>20 comptes-rendus gratuits / mois</strong>
              </p>

              <p>
                En cas de <strong>stage, remplacement ou activité clinique</strong>,
                l’accès à la version complète peut être <strong>temporairement</strong> activé gratuitement
              </p>
            </div>

            <div className={styles.pricingCta}>
              <a href="https://reqvet.com/contact" rel="noopener noreferrer">
                <button className={styles.outline}>
                  Faire une demande
                </button>
              </a>
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      {/* ================= CLINIC OFFER ================= */}
      <ScrollFadeIn>
        <div className={styles.clinicOffer}>
          <h3 className={styles.clinicTitle}>
            Vous représentez une clinique ou une organisation ?
          </h3>

          <div className={styles.clinicContent}>
            <div className={styles.clinicText}>
              <p>
                Pour une commande multi-utilisateurs, bénéficiez d’une offre sur
                mesure avec facturation mensuelle, trimestrielle ou annuelle.
              </p>
              <p>
                Nous créons vos comptes utilisateurs à la demande, sans
                inscription en ligne.
              </p>
              <p>
                <strong>Testez ReqVet gratuitement avant de vous engager</strong>
                <PawPrint size={18} style={{ marginLeft: 8 }} />
              </p>
            </div>

            <div className={styles.clinicContact}>
              <p>
                <strong>Contact direct :</strong>
              </p>
              <p>
                <Mail size={18} style={{ marginRight: 8 }} />
                <a href="mailto:contact@reqvet.fr">contact@reqvet.fr</a>
              </p>
              {/* <p>
                <Phone size={18} style={{ marginRight: 8 }} />
                <a>+33(0)6 58 44 40 78</a>
              </p> */}
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
