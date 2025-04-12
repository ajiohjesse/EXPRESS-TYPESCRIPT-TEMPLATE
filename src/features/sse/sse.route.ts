import { createSession } from "better-sse";
import { Router } from "express";
import { postEventChannel } from "../posts/post.event";

const router = Router();
export { router as sseRoute };

router.get("/", async (req, res) => {
  const session = await createSession(req, res);
  postEventChannel.register(session);
});
