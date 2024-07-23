import { Router } from 'express'

import userRoutes from './routes/UserRoutes'
import authRoutes from './routes/AuthRoutes'
import changePasswordRoutes from './routes/ChangePasswordRoutes'
import postRoutes from './routes/PostRoutes'
import scales from './routes/ScalesRoutes'

const router = Router()

router.use(userRoutes)
router.use(authRoutes)
router.use(changePasswordRoutes)
router.use(postRoutes)
router.use(scales)

export default router