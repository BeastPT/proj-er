import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

export const app = express();

app.use(express.json()) // Middleware para interpretar JSON
app.use(cors()); // Middleware para permitir CORS (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Comunicacao entre servidores diferentes)


import auth from './routes/auth.js';
import chat from './routes/chat.js';
import service from './routes/services.js';
import users from './routes/users.js';
import product from './routes/product.js'

app.use('/api/auth', auth); 
app.use('/api/chat', chat);
app.use('/api/service', service);
app.use('/api/product', product);
app.use('/api/user', users)

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`)) // Inicia o servidor na porta 3001

mongoose.connect(process.env.MONGO_URL).then(() => { // Conecta-se à base de dados
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});