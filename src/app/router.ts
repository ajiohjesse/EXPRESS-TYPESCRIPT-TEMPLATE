import { authRoute } from '@/modules/auth/auth.route';
import { postRoute } from '@/modules/post/post.route';
import { Router } from 'express';
import { END_PONITS } from './endpoints';

export const router = Router();
export { router as apiRoutes };

router.use('/', (req, res) => {
  throw new Error('test Error');
  res.send('Hello World');
});

router.use(END_PONITS.AUTH.BASE, authRoute);
router.use(END_PONITS.POSTS.BASE, postRoute);
