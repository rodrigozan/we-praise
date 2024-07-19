import { Router } from 'express';

import ChangePasswordController from '../controllers/ChangePasswordController'

const router = Router();

const changePassCtrl = ChangePasswordController

router.post('/change-password/:id', changePassCtrl.change)

export default router;
