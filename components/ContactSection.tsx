'use client';

import { useState } from 'react';
import styles from '@/components/styles/ContactPage.module.scss';
import { CheckCircle, AlertTriangle, Calendar, PawPrint } from 'lucide-react';
import NavBar from '@/components/NavBar';
import ScrollFadeIn from '@/components/animations/ScrollFadeIn';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur lors de l’envoi.');

      setSuccess('Message envoyé avec succès !');
      toast.success('Message envoyé !');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      toast.error('Erreur lors de l’envoi');
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contactSection}>
      <NavBar />
      <ScrollFadeIn>
        <h1>Contactez-nous</h1>
        <p>Nous sommes à votre écoute <PawPrint size={20} style={{marginLeft:10}}/></p>
      </ScrollFadeIn>

      <div className={styles.contactContent}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nom
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Téléphone (facultatif)
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          <label>
            Message
            <textarea name="message" rows={5} value={formData.message} onChange={handleChange} required />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>

          {success && (
            <div className={styles.success}>
              <CheckCircle size={20} /> {success}
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <AlertTriangle size={20} /> {error}
            </div>
          )}
        </form>

        <div className={styles.rdvBlock}>
          <h3><Calendar size={20} /> Prendre un rendez-vous</h3>
          <p>Réservez un créneau de 30 min avec l'équipe. Nous discuterons de votre besoin et répondrons à vos questions.</p>
          <a
            href="https://calendly.com/contact-reqvet/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.rdvButton}
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </section>
  );
}
