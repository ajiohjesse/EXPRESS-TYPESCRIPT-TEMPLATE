import { authenticationError } from '@/helpers/errors';
import requestValidator from '@/helpers/request-validator';
import { sendResponse } from '@/helpers/response';
import type { RequestHandler } from 'express';
import { broadcastNewPost } from './post.event';
import postService from './post.service';
import { createPostSchema, getPostSchema } from './post.validator';

class PostController {
  createPost: RequestHandler = async (req, res) => {
    const userId = res.locals.userId;
    if (!userId) throw authenticationError;

    const post = requestValidator.validateBody(req.body, createPostSchema);
    const createdPost = await postService.createPost(post);
    broadcastNewPost(createdPost);

    sendResponse<typeof getPostSchema>(res, {
      type: 'success',
      statusCode: 201,
      message: 'Post created successfully',
      data: createdPost,
    });
  };

  getPost: RequestHandler = async (req, res) => {
    const post = await postService.getPost(req.params.id);

    sendResponse<typeof getPostSchema>(res, {
      type: 'success',
      statusCode: 200,
      message: 'Post fetched successfully',
      data: post,
    });
  };
}

export default new PostController();
