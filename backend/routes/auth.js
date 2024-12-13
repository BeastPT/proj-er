import express from 'express';
const router = express.Router();

import * as authController from '../controllers/auth.js';

router.post('/register', authController.register) // Regista um utilizador (Usa: body: {email, password, username})
router.post('/login', authController.login) // Autentica um utilizador (Usa: body: {username, password})
router.post('/medico/login', authController.logout) // Autentica um utilizador (Usa: body: {username, password})

export default router