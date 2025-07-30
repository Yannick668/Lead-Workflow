import { sendToGoogleSheets } from '../services/googleSheetsService.js';
// import { sendTelegramMessage } from '../services/telegramService.js';
import { sendEmail } from '../services/emailService.js'; // Comentado temporalmente

export const webhookController = async (req, res) => {
  try {
    const { nombre, email, numero, mensaje, fecha } = req.body;

    console.log('✅ Datos recibidos:', { nombre, email, numero, mensaje, fecha });

    if (!nombre || !email || !numero) {
      console.warn('⚠️ Faltan datos obligatorios');
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // 1️⃣ Google Sheets
    try {
      await sendToGoogleSheets(nombre, email, numero, mensaje, fecha);
      console.log('✅ Google Sheets: Lead agregado');
    } catch (gsError) {
      console.error('❌ Error al guardar en Google Sheets:', gsError.message || gsError);
    }

    // 2️⃣ Telegram
    /*
    try {
      await sendTelegramMessage(nombre, email, numero, mensaje, fecha);
      console.log('✅ Telegram: Mensaje enviado');
    } catch (tgError) {
      console.error('❌ Error al enviar a Telegram:', tgError.message || tgError);
    }
    */

    // 3️⃣ Email (comentado por ahora)
   
    try {
      await sendEmail({ nombre, email });
      console.log('✅ Email: Mensaje enviado');
    } catch (emailError) {
      console.error('❌ Error al enviar correo:', emailError.message || emailError);
    }
  

    return res.status(200).json({ message: 'Lead procesado exitosamente' });

  } catch (error) {
    console.error('❌ Error general en webhookController:', error.message || error);
    return res.status(500).json({ error: 'Error al procesar el lead' });
  }
};
