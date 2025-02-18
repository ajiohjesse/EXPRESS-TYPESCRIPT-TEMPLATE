import { Router } from 'express';
import { API_ROUTES } from '../../app/constants';
import { authRateLimiter } from '../../middlewares/rate-limiter.middleware';
import authController from './auth.controller';

const router = Router();
export { router as authRoute };

router.use(authRateLimiter);

router.post(API_ROUTES.AUTH.LOGIN, authController.login);
router.post(API_ROUTES.AUTH.REGISTER, authController.register);
