import express from 'express';

import admin from '../middleware/admin.js';
import { addSpecialty } from '../controllers/specialty.js';

const router = express.Router();


router.post('/add', admin, addSpecialty)

export default router