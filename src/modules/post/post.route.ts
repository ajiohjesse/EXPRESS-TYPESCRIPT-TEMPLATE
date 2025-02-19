import { API_ROUTES } from '@/app/constants';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import postController from './post.controller';

const router = Router();
export { router as postRoute };

router.use(authMiddleware);

router.get(API_ROUTES.POST.GET, postController.getPost);
router.post(API_ROUTES.POST.CREATE, postController.createPost);
