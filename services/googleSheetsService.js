import { google } from 'googleapis';

export async function addToGoogleSheets({ nombre, email, mensaje, fecha }) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credenciales-google.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const spreadsheetId = process.env.SHEET_ID;

  // 1️⃣ Leer los datos actuales para verificar duplicados
  const existingRows = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A:D',
  });

  const rows = existingRows.data.values || [];

  const emailExists = rows.some(row => row[1]?.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    console.log(`❗️Email duplicado: ${email}. No se insertará de nuevo.`);
    return;
  }

  // 2️⃣ Agregar nuevo lead si no hay duplicado
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[nombre, email, mensaje, fecha]],
    },
  });

  console.log(`✅ Nuevo lead agregado: ${email}`);
  return response.data;
}
