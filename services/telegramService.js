import fetch from 'node-fetch';

export async function sendTelegramMessage({ nombre, email }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const message = `📥 *Nuevo lead recibido:*\n👤 *Nombre:* ${nombre}\n📧 *Email:* ${email}`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
}
