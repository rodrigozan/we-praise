import { Router } from 'express';

import UserController from '../controllers/UserController';

import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const userController = UserController;

router.post('/users', userController.create);
router.get('/users', userController.get);
router.get('/users/:id', userController.getOne);
router.put('/users/:id', authMiddleware, userController.update);
router.delete('/users/:id', authMiddleware, userController.delete);

export default router;
