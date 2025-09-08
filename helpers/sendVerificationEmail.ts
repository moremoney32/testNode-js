const nodemailer = require('nodemailer');
export default async function sendVerificationEmail(toEmail:string, code: string) {
  const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'francklionelngongangtchouta@gmail.com',
    pass: 'pnwl tamr vgag hyxd',
  },
});
  await transporter.sendMail({
    from: "FRANCO",
    to: toEmail,
    subject: "Votre code de vérification",
    text: `Votre code de vérification est : ${code}. Il expire dans 10 minutes.`
  });
}


// module.exports = sendVerificationEmail;
