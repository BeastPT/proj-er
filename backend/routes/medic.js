import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import * as medicController from '../controllers/medic.js';

router.get('/availability/get', auth, medicController.getDisponibilityController)
router.get('/getall', medicController.getAllData)
router.post('/availability/add', auth, medicController.addDisponibility)
router.post('/get', auth, medicController.getMedicByEmail)

export default router