
import { Resend } from 'resend';
import path from "path";
 import dotenv from "dotenv"; 
 dotenv.config({ path: path.join(__dirname, "../config/.env") });
//require("dotenv").config({path:'../config/.env'});
const resend = new Resend(process.env.RESEND_API_KEY as string);

export default async function sendVerificationEmail(to: string, code: string) {
  const html = `<p>Votre code de vérification est : <strong>${code}</strong>. Il expire dans 10 minutes.</p>`;

  const { data, error } = await resend.emails.send({
    from: 'Elyft Recrutement <onboarding@resend.dev>',  // ou une adresse générique
    to: [to],
    subject: 'Votre code de vérification',
    html,
  });

  if (error) {
    console.error('Erreur d’envoi Resend :', error);
    throw new Error('Échec de l’envoi du mail de vérification');
  }

  console.log('Email envoyé avec Resend, id:', data.id);
}

