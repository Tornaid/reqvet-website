// components/animations/ScrollFadeIn.tsx
"use client";

import { motion, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
  once?: boolean;         // n’animer qu’une fois
  delay?: number;         // délai optionnel
  className?: string;     // classe CSS optionnelle
  threshold?: number | number[];
};

export default function ScrollFadeIn({
  children,
  once = true,
  delay = 0,
  className = "",
  threshold = 0.1,
}: Props) {
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: "0px 0px -10% 0px",
    fallbackInView: true, // visible si l'IO n'est pas dispo/fiable
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set("visible"); // pas d’anim
      return;
    }
    if (inView) controls.start("visible");
  }, [controls, inView, prefersReducedMotion]);

  // ✅ Toujours définir hidden & visible → plus de problème de type
  const variants: Variants = prefersReducedMotion
    ? {
        hidden:  { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden:  { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay },
        },
      };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
