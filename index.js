import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import webhookController from './controllers/webhookController.js';

dotenv.config();

const app = express();

// 1️⃣ Habilitar CORS (por defecto permite todos los orígenes)
app.use(cors());

// 2️⃣ Middleware para parsear JSON
app.use(bodyParser.json());

// 3️⃣ Ruta principal del webhook
app.post('/webhook', webhookController);

// 4️⃣ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook listening on port ${PORT}`);
});
