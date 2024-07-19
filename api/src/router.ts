import { Router } from 'express'

import userRoutes from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';
import changePasswordRoutes from './routes/ChangePasswordRoutes';
import postRoutes from './routes/PostRoutes';

const router = Router()

router.use(userRoutes);
router.use(authRoutes);
router.use(changePasswordRoutes);
router.use(postRoutes);

export default router