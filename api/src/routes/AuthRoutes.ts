import { Router } from 'express';

import AuthController from '../controllers/AuthController'

const router = Router();
const authController = AuthController

router.post('/auth', authController.login)

export default router;
