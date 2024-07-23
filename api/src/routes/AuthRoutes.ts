import { Router } from 'express';

import AuthController from '../controllers/AuthController'

const router = Router();
const authController = AuthController

/**
 * @openapi
 * /api/auth:
 *   post:
 *     summary: Atentica o usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/auth', authController.login)

export default router;
