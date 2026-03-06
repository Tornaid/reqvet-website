'use client';

import { useMemo, useState, useCallback } from 'react';
import styles from './SdkPage.module.scss';

// ─── Types ─────────────────────────────────────────────────────

type Lang = 'ts' | 'js';

type SnippetKey =
  | 'install'
  | 'env'
  | 'init'
  | 'templates'
  | 'upload'
  | 'createJob'
  | 'polling'
  | 'webhook'
  | 'nextProxy'
  | 'eventCompleted'
  | 'fieldSchema'
  | 'regenerate'
  | 'amend'
  | 'reformulate'
  | 'resellerOnboard'
  | 'resellerManage';

type Snippets = Record<SnippetKey, { ts: string; js: string }>;

// ─── Code snippets ─────────────────────────────────────────────

const SNIPPETS: Snippets = {
  install: {
    ts: `npm install @reqvet-sdk/sdk`,
    js: `npm install @reqvet-sdk/sdk`,
  },

  env: {
    ts: `# .env.local — variables fournies par l'équipe ReqVet (ne jamais committer)

# Clé API de votre organisation (fournie lors de l'onboarding pilote)
REQVET_API_KEY=rqv_live_...

# URL de base de l'API ReqVet
REQVET_BASE_URL=https://api.reqvet.com

# Secret HMAC pour vérifier la signature des webhooks entrants
REQVET_WEBHOOK_SECRET=whsec_...

# URL publique de votre endpoint webhook (dans votre app)
# Doit être accessible depuis internet — pas localhost en prod
REQVET_WEBHOOK_URL=https://votre-app.com/api/reqvet/webhook`,
    js: `# .env.local — variables fournies par l'équipe ReqVet (ne jamais committer)

# Clé API de votre organisation (fournie lors de l'onboarding pilote)
REQVET_API_KEY=rqv_live_...

# URL de base de l'API ReqVet
REQVET_BASE_URL=https://api.reqvet.com

# Secret HMAC pour vérifier la signature des webhooks entrants
REQVET_WEBHOOK_SECRET=whsec_...

# URL publique de votre endpoint webhook (dans votre app)
# Doit être accessible depuis internet — pas localhost en prod
REQVET_WEBHOOK_URL=https://votre-app.com/api/reqvet/webhook`,
  },

  init: {
    ts: `// lib/reqvet.ts — instancier une seule fois (singleton côté serveur)
import ReqVet from '@reqvet-sdk/sdk';

// IMPORTANT : instancier uniquement côté serveur (API routes, server components)
// Ne jamais importer ce fichier depuis du code client (composants React)
export const reqvet = new ReqVet(process.env.REQVET_API_KEY!, {
  baseUrl: process.env.REQVET_BASE_URL,
  // pollInterval: 5000,        // intervalle de polling en ms (défaut : 3000)
  // timeout: 5 * 60 * 1000,   // timeout max en ms (défaut : 5 min)
});`,
    js: `// lib/reqvet.js — instancier une seule fois (singleton côté serveur)
import ReqVet from '@reqvet-sdk/sdk';

// IMPORTANT : instancier uniquement côté serveur (API routes, server components)
// Ne jamais importer ce fichier depuis du code client (composants React)
export const reqvet = new ReqVet(process.env.REQVET_API_KEY, {
  baseUrl: process.env.REQVET_BASE_URL,
  // pollInterval: 5000,
  // timeout: 5 * 60 * 1000,
});`,
  },

  templates: {
    ts: `// À appeler une fois au démarrage (ou mettre en cache)
const { system, custom } = await reqvet.listTemplates();
// system = templates fournis par ReqVet (lecture seule, visibles par tous)
// custom = templates créés par votre organisation (CRUD disponible)

// En phase pilote : utilisez le premier template system disponible
const templateId = (system[0] ?? custom[0]).id;
// → à stocker en config / env pour ne pas rappeler à chaque job`,
    js: `// À appeler une fois au démarrage (ou mettre en cache)
const { system, custom } = await reqvet.listTemplates();
// system = templates fournis par ReqVet (lecture seule, visibles par tous)
// custom = templates créés par votre organisation (CRUD disponible)

// En phase pilote : utilisez le premier template system disponible
const templateId = (system[0] ?? custom[0]).id;
// → à stocker en config / env pour ne pas rappeler à chaque job`,
  },

  upload: {
    ts: `// Étape 1 : uploader le fichier audio de la consultation
// Formats supportés : mp3, wav, webm, ogg, m4a, aac, flac
//
// ⚠️  N'utilisez PAS reqvet.uploadAudio() côté serveur (Vercel / Serverless) :
//     /api/v1/upload est une Serverless Function limitée à ~4.5 MB → 413.
//     Utilisez à la place getSignedUploadUrl() + PUT direct vers Supabase.

// 1a. Obtenir une URL d'upload signée (requête JSON légère, aucun fichier envoyé)
const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
  audioFile.name || 'consultation.webm',
  audioFile.type || 'audio/webm',
);

// 1b. Upload direct vers Supabase (bypass Vercel, aucune limite de taille)
await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': audioFile.type || 'audio/webm' },
  body: audioFile,
});

// audioPath → identifiant canonique à passer dans createJob`,
    js: `// Étape 1 : uploader le fichier audio de la consultation
// Formats supportés : mp3, wav, webm, ogg, m4a, aac, flac
//
// ⚠️  N'utilisez PAS reqvet.uploadAudio() côté serveur (Vercel / Serverless) :
//     limite ~4.5 MB → 413. Utilisez getSignedUploadUrl() + PUT direct.

// 1a. Obtenir une URL d'upload signée
const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
  audioFile.name || 'consultation.webm',
  audioFile.type || 'audio/webm',
);

// 1b. Upload direct vers Supabase (bypass Vercel, aucune limite de taille)
await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': audioFile.type || 'audio/webm' },
  body: audioFile,
});

// audioPath → identifiant canonique à passer dans createJob`,
  },

  createJob: {
    ts: `// Étape 2 : créer le job de génération
// → la transcription et la génération démarrent immédiatement
const job = await reqvet.createJob({
  audioFile: audioPath,         // requis — path retourné par getSignedUploadUrl
  animalName: 'Luna',           // requis — nom de l'animal (utilisé dans le prompt)
  templateId,                   // requis — ID récupéré via listTemplates()
  callbackUrl: process.env.REQVET_WEBHOOK_URL,          // recommandé en prod
  metadata: {                   // vos IDs internes — renvoyés tels quels dans l'event
    consultationId: 'CONSULT-001',
    vetId: 'DR-MARTIN',
    clinicId: 'CLINIC-42',
  },
  extraInstructions: 'Insister sur le suivi post-opératoire et le prochain RDV.',
  // extraInstructions : enrichit le prompt de génération, sans impact sur les fields
});

// job.job_id  → à stocker en base, relié à votre consultation
// job.status  → "pending" immédiatement après création
console.log(job.job_id); // ex: "a1b2c3d4-e5f6-..."`,
    js: `// Étape 2 : créer le job de génération
const job = await reqvet.createJob({
  audioFile: audioPath,         // requis
  animalName: 'Luna',           // requis
  templateId,                   // requis
  callbackUrl: process.env.REQVET_WEBHOOK_URL,
  metadata: {
    consultationId: 'CONSULT-001',
    vetId: 'DR-MARTIN',
    clinicId: 'CLINIC-42',
  },
  extraInstructions: 'Insister sur le suivi post-opératoire.',
});

// job.job_id → à stocker en base, relié à votre consultation
console.log(job.job_id);`,
  },

  polling: {
    ts: `// Mode polling — utile en développement, scripts, CLI
// Le SDK poll automatiquement jusqu'à "completed" (ou timeout)
const report = await reqvet.generateReport({
  audio: audioFile,             // Blob | File | Buffer
  fileName: 'consultation.mp3',
  animalName: 'Luna',
  templateId,
  metadata: { consultationId: 'CONSULT-001' },
  extraInstructions: 'Mettre en avant les recommandations.',
  waitForResult: true,          // active le polling automatique
  onStatus: (s) => console.log('Statut :', s),
  // pending → transcribing → generating → completed
});

// Ce que vous recevez dans report :
console.log(report.jobId);         // ID du job
console.log(report.html);          // compte-rendu en HTML — à afficher / stocker
console.log(report.transcription); // transcription complète de l'audio
console.log(report.fields);        // { poids: 28.5, motif: "..." } si field_schema configuré
                                   // → null si field_schema non configuré
console.log(report.cost);          // { transcription_usd, generation_usd, total_usd }`,
    js: `// Mode polling — utile en développement, scripts, CLI
const report = await reqvet.generateReport({
  audio: audioFile,
  fileName: 'consultation.mp3',
  animalName: 'Luna',
  templateId,
  metadata: { consultationId: 'CONSULT-001' },
  extraInstructions: 'Mettre en avant les recommandations.',
  waitForResult: true,
  onStatus: (s) => console.log('Statut :', s),
  // pending → transcribing → generating → completed
});

console.log(report.jobId);
console.log(report.html);          // HTML du compte-rendu
console.log(report.transcription); // transcription complète
console.log(report.fields);        // objet structuré (si field_schema configuré) | null
console.log(report.cost);          // { transcription_usd, generation_usd, total_usd }`,
  },

  webhook: {
    ts: `// app/api/reqvet/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req: NextRequest) {
  // 1) lire le raw body AVANT JSON.parse (obligatoire pour la vérification HMAC)
  const rawBody = await req.text();

  // 2) vérifier la signature HMAC — rejeter si invalide
  const { ok, reason } = verifyWebhookSignature({
    secret: process.env.REQVET_WEBHOOK_SECRET!,
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp:  req.headers.get('x-reqvet-timestamp') ?? '',
    maxSkewMs: 5 * 60 * 1000, // rejeter les events > 5 min
  });

  if (!ok) {
    console.warn('ReqVet webhook — signature invalide :', reason);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 3) parser le body une fois vérifié
  const event = JSON.parse(rawBody);

  // 4) idempotence — dédupliquer sur job_id + event (évite les doubles traitements)
  // const key = \`\${event.job_id}:\${event.event}\`;
  // if (await alreadyProcessed(key)) return NextResponse.json({ ok: true });

  if (event.event === 'job.completed') {
    // event.html           → HTML du compte-rendu (à stocker)
    // event.transcription  → transcription complète
    // event.fields         → champs structurés { poids, motif, ... } (si field_schema configuré)
    // event.metadata       → vos IDs internes passés à la création du job
    await saveReport(event.job_id, event.html, event.fields, event.metadata);
    // → notifiez votre UI (WebSocket/SSE) que le compte-rendu est prêt
  }

  if (event.event === 'job.failed') {
    // event.error, event.metadata
    await markFailed(event.job_id, event.error);
  }

  return NextResponse.json({ ok: true });
}`,
    js: `// app/api/reqvet/webhook/route.js
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req) {
  // 1) lire le raw body AVANT JSON.parse
  const rawBody = await req.text();

  // 2) vérifier la signature HMAC
  const { ok, reason } = verifyWebhookSignature({
    secret: process.env.REQVET_WEBHOOK_SECRET,
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp:  req.headers.get('x-reqvet-timestamp') ?? '',
    maxSkewMs: 5 * 60 * 1000,
  });

  if (!ok) return new Response('Unauthorized', { status: 401 });

  // 3) parser et traiter
  const event = JSON.parse(rawBody);

  // Idempotence recommandée : dédupliquer sur job_id + event
  if (event.event === 'job.completed') {
    // event.html, event.transcription, event.fields?, event.metadata
    await saveReport(event.job_id, event.html, event.fields, event.metadata);
  }

  if (event.event === 'job.failed') {
    await markFailed(event.job_id, event.error);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}`,
  },

  nextProxy: {
    ts: `// app/api/reqvet/generate/route.ts
// Pattern recommandé : proxy côté serveur
// Le front envoie l'audio ici → la clé API reste côté serveur (jamais exposée)
import { NextRequest, NextResponse } from 'next/server';
import { reqvet } from '@/lib/reqvet'; // votre singleton

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const audio        = form.get('audio') as File | null;
  const animalName   = form.get('animalName') as string | null;
  const templateId   = form.get('templateId') as string | null;
  const consultationId = form.get('consultationId') as string | null;

  if (!audio || !animalName || !templateId) {
    return NextResponse.json(
      { error: 'Champs requis manquants : audio, animalName, templateId' },
      { status: 400 },
    );
  }

  // ⚠️  N'utilisez PAS reqvet.uploadAudio() ici : /api/v1/upload passe par Vercel
  //     et est limité à ~4.5 MB → 413 sur les fichiers de consultation courants.
  //     Flow correct : getSignedUploadUrl() → PUT direct Supabase (bypass Vercel).

  // 1. Obtenir l'URL signée Supabase (requête JSON légère, aucun fichier)
  const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
    audio.name || 'consultation.webm',
    audio.type || 'audio/webm',
  );

  // 2. Upload direct vers Supabase (contourne Vercel, aucune limite de taille)
  const audioBuffer = Buffer.from(await audio.arrayBuffer());
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': audio.type || 'audio/webm' },
    body: audioBuffer,
  });

  const job = await reqvet.createJob({
    audioFile: audioPath,
    animalName,
    templateId,
    callbackUrl: process.env.REQVET_WEBHOOK_URL,
    metadata: { consultationId },
  });

  // Le front reçoit job_id + status="pending" et attend l'event webhook
  return NextResponse.json(job, { status: 201 });
}`,
    js: `// app/api/reqvet/generate/route.js
import { reqvet } from '@/lib/reqvet';

export async function POST(req) {
  const form = await req.formData();
  const audio          = form.get('audio');
  const animalName     = form.get('animalName');
  const templateId     = form.get('templateId');
  const consultationId = form.get('consultationId');

  if (!audio || !animalName || !templateId) {
    return new Response(
      JSON.stringify({ error: 'Champs requis manquants : audio, animalName, templateId' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // ⚠️  uploadAudio() limité à ~4.5 MB côté Vercel → 413. Utilisez signed-upload.

  // 1. Obtenir l'URL signée Supabase
  const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
    audio.name || 'consultation.webm',
    audio.type || 'audio/webm',
  );

  // 2. Upload direct vers Supabase (bypass Vercel)
  const audioBuffer = Buffer.from(await audio.arrayBuffer());
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': audio.type || 'audio/webm' },
    body: audioBuffer,
  });

  const job = await reqvet.createJob({
    audioFile: audioPath,
    animalName,
    templateId,
    callbackUrl: process.env.REQVET_WEBHOOK_URL,
    metadata: { consultationId },
  });

  return new Response(JSON.stringify(job), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}`,
  },

  eventCompleted: {
    ts: `// Payload reçu sur votre webhook (event: "job.completed")
{
  "event": "job.completed",
  "job_id": "a1b2c3d4-e5f6-7890-...",
  "animal_name": "Luna",

  // Compte-rendu en HTML — à stocker et afficher dans votre logiciel
  "html": "<section class=\\"cr\\"><h2>Compte-rendu de consultation</h2>...</section>",

  // Transcription brute de l'audio — utile pour audit / correction
  "transcription": "Alors Luna, on va regarder ça... le vétérinaire examine...",

  // Champs structurés — présent UNIQUEMENT si votre org a un field_schema configuré
  // → prêts à être injectés dans vos tables métier
  "fields": {
    "poids": 28.5,
    "motif": "Diarrhée liquide depuis 5 jours",
    "conclusion": "<h3>Diagnostic</h3><ul><li>Gastro-entérite aigüe</li></ul>..."
  },

  // Vos IDs internes — renvoyés tels quels (passthrough)
  "metadata": {
    "consultationId": "CONSULT-001",
    "vetId": "DR-MARTIN",
    "clinicId": "CLINIC-42"
  }
}`,
    js: `// Payload reçu sur votre webhook (event: "job.completed")
{
  "event": "job.completed",
  "job_id": "a1b2c3d4-e5f6-7890-...",
  "animal_name": "Luna",

  // Compte-rendu en HTML — à stocker et afficher dans votre logiciel
  "html": "<section class=\\"cr\\"><h2>Compte-rendu de consultation</h2>...</section>",

  // Transcription brute de l'audio
  "transcription": "Alors Luna, on va regarder ça...",

  // Champs structurés — présent UNIQUEMENT si votre org a un field_schema configuré
  "fields": {
    "poids": 28.5,
    "motif": "Diarrhée liquide depuis 5 jours",
    "conclusion": "<h3>Diagnostic</h3><ul><li>Gastro-entérite aigüe</li></ul>..."
  },

  // Vos IDs internes — passthrough
  "metadata": {
    "consultationId": "CONSULT-001",
    "vetId": "DR-MARTIN"
  }
}`,
  },

  fieldSchema: {
    ts: `// ── Comment ça marche en 3 étapes ───────────────────────────────
// ① Définissez ci-dessous les champs que vous souhaitez extraire de chaque consultation
// ② Envoyez ce fichier à l'équipe ReqVet (channel pilote ou contact@reqvet.com)
//    → il est activé sur votre org_id (une seule fois, avant votre premier job)
// ③ Dès lors, TOUS vos jobs retournent automatiquement report.fields (ou event.fields)

// Types supportés : string | text | number | boolean | array | html

[
  {
    "key": "poids",
    "label": "Poids (kg)",
    "type": "number",
    "description": "Poids en kilogrammes, uniquement le nombre"
  },
  {
    "key": "motif",
    "label": "Motif de consultation",
    "type": "text",
    "description": "Maximum 10 mots. Format : [Symptôme/Problème] + [localisation si pertinente] + [durée si mentionnée]. Exemples : 'Diarrhée liquide depuis 5 jours', 'Boiterie MPD depuis 3 jours'. Pas de phrase rédigée, pas de verbe conjugué."
  },
  {
    "key": "conclusion",
    "label": "Conclusion",
    "type": "html",
    "description": "Génère en HTML structuré avec les sections suivantes. Omettre toute section non mentionnée.\\n\\nRÈGLE : ne jamais inventer d'examens, traitements, posologies ou recommandations non cités.\\n\\n<h3>Diagnostic / Hypothèses retenues</h3>\\n<ul><li>...</li></ul>\\n<h3>Traitements</h3>\\n<ul><li>médicament, posologie, durée si mentionnée</li></ul>\\n<h3>Examens complémentaires</h3>\\n<ul><li>...</li></ul>\\n<h3>Suivi</h3>\\n<ul><li>modalités et délais si mentionnés</li></ul>"
  }
]

// Résultat dans chaque job complété :
// report.fields = { poids: 28.5, motif: "Diarrhée...", conclusion: "<h3>..." }
// Un champ vaut null si non mentionné dans l'audio.
// Sans field_schema configuré → report.fields est null (polling) / absent (webhook).`,
    js: `// ── Comment ça marche en 3 étapes ───────────────────────────────
// ① Définissez les champs que vous souhaitez extraire de chaque consultation
// ② Envoyez ce fichier à l'équipe ReqVet (channel pilote ou contact@reqvet.com)
//    → il est activé sur votre org_id (une seule fois)
// ③ Dès lors, TOUS vos jobs retournent automatiquement report.fields

// Types supportés : string | text | number | boolean | array | html

[
  {
    "key": "poids",
    "label": "Poids (kg)",
    "type": "number",
    "description": "Poids en kilogrammes, uniquement le nombre"
  },
  {
    "key": "motif",
    "label": "Motif de consultation",
    "type": "text",
    "description": "Maximum 10 mots. Format : [Symptôme/Problème] + [localisation si pertinente] + [durée si mentionnée]."
  },
  {
    "key": "conclusion",
    "label": "Conclusion",
    "type": "html",
    "description": "HTML structuré : Diagnostic, Traitements, Examens complémentaires, Suivi. Omettre les sections non mentionnées."
  }
]

// report.fields = { poids: 28.5, motif: "Diarrhée...", conclusion: "<h3>..." }
// Un champ vaut null si non mentionné dans l'audio.`,
  },

  regenerate: {
    ts: `// Régénérer un compte-rendu terminé (nouveau template ou nouvelles instructions)
// Ne relance PAS la transcription — utilise la transcription existante (coût réduit)
const regen = await reqvet.regenerateJob(jobId, {
  extraInstructions: "Ajoute une section 'Hypothèses diagnostiques'.",
  // templateId: 'autre-template-id', // optionnel
});

// regen.result.html     → HTML mis à jour
// regen.result.fields?  → champs structurés mis à jour (si field_schema configuré)`,
    js: `// Régénérer sans relancer la transcription
const regen = await reqvet.regenerateJob(jobId, {
  extraInstructions: "Ajoute une section 'Hypothèses diagnostiques'.",
  // templateId: 'autre-template-id',
});

// regen.result.html, regen.result.fields?`,
  },

  amend: {
    ts: `// Ajouter un complément audio à un compte-rendu terminé
// Le vétérinaire ajoute des infos après coup (résultats labo, correction)
//
// ⚠️  Même règle que pour generate : utilisez getSignedUploadUrl() + PUT direct.

// 1. Obtenir l'URL signée + upload direct vers Supabase
const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
  complementAudio.name || 'complement.webm',
  complementAudio.type || 'audio/webm',
);
await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': complementAudio.type || 'audio/webm' },
  body: complementAudio,
});

const amend = await reqvet.amendJob(jobId, {
  audioFile: audioPath,
});
// { status: 'amending', amendment_number: 1, ... }

// L'event "job.amended" sera envoyé sur votre webhook avec le HTML mis à jour
// Ou : attendre la fin en polling
const updated = await reqvet.waitForJob(jobId);
console.log(updated.html); // HTML intégrant le complément`,
    js: `// Ajouter un complément audio à un compte-rendu terminé
// ⚠️  Utilisez getSignedUploadUrl() + PUT direct (uploadAudio() → 413 sur Vercel).

const { uploadUrl, path: audioPath } = await reqvet.getSignedUploadUrl(
  complementAudio.name || 'complement.webm',
  complementAudio.type || 'audio/webm',
);
await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': complementAudio.type || 'audio/webm' },
  body: complementAudio,
});

const amend = await reqvet.amendJob(jobId, {
  audioFile: audioPath,
});

const updated = await reqvet.waitForJob(jobId);
console.log(updated.html);`,
  },

  reformulate: {
    ts: `// Reformuler sans relancer la transcription ni la génération (coût minimal)
// Utile pour générer plusieurs versions d'un même compte-rendu

// Versions prédéfinies
const ownerVersion = await reqvet.reformulateReport(jobId, { purpose: 'owner' });
// → version simplifiée pour le propriétaire de l'animal

const referral     = await reqvet.reformulateReport(jobId, { purpose: 'referral' });
// → version de référé pour un autre vétérinaire

const summary      = await reqvet.reformulateReport(jobId, { purpose: 'summary' });
// → résumé court

const hypotheses   = await reqvet.reformulateReport(jobId, { purpose: 'diagnostic_hypothesis' });
// → focus sur les hypothèses diagnostiques

// Version personnalisée
const custom = await reqvet.reformulateReport(jobId, {
  purpose: 'custom',
  customInstructions: "Écris une version courte en bullet points, sans jargon médical.",
});`,
    js: `// Reformuler sans relancer la transcription (coût minimal)
const ownerVersion = await reqvet.reformulateReport(jobId, { purpose: 'owner' });
const referral     = await reqvet.reformulateReport(jobId, { purpose: 'referral' });
const summary      = await reqvet.reformulateReport(jobId, { purpose: 'summary' });
const hypotheses   = await reqvet.reformulateReport(jobId, { purpose: 'diagnostic_hypothesis' });

const custom = await reqvet.reformulateReport(jobId, {
  purpose: 'custom',
  customInstructions: "Version courte en bullet points, sans jargon médical.",
});`,
  },

  resellerOnboard: {
    ts: `// lib/reseller.ts — singleton côté serveur avec votre clé revendeur
import ReqVet from '@reqvet-sdk/sdk';

// ⚠️ Clé REVENDEUR — distincte des clés cliniques, ne jamais mélanger
export const reseller = new ReqVet(process.env.REQVET_RESELLER_KEY!, {
  baseUrl: process.env.REQVET_BASE_URL,
});

// ─── Onboarder une nouvelle clinique ─────────────────────────────
const result = await reseller.createOrganization({
  name: 'Clinique du Parc',
  contactEmail: 'contact@clinique-du-parc.fr',
  externalId: 'votre_id_interne_4892', // votre ID — garantit l'idempotence
  monthlyQuota: 500,                    // jobs/mois (défaut: 100, max: 10 000)
  webhookUrl: 'https://votre-app.com/webhooks/reqvet',
});

// ⚠️ api_key et webhook_secret retournés UNE SEULE FOIS — stocker immédiatement !
if (result.api_key) {
  // Première création — stocker CHIFFRÉ en base (encrypt = AES-256 ou vault)
  // Associer à votre ID clinique pour pouvoir récupérer la clé au runtime
  await db.clinics.update(votre_id_clinique, {
    reqvet_org_id:    result.organization.id,
    reqvet_api_key:   encrypt(result.api_key),       // rqv_live_... chiffré
    reqvet_wh_secret: encrypt(result.webhook_secret), // whsec_... chiffré
  });
} else {
  // Idempotent : org déjà existante — clé déjà en base, rien à faire
}

// La clinique utilise ensuite son propre client ReqVet (clé standard)
const clinic = new ReqVet(result.api_key);
const { system } = await clinic.listTemplates();
const job = await clinic.createJob({
  audioFile: path,
  animalName: 'Luna',
  templateId: system[0].id,
  callbackUrl: 'https://votre-app.com/webhooks/reqvet',
  metadata: { consultationId: 'CONSULT-001' },
});`,
    js: `// lib/reseller.js — singleton côté serveur avec votre clé revendeur
import ReqVet from '@reqvet-sdk/sdk';

// ⚠️ Clé REVENDEUR — distincte des clés cliniques, ne jamais mélanger
export const reseller = new ReqVet(process.env.REQVET_RESELLER_KEY, {
  baseUrl: process.env.REQVET_BASE_URL,
});

// ─── Onboarder une nouvelle clinique ─────────────────────────────
const result = await reseller.createOrganization({
  name: 'Clinique du Parc',
  contactEmail: 'contact@clinique-du-parc.fr',
  externalId: 'votre_id_interne_4892', // votre ID — garantit l'idempotence
  monthlyQuota: 500,                    // jobs/mois (défaut: 100, max: 10 000)
  webhookUrl: 'https://votre-app.com/webhooks/reqvet',
});

// ⚠️ api_key et webhook_secret retournés UNE SEULE FOIS — stocker immédiatement !
if (result.api_key) {
  // Stocker CHIFFRÉ associé à votre ID clinique interne
  await db.clinics.update(votre_id_clinique, {
    reqvet_org_id:    result.organization.id,
    reqvet_api_key:   encrypt(result.api_key),
    reqvet_wh_secret: encrypt(result.webhook_secret),
  });
}

// La clinique utilise son propre client ReqVet avec sa clé
const clinic = new ReqVet(result.api_key);
const job = await clinic.createJob({
  audioFile: path,
  animalName: 'Luna',
  templateId,
  callbackUrl: 'https://votre-app.com/webhooks/reqvet',
  metadata: { consultationId: 'CONSULT-001' },
});`,
  },

  resellerKeyRuntime: {
    ts: `// app/api/consultation/transcribe/route.ts
// Appelé quand un vétérinaire authentifié déclenche une transcription
import { NextRequest, NextResponse } from 'next/server';
import ReqVet from '@reqvet-sdk/sdk';

export async function POST(req: NextRequest) {
  // 1. Identifier la clinique de l'utilisateur dans VOTRE système d'auth
  //    (session, JWT, middleware…)
  const userId = req.headers.get('x-user-id')!;
  const clinic = await db.getClinicByUser(userId);

  // 2. Déchiffrer la clé de CETTE clinique — jamais exposée au navigateur
  const reqvet = new ReqVet(decrypt(clinic.reqvet_api_key));

  const form   = await req.formData();
  const audio  = form.get('audio') as File;

  // 3. Upload direct Supabase (bypass Vercel)
  const { uploadUrl, path } = await reqvet.getSignedUploadUrl(
    audio.name || 'consultation.webm',
    audio.type || 'audio/webm',
  );
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': audio.type || 'audio/webm' },
    body: Buffer.from(await audio.arrayBuffer()),
  });

  // 4. Créer le job — metadata.clinicId permet de router le webhook entrant
  const job = await reqvet.createJob({
    audioFile:    path,
    animalName:   form.get('animalName') as string,
    templateId:   clinic.reqvet_template_id,
    callbackUrl:  process.env.REQVET_WEBHOOK_URL,
    metadata: {
      clinicId:       clinic.id,    // ← clé de routage pour le webhook
      consultationId: form.get('consultationId'),
    },
  });

  // Le front reçoit job_id + status="pending" et attend l'event webhook
  return NextResponse.json(job, { status: 201 });
}`,
    js: `// app/api/consultation/transcribe/route.js
// Appelé quand un vétérinaire authentifié déclenche une transcription
import ReqVet from '@reqvet-sdk/sdk';

export async function POST(req) {
  // 1. Identifier la clinique de l'utilisateur dans votre système d'auth
  const userId = req.headers.get('x-user-id');
  const clinic = await db.getClinicByUser(userId);

  // 2. Déchiffrer la clé de CETTE clinique — jamais exposée au navigateur
  const reqvet = new ReqVet(decrypt(clinic.reqvet_api_key));

  const form  = await req.formData();
  const audio = form.get('audio');

  // 3. Upload direct Supabase (bypass Vercel)
  const { uploadUrl, path } = await reqvet.getSignedUploadUrl(
    audio.name || 'consultation.webm',
    audio.type || 'audio/webm',
  );
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': audio.type || 'audio/webm' },
    body: Buffer.from(await audio.arrayBuffer()),
  });

  // 4. Créer le job — metadata.clinicId pour router le webhook
  const job = await reqvet.createJob({
    audioFile:   path,
    animalName:  form.get('animalName'),
    templateId:  clinic.reqvet_template_id,
    callbackUrl: process.env.REQVET_WEBHOOK_URL,
    metadata: {
      clinicId:       clinic.id,
      consultationId: form.get('consultationId'),
    },
  });

  return new Response(JSON.stringify(job), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}`,
  },

  resellerWebhookRoute: {
    ts: `// app/api/reqvet/webhook/route.ts
// Un seul endpoint pour TOUTES vos cliniques — routing via metadata.clinicId
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const event   = JSON.parse(rawBody);

  // 1. Retrouver la clinique via metadata.clinicId (injecté dans createJob)
  const clinicId = event.metadata?.clinicId as string | undefined;
  if (!clinicId) return new NextResponse('Bad Request', { status: 400 });

  const clinic = await db.getClinic(clinicId);
  if (!clinic) return new NextResponse('Not Found', { status: 404 });

  // 2. Vérifier la signature avec le secret de CETTE clinique
  const { ok, reason } = verifyWebhookSignature({
    secret:    decrypt(clinic.reqvet_wh_secret), // propre à chaque clinique
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp:  req.headers.get('x-reqvet-timestamp') ?? '',
    maxSkewMs:  5 * 60 * 1000,
  });

  if (!ok) {
    console.warn(\`ReqVet webhook — signature invalide (clinique \${clinicId}):\`, reason);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 3. Traiter l'event dans le contexte de la clinique
  if (event.event === 'job.completed') {
    await db.saveReport(clinicId, {
      consultationId: event.metadata.consultationId,
      jobId:          event.job_id,
      html:           event.html,
      fields:         event.fields ?? null,
    });
    await notifyClinicFront(clinicId, event.job_id); // WebSocket / SSE
  }

  if (event.event === 'job.failed') {
    await db.markJobFailed(clinicId, event.job_id, event.error);
  }

  return NextResponse.json({ ok: true });
}`,
    js: `// app/api/reqvet/webhook/route.js
// Un seul endpoint pour TOUTES vos cliniques — routing via metadata.clinicId
import { verifyWebhookSignature } from '@reqvet-sdk/sdk/webhooks';

export async function POST(req) {
  const rawBody = await req.text();
  const event   = JSON.parse(rawBody);

  // 1. Retrouver la clinique via metadata.clinicId
  const clinicId = event.metadata?.clinicId;
  if (!clinicId) return new Response('Bad Request', { status: 400 });

  const clinic = await db.getClinic(clinicId);
  if (!clinic) return new Response('Not Found', { status: 404 });

  // 2. Vérifier la signature avec le secret de CETTE clinique
  const { ok, reason } = verifyWebhookSignature({
    secret:    decrypt(clinic.reqvet_wh_secret),
    rawBody,
    signature: req.headers.get('x-reqvet-signature') ?? '',
    timestamp:  req.headers.get('x-reqvet-timestamp') ?? '',
    maxSkewMs:  5 * 60 * 1000,
  });

  if (!ok) {
    console.warn(\`Signature invalide (clinique \${clinicId}):\`, reason);
    return new Response('Unauthorized', { status: 401 });
  }

  // 3. Traiter dans le contexte de la clinique
  if (event.event === 'job.completed') {
    await db.saveReport(clinicId, {
      consultationId: event.metadata.consultationId,
      jobId:  event.job_id,
      html:   event.html,
      fields: event.fields ?? null,
    });
    await notifyClinicFront(clinicId, event.job_id);
  }

  if (event.event === 'job.failed') {
    await db.markJobFailed(clinicId, event.job_id, event.error);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}`,
  },

  resellerManage: {
    ts: `// ─── Lister les cliniques avec usage du mois ────────────────────
const { organizations } = await reseller.listOrganizations();
// organizations: [{ id, name, is_active, monthly_quota, usage: { jobs_this_month, quota_remaining } }]

for (const org of organizations) {
  console.log(\`\${org.name} — \${org.usage.jobs_this_month} jobs / quota \${org.monthly_quota}\`);
}

// ─── Détail d'une clinique ───────────────────────────────────────
const org = await reseller.getOrganization(orgId);
// { ...org, usage: { jobs_this_month: 42, quota_remaining: 458 } }

// ─── Augmenter le quota ──────────────────────────────────────────
await reseller.updateOrganization(orgId, { monthlyQuota: 1000 });

// ─── Suspendre une clinique (révoque aussi ses clés API) ─────────
await reseller.updateOrganization(orgId, { isActive: false });

// ─── Réactiver ───────────────────────────────────────────────────
await reseller.updateOrganization(orgId, { isActive: true });

// ─── Mettre à jour le webhook ────────────────────────────────────
await reseller.updateOrganization(orgId, {
  webhookUrl: 'https://votre-app.com/webhooks/reqvet/v2',
});

// ─── Désactiver définitivement (soft delete — données conservées RGPD) ──
await reseller.deactivateOrganization(orgId);
// → { success: true, message: 'Organization and API keys deactivated' }`,
    js: `// ─── Lister les cliniques avec usage du mois ────────────────────
const { organizations } = await reseller.listOrganizations();

for (const org of organizations) {
  console.log(\`\${org.name} — \${org.usage.jobs_this_month} jobs / quota \${org.monthly_quota}\`);
}

// ─── Détail d'une clinique ───────────────────────────────────────
const org = await reseller.getOrganization(orgId);

// ─── Modifier le quota ───────────────────────────────────────────
await reseller.updateOrganization(orgId, { monthlyQuota: 1000 });

// ─── Suspendre / Réactiver ───────────────────────────────────────
await reseller.updateOrganization(orgId, { isActive: false });
await reseller.updateOrganization(orgId, { isActive: true });

// ─── Désactiver définitivement (soft delete) ─────────────────────
await reseller.deactivateOrganization(orgId);`,
  },
};

// ─── Syntax highlighter (VS Code Dark+) ──────────────────────

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const KW = new Set([
  'import','export','from','as','const','let','var','function','return',
  'async','await','type','interface','class','extends','implements','new',
  'this','true','false','null','undefined','if','else','for','while','do',
  'try','catch','finally','throw','typeof','instanceof','of','in','default',
  'case','switch','break','continue','void','delete','yield','static',
  'super','readonly','enum','declare','abstract','private','protected',
  'public','override',
]);

const OP_KW = new Set(['typeof','instanceof','void','delete','in','of','new','throw']);

function highlight(code: string): string {
  let out = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Line comment //
    if (code[i] === '/' && code[i + 1] === '/') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out += `<span class="tc">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Block comment /* */
    if (code[i] === '/' && code[i + 1] === '*') {
      let j = i + 2;
      while (j < n - 1 && !(code[j] === '*' && code[j + 1] === '/')) j++;
      j = Math.min(j + 2, n);
      out += `<span class="tc">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Shell/env comment # at line start
    if (code[i] === '#' && (i === 0 || code[i - 1] === '\n')) {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out += `<span class="tc">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Template literal `...`
    if (code[i] === '`') {
      let j = i + 1;
      while (j < n && code[j] !== '`') {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, n);
      out += `<span class="ts">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // String " or '
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < n && code[j] !== q && code[j] !== '\n') {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, n);
      out += `<span class="ts">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Number
    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
      let j = i;
      while (j < n && /[\d.]/.test(code[j])) j++;
      out += `<span class="tn">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Identifier
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < n && /\w/.test(code[j])) j++;
      const word = code.slice(i, j);
      let k = j;
      while (k < n && (code[k] === ' ' || code[k] === '\t')) k++;

      let cls: string;
      if (OP_KW.has(word))       cls = 'to';
      else if (KW.has(word))     cls = 'tkw';
      else if (/^[A-Z]/.test(word)) cls = 'tt';
      else if (code[k] === '(') cls = 'tf';
      else                       cls = 'tv';

      out += `<span class="${cls}">${escHtml(word)}</span>`;
      i = j;
      continue;
    }
    // Everything else
    out += escHtml(code[i]);
    i++;
  }
  return out;
}

function detectLabel(code: string): string {
  const t = code.trimStart();
  if (t.startsWith('#') && /\n[A-Z_]+=/.test(code)) return '.env';
  if (/^npm |^yarn |^pnpm /.test(t)) return 'bash';
  if (/:\s*(string|number|boolean|Promise|void|any)\b/.test(code)) return 'TypeScript';
  return 'JavaScript';
}

// ─── UI components ────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const label = useMemo(() => detectLabel(code), [code]);
  const highlighted = useMemo(() => highlight(code), [code]);

  const copy = useCallback(() => {
    const doCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    void doCopy();
  }, [code]);

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <div className={styles.codeHeaderDots}>
          <span /><span /><span />
        </div>
        <span className={styles.codeHeaderLabel}>{label}</span>
      </div>
      <button
        type="button"
        className={styles.copyBtn}
        onClick={copy}
        aria-label="Copier le code"
      >
        {copied ? <span className={styles.copied}>Copié ✓</span> : <span>Copier</span>}
      </button>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className={styles.langToggle}>
      <button
        type="button"
        className={lang === 'ts' ? styles.active : ''}
        onClick={() => onChange('ts')}
      >
        TypeScript
      </button>
      <button
        type="button"
        className={lang === 'js' ? styles.active : ''}
        onClick={() => onChange('js')}
      >
        JavaScript
      </button>
    </div>
  );
}

function Callout({
  title,
  children,
  variant = 'info',
}: {
  title: string;
  children: React.ReactNode;
  variant?: 'info' | 'warn' | 'ok';
}) {
  const cls =
    variant === 'warn'
      ? styles.calloutWarn
      : variant === 'ok'
        ? styles.calloutOk
        : styles.callout;

  return (
    <div className={cls}>
      <div className={styles.calloutTitle}>{title}</div>
      <div className={styles.calloutBody}>{children}</div>
    </div>
  );
}

function GuideStep({
  number,
  title,
  description,
  code,
  note,
}: {
  number: number;
  title: string;
  description: string;
  code?: string;
  note?: React.ReactNode;
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
      {code ? <CodeBlock code={code} /> : null}
      {note ? <div className={styles.stepNoteRich}>{note}</div> : null}
    </div>
  );
}

// ─── Reference arrays ─────────────────────────────────────────

const METHODS = [
  { method: 'getSignedUploadUrl(fileName, contentType)', desc: '⭐ Obtient une URL signée Supabase pour upload direct (recommandé — contourne la limite Vercel ~4.5 MB)' },
  { method: 'uploadAudio(audio, fileName?)', desc: 'Upload via /api/v1/upload — limité à ~4.5 MB côté Vercel. Utilisez getSignedUploadUrl() en production.' },
  { method: 'generateReport(params)', desc: 'Upload + création de job en une seule étape (raccourci polling)' },
  { method: 'createJob(params)', desc: 'Crée un job de génération (approche webhook)' },
  { method: 'listJobs(options?)', desc: 'Liste les jobs avec pagination et filtres' },
  { method: 'getJob(jobId)', desc: "Statut + résultat d'un job (html, fields, cost, etc.)" },
  { method: 'waitForJob(jobId)', desc: "Polling jusqu'à completion — retourne le report complet" },
  { method: 'regenerateJob(jobId, options?)', desc: 'Régénère le HTML avec de nouvelles instructions (sans retranscrire)' },
  { method: 'amendJob(jobId, params)', desc: "Ajoute un complément audio à un compte-rendu terminé" },
  { method: 'reformulateReport(jobId, params)', desc: 'Reformule pour un public cible (owner, referral, summary…)' },
  { method: 'listReformulations(jobId)', desc: "Liste les reformulations existantes d'un job" },
  { method: 'listTemplates()', desc: 'Liste les templates disponibles — { system, custom }' },
  { method: 'getTemplate(id)', desc: 'Récupère un template par ID' },
  { method: 'createTemplate(params)', desc: 'Crée un template personnalisé pour votre organisation' },
  { method: 'updateTemplate(id, updates)', desc: 'Met à jour un template existant' },
  { method: 'deleteTemplate(id)', desc: 'Supprime un template personnalisé' },
  { method: 'health()', desc: "Vérifie la disponibilité de l'API ReqVet" },
  // ── Partner / Reseller (clé role='reseller' requise) ──
  { method: 'listOrganizations()', desc: "🏢 Revendeur — liste toutes les cliniques provisionnées avec leur usage du mois" },
  { method: 'createOrganization(params)', desc: "🏢 Revendeur — provisionne une clinique (génère sa clé API + webhook secret, idempotent via externalId)" },
  { method: 'getOrganization(orgId)', desc: "🏢 Revendeur — détail et usage du mois d'une clinique" },
  { method: 'updateOrganization(orgId, updates)', desc: "🏢 Revendeur — modifie quota, statut (suspend/réactive) ou webhook d'une clinique" },
  { method: 'deactivateOrganization(orgId)', desc: "🏢 Revendeur — désactive une clinique et révoque ses clés API (soft delete, RGPD)" },
];

const EVENTS = [
  {
    event: 'job.completed',
    desc: 'Compte-rendu prêt — contient html, transcription, fields? (si field_schema configuré), metadata',
  },
  {
    event: 'job.failed',
    desc: 'Échec du traitement — contient error (+ metadata). Le job est terminé, relancer si besoin.',
  },
  {
    event: 'job.amended',
    desc: 'Complément audio intégré — html mis à jour, amendment_number, fields? mis à jour',
  },
  {
    event: 'job.amend_failed',
    desc: 'Échec du complément audio — le compte-rendu original est préservé',
  },
  {
    event: 'job.regenerated',
    desc: 'Régénération terminée — html mis à jour, fields? mis à jour',
  },
];

// ─── Main page ─────────────────────────────────────────────────

export default function SdkPage() {
  const [lang, setLang] = useState<Lang>('ts');

  const toc = useMemo(
    () => [
      { href: '#overview', label: "Vue d'ensemble" },
      { href: '#pilot', label: 'Phase pilote' },
      { href: '#setup', label: 'Configuration (env + client)' },
      { href: '#field-schema', label: 'Field schema (prioritaire)' },
      { href: '#quickstart', label: 'Quick start — webhook' },
      { href: '#polling', label: 'Mode polling (dev)' },
      { href: '#nextjs', label: 'Intégration Next.js' },
      { href: '#webhook-events', label: 'Événements webhook' },
      { href: '#methods', label: 'Référence des méthodes' },
      { href: '#reseller', label: 'API Revendeur (multi-tenant)' },
      { href: '#faq', label: 'FAQ intégration' },
    ],
    [],
  );

  return (
    <div className={styles.page}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.badge}>SDK officiel — Phase pilote</span>
          <h1 className={styles.heroTitle}>
            Intégrez ReqVet
            <br />
            dans votre logiciel vétérinaire
          </h1>
          <p className={styles.heroSubtitle}>
            De l&apos;audio enregistré en consultation au compte-rendu HTML + données structurées
            injectables dans vos tables métier. TypeScript et JavaScript.
          </p>

          <div className={styles.heroInstall}>
            <CodeBlock code={SNIPPETS.install[lang]} />
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
            <a href="#pilot" className={styles.btnSecondary}>
              Phase pilote →
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

        {/* ── TOC ───────────────────────────────────────────── */}
        <nav className={styles.toc} aria-label="Sommaire">
          <div className={styles.tocTitle}>Guide d'intégration</div>
          <div className={styles.tocLinks}>
            {toc.map((t) => (
              <a key={t.href} className={styles.tocLink} href={t.href}>
                {t.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Overview ─────────────────────────────────────── */}
        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Vue d'ensemble</h2>
          <p className={styles.sectionSubtitle}>
            ReqVet suit un flux simple : <strong>audio → transcription → génération → résultat</strong>.
            Le résultat est un <strong>compte-rendu HTML</strong> prêt à afficher dans votre logiciel,
            accompagné optionnellement de <strong>fields</strong> — données structurées (poids, motif,
            conclusion…) directement injectables dans vos tables métier, si votre organisation a
            configuré un <strong>field_schema</strong>.
          </p>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Deux modes d'intégration</h3>
              <ul className={styles.bullets}>
                <li>
                  <strong>Webhook (recommandé en prod)</strong> : vous créez un job, ReqVet
                  envoie le résultat sur votre endpoint quand c'est prêt. Pas de timeout,
                  traitement découplé.
                </li>
                <li>
                  <strong>Polling</strong> : le SDK attend côté serveur jusqu'à{' '}
                  <code>completed</code> et retourne directement le report. Idéal pour le
                  développement, les scripts et les tests.
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Ce que vous recevez à chaque job</h3>
              <ul className={styles.bullets}>
                <li>
                  <strong>html</strong> : compte-rendu complet en HTML, prêt à afficher ou stocker.
                </li>
                <li>
                  <strong>transcription</strong> : transcription brute de l'audio (utile pour
                  audit ou correction).
                </li>
                <li>
                  <strong>fields</strong> : objet de données structurées{' '}
                  <code>{'{poids, motif, conclusion, ...}'}</code> — présent uniquement si votre
                  organisation a un <strong>field_schema</strong> configuré.
                </li>
                <li>
                  <strong>metadata</strong> : vos IDs internes, renvoyés tels quels (passthrough).
                </li>
              </ul>
            </div>
          </div>

          <Callout title="Ce que vous devez prévoir côté logiciel" variant="info">
            Avant de commencer, assurez-vous d'avoir prévu :
            <ul className={styles.bullets}>
              <li>
                Un <strong>endpoint HTTPS public</strong> pour recevoir les webhooks{' '}
                (<code>callbackUrl</code>) — doit être accessible depuis internet.
              </li>
              <li>
                <strong>Stocker le <code>job_id</code></strong> en base de données, relié à votre
                consultation (clé étrangère ou champ dédié).
              </li>
              <li>
                <strong>Gérer les events</strong> <code>job.completed</code> et{' '}
                <code>job.failed</code> dans votre handler webhook (+ idempotence).
              </li>
              <li>
                <strong>Notifier l'UI</strong> quand le compte-rendu est prêt (WebSocket, SSE,
                ou polling sur votre propre endpoint).
              </li>
              <li>
                <strong>Définir votre field_schema</strong> dès le départ si vous voulez des
                données structurées — voir la section dédiée ci-dessous.
              </li>
            </ul>
          </Callout>

          <Callout title="Sécurité — clé API" variant="warn">
            N'exposez jamais <code>REQVET_API_KEY</code> côté navigateur. Utilisez le SDK
            exclusivement dans vos API routes / serveur et faites un{' '}
            <strong>proxy</strong> pour votre front. Voir la section{' '}
            <a href="#nextjs">Intégration Next.js</a> pour le pattern recommandé.
          </Callout>
        </section>

        {/* ── Phase pilote ──────────────────────────────────── */}
        <section id="pilot" className={styles.section}>
          <h2 className={styles.sectionTitle}>Phase pilote</h2>
          <p className={styles.sectionSubtitle}>
            ReqVet est actuellement en <strong>phase pilote</strong>, destinée à valider
            l'adoption et l'intégration technique au sein de votre logiciel métier sur un
            groupe pilote de cliniques.
          </p>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Ce que vous obtenez pour la phase pilote</h3>
              <ul className={styles.bullets}>
                <li>
                  <strong>Une clé API unique</strong> (<code>REQVET_API_KEY</code>) pour votre
                  organisation — c'est tout ce dont vous avez besoin pour commencer.
                </li>
                <li>
                  Un <strong>secret webhook</strong> (<code>REQVET_WEBHOOK_SECRET</code>) pour
                  sécuriser les événements entrants.
                </li>
                <li>
                  Accès à tous les <strong>templates système</strong> ReqVet disponibles.
                </li>
                <li>
                  Configuration de votre <strong>field_schema</strong> par l'équipe ReqVet
                  (transmettez-le avant votre premier job).
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>API Revendeur — multi-tenant disponible</h3>
              <ul className={styles.bullets}>
                <li>
                  Le moteur ReqVet inclut une architecture <strong>multi-tenant</strong> complète,{' '}
                  accessible dès maintenant via l'<strong>API Revendeur</strong> — une clé{' '}
                  <code>REQVET_RESELLER_KEY</code> (role <code>reseller</code>) suffit.
                </li>
                <li>
                  Provisionnez, gérez et suspendez vos <strong>cliniques clientes</strong>{' '}
                  programmatiquement : <code>createOrganization</code>,{' '}
                  <code>listOrganizations</code>, <code>updateOrganization</code>…
                </li>
                <li>
                  Chaque clinique reçoit sa propre <strong>clé API isolée</strong> et son{' '}
                  <code>webhook_secret</code>. Isolation des données garantie en base.{' '}
                  Voir la <a href="#reseller">section dédiée</a> pour le guide complet.
                </li>
              </ul>
            </div>
          </div>

          <Callout title="Checklist de démarrage rapide" variant="ok">
            <ol style={{ paddingLeft: '1.2rem', margin: '0' }}>
              <li style={{ marginBottom: '6px' }}>
                Récupérez vos variables d'environnement auprès de l'équipe ReqVet
                (<code>REQVET_API_KEY</code>, <code>REQVET_WEBHOOK_SECRET</code>,{' '}
                <code>REQVET_BASE_URL</code>).
              </li>
              <li style={{ marginBottom: '6px' }}>
                Définissez votre <strong>field_schema</strong> (les champs à extraire) et
                transmettez-le à l'équipe ReqVet — <a href="#field-schema">voir section dédiée</a>.
              </li>
              <li style={{ marginBottom: '6px' }}>
                Exposez un endpoint HTTPS public pour les webhooks et communiquez l'URL à
                l'équipe ReqVet (<code>REQVET_WEBHOOK_URL</code>).
              </li>
              <li style={{ marginBottom: '6px' }}>
                Installez le SDK : <code>npm install @reqvet-sdk/sdk</code>
              </li>
              <li>
                Suivez le <a href="#quickstart">Quick start</a> ci-dessous — vous serez
                opérationnel en moins d'une heure.
              </li>
            </ol>
          </Callout>
        </section>

        {/* ── Setup ─────────────────────────────────────────── */}
        <section id="setup" className={styles.section}>
          <h2 className={styles.sectionTitle}>Configuration (env + client)</h2>
          <p className={styles.sectionSubtitle}>
            L'équipe ReqVet vous fournit les variables d'environnement lors de l'onboarding.
            Stockez-les <strong>uniquement côté serveur</strong> — jamais dans le code client
            ou un dépôt git.
          </p>

          <div className={styles.grid2}>
            <div>
              <h3 className={styles.subTitle}>1) Variables d'environnement</h3>
              <CodeBlock code={SNIPPETS.env[lang]} />
              <p className={styles.sectionNote}>
                Ajoutez ces variables dans <code>.env.local</code> (Next.js) ou dans votre
                gestionnaire de secrets (Vault, Doppler, Railway, Vercel env…).
                <br />
                <strong>Ne jamais committer</strong> ces valeurs — ajoutez{' '}
                <code>.env.local</code> à votre <code>.gitignore</code>.
              </p>
            </div>
            <div>
              <h3 className={styles.subTitle}>2) Initialiser le client (singleton)</h3>
              <CodeBlock code={SNIPPETS.init[lang]} />
              <p className={styles.sectionNote}>
                Créez un fichier <code>lib/reqvet.ts</code> qui instancie le client une
                seule fois et l'exporte. Importez ce singleton dans vos API routes.
                Ne jamais importer depuis un composant client.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 className={styles.subTitle}>3) Récupérer un templateId (une fois)</h3>
            <CodeBlock code={SNIPPETS.templates[lang]} />
            <p className={styles.sectionNote}>
              Le <code>templateId</code> est requis à chaque job. Appelez{' '}
              <code>listTemplates()</code> une fois au démarrage, mettez le résultat en cache
              ou stockez l'ID en configuration. Les templates <em>system</em> sont fournis et
              maintenus par ReqVet ; vous pouvez aussi créer vos propres templates{' '}
              <em>custom</em> via le CRUD disponible dans le SDK.
            </p>
          </div>
        </section>

        {/* ── Field schema ───────────────────────────────────── */}
        <section id="field-schema" className={styles.section}>
          <h2 className={styles.sectionTitle}>Field schema — champs structurés (prioritaire)</h2>
          <p className={styles.sectionSubtitle}>
            Le <strong>field_schema</strong> est la configuration qui indique à ReqVet quelles
            données structurées extraire de chaque consultation, en plus du compte-rendu HTML.
            C'est <strong>à définir et transmettre avant votre premier job</strong> — une fois
            activé sur votre <code>org_id</code>, il s'applique automatiquement à tous vos jobs.
          </p>

          <Callout title="Pourquoi le définir en priorité ?" variant="warn">
            Sans field_schema configuré, vous ne recevrez que le HTML et la transcription.
            Les <code>fields</code> seront <code>null</code> (polling) ou absents (webhook).{' '}
            <strong>Définissez-le avant de commencer votre intégration</strong> pour stabiliser
            le contrat de données entre ReqVet et vos tables métier. Un field_schema modifié
            après coup peut casser votre mapping — traitez-le comme un schéma de BDD.
          </Callout>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Comment le soumettre</h3>
              <ul className={styles.bullets}>
                <li>
                  Rédigez votre <code>schema.json</code> (exemple ci-dessous).
                </li>
                <li>
                  Envoyez-le à l'équipe ReqVet via votre channel pilote ou à{' '}
                  <code>contact@reqvet.com</code>.
                </li>
                <li>
                  L'équipe l'active sur votre <code>org_id</code> — vous recevez une confirmation.
                </li>
                <li>
                  Dès lors, <strong>tous vos jobs</strong> retournent automatiquement{' '}
                  <code>report.fields</code> (ou <code>event.fields</code> en webhook).
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Ce que vous recevez dans fields</h3>
              <ul className={styles.bullets}>
                <li>
                  Un objet JSON avec les <strong>mêmes keys que votre schema</strong> :
                  contrat stable entre ReqVet et vos tables.
                </li>
                <li>
                  Une valeur peut être <code>null</code> si le champ n'est pas mentionné
                  dans l'audio de la consultation.
                </li>
                <li>
                  <strong>Types disponibles</strong> : <code>string</code>, <code>text</code>,{' '}
                  <code>number</code>, <code>boolean</code>, <code>array</code>, <code>html</code>.
                  Le type <code>html</code> retourne du HTML structuré (sections, listes…).
                </li>
                <li>
                  Mappez directement <code>fields.poids</code> → colonne poids,{' '}
                  <code>fields.motif</code> → colonne motif, etc.
                </li>
              </ul>
            </div>
          </div>

          <h3 className={styles.subTitle} style={{ marginTop: '16px' }}>
            Exemple de schema.json
          </h3>
          <CodeBlock code={SNIPPETS.fieldSchema[lang]} />

          <Callout title="Conseil de modélisation" variant="info">
            Utilisez des keys en <code>snake_case</code>, stables et proches de vos noms
            de colonnes en base. Évitez les majuscules, espaces ou caractères spéciaux.
            Exemples : <code>poids</code>, <code>temperature</code>, <code>motif</code>,{' '}
            <code>conclusion</code>, <code>traitements</code>.
            <br />
            La <code>description</code> de chaque champ est le prompt envoyé à l'IA —
            plus elle est précise et contraignante, plus l'extraction est fiable.
          </Callout>
        </section>

        {/* ── Quick start (Webhook) ─────────────────────────── */}
        <section id="quickstart" className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick start — mode webhook (recommandé)</h2>
          <p className={styles.sectionSubtitle}>
            De zéro à un compte-rendu reçu sur votre webhook. Vous créez un job, ReqVet
            traite la consultation en arrière-plan et vous notifie quand c'est prêt.
          </p>

          <div className={styles.steps}>
            <GuideStep
              number={1}
              title="Uploader l'audio de la consultation"
              description="Envoyez le fichier audio enregistré pendant la consultation. Le SDK accepte File, Blob et Buffer."
              code={SNIPPETS.upload[lang]}
              note={
                <>
                  Formats acceptés : mp3, wav, webm, ogg, m4a, aac, flac.{' '}
                  Vous obtenez un <code>path</code> canonique à réutiliser dans{' '}
                  <code>createJob</code>.
                </>
              }
            />
            <GuideStep
              number={2}
              title="Créer le job de génération"
              description="Lance la transcription + la génération. Passez vos IDs internes dans metadata — ils seront renvoyés tels quels dans le webhook."
              code={SNIPPETS.createJob[lang]}
              note={
                <>
                  <strong>metadata</strong> : passthrough non interprété — vos IDs de consultation,
                  vétérinaire, clinique. Utilisez-les pour faire le lien avec votre base à la
                  réception du webhook.
                  <br />
                  <strong>extraInstructions</strong> : texte libre qui enrichit uniquement le
                  prompt de génération (n'affecte pas les fields, ne pollue pas vos données).
                </>
              }
            />
            <GuideStep
              number={3}
              title="Recevoir le payload job.completed"
              description="ReqVet appelle votre callbackUrl avec le résultat final. Voici le payload complet que vous recevrez."
              code={SNIPPETS.eventCompleted[lang]}
              note={
                <>
                  <strong>fields</strong> est présent uniquement si votre org a un{' '}
                  <strong>field_schema</strong> configuré. Voir la section{' '}
                  <a href="#field-schema">Field schema</a>.
                </>
              }
            />
            <GuideStep
              number={4}
              title="Vérifier la signature et traiter l'event"
              description="Vérifiez toujours le HMAC sur le rawBody avant de parser. Implémentez l'idempotence pour éviter les doubles traitements."
              code={SNIPPETS.webhook[lang]}
              note={
                <>
                  <strong>Idempotence</strong> : dédupliquez sur <code>job_id + event</code>{' '}
                  (stockez les événements déjà traités). ReqVet peut retenter les livraisons
                  échouées.
                  <br />
                  Après sauvegarde en base, <strong>notifiez votre UI</strong> que le
                  compte-rendu est prêt (WebSocket, SSE, ou polling côté front sur votre propre endpoint).
                </>
              }
            />
          </div>

          <Callout title="Comment exploiter le résultat dans votre logiciel" variant="ok">
            À la réception de <code>job.completed</code> :
            <ul className={styles.bullets}>
              <li>
                Stockez <code>html</code> et <code>transcription</code> dans votre table consultation.
              </li>
              <li>
                Injectez <code>fields</code> directement dans vos colonnes métier : poids,
                motif, traitements, conclusion…
              </li>
              <li>
                Utilisez <code>metadata.consultationId</code> (ou tout autre ID que vous
                avez passé) pour retrouver et mettre à jour la bonne consultation.
              </li>
              <li>
                Notifiez l'UI en temps réel (WebSocket/SSE) ou déclenchez un refresh côté front.
              </li>
            </ul>
          </Callout>
        </section>

        {/* ── Polling ───────────────────────────────────────── */}
        <section id="polling" className={styles.section}>
          <h2 className={styles.sectionTitle}>Mode polling (développement et scripts)</h2>
          <p className={styles.sectionSubtitle}>
            Alternative au webhook — le SDK attend côté serveur jusqu'à{' '}
            <code>completed</code> et retourne le report complet directement.
            Idéal pour développer rapidement, tester en CLI ou intégrer dans un script batch.
          </p>
          <CodeBlock code={SNIPPETS.polling[lang]} />
          <Callout title="Dev vs prod" variant="info">
            En développement, le mode polling est pratique car il ne nécessite pas d'endpoint
            public. En production, <strong>privilégiez le webhook</strong> : plus robuste,
            pas de timeout HTTP, traitement asynchrone découplé.
          </Callout>
        </section>

        {/* ── Next.js ───────────────────────────────────────── */}
        <section id="nextjs" className={styles.section}>
          <h2 className={styles.sectionTitle}>Intégration Next.js — proxy + webhook</h2>
          <p className={styles.sectionSubtitle}>
            Pattern recommandé pour les apps Next.js : votre front envoie l'audio à une route
            API interne (proxy), qui parle à ReqVet côté serveur. La clé API n'est jamais
            exposée au navigateur.
          </p>

          <div className={styles.grid2}>
            <div>
              <h3 className={styles.subTitle}>Route proxy — réception audio du front</h3>
              <CodeBlock code={SNIPPETS.nextProxy[lang]} />
            </div>
            <div>
              <h3 className={styles.subTitle}>Route webhook — réception des events ReqVet</h3>
              <CodeBlock code={SNIPPETS.webhook[lang]} />
            </div>
          </div>

          <Callout title="Flux complet côté front" variant="info">
            <ol style={{ paddingLeft: '1.2rem', margin: '0' }}>
              <li style={{ marginBottom: '6px' }}>
                Le front POST l'audio sur votre route proxy → reçoit immédiatement{' '}
                <code>{`{ job_id, status: "pending" }`}</code>.
              </li>
              <li style={{ marginBottom: '6px' }}>
                Le front stocke le <code>job_id</code> et affiche "Génération en cours…".
              </li>
              <li style={{ marginBottom: '6px' }}>
                Quand ReqVet envoie <code>job.completed</code> sur votre webhook, vous écrivez
                en base et <strong>notifiez le front</strong> (WebSocket, SSE, ou polling sur
                votre endpoint de statut).
              </li>
              <li>
                Le front récupère le HTML et les fields, et les affiche dans l'interface.
              </li>
            </ol>
          </Callout>
        </section>

        {/* ── Webhook events ────────────────────────────────── */}
        <section id="webhook-events" className={styles.section}>
          <h2 className={styles.sectionTitle}>Événements webhook</h2>
          <p className={styles.sectionSubtitle}>
            ReqVet envoie 5 types d'événements sur votre <code>callbackUrl</code>.
            Chaque event est signé HMAC — vérifiez toujours la signature avant de traiter.
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
            Headers envoyés avec chaque event :{' '}
            <code>x-reqvet-signature</code> (HMAC-SHA256) et{' '}
            <code>x-reqvet-timestamp</code> (Unix ms).
            Rejetez les events avec un timestamp trop ancien (<code>maxSkewMs</code>).
            Implémentez l'idempotence : dédupliquez sur <code>job_id + event</code>.
          </p>
        </section>

        {/* ── Methods reference ─────────────────────────────── */}
        <section id="methods" className={styles.section}>
          <h2 className={styles.sectionTitle}>Référence des méthodes</h2>
          <p className={styles.sectionSubtitle}>
            Toutes les méthodes du client <code>ReqVet</code>. Chaque appel async
            retourne une promesse typée — voir{' '}
            <a
              href="https://www.npmjs.com/package/@reqvet-sdk/sdk"
              target="_blank"
              rel="noreferrer"
            >
              SDK_REFERENCE.md
            </a>{' '}
            pour les types complets.
          </p>
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

          <div className={styles.grid2} style={{ marginTop: '16px' }}>
            <div>
              <h3 className={styles.subTitle}>Amend — complément audio</h3>
              <CodeBlock code={SNIPPETS.amend[lang]} />
              <div className={styles.spacer} />
              <h3 className={styles.subTitle}>Regenerate — nouvelle génération</h3>
              <CodeBlock code={SNIPPETS.regenerate[lang]} />
            </div>
            <div>
              <h3 className={styles.subTitle}>Reformulations</h3>
              <CodeBlock code={SNIPPETS.reformulate[lang]} />
              <p className={styles.sectionNote}>
                Les reformulations évitent de relancer transcription et génération complète.
                Pratique pour générer une version propriétaire (<em>owner</em>), une lettre
                de référé (<em>referral</em>), ou un résumé court (<em>summary</em>) depuis
                un job déjà traité.
              </p>
            </div>
          </div>
        </section>

        {/* ── Reseller / Multi-tenant ───────────────────────── */}
        <section id="reseller" className={styles.section}>
          <h2 className={styles.sectionTitle}>API Revendeur — multi-tenant</h2>
          <p className={styles.sectionSubtitle}>
            Si vous intégrez ReqVet pour vos clients (cliniques), l'API Revendeur vous permet
            de provisionner et gérer toutes vos cliniques de façon programmatique, avec une
            seule <strong>clé revendeur</strong> (<code>REQVET_RESELLER_KEY</code>, role{' '}
            <code>reseller</code>). Chaque clinique reçoit sa propre clé API isolée.
          </p>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Deux types de clés — ne pas confondre</h3>
              <ul className={styles.bullets}>
                <li>
                  <strong>Clé revendeur</strong> (<code>REQVET_RESELLER_KEY</code>) : permet
                  uniquement de provisionner et administrer des cliniques. Jamais utilisée pour
                  créer des jobs.
                </li>
                <li>
                  <strong>Clé clinique</strong> (<code>rqv_live_...</code>) : retournée par{' '}
                  <code>createOrganization</code>, utilisée par chaque clinique pour ses jobs.
                  Isolée par <code>org_id</code>.
                </li>
                <li>
                  Un revendeur <strong>ne peut accéder qu'à ses propres cliniques</strong> —
                  isolation garantie en base (<code>parent_org_id</code>).
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Ce que vous gérez via l'API</h3>
              <ul className={styles.bullets}>
                <li>
                  <strong>Onboarder</strong> une clinique en un appel (<code>createOrganization</code>){' '}
                  — idempotent via <code>externalId</code> (votre ID interne).
                </li>
                <li>
                  <strong>Monitorer</strong> l'usage mensuel de chaque clinique{' '}
                  (<code>jobs_this_month</code>, <code>quota_remaining</code>).
                </li>
                <li>
                  <strong>Modifier</strong> le quota, <strong>suspendre</strong> ou{' '}
                  <strong>réactiver</strong> une clinique via <code>updateOrganization</code>.
                </li>
                <li>
                  <strong>Désactiver</strong> définitivement via <code>deactivateOrganization</code>{' '}
                  (soft delete — données conservées pour le RGPD).
                </li>
              </ul>
            </div>
          </div>

          <Callout title="⚠️ api_key et webhook_secret — one-time display" variant="warn">
            <code>createOrganization</code> retourne <code>api_key</code> et{' '}
            <code>webhook_secret</code> <strong>une seule fois</strong>, dans la réponse HTTP
            initiale. Seul le hash SHA-256 de la clé est stocké côté serveur — il est impossible
            de les récupérer après coup.
            <br />
            <strong>Stockez-les immédiatement</strong> dans votre vault ou base chiffrée, et
            transmettez la clé à la clinique via un canal sécurisé (jamais par email en clair).
            En cas de perte, la seule option est de désactiver l'org et d'en créer une nouvelle.
          </Callout>

          <div style={{ marginTop: '16px' }}>
            <h3 className={styles.subTitle}>1) Onboarder une clinique</h3>
            <CodeBlock code={SNIPPETS.resellerOnboard[lang]} />
          </div>

          <div style={{ marginTop: '16px' }}>
            <h3 className={styles.subTitle}>2) Gérer les cliniques (quota, statut, usage)</h3>
            <CodeBlock code={SNIPPETS.resellerManage[lang]} />
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 className={styles.subTitle}>3) Appeler ReqVet pour le bon utilisateur</h3>
            <p className={styles.sectionNote} style={{ marginBottom: '12px' }}>
              À chaque consultation, récupérez la clé de <strong>la clinique de l'utilisateur connecté</strong>{' '}
              depuis votre base et instanciez un client avec cette clé. La clé ne sort jamais du serveur.
            </p>
            <CodeBlock code={SNIPPETS.resellerKeyRuntime[lang]} />
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 className={styles.subTitle}>4) Router les webhooks entrants vers la bonne clinique</h3>
            <p className={styles.sectionNote} style={{ marginBottom: '12px' }}>
              Un seul endpoint webhook pour toutes vos cliniques. Le <code>metadata.clinicId</code>{' '}
              injecté dans <code>createJob</code> vous permet d'identifier la clinique, récupérer son
              secret et vérifier la signature.
            </p>
            <CodeBlock code={SNIPPETS.resellerWebhookRoute[lang]} />
          </div>

          <Callout title="Variables d'environnement revendeur" variant="info">
            Ajoutez dans votre <code>.env.local</code> :
            <br />
            <code>REQVET_RESELLER_KEY=rqv_live_...</code>
            <br />
            Cette variable est distincte de <code>REQVET_API_KEY</code>. Ne la mélangez pas avec
            les clés cliniques — instanciez deux clients séparés si vous en avez besoin côté serveur.
          </Callout>

          <div className={styles.grid2} style={{ marginTop: '16px' }}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Idempotence via externalId</h3>
              <p style={{ color: 'var(--fg-soft, #444)', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>
                Passez toujours <code>externalId</code> (votre ID clinique interne) à{' '}
                <code>createOrganization</code>. Si la clinique existe déjà, l'org existante
                est retournée sans doublon — sans <code>api_key</code> ni{' '}
                <code>webhook_secret</code> (déjà stockés de votre côté). Idéal pour rendre
                votre processus d'onboarding safe en cas de retry ou de double appel.
              </p>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Suspension vs Désactivation</h3>
              <p style={{ color: 'var(--fg-soft, #444)', fontSize: '13px', lineHeight: '1.75', margin: 0 }}>
                <strong>Suspension</strong> (<code>{'updateOrganization(id, { isActive: false })'}</code>) :
                réversible — la clinique et ses clés sont désactivées, mais vous pouvez réactiver.
                <br /><br />
                <strong>Désactivation</strong> (<code>deactivateOrganization(id)</code>) :
                irréversible dans le sens où les clés sont révoquées définitivement. Les données
                (jobs, transcriptions) sont conservées pour le RGPD. Utilisez la suspension
                pour les cas de non-paiement ou de gel temporaire.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section id="faq" className={styles.section}>
          <h2 className={styles.sectionTitle}>FAQ intégration</h2>

          <div className={styles.faq}>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Qu'est-ce que la phase pilote, concrètement ?</div>
              <div className={styles.faqA}>
                La phase pilote permet de valider l'adoption de ReqVet et la pertinence de
                l'intégration au sein de votre logiciel métier. Vous démarrez avec une{' '}
                <strong>clé API clinique</strong> (<code>REQVET_API_KEY</code>) pour vos premiers
                jobs. Dès que vous souhaitez gérer plusieurs cliniques, une{' '}
                <strong>clé revendeur</strong> (<code>REQVET_RESELLER_KEY</code>) est disponible
                pour provisionner et administrer vos cliniques via l'API Revendeur — voir la{' '}
                <a href="#reseller">section dédiée</a>.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Comment fonctionne le multi-tenant / l'API Revendeur ?</div>
              <div className={styles.faqA}>
                L'API Revendeur est disponible dès maintenant. Avec une clé <code>REQVET_RESELLER_KEY</code>{' '}
                (role <code>reseller</code>), vous pouvez provisionner et gérer vos cliniques clientes
                programmatiquement. Chaque clinique reçoit sa propre clé API et son isolation de données.
                Voir la <a href="#reseller">section dédiée</a> pour le guide complet et les exemples de code.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>
                Avec 100 cliniques, comment la bonne clé API arrive au bon vétérinaire ?
              </div>
              <div className={styles.faqA}>
                Les clés cliniques ne circulent jamais — elles restent dans votre base de données,
                chiffrées. Voici le flux : à la connexion, votre système d'auth identifie l'utilisateur
                et sait à quelle clinique il appartient. Quand il lance une transcription, votre API
                route récupère la clé chiffrée de cette clinique, la déchiffre côté serveur, et
                l'utilise pour instancier le client <code>ReqVet</code>. Le vétérinaire n'a jamais
                accès à la clé — il ne voit que les résultats. C'est le même pattern qu'avec Stripe
                ou Twilio : vous êtes le proxy, vos clés restent sur votre serveur.
                Voir les étapes 3 et 4 de la <a href="#reseller">section Revendeur</a>.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Comment soumettre mon field_schema ?</div>
              <div className={styles.faqA}>
                Rédigez votre <code>schema.json</code> (voir{' '}
                <a href="#field-schema">la section dédiée</a>) et transmettez-le à l'équipe
                ReqVet via votre channel pilote ou à <code>contact@reqvet.com</code>. L'équipe
                l'active sur votre <code>org_id</code> et vous confirme l'activation. À partir
                de là, tous vos jobs retournent automatiquement <code>report.fields</code>.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Que passer dans metadata ?</div>
              <div className={styles.faqA}>
                Vos identifiants internes et infos de corrélation :{' '}
                <code>consultationId</code>, <code>vetId</code>, <code>clinicId</code>, etc.
                ReqVet vous les renvoie <strong>tels quels</strong> dans chaque event webhook.
                Utilisez-les pour retrouver la consultation correspondante dans votre base et
                appliquer les mises à jour au bon endroit.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Différence entre metadata et extraInstructions ?</div>
              <div className={styles.faqA}>
                <strong>metadata</strong> = vos données business, passthrough pur — non
                interprétées par ReqVet, renvoyées telles quelles dans les events.
                <br />
                <strong>extraInstructions</strong> = texte libre qui enrichit le prompt de
                génération (exemple : "insister sur le suivi post-op"). N'affecte que le HTML
                généré, sans impact sur les <code>fields</code> ni sur vos données stockées.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>fields est null ou absent — c'est normal ?</div>
              <div className={styles.faqA}>
                Oui : <code>fields</code> n'est présent que si votre organisation a un{' '}
                <strong>field_schema activé</strong>. Sans configuration :{' '}
                <code>report.fields</code> vaut <code>null</code> en mode polling, et la clé{' '}
                <code>fields</code> est absente du payload webhook. Soumettez votre schema à
                l'équipe ReqVet pour l'activer.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Comment "redispatcher" fields dans mon logiciel ?</div>
              <div className={styles.faqA}>
                Traitez <code>fields</code> comme un dictionnaire stable : chaque{' '}
                <code>key</code> de votre schema.json mappe directement vers un champ de votre
                base. Exemple : <code>fields.poids</code> → colonne <code>poids</code> de la
                table consultation, <code>fields.traitements</code> → table traitements,{' '}
                <code>fields.motif</code> → colonne motif. Le contrat de données est stable
                tant que vous ne modifiez pas le schema.
              </div>
            </div>

            <div className={styles.faqItem}>
              <div className={styles.faqQ}>Pourquoi le webhook est-il recommandé en prod ?</div>
              <div className={styles.faqA}>
                Le traitement d'une consultation (transcription + génération) peut prendre
                de 20 secondes à quelques minutes selon la durée de l'audio. En webhook :{' '}
                <strong>pas de timeout HTTP</strong>, traitement entièrement asynchrone,
                et vous pouvez répondre immédiatement à l'utilisateur. Le polling est pratique
                en développement mais bloque une connexion côté serveur en production.
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Prêt à démarrer la phase pilote ?</h2>
          <p className={styles.ctaSubtitle}>
            Contactez l'équipe ReqVet pour obtenir votre clé API, configurer votre field_schema
            et rejoindre le programme pilote.
          </p>
          <a href="mailto:contact@reqvet.com" className={styles.btnPrimary}>
            Démarrer le pilote — contact@reqvet.fr
          </a>
        </section>
      </div>
    </div>
  );
}
