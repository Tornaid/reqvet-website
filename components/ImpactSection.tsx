'use client';

import styles from './styles/ImpactSection.module.scss';
import {
  Stethoscope,
  Smile,
  HeartPulse,
  ClipboardCheck,
  Users,
  Wallet,
} from 'lucide-react';
import ScrollFadeIn from './animations/ScrollFadeIn';

const impacts = [
  {
    icon: <Stethoscope size={32} />,
    title: 'Efficacité clinique boostée',
    description: "Economiser significativement du temps de documentation grâce à l'automatisation de vos comptes-rendus.",
  },
  {
    icon: <Smile size={32} />,
    title: 'Des vétérinaires plus sereins',
    description: 'Moins de paperasse, plus de temps pour le soin et les échanges avec les clients.',
  },
  {
    icon: <HeartPulse size={32} />,
    title: 'Équilibre pro / perso amélioré',
    description: 'Les comptes-rendus sont prêts dès la fin de la consultation. Pas besoin de rester tard.',
  },
  {
    icon: <ClipboardCheck size={32} />,
    title: 'CR précis et complets',
    description: 'Des comptes-rendus clairs, cohérents et toujours adapté à votre pratique et aux standards médicaux.',
  },
  {
    icon: <Users size={32} />,
    title: 'Meilleure relation client',
    description: 'Soyez pleinement présent et offrez à vos clients une écoute active sans devoir noter chaque détail durant la consultation.',
  },
  {
    icon: <Wallet size={32} />,
    title: 'Accessible à tous',
    description: 'La solution la plus complète et abordable pour tous les praticiens.',
  },
];

export default function ImpactSection() {
  return (
    <section className={styles.impactSection}>
      <ScrollFadeIn>
        <h2>Sentez la différence dès le premier jour </h2>
      </ScrollFadeIn>

      <div className={styles.grid}>
        {impacts.map((item, i) => (
          <ScrollFadeIn key={i}>
            <div className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}
