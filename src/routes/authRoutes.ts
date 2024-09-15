import { Router } from 'express';
import { registerUser, loginUser,logoutUser, requestPasswordResetController, resetPasswordController } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser)
router.post('/forgot-password', requestPasswordResetController);
router.post('/reset-password', resetPasswordController);

export default router;
