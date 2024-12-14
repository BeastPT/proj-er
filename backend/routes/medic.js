import express from 'express';
const router = express.Router();

import { register } from '../controllers/auth.js';
import * as medicController from '../controllers/medic.js';

// router.post('/availability/get', medicController)
// router.post('/availability/add', medicController)
// router.post('/login', login)

export default router