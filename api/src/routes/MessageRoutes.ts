import { Router } from "express";

import MessageController from "../controllers/MessageController";

import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router()
const controller = MessageController

router.post('/users/:userId/messages', authMiddleware, controller.create)
router.get('/messages', authMiddleware, controller.get)
router.get('/messages/:id', authMiddleware, controller.getById)
router.put('/users/:userId/messages/:id', authMiddleware, controller.update)
router.delete('/users/:userId/messages/:id', authMiddleware, controller.delete)

export default router