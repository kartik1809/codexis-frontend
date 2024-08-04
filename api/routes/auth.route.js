import express from 'express';
import { login, oauth, register } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/google',oauth)
router.post('/github',oauth)

export default router;