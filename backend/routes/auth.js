import express from 'express';
const router = express.Router();

import * as authController from '../controllers/auth.js';
import admin from '../middleware/admin.js';

router.post('/register', authController.register) // Regista um utilizador (Usa: body: {email, password, username})
router.post('/login', authController.login) // Autentica um utilizador (Usa: body: {username, password})
router.post('/medic/login', authController.login) // Autentica um utilizador (Usa: body: {username, password})
router.post('/medic/register', admin, authController.registerMedic)

export default router