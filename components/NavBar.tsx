'use client';

import styles from './styles/NavBar.module.scss';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        className={styles.nav}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo-reqvet-white.png" alt="ReqVet" width={130} height={40} />
          </Link>
        </div>

        <div className={styles.menu}>
          {/* Menu desktop */}
          <div className={styles.links}>
            <Link href="/tarif" className={styles.link}>Tarif</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <a href="https://app.reqvet.com" className={styles.button}>Connexion</a>
          </div>

          {/* Burger icon (mobile only) */}
          <button className={styles.burger} onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
        </div>
      </motion.nav>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button className={styles.close} onClick={() => setIsOpen(false)}>
              <X />
            </button>
            <Link href="/tarif" className={styles.sidebarLink} onClick={() => setIsOpen(false)}>Tarif</Link>
            <Link href="/contact" className={styles.sidebarLink} onClick={() => setIsOpen(false)}>Contact</Link>
            <a href="https://app.reqvet.com" className={styles.sidebarButton} onClick={() => setIsOpen(false)}>Connexion</a>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
