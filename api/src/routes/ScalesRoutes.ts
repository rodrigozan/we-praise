import { Router } from "express";

import ScaleController from "../controllers/ScaleController";

import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router()
const controller = ScaleController

router.get('/scales', authMiddleware, controller.get)
router.post('/users/:userId/scales', authMiddleware, controller.create)

export default router
