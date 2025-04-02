"use client";

import { useState } from "react";
import styles from "./styles/TemplatesSection.module.scss";

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
      I. Commémoratif 

      Description de l'animal :
      Nom, Espèce, Age, Râce, Sexe, Statut physilogique

      Raison de la visite : 
      
      Statut vaccinal : 

      Traitement anti-parasitaire
        - Interne (API) :
        - Externe (APE) : 
        ...

    II. Anamnèse 
    III. Examen Clinique
    ...
    

        `,
  },

  {
    id: "behavior",
    label: "Comportement",
    description: "Modèle consultation comportement",
    content: `
      I. Commémoratif 

      Description de l'animal :
      Nom, Espèce, Age, Râce, Sexe, Statut physilogique

      Motif de consultation :

      Attentes :

      Historique : 

      Mode de vie : 

      ...
      II. Examen Clinique 
      III. Examen Comportemental
      ...
        `,
  },
  {
    id: "ophthalmology",
    label: "Ophtalmologie",
    description: "Modèle consultation ophtalmologie",
    content: `
      Description de l'animal :
      Nom, Espèce, Age, Râce, Sexe, Statut physilogique

      OD
      - Taille et position du globe oculaire :
      - Réponse de clignement à la menace : 
      - Réponse de clignement à la lumière :
      - Réflexe pupillaire photomoteur direct : 
      - Réflexe pupillaire photomoteur indirect : 
      Annexe de l'oeil :
      - Appareil lacrymal :
        Test de Schirmer : (valeur en mm/min)
      ...

      OG
      - Taille et position du globe oculaire :
      - ...
        `,
  },
  {
    id: "custom",
    label: "Consultation personnalisée",
    description: "Créez vos propres modèles",
    content: `
  Créez un modèle 100 % sur mesure, adapté à vos besoins et à votre façon de travailler.
  
  Définissez vos propres sections (Commémoratif, Anamnèse, Examens complémentaires, etc.), indiquez vos préférences de rédaction, vos formulations ou vos points d'attention.
  
  L'outil s'ajustera automatiquement à votre spécialisation, votre quotidien et vos instructions pour générer un compte-rendu fidèle à votre pratique.
  
  C'est vous qui décidez de la structure et du ton : ReqVet s’adapte à vous, pas l’inverse.
    `
  }
  
];

export default function TemplatesSection() {
  const [selectedId, setSelectedId] = useState("general");
  const selected = templates.find((t) => t.id === selectedId);

  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h2>Une solution qui s’adapte à votre pratique</h2>
        <p> En clinique comme en visite à domicile, ReqVet vous accompagne partout grâce à son interface optimisée pour mobile. <br /> L’outil s’adapte à votre pratique et à vos spécialités grâce à des modèles de compte-rendus personnalisables. </p>
      </div>

      <div className={styles.container}>
        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <h3>{selected?.label}</h3>
          </div>
          <div className={styles.previewBody}>
            <pre>{selected?.content}</pre>
          </div>
        </div>

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
      </div>
    </section>
  );
}
