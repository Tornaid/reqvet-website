"use client";

import styles from "./styles/NavBar.module.scss";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* =====================
          LOGO – GAUCHE
      ===================== */}
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo-reqvet-white.png"
              alt="ReqVet"
              width={130}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* =====================
          MENU – CENTRE
      ===================== */}
        <div className={styles.navCenter}>
          <Link href="/a-propos" className={styles.link}>
            Qui sommes-nous ?
          </Link>
          <Link href="/tarif" className={styles.link}>
            Tarif
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </div>

        {/* =====================
          CTA – DROITE
      ===================== */}
        <div className={styles.navRight}>
          <a href="https://app.reqvet.com" className={styles.button}>
            Connexion
          </a>

          {/* Burger icon (mobile only) */}
          <button
            className={styles.burger}
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu />
          </button>
        </div>
      </motion.nav>

      {/* =====================
        SIDEBAR MOBILE
    ===================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={styles.sidebar}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le menu"
            >
              <X />
            </button>

            <Link
              href="/a-propos"
              className={styles.sidebarLink}
              onClick={() => setIsOpen(false)}
            >
              Qui sommes-nous ?
            </Link>

            <Link
              href="/tarif"
              className={styles.sidebarLink}
              onClick={() => setIsOpen(false)}
            >
              Tarif
            </Link>

            <Link
              href="/contact"
              className={styles.sidebarLink}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <a
              href="https://app.reqvet.com"
              className={styles.sidebarButton}
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
