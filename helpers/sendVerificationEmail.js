const nodemailer = require('nodemailer');
async function sendVerificationEmail(toEmail, code) {
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


module.exports = sendVerificationEmail;