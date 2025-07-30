import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function sendToGoogleSheets({ nombre, email, numero, mensaje, fecha }) {
  // 1️⃣ Crear archivo temporal con las credenciales
  const credsContent = process.env.GOOGLE_CREDENTIALS;
  const tempPath = path.join(os.tmpdir(), 'google-creds.json');

  fs.writeFileSync(tempPath, credsContent);

  // 2️⃣ Autenticación con Google Sheets API usando archivo temporal
  const auth = new google.auth.GoogleAuth({
    keyFile: tempPath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const spreadsheetId = process.env.SHEET_ID;

  // 3️⃣ Leer los datos actuales para verificar duplicados
  const existingRows = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Leads!A:E',
  });

  const rows = existingRows.data.values || [];

  const emailExists = rows.some(row => row[1]?.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    console.log(`❗️Email duplicado: ${email}. No se insertará de nuevo.`);
    return;
  }

  // 4️⃣ Agregar nuevo lead si no hay duplicado
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Leads!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[nombre, email, numero, mensaje, fecha]],
    },
  });

  console.log(`✅ Nuevo lead agregado: ${email}`);
  return response.data;
}
