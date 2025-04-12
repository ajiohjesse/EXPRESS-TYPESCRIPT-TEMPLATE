import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import postController from "./post.controller";

const router = Router();
export { router as postRoute };

router.post("/", authMiddleware, postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
