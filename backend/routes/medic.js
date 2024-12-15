import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import * as medicController from '../controllers/medic.js';

router.get('/availability/get', auth, medicController.getDisponibilityController)
router.post('/availability/add', auth, medicController.addDisponibility)

export default router