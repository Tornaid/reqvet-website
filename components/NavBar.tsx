'use client';

import styles from './styles/NavBar.module.scss';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image src="/logo-reqvet-white.png" alt="ReqVet" width={130} height={40} />
      </div>

      <div className={styles.menu}>
        <a href="#outil" className={styles.link}>Outil</a>
        <a href="#dogbot" className={styles.link}>Dogbot</a>
        <a href="#tarification" className={styles.link}>Tarification</a>

        <a href="https://app.reqvet.com" className={styles.button}>
          Application
        </a>
      </div>
    </nav>
  );
}
