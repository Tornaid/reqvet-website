'use client';

import { useState, useCallback } from 'react';
import styles from './SdkPage.module.scss';

// ─── Types ─────────────────────────────────────────────────────

type Lang = 'ts' | 'js';

// ─── Code snippets ─────────────────────────────────────────────

const SNIPPETS = {
  install: {
    ts: `npm install @reqvet-sdk/sdk`,
    js: `npm install @reqvet-sdk/sdk`,
  },
  init: {
    ts: `import ReqVet from '@reqvet-sdk/sdk';

const reqvet = new ReqVet(process.env.REQVET_API_KEY!, {
  baseUrl: process.env.REQVET_BASE_URL,
});`,
    js: `import ReqVet from '@reqvet-sdk/sdk';

const reqvet = new ReqVet(process.env.REQVET_API_KEY, {
  baseUrl: process.env.REQVET_BASE_URL,
});`,
  },
  templates: {
    ts: `const { system, custom } = await reqvet.listTemplates();
// system = templates ReqVet, visibles par tous (lecture seule)
// custom = templates de votre organisation

const templateId = system[0].id;`,
    js: `const { system, custom } = await reqvet.listTemplates();
// system = templates ReqVet, visibles par tous (lecture seule)
// custom = templates de votre organisation

const templateId = system[0].id;`,
  },
  upload: {
    ts: `const upload = await reqvet.uploadAudio(audioFile, 'consultation.mp3');
// { path: 'orgs/xxx/audio/yyy.mp3', size_bytes: 2048000 }`,
    js: `const upload = await reqvet.uploadAudio(audioFile, 'consultation.mp3');
// { path: 'orgs/xxx/audio/yyy.mp3', size_bytes: 2048000 }`,
  },
  createJob: {
    ts: `const job = await reqvet.createJob({
  audioFile: upload.path,
  animalName: 'Luna',
  templateId,
  callbackUrl: 'https://votre-app.com/api/reqvet/webhook',
  metadata: { consultationId: 'CONSULT-001' },
});
// { job_id: 'a1b2c3...', status: 'pending' }`,
    js: `const job = await reqvet.createJob({
  audioFile: upload.path,
  animalName: 'Luna',
  templateId,
  callbackUrl: 'https://votre-app.com/api/reqvet/webhook',
  metadata: { consultationId: 'CONSULT-001' },
});
// { job_id: 'a1b2c3...', status: 'pending' }`,
  },
  webhook: {
    ts: `// app/api/reqvet/webhook/route.ts
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req: Request) {
  const rawBody = await req.text();

  const { ok } = verifyWebhookSignature({
    secret: process.env.REQVET_WEBHOOK_SECRET!,
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp: req.headers.get('x-reqvet-timestamp') ?? '',
  });

  if (!ok) return new Response('Unauthorized', { status: 401 });

  const event = JSON.parse(rawBody);

  if (event.event === 'job.completed') {
    // event.html      → compte-rendu HTML
    // event.fields    → champs structurés extraits
    // event.metadata  → vos données passthrough
    await saveReport(event.job_id, event.html, event.fields);
  }

  return new Response('OK');
}`,
    js: `// app/api/reqvet/webhook/route.js
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req) {
  const rawBody = await req.text();

  const { ok } = verifyWebhookSignature({
    secret: process.env.REQVET_WEBHOOK_SECRET,
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp: req.headers.get('x-reqvet-timestamp') ?? '',
  });

  if (!ok) return new Response('Unauthorized', { status: 401 });

  const event = JSON.parse(rawBody);

  if (event.event === 'job.completed') {
    // event.html      → compte-rendu HTML
    // event.fields    → champs structurés extraits
    // event.metadata  → vos données passthrough
    await saveReport(event.job_id, event.html, event.fields);
  }

  return new Response('OK');
}`,
  },
  polling: {
    ts: `// Alternative sans webhook — mode polling
const report = await reqvet.generateReport({
  audio: audioFile,
  animalName: 'Luna',
  templateId,
  waitForResult: true,
  onStatus: (s) => console.log(s), // 'transcribing' → 'generating' → 'completed'
});

console.log(report.html);    // compte-rendu HTML
console.log(report.fields);  // champs structurés
console.log(report.cost);    // { transcription_usd, generation_usd, total_usd }`,
    js: `// Alternative sans webhook — mode polling
const report = await reqvet.generateReport({
  audio: audioFile,
  animalName: 'Luna',
  templateId,
  waitForResult: true,
  onStatus: (s) => console.log(s), // 'transcribing' → 'generating' → 'completed'
});

console.log(report.html);    // compte-rendu HTML
console.log(report.fields);  // champs structurés
console.log(report.cost);    // { transcription_usd, generation_usd, total_usd }`,
  },
  reformulate: {
    ts: `// Reformuler pour le propriétaire de l'animal
const ownerVersion = await reqvet.reformulateReport(jobId, {
  purpose: 'owner', // 'owner' | 'referral' | 'summary' | 'custom'
});

// Pour un spécialiste (référé)
const referral = await reqvet.reformulateReport(jobId, {
  purpose: 'referral',
});`,
    js: `// Reformuler pour le propriétaire de l'animal
const ownerVersion = await reqvet.reformulateReport(jobId, {
  purpose: 'owner', // 'owner' | 'referral' | 'summary' | 'custom'
});

// Pour un spécialiste (référé)
const referral = await reqvet.reformulateReport(jobId, {
  purpose: 'referral',
});`,
  },
  amend: {
    ts: `// Ajouter un complément audio à un compte-rendu terminé
const upload = await reqvet.uploadAudio(complementAudio, 'complement.mp3');

const amend = await reqvet.amendJob(jobId, {
  audioFile: upload.path,
});
// { status: 'amending', amendment_number: 1 }

// Attendre le résultat mis à jour
const updated = await reqvet.waitForJob(jobId);`,
    js: `// Ajouter un complément audio à un compte-rendu terminé
const upload = await reqvet.uploadAudio(complementAudio, 'complement.mp3');

const amend = await reqvet.amendJob(jobId, {
  audioFile: upload.path,
});
// { status: 'amending', amendment_number: 1 }

// Attendre le résultat mis à jour
const updated = await reqvet.waitForJob(jobId);`,
  },
};

// ─── CodeBlock component ───────────────────────────────────────

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className={styles.codeBlock}>
      <button className={styles.copyBtn} onClick={copy} aria-label="Copier le code">
        {copied ? (
          <span className={styles.copied}>✓ Copié</span>
        ) : (
          <span>Copier</span>
        )}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── LangToggle component ──────────────────────────────────────

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className={styles.langToggle}>
      <button
        className={lang === 'ts' ? styles.active : ''}
        onClick={() => onChange('ts')}
      >
        TypeScript
      </button>
      <button
        className={lang === 'js' ? styles.active : ''}
        onClick={() => onChange('js')}
      >
        JavaScript
      </button>
    </div>
  );
}

// ─── Step component ────────────────────────────────────────────

function Step({
  number,
  title,
  description,
  code,
  lang,
  note,
}: {
  number: number;
  title: string;
  description: string;
  code: string;
  lang: Lang;
  note?: string;
}) {
  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={styles.stepNumber}>{number}</span>
        <div>
          <h3 className={styles.stepTitle}>{title}</h3>
          <p className={styles.stepDesc}>{description}</p>
        </div>
      </div>
      <CodeBlock code={code} lang={lang} />
      {note && <p className={styles.stepNote}>{note}</p>}
    </div>
  );
}

// ─── Methods table ─────────────────────────────────────────────

const METHODS = [
  { method: 'uploadAudio(audio, fileName?)', desc: 'Upload un fichier audio vers ReqVet' },
  { method: 'generateReport(params)', desc: 'Upload + création de job (raccourci)' },
  { method: 'createJob(params)', desc: 'Crée un job de génération' },
  { method: 'listJobs(options?)', desc: 'Liste les jobs avec pagination et filtres' },
  { method: 'getJob(jobId)', desc: 'Statut et résultat d\'un job' },
  { method: 'waitForJob(jobId)', desc: 'Polling jusqu\'à completion' },
  { method: 'regenerateJob(jobId, options?)', desc: 'Régénère avec de nouvelles instructions' },
  { method: 'amendJob(jobId, params)', desc: 'Ajoute un complément audio à un CR terminé' },
  { method: 'reformulateReport(jobId, params)', desc: 'Reformule pour un public spécifique' },
  { method: 'listReformulations(jobId)', desc: 'Liste les reformulations d\'un job' },
  { method: 'listTemplates()', desc: 'Liste les templates disponibles { system, custom }' },
  { method: 'getTemplate(id)', desc: 'Récupère un template par ID' },
  { method: 'createTemplate(params)', desc: 'Crée un template personnalisé' },
  { method: 'updateTemplate(id, updates)', desc: 'Met à jour un template' },
  { method: 'deleteTemplate(id)', desc: 'Supprime un template' },
  { method: 'health()', desc: 'Vérifie la disponibilité de l\'API' },
];

const EVENTS = [
  { event: 'job.completed', desc: 'Compte-rendu prêt — contient html, fields, transcription' },
  { event: 'job.failed', desc: 'Échec du traitement — contient error' },
  { event: 'job.amended', desc: 'Complément audio intégré — contient amendment_number' },
  { event: 'job.amend_failed', desc: 'Échec du complément — CR original préservé' },
  { event: 'job.regenerated', desc: 'Régénération terminée — contient html mis à jour' },
];

// ─── Main page ─────────────────────────────────────────────────

export default function SdkPage() {
  const [lang, setLang] = useState<Lang>('ts');

  return (
    <div className={styles.page}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>SDK officiel</span>
          <h1 className={styles.heroTitle}>
            Intégrez ReqVet<br />en quelques lignes
          </h1>
          <p className={styles.heroSubtitle}>
            De l'audio au compte-rendu vétérinaire structuré, via une API simple.
            Zero dépendance. TypeScript et JavaScript.
          </p>
          <div className={styles.heroInstall}>
            <CodeBlock code="npm install @reqvet-sdk/sdk" />
          </div>
          <div className={styles.heroLinks}>
            <a
              href="https://www.npmjs.com/package/@reqvet-sdk/sdk"
              target="_blank"
              rel="noreferrer"
              className={styles.btnPrimary}
            >
              Voir sur npm
            </a>
            <a href="#quickstart" className={styles.btnSecondary}>
              Quick start →
            </a>
          </div>
        </div>
      </section>

      <div className={styles.content}>

        {/* ── Global lang toggle ────────────────────────────── */}
        <div className={styles.globalToggle}>
          <span className={styles.toggleLabel}>Exemples en :</span>
          <LangToggle lang={lang} onChange={setLang} />
        </div>

        {/* ── Quick start ───────────────────────────────────── */}
        <section id="quickstart" className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick start</h2>
          <p className={styles.sectionSubtitle}>
            De zéro à un compte-rendu généré en 5 étapes.
          </p>

          <div className={styles.steps}>

            <Step
              number={1}
              title="Initialiser le client"
              description="Chargez votre clé API depuis les variables d'environnement. Ne l'exposez jamais côté navigateur."
              code={SNIPPETS.init[lang]}
              lang={lang}
            />

            <Step
              number={2}
              title="Découvrir les templates"
              description="Chaque compte-rendu est généré à partir d'un template. Listez les templates disponibles pour récupérer un templateId."
              code={SNIPPETS.templates[lang]}
              lang={lang}
              note="system = templates fournis par ReqVet, visibles par toutes les organisations. custom = templates créés par votre organisation."
            />

            <Step
              number={3}
              title="Uploader l'audio"
              description="Envoyez le fichier audio de la consultation. Formats supportés : mp3, wav, webm, ogg, m4a, aac, flac (max 100 MB)."
              code={SNIPPETS.upload[lang]}
              lang={lang}
            />

            <Step
              number={4}
              title="Créer un job"
              description="Démarrez la pipeline transcription + génération. Le job démarre immédiatement côté serveur. Passez vos propres données dans metadata — elles seront retournées telles quelles dans le webhook."
              code={SNIPPETS.createJob[lang]}
              lang={lang}
            />

            <Step
              number={5}
              title="Recevoir le résultat"
              description="Configurez un endpoint webhook pour recevoir le compte-rendu quand il est prêt. Vérifiez toujours la signature HMAC avant de traiter l'événement."
              code={SNIPPETS.webhook[lang]}
              lang={lang}
              note="Vérifiez la signature sur chaque requête entrante. Implémentez l'idempotence : déduplicatez sur job_id + event pour éviter les doubles traitements."
            />

          </div>
        </section>

        {/* ── Polling alternative ───────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Mode polling</h2>
          <p className={styles.sectionSubtitle}>
            Alternative au webhook — utile pour les scripts, les CLIs ou les intégrations
            sans endpoint public. La fonction attend automatiquement la completion.
          </p>
          <CodeBlock code={SNIPPETS.polling[lang]} lang={lang} />
        </section>

        {/* ── Reformulations ────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Reformulations</h2>
          <p className={styles.sectionSubtitle}>
            Générez des versions alternatives d'un compte-rendu pour différents publics —
            sans relancer la transcription.
          </p>
          <div className={styles.purposeGrid}>
            {[
              { key: 'owner', label: 'Propriétaire', desc: 'Version simplifiée pour le propriétaire de l\'animal' },
              { key: 'referral', label: 'Référé', desc: 'Résumé clinique pour un spécialiste' },
              { key: 'summary', label: 'Résumé', desc: 'Note interne courte' },
              { key: 'diagnostic_hypothesis', label: 'Hypothèses', desc: 'Liste de diagnostics différentiels' },
              { key: 'custom', label: 'Personnalisé', desc: 'Instructions libres via customInstructions' },
            ].map((p) => (
              <div key={p.key} className={styles.purposeCard}>
                <code className={styles.purposeKey}>{p.key}</code>
                <strong>{p.label}</strong>
                <span>{p.desc}</span>
              </div>
            ))}
          </div>
          <CodeBlock code={SNIPPETS.reformulate[lang]} lang={lang} />
        </section>

        {/* ── Amend ─────────────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Compléments audio</h2>
          <p className={styles.sectionSubtitle}>
            Le vétérinaire a oublié de mentionner quelque chose ? Ajoutez un enregistrement
            complémentaire. ReqVet fusionne les transcriptions et régénère le compte-rendu
            avec le contexte complet.
          </p>
          <CodeBlock code={SNIPPETS.amend[lang]} lang={lang} />
        </section>

        {/* ── Webhook events ────────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Événements webhook</h2>
          <p className={styles.sectionSubtitle}>
            ReqVet envoie 5 types d'événements. Implémentez un handler pour chacun.
          </p>
          <div className={styles.eventsTable}>
            <div className={styles.eventsHeader}>
              <span>Événement</span>
              <span>Description</span>
            </div>
            {EVENTS.map((e) => (
              <div key={e.event} className={styles.eventsRow}>
                <code className={styles.eventName}>{e.event}</code>
                <span>{e.desc}</span>
              </div>
            ))}
          </div>
          <p className={styles.sectionNote}>
            Les livraisons échouées sont retentées 3 fois (0s, 2s, 5s).
            Implémentez l'idempotence : déduplicatez sur <code>job_id + event</code>.
          </p>
        </section>

        {/* ── Methods reference ─────────────────────────────── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Référence des méthodes</h2>
          <div className={styles.methodsTable}>
            <div className={styles.methodsHeader}>
              <span>Méthode</span>
              <span>Description</span>
            </div>
            {METHODS.map((m) => (
              <div key={m.method} className={styles.methodsRow}>
                <code className={styles.methodName}>{m.method}</code>
                <span>{m.desc}</span>
              </div>
            ))}
          </div>
          <p className={styles.sectionNote}>
            Documentation complète dans{' '}
            <a
              href="https://www.npmjs.com/package/@reqvet-sdk/sdk"
              target="_blank"
              rel="noreferrer"
            >
              SDK_REFERENCE.md
            </a>
            .
          </p>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        {/* <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Prêt à intégrer ReqVet ?</h2>
          <p className={styles.ctaSubtitle}>
            Contactez-nous pour obtenir votre clé API et démarrer la phase pilote.
          </p>
          <a href="mailto:contact@reqvet.com" className={styles.btnPrimary}>
            Demander une clé API →
          </a>
        </section> */}

      </div>
    </div>
  );
}
