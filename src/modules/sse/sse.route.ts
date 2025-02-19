import { API_ROUTES } from '@/app/constants';
import { createSession } from 'better-sse';
import { Router } from 'express';
import { postEventChannel } from '../post/post.event';

const router = Router();
export { router as sseRoute };

router.get(API_ROUTES.SSE, async (req, res) => {
  const session = await createSession(req, res);
  postEventChannel.register(session);
});
