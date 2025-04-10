"use client";

import { useState } from "react";
import styles from "./styles/TemplatesSection.module.scss";
import ScrollFadeIn from "./animations/ScrollFadeIn";

type Template = {
  id: string;
  label: string;
  description: string;
  content: string;
};

const templates: Template[] = [
  {
    id: "general",
    label: "Consultation Générale",
    description: "Modèle consultation générale",
    content: `
  <h4>I. Commémoratif</h4>
  <p><strong>Description de l'animal :</strong><br/>
  Nom, Espèce, Âge, Race, Sexe, Statut physiologique</p>

  <p><strong>Raison de la visite :</strong>
  …</p>

  <p><strong>Statut vaccinal :</strong>
  …</p>

  <p><strong>Traitement anti-parasitaire :</strong><br/>
  - Interne (API)<br/>
  - Externe (APE)</p>

  <h4>II. Anamnèse</h4>
  <p>…</p>

  <h4>III. Examen Clinique</h4>
  <p>…</p>
`,
  },

  {
    id: "behavior",
    label: "Comportement",
    description: "Modèle consultation comportement",
    content: `
  <h4>I. Commémoratif</h4>
  <p><strong>Description de l'animal :</strong><br/>
  Nom, Espèce, Âge, Race, Sexe, Statut physiologique</p>

  <p><strong>Motif de consultation :</strong>
  …</p>

  <p><strong>Attentes :</strong>
  …</p>

  <p><strong>Historique :</strong>
  …</p>

  <p><strong>Mode de vie :</strong>
  …</p>

  <h4>II. Examen Clinique</h4>
  <p>…</p>

  <h4>III. Examen Comportemental</h4>
  <p>…</p>
`,
  },
  {
    id: "ophthalmology",
    label: "Ophtalmologie",
    description: "Modèle consultation ophtalmologie",
    content: `
  <p><strong>Description de l'animal :</strong><br/>
  Nom, Espèce, Âge, Race, Sexe, Statut physiologique</p>

  <h4>OD</h4>
  <ul>
    <li>Taille et position du globe oculaire :</li>
    <li>Réponse de clignement à la menace :</li>

    <li>…</li>
  
    <strong>Annexes de l'œil :</strong></li>
    <li>Appareil lacrymal :</li>
    <li>Test de Schirmer : (valeur en mm/min)</li>
    <li>…</li>
  </ul>

  <h4>OG</h4>
  <ul>
    <li>Taille et position du globe oculaire :</li>
    <li>…</li>
  </ul>
`,
  },
  {
    id: "custom",
    label: "Consultation personnalisée",
    description: "Créez vos propres modèles",
    content: `
  <p>Créez un modèle <strong>100 % sur mesure</strong>, adapté à vos besoins et à votre façon de travailler.</p>

  <p>Définissez vos propres sections (<em>Commémoratif, Anamnèse, Examens complémentaires…</em>), indiquez vos préférences de rédaction, vos formulations ou vos points d'attention.</p>

  <p>L'outil s'ajustera automatiquement à <strong>votre spécialisation</strong>, votre quotidien et vos instructions pour générer un compte-rendu fidèle à votre pratique.</p>

  <p><strong>C'est vous qui décidez de la structure et du ton :</strong><br/>
  ReqVet s’adapte à vous, pas l’inverse.</p>
`,
  },
];

export default function TemplatesSection() {
  const [selectedId, setSelectedId] = useState("general");
  const selected = templates.find((t) => t.id === selectedId);

  return (
    <section className={styles.section}>
      <ScrollFadeIn>
        <div className={styles.text}>
          <h2>Une solution qui s’adapte à votre pratique</h2>
          <p>
            En clinique comme en visite à domicile, ReqVet vous accompagne
            partout grâce à son interface optimisée pour mobile. <br />
            L’outil s’adapte à votre pratique et à vos spécialités grâce à des
            modèles de compte-rendus personnalisables.
          </p>
        </div>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className={styles.contentTemp}>
          <div className={styles.cardsWrapper}>
            <div className={styles.cards}>
              {templates.slice(0, 3).map((template) => (
                <div
                  key={template.id}
                  className={`${styles.card} ${
                    selectedId === template.id ? styles.active : ""
                  }`}
                  onClick={() => setSelectedId(template.id)}
                >
                  <strong>{template.label}</strong>
                  <span>{template.description}</span>
                </div>
              ))}
            </div>

            <h3>...</h3>

            <div className={styles.customBlock}>
              <h3>Ou bien créez vos propres modèles</h3>
              <div
                className={`${styles.card} ${
                  selectedId === "custom" ? styles.active : ""
                }`}
                onClick={() => setSelectedId("custom")}
              >
                <strong>Consultation personnalisée</strong>
                <span>Créez vos propres modèles</span>
              </div>
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <h3>{selected?.label}</h3>
            </div>
            <div className={styles.previewBody}>
              <div
                className={styles.previewContent}
                dangerouslySetInnerHTML={{ __html: selected?.content || "" }}
              />
            </div>
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
