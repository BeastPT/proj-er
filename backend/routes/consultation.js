import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import * as consultationController from '../controllers/consultation.js';

router.post('/new', auth, consultationController.newConsultation)
router.get('/get', auth, consultationController.getConsultations)
router.put('/cancel', auth, consultationController.cancelConsultation)

export default router