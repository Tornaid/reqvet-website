"use client";

import ScrollFadeIn from "./animations/ScrollFadeIn";
import Footer from "./Footer";
import NavBar from "./NavBar";
import styles from "./styles/AboutSection.module.scss";
import Image from "next/image";
import { Sparkles, HeartHandshake, Share2 } from "lucide-react";

// URLs validées
const THESIS_URL = "https://dumas.ccsd.cnrs.fr/dumas-04835590v1";
const VPT_URL = "https://veterinairespourtous.fr/presentation-et-historique/";

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      className={styles.section}
      aria-label="À propos de Reqvet — assistant d’automatisation de comptes rendus vétérinaires"
    >
      <NavBar />

      {/* ————————————————— Qui sommes-nous ————————————————— */}
      <ScrollFadeIn>
        <div className={styles.mission}>
          <div className={styles.leftPart}>
            <h2>L&rsquo;équipe Reqvet</h2>
          </div>
        </div>
      </ScrollFadeIn>

      {/* ————————————————— Équipe / avatars ————————————————— */}
      <ScrollFadeIn>
        <div className={styles.avatar} aria-label="L&rsquo;équipe fondatrice de Reqvet">
          <div className={styles.avatarList}>
            <div className={styles.avatarSandra}>
              <Image
                className={styles.avatarImg}
                src="/sandra.jpg"
                alt="Sandra — Cofondatrice, vétérinaire et autrice d’une thèse sur l’automatisation des comptes rendus vétérinaires"
                width={220}
                height={220}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
                priority
              />
              <p className={styles.name}>Sandra</p>
              <p className={styles.description}>Cofondatrice &amp; Vétérinaire</p>
            </div>

            <div className={styles.avatarSandra}>
              <Image
                className={styles.avatarImg}
                src="/alex.jpg"
                alt="Alex — Cofondateur, ingénieur logiciel IA pour les cliniques et vétérinaires itinérants"
                width={220}
                height={220}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
              />
              <p className={styles.name}>Alex</p>
              <p className={styles.description}>Cofondateur &amp; Ingénieur</p>
            </div>

            <div className={styles.avatarSandra}>
              <Image
                className={styles.avatarImg}
                src="/requiem.jpg"
                alt="Requiem — Mascotte et égérie de Reqvet, symbole de fiabilité et d’assistance"
                width={220}
                height={220}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 220px"
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
                <h3>Notre histoire</h3>
                <p>
                  <strong>Reqvet</strong> est né d’un constat de terrain&nbsp;:
                  la rédaction des <strong>comptes rendus de consultation</strong> et la paperasse
                  pèsent lourdement sur le quotidien des vétérinaires — en
                  clinique, en itinérance et en référé. Au fil de ses stages et
                  remplacements, <strong>Sandra</strong> a mesuré l’ampleur de
                  cette charge et en a fait le sujet central de sa{" "}
                  <strong>thèse</strong>, avec une analyse approfondie des besoins
                  métiers et des pistes d’<em>automatisation</em>.
                </p>
                <br />
                <p>
                  Ce travail, consultable{" "}
                  <a href={THESIS_URL} target="_blank" rel="noreferrer">
                    ici
                  </a>
                  , a reçu le <strong>Prix de thèse VetInTech 2025</strong> (Agria,
                  VetoNetwork, Royal Canin, Fovea, Alcyon, Chêne Vert). À partir
                  de cette base robuste est née une conviction claire&nbsp;: créer un
                  <strong> assistant numérique</strong> pensé <em>par</em> et <em>pour</em> les
                  vétérinaires, qui <strong>automatise la rédaction</strong> et
                  <strong> s’intègre</strong> naturellement au flux de travail.
                </p>
                <p>C’est ainsi qu’a démarré l’aventure <strong>Reqvet</strong>.</p>
              </div>
            </div>

            <div className={styles.rightHistoryContainer}>
              <Image
                src="/vetintech.jpg"
                alt="Remise du Prix de thèse VetInTech 2025 pour les travaux à l’origine de Reqvet"
                width={700}
                height={468}
                sizes="(max-width:1024px) 100vw, 700px"
              />
            </div>
          </div>
        </div>

        {/* ————————————————— Notre mission ————————————————— */}
        <div className={styles.goal}>
          <div className={styles.goalContainer}>
            <div className={styles.leftGoalContainer}>
              <Image
                src="/mission.jpg"
                alt="Assistant numérique Reqvet générant automatiquement un compte rendu de consultation vétérinaire"
                width={700}
                height={500}
                sizes="(max-width:1024px) 100vw, 700px"
              />
            </div>

            <div className={styles.rightGoalContainer}>
              <div className={styles.rightGoalContent}>
                <h3>Notre mission</h3>
                <p>
                  Offrir aux vétérinaires un <strong>outil d’automatisation
                  des comptes rendus</strong> qui{" "}
                  <strong>apaise</strong> plutôt qu’il n’ajoute,&nbsp;
                  <strong>simplifie</strong> plutôt qu’il ne surcharge,&nbsp; et{" "}
                  <strong>s’intègre</strong> plutôt qu’il ne s’impose.
                </p>
                <ul>
                  <li>
                    <strong>Automatiser</strong> la rédaction des comptes rendus
                    de consultations (canine, féline, NAC, rurale, équine...).
                  </li>
                  <li>
                    <strong>Gagner de précieuses heures</strong> chaque semaine.
                  </li>
                  <li>
                    <strong>Réduire</strong> la fatigue cognitive et la charge
                    administrative.
                  </li>
                  <li>
                    <strong>Recentrer</strong> le temps médical sur l’essentiel&nbsp;:
                    le soin, l’examen clinique et le lien avec l&rsquo;animal et son propriétaire.
                  </li>
                  <li>
                    <strong>Préserver</strong> l’équilibre vie pro – vie perso
                    sans compromettre le <em>suivi patient</em>.
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
                  appels, suivis, dossiers. <strong>Reqvet</strong> a été conçu
                  pour <em>s’effacer</em>&nbsp;: une interface claire, une prise
                  en main en quelques minutes et des <strong>comptes rendus
                  générés automatiquement</strong>. Moins de clics, moins de
                  friction, plus de soin. L’outil s’adapte à vos habitudes,
                  en <strong>clinique vétérinaire</strong> comme en{" "}
                  <strong>itinérance</strong>.
                </p>

                <h4 className={styles.valueTitle}>
                  <span className={styles.valueBadge}>
                    <HeartHandshake aria-hidden="true" />
                  </span>
                  Humain
                </h4>
                <p className={styles.reqvetContentLeftText}>
                  Derrière chaque dossier, il y a une histoire, un animal, une
                  famille, un·e vétérinaire. Avec <strong>Reqvet</strong>, nous
                  allégeons la charge des comptes rendus et de
                  l’administratif pour rendre le quotidien plus serein et
                  <strong> améliorer la qualité de prise en charge</strong>.
                  Parce que l’accès aux soins compte pour tous, nous reversons{" "}
                  <strong>1&nbsp;€ par abonnement</strong> chaque mois à{" "}
                  <a href={VPT_URL} target="_blank" rel="noreferrer">
                    Vétérinaires Pour Tous
                  </a>
                  , afin d’aider les familles en difficulté à soigner leurs
                  animaux.
                </p>

                <h4 className={styles.valueTitle}>
                  <span className={styles.valueBadge}>
                    <Share2 aria-hidden="true" />
                  </span>
                  Partage
                </h4>
                <p className={styles.reqvetContentLeftText}>
                  <strong>Reqvet</strong> évolue avec le terrain. Vos retours
                  deviennent des fonctionnalités, vos idées nourrissent la
                  feuille de route, vos contraintes guident nos choix. Parce que
                  l’échange est au cœur de notre démarche, nous valorisons chaque
                  retour et en faisons un levier d’amélioration continue au
                  service du métier. Ensemble, nous construisons un assistant{" "}
                  <strong>utile, fiable</strong> et <strong>accessible à tous</strong>.
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
                  <strong>“Req”</strong> fait écho à <em>record</em> (la trace
                  et la mémoire clinique), à l’<em>assistance numérique</em> et
                  rend hommage à <strong>Requiem</strong>, le chien qui a
                  inspiré ce projet dédié aux <strong>comptes rendus
                  vétérinaires</strong>.
                </p>
                <br />
                <p className={styles.reqvetContentLeftText}>
                  Ancien chien d’assistance éduqué par Sandra avec
                  Handi’Chiens, Requiem incarne la fiabilité et le soutien&nbsp;:
                  être présent quand la charge devient lourde, alléger sans
                  s’imposer, accompagner avec constance et discrétion.
                </p>
                <br />
                <p className={styles.reqvetContentLeftText}>
                  C’est cet esprit que nous insufflons à <strong>Reqvet</strong>&nbsp;:
                  un assistant pensé pour <strong>faciliter le quotidien des
                  vétérinaires</strong>, en clinique généraliste et en déplacement.
                </p>
              </div>

              <div className={styles.reqvetContentRightImg}>
                <Image
                  src="/requiem-pose.jpg"
                  alt="Requiem, l’égérie à l’origine du nom Reqvet, symbole d’assistance fiable"
                  width={700}
                  height={468}
                  sizes="(max-width:1024px) 100vw, 700px"
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
