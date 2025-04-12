import { END_PONITS } from "@/constants/endpoints";
import {
  generateOpenApiResponses,
  getPaginatedResponseSchema,
  openApiNotFoundResponse,
  openApiUnauthenticatedResponse,
} from "@/helpers/openapi/openapi.helpers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";
import {
  createPostSchema,
  postParamSchema,
  postQuerySchema,
  postSchema,
} from "./post.validator";

const r = new OpenAPIRegistry();
export { r as postRegistry };

r.registerPath({
  path: `${END_PONITS.POSTS.BASE}`,
  method: "post",
  description: "Create a new post",
  operationId: "createPost",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createPostSchema,
        },
      },
    },
  },
  tags: ["Posts"],
  responses: generateOpenApiResponses([
    {
      success: true,
      statusCode: StatusCodes.OK,
      description: "Posts created successfully",
      schema: postSchema,
    },
    openApiUnauthenticatedResponse,
  ]),
});

r.registerPath({
  path: `${END_PONITS.POSTS.BASE}`,
  method: "get",
  description: "Get all posts",
  operationId: "getAllPost",
  request: {
    query: postQuerySchema,
  },
  tags: ["Posts"],
  responses: generateOpenApiResponses([
    {
      success: true,
      statusCode: StatusCodes.OK,
      description: "Posts fetched successfully",
      schema: getPaginatedResponseSchema(postSchema),
    },
    openApiNotFoundResponse,
  ]),
});

r.registerPath({
  path: `${END_PONITS.POSTS.BASE}/{id}`,
  method: "get",
  description: "Get single post by id",
  operationId: "getPost",
  request: {
    params: postParamSchema,
  },
  tags: ["Posts"],
  responses: generateOpenApiResponses([
    {
      success: true,
      statusCode: StatusCodes.OK,
      description: "Posts fetched successfully",
      schema: postSchema,
    },
    openApiNotFoundResponse,
  ]),
});
