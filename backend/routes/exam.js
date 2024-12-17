import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

import * as examsController from '../controllers/exam.js';

router.post('/new', admin, examsController.addExam)
router.get('/get', auth, examsController.getExams)

export default router