import nodemailer from 'nodemailer';

export async function sendEmail({ nombre, email }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"VitalHealth" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Gracias por contactarnos',
    text: `Hola ${nombre},\n\nGracias por tu interés en Glucalose. Muy pronto nos pondremos en contacto contigo.\n\nSaludos,\nEquipo VitalHealth`,
  };

  await transporter.sendMail(mailOptions);
}
