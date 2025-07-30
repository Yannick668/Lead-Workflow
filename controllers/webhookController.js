import { addToGoogleSheets } from '../services/googleSheetsService.js';
import { sendTelegramMessage } from '../services/telegramService.js';
import { sendThankYouEmail } from '../services/emailService.js';

export default async function webhookController(req, res) {
  const { nombre, email, numero, mensaje, fecha } = req.body;

  // Validación básica
  if (!nombre || !email || !numero || !mensaje || !fecha) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // 1. Guardar en Google Sheets (si no existe)
    await addToGoogleSheets({ nombre, email, numero, mensaje, fecha });

    // 2. Notificar por Telegram
    await sendTelegramMessage({ nombre, email, numero });

    // 3. Enviar correo al cliente
   // await sendThankYouEmail({ nombre, email });

    res.status(200).json({ message: 'Lead procesado correctamente' });
  } catch (error) {
    console.error('❌ Error en webhookController:', error.message);
    res.status(500).json({ error: 'Error al procesar el lead' });
  }
}
