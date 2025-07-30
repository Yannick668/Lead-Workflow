import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import webhookController from './controllers/webhookController.js';

dotenv.config();

const app = express();

const allowedOrigin = 'https://darksalmon-salmon-617026.hostingersite.com';

app.use(cors({
  origin: allowedOrigin,
  methods: ['POST', 'GET'],
  credentials: false, // Cambia a true si usas cookies o headers con credenciales
}));

console.log(`🌐 CORS habilitado para: ${allowedOrigin}`);

// 2️⃣ Middleware para parsear JSON
app.use(bodyParser.json());

// 3️⃣ Ruta principal del webhook
app.post('/webhook', webhookController);

// 4️⃣ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook listening on port ${PORT}`);
});
