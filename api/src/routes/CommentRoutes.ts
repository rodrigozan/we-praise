import { Router } from "express"

import CommentController from "../controllers/CommentController"

import { authMiddleware } from "../middlewares/AuthMiddleware"

const router = Router()
const controller = CommentController

router.post(`/users/:userId/:postType/:postTypeId/comments`, authMiddleware, controller.create)
router.get('/users/:userId/:postType/:postTypeId/comments', authMiddleware, controller.get)
router.get('/users/:userId/:postType/:postTypeId/comments/:id', authMiddleware, controller.getById)
router.put('/users/:userId/:postType/:postTypeId/comments/:id', authMiddleware, controller.update)
router.delete('/users/:userId/:postType/:postTypeId/comments/:id', authMiddleware, controller.delete)

export default router