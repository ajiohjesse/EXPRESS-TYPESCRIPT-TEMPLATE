import { authenticationError, notFoundError } from '@/helpers/error';
import requestValidator from '@/helpers/request-validator';
import { sendPaginatedResponse, sendResponse } from '@/helpers/response';
import type { RequestHandler } from 'express';
import { broadcastNewPost } from './post.event';
import postService from './post.service';
import {
  createPostSchema,
  postParamSchema,
  postQuerySchema,
  postSchema,
} from './post.validator';

class PostController {
  createPost: RequestHandler = async (req, res) => {
    const userId = res.locals.userId;
    if (!userId) throw authenticationError;

    const post = requestValidator.validateBody(req.body, createPostSchema);
    const createdPost = await postService.createPost(post);
    broadcastNewPost(createdPost);

    sendResponse<typeof postSchema>(res, {
      type: 'success',
      statusCode: 201,
      message: 'Post created successfully',
      data: createdPost,
    });
  };

  getAllPosts: RequestHandler = async (req, res) => {
    const query = requestValidator.validateQuery(req.query, postQuerySchema);
    const { posts, totalPosts } = await postService.getAllPosts(query);

    sendPaginatedResponse<typeof postSchema>(res, {
      statusCode: 200,
      message: 'Posts retrieved successfully',
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

    if (!post) throw notFoundError;

    sendResponse<typeof postSchema>(res, {
      type: 'success',
      statusCode: 200,
      message: 'Post fetched successfully',
      data: post,
    });
  };
}

export default new PostController();
