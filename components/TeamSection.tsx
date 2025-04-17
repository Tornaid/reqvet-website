'use client';

import styles from './styles/team.module.scss';
import Image from 'next/image';
import ScrollFadeIn from './animations/ScrollFadeIn';
import NavBar from './NavBar';

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <NavBar />

      <ScrollFadeIn>
        <h2 className={styles.title}>A propos de nous</h2>

        <div className={styles.story}>
          <p>
            <strong>Tout a commencé avec Requiem.</strong><br />
            Labrador câlin et paisible, Requiem nous a accompagnés dans toutes les phases de notre vie professionnelle : les nuits d’astreinte, les journées de développement intensif… et surtout les moments où il fallait souffler un peu.
          </p>

          <div className={styles.cardCenter}>
            <Image
              src="/requiem.png"
              alt="Requiem qui dort"
              width={400}
              height={300}
              className={styles.image}
            />
            <div className={styles.text}>
              <h3>Requiem - Mascotte officielle</h3>
              <p>Consultant sieste</p>
            </div>
          </div>

          <p>
            <strong>
              Requiem a été la source d’un constat simple :
            </strong> nos journées étaient trop remplies pour faire correctement tout ce qui n’était pas clinique. Les comptes-rendus s’accumulaient. Le stress aussi.
          </p>

          <div className={styles.cardRow}>
            <div className={styles.card}>
              <Image
                src="/alex.png"
                alt="Alex et son chien"
                width={400}
                height={300}
                className={styles.image}
              />
              <div className={styles.text}>
                <h3>Alex - Cofondateur</h3>
                <p>Ingénieur Machine Learning (IA)</p>
              </div>
            </div>

            <div className={styles.card}>
              <Image
                src="/sandra.png"
                alt="Sandra et son chien"
                width={400}
                height={300}
                className={styles.image}
              />
              <div className={styles.text}>
                <h3>Sandra - Cofondatrice</h3>
                <p>Docteur Vétérinaire</p>
              </div>
            </div>
          </div>

          <p>
            Nous, c’est un ingénieur en intelligence artificielle et une docteure vétérinaire, un duo formé dans la vie comme dans l’aventure entrepreneuriale.  
            On s’est dit qu’il fallait créer un outil différent.  
            Pas une usine à gaz. Pas un logiciel de plus.  
            <br />
            <strong>Un vrai compagnon du quotidien, comme Requiem.</strong><br />
            C’est ainsi qu’est né ReqVet — un clin d’œil à notre mascotte et une promesse :  
            <br />
            <em>“Vous soignez, vous parlez, on rédige.”</em>
          </p>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
