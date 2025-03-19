import { Router } from 'express';
import { END_PONITS } from './constants/endpoints';
import { postRoute } from './features/posts/post.route';
import { sseRoute } from './features/sse/sse.route';

export const router = Router();
export { router as apiRoutes };

router.use(END_PONITS.POSTS.BASE, postRoute);
router.use(END_PONITS.SSE.BASE, sseRoute);
