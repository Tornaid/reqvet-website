"use client";

import ScrollFadeIn from "./animations/ScrollFadeIn";
import Footer from "./Footer";
import NavBar from "./NavBar";
import styles from "./styles/AboutSection.module.scss";
import { Sparkles, HeartHandshake, Share2 } from "lucide-react";

// URLs validées
const THESIS_URL = "https://dumas.ccsd.cnrs.fr/dumas-04835590v1";
const VPT_URL = "https://veterinairespourtous.fr/presentation-et-historique/";

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      className={styles.section}
      aria-label="À propos de Reqvet"
    >
      <NavBar />

      {/* ————————————————— Qui sommes-nous ————————————————— */}
      <ScrollFadeIn>
        <div className={styles.mission}>
          <div className={styles.leftPart}>
            <h2>Qui sommes-nous&nbsp;?</h2>
          </div>
        </div>
      </ScrollFadeIn>

      {/* ————————————————— Équipe / avatars ————————————————— */}
      <ScrollFadeIn>
        <div className={styles.avatar} aria-label="L'équipe Reqvet">
          <div className={styles.avatarList}>
            <div className={styles.avatarSandra}>
              <img
                className={styles.avatarImg}
                src="/sandra.jpg"
                alt="Sandra — Cofondatrice et Vétérinaire"
                loading="lazy"
              />
              <p className={styles.name}>Sandra</p>
              <p className={styles.description}>
                Cofondatrice &amp; Vétérinaire
              </p>
            </div>

            <div className={styles.avatarSandra}>
              <img
                className={styles.avatarImg}
                src="/alex.jpg"
                alt="Alex — Cofondateur et Ingénieur"
                loading="lazy"
              />
              <p className={styles.name}>Alex</p>
              <p className={styles.description}>Cofondateur &amp; Ingénieur</p>
            </div>

            <div className={styles.avatarSandra}>
              <img
                className={styles.avatarImg}
                src="/requiem.jpg"
                alt="Requiem — Mascotte et Égérie"
                loading="lazy"
              />
              <p className={styles.name}>Requiem</p>
              <p className={styles.description}>Mascotte &amp; Égérie</p>
            </div>
          </div>
        </div>

        {/* ————————————————— Pour l'histoire ————————————————— */}
        <div className={styles.history}>
          <div className={styles.historyContainer}>
            <div className={styles.leftHistoryContainer}>
              <div className={styles.leftHistoryContent}>
                <h3>Pour l’histoire…</h3>
                <p>
                  Reqvet est né d’un constat fait par Sandra au fil de ses
                  stages et remplacements&nbsp;: la charge administrative des
                  comptes rendus pèse lourdement sur le quotidien des
                  vétérinaires. Elle a choisi d’en faire le sujet central de sa{" "}
                  <strong>thèse</strong>, en y consacrant un travail approfondi.
                </p>
                <br />
                <p>
                  Ce travail, consultable sur{" "}
                  <a href={THESIS_URL} target="_blank" rel="noreferrer">
                    ce lien
                  </a>
                  , a été récompensé par le{" "}
                  <strong>Prix de thèse VetInTech 2025</strong>, décerné par un
                  jury composé d’acteurs majeurs du secteur (Agria, VetoNetwork,
                  Royal Canin, Fovea, Alcyon et Chêne Vert). De cette base
                  solide est née une conviction&nbsp;: créer un outil pensé{" "}
                  <em>par</em> et <em>pour</em> les vétérinaires, qui allège
                  vraiment le quotidien.
                </p>
                <p>
                  C’est ainsi que l’aventure <strong>Reqvet</strong> a vu le
                  jour.
                </p>
              </div>
            </div>

            <div className={styles.rightHistoryContainer}>
              <img
                src="/vetintech.jpg"
                alt="Remise du prix VetInTech 2025"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ————————————————— Notre mission ————————————————— */}
        <div className={styles.goal}>
          <div className={styles.goalContainer}>
            <div className={styles.leftGoalContainer}>
              <img
                src="/mission.png"
                alt="Aperçu de l'assistant numérique Reqvet en action"
                loading="lazy"
              />
            </div>

            <div className={styles.rightGoalContainer}>
              <div className={styles.rightGoalContent}>
                <h3>Notre mission</h3>
                <p>
                  Offrir aux vétérinaires un assistant numérique qui
                  <br />
                  <strong>apaise</strong> plutôt qu’il n’ajoute,&nbsp;
                  <strong>simplifie</strong> plutôt qu’il ne surcharge,&nbsp; et{" "}
                  <strong>s’intègre</strong> plutôt qu’il ne s’impose.
                </p>
                <ul>
                  <li>
                    Automatiser la rédaction des comptes rendus de
                    consultations.
                  </li>
                  <li>Faire gagner de précieuses heures chaque semaine.</li>
                  <li>Réduire la fatigue cognitive et la charge mentale.</li>
                  <li>
                    Permettre de se concentrer sur l’essentiel&nbsp;: le soin et
                    le lien.
                  </li>
                  <li>
                    Préserver l’équilibre vie pro – vie perso, sans sacrifier le
                    suivi patient.
                  </li>
                </ul>
                
              </div>
            </div>
          </div>
        </div>

        {/* ————————————————— Nos valeurs (sans image) ————————————————— */}
        <div className={styles.reqvet}>
          <div className={styles.reqvetContainer}>
            <h2 className={styles.reqvetContainerTitle}>Nos valeurs</h2>

            <div className={styles.reqvetContainerList}>
              <div className={styles.reqvetContentLeft}>
                <h4 className={styles.valueTitle}>
                  <span className={styles.valueBadge}>
                    <Sparkles aria-hidden="true" />
                  </span>
                  Simplicité
                </h4>
                <p className={styles.reqvetContentLeftText}>
                  Le quotidien vétérinaire est déjà un marathon&nbsp;: urgences,
                  appels, suivis, paperasse… Alors Reqvet a été pensé pour{" "}
                  <em>s’effacer</em>. Une interface claire et une prise en main
                  en quelques minutes. Moins de clics, moins de friction, plus
                  de soin. L’outil s’adapte à vos habitudes, pas l’inverse.
                </p>

                <h4 className={styles.valueTitle}>
                  <span className={styles.valueBadge}>
                    <HeartHandshake aria-hidden="true" />
                  </span>
                  Humain
                </h4>
                <p className={styles.reqvetContentLeftText}>
                  Derrière chaque dossier, il y a une histoire, un animal, une
                  famille, un·e vétérinaire. Avec <strong>Reqvet</strong>, notre
                  mission est de réduire le poids des comptes-rendus et de la
                  charge administrative, pour rendre le quotidien plus serein et
                  préserver l’équilibre entre vie professionnelle et
                  personnelle. Parce qu’un·e vétérinaire plus disponible et plus
                  apaisé·e, c’est un soin de meilleure qualité pour chaque
                  animal. Et parce que l’accès aux soins compte pour tous, nous
                  reversons <strong>1&nbsp;€ par abonnement</strong> chaque mois
                  à{" "}
                  <a href={VPT_URL} target="_blank" rel="noreferrer">
                    Vétérinaires Pour Tous
                  </a>
                  , qui permet aux familles en difficulté de soigner leurs
                  animaux.
                </p>

                <h4 className={styles.valueTitle}>
                  <span className={styles.valueBadge}>
                    <Share2 aria-hidden="true" />
                  </span>
                  Partage
                </h4>
                <p className={styles.reqvetContentLeftText}>
                  Reqvet est né du terrain et évolue avec lui. Vos retours
                  deviennent des fonctionnalités, vos idées nourrissent notre
                  feuille de route, vos contraintes guident nos choix. On
                  construit ensemble un assistant qui vous ressemble&nbsp;:
                  utile, fiable, et profondément ancré dans la réalité du
                  métier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ————————————————— Pourquoi Reqvet ? (avec image à droite) ————————————————— */}
        <div className={`${styles.reqvet} ${styles.reqvetWhy}`}>
          <div className={styles.reqvetContainer}>
            <h2 className={styles.reqvetContainerTitle}>
              Pourquoi “Reqvet”&nbsp;?
            </h2>

            <div className={styles.reqvetContainerList}>
              <div className={styles.reqvetContentLeft}>
                <p className={styles.reqvetContentLeftText}>
                  Le nom <strong>Reqvet</strong> porte plusieurs sens.{" "}
                  <strong>“Req”</strong> fait écho à <em>record</em>, la
                  mémoire, la trace, l’assistance numérique, mais rend aussi
                  hommage à <strong>Requiem</strong>, notre chien qui a inspiré
                  le nom de ce projet.
                </p>
                <br />
                <p className={styles.reqvetContentLeftText}>
                  Ancien chien d’assistance éduqué par Sandra dans le cadre de
                  l’association Handi’Chiens, Requiem représente la fiabilité et
                  le soutien : être là quand la charge devient trop lourde,
                  alléger sans s’imposer, accompagner avec constance et
                  discrétion.
                </p>
                <br />
                <p className={styles.reqvetContentLeftText}>
                  C’est cet esprit que nous avons voulu insuffler à Reqvet : un
                  assistant pensé pour réellement soutenir les vétérinaires, au
                  bon moment.
                </p>
              </div>

              <div className={styles.reqvetContentRightImg}>
                <img
                  src="/handichien.jpg" // ← place ton image de Requiem ici
                  alt="Requiem, l’égérie qui a inspiré le nom de Reqvet"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      <Footer />
    </section>
  );
}
