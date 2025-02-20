import { authRateLimiter } from '@/middlewares/rate-limiter.middleware';
import { Router } from 'express';
import { END_PONITS } from '../../app/endpoints';
import authController from './auth.controller';

const router = Router();
export { router as authRoute };

router.use(authRateLimiter);

router.post(END_PONITS.AUTH.LOGIN, authController.login);
router.post(END_PONITS.AUTH.REGISTER, authController.register);
