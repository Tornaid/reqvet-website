'use client';

import styles from './styles/NavBar.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NavBar() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div className={styles.logo} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <Image src="/logo-reqvet-white.png" alt="ReqVet" width={130} height={40} />
      </motion.div>

      <motion.div
        className={styles.menu}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.4,
            },
          },
        }}
      >
        {['Outil', 'Dogbot', 'Tarification'].map((label, i) => (
          <motion.a
            key={label}
            href={`#${label.toLowerCase()}`}
            className={styles.link}
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            {label}
          </motion.a>
        ))}

        <motion.a
          href="https://app.reqvet.com"
          className={styles.button}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          Connexion
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}
