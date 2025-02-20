import { END_PONITS } from '@/app/endpoints';
import { createSession } from 'better-sse';
import { Router } from 'express';
import { postEventChannel } from '../post/post.event';

const router = Router();
export { router as sseRoute };

router.get(END_PONITS.SSE.BASE, async (req, res) => {
  const session = await createSession(req, res);
  postEventChannel.register(session);
});
