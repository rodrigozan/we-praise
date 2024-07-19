import { Router } from 'express';

import PostController from '../controllers/PostController'

import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const postController = PostController

router.post('/posts', postController.post)
router.get('/posts', postController.get)
// router.get('/posts/:id', postController.getOne) 
router.put('/posts/:id', authMiddleware, postController.get)
// router.delete('/posts/:id', authMiddleware, postController.delete)

export default router;
