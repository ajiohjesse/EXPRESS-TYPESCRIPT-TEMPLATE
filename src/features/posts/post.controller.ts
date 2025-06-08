import { assertUser } from "@/libs/assert-user";
import { errors } from "@/libs/errors";
import logger from "@/libs/logger";
import requestValidator from "@/libs/request-validator";
import { sendPaginatedResponse, sendResponse } from "@/libs/response";
import type { RequestHandler } from "express";
import { broadcastNewPost } from "./post.event";
import postService from "./post.service";
import {
  postCreateSchema,
  postParamSchema,
  postQuerySchema,
  postSchema,
} from "./post.validator";

class PostController {
  createPost: RequestHandler = async (req, res) => {
    const userId = assertUser(res);
    logger.info(userId);

    const post = requestValidator.validateBody(req.body, postCreateSchema);
    const createdPost = await postService.createPost(post);
    broadcastNewPost(createdPost);

    sendResponse<typeof postSchema>(res, {
      type: "success",
      statusCode: 201,
      message: "Post created successfully",
      data: createdPost,
    });
  };

  getAllPosts: RequestHandler = async (req, res) => {
    const query = requestValidator.validateQuery(req.query, postQuerySchema);
    const { posts, totalPosts } = await postService.getAllPosts(query);

    sendPaginatedResponse<typeof postSchema>(res, {
      message: "Posts retrieved successfully",
      data: {
        items: posts,
        meta: {
          page: query.page,
          limit: query.limit,
          totalItems: totalPosts,
        },
      },
    });
  };

  getPost: RequestHandler = async (req, res) => {
    const { id } = requestValidator.validateParams(req.params, postParamSchema);
    const post = await postService.getPost(id);

    if (!post) throw errors.notFoundError;

    sendResponse<typeof postSchema>(res, {
      type: "success",
      statusCode: 200,
      message: "Post fetched successfully",
      data: post,
    });
  };
}

export default new PostController();
