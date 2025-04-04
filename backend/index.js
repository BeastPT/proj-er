import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

export const app = express();

app.use(express.json()) // Middleware para interpretar JSON
app.use(cors()); // Middleware para permitir CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Comunicacao entre servidores diferentes)


import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url';

const __dirname = path.resolve();
const routesPath = path.join(__dirname, 'routes')

fs.readdirSync(routesPath).forEach(async (file) => {
    if (file.endsWith('.js')) {
        const filePath = pathToFileURL(path.join(routesPath, file)).href;
        const route = await import(filePath);
        app.use(`/api/${file.replace('.js', '')}`, route.default);
    }
});

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`)) // Inicia o servidor na porta 3001

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { // Conecta-se à base de dados
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
    process.exit(1);
});