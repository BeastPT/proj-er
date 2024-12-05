import express from 'express';
const router = express.Router();

import * as authController from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

router.post('/register', authController.register) // Regista um utilizador (Usa: body: {email, password, username})
router.post('/login', authController.login) // Autentica um utilizador (Usa: body: {username, password})
router.post('/updatepassword', authMiddleware, authController.updatepassword) // Atualiza a palavra-passe de um utilizador (Usa: body: {oldpassword, newpassword})

export default router