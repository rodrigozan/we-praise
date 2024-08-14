import { Router } from 'express';

import ChangePasswordController from '../controllers/ChangePasswordController'

const router = Router();

const changePassCtrl = ChangePasswordController

/**
 * @openapi
 * /api/change-password/{id}:
 *   post:
 *     summary: Change password user
 *     tags:
 *       - Change Password
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Password
 *               newPassword:
 *                 type: string
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password altered  successful
 *       404:
 *         description: User not found
 */
router.put('/change-password/:id', changePassCtrl.change)

export default router;
