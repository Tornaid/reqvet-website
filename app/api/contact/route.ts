import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Tous les champs requis n'ont pas été fournis." }), {
        status: 400,
      });
    }

    const content = `📩 Nouveau message depuis la page Contact :

Nom : ${name}
Email : ${email}
Téléphone : ${phone || 'Non renseigné'}

Message :
${message}
`;

    const response = await resend.emails.send({
      from: 'ReqVet <no-reply@reqvet.com>',
      to: process.env.EMAIL_RECEIVER || 'hello@reqvet.com',
      subject: '📬 Nouveau message via le formulaire de contact',
      text: content,
    });

    if (response.error) {
      console.error('Erreur Resend:', response.error);
      return new Response(JSON.stringify({ error: 'Erreur lors de l’envoi du message.' }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: 'Message envoyé avec succès.' }), {
      status: 200,
    });
  } catch (err) {
    console.error('Erreur serveur:', err);
    return new Response(JSON.stringify({ error: 'Une erreur est survenue côté serveur.' }), {
      status: 500,
    });
  }
}
