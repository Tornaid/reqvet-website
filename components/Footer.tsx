"use client";

import styles from "./styles/Footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={styles.container}>
        {/* Colonne 1 : Logo + droits */}
        <div className={styles.col}>
          <div className={styles.logoGroup}>
            <Image
              src="/logo-reqvet.png"
              alt="Logo chien"
              width={50}
              height={50}
            />
            <Image
              src="/reqvet-text.png"
              alt="ReqVet"
              width={100}
              height={50}
            />
          </div>

          <p className={styles.legal}>© 2025 ReqVet - Tous droits réservés</p>
        </div>

        {/* Colonne 2 : Mentions */}
        <div className={styles.col}>
          <h4>Informations</h4>
          <ul>
            <li>
              <a
                href="/docs/Mentions_Légales_ReqVet.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mentions légales
              </a>
            </li>
            <li>
              <a
                href="/docs/CGV_ReqVet.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CGV
              </a>
            </li>
            <li>
              <a
                href="/docs/Politique_Confidentialité_ReqVet.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Politique de confidentialité
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Réseaux sociaux */}
        <div className={styles.col}>
          <h4>Réseaux</h4>
          <ul>
            {/* <li>
              <a href="https://linkedin.com/company/reqvet" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com/reqvet" target="_blank">
                Twitter
              </a>
            </li> */}
            <li>
              <a
                href="https://www.instagram.com/reqvet.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Contact */}
        <div className={styles.col}>
          <h4>Contact</h4>
          <p>
            <a href="mailto:contact@reqvet.com">contact@reqvet.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
