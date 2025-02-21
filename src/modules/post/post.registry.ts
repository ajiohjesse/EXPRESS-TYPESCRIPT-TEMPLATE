import { END_PONITS } from '@/app/endpoints';
import { generateOpenApiResponses } from '@/helpers/openapi/openapi.helpers';
import { z } from '@/helpers/openapi/zod-extend';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';
import { getPostSchema } from './post.validator';

const r = new OpenAPIRegistry();
export { r as postRegistry };

r.registerPath({
  path: `${END_PONITS.POSTS.BASE}/{id}`,
  method: 'get',
  description: 'Get single post by id',
  operationId: 'getPost',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          description: 'The id of the post',
        },
      }),
    }),
  },
  tags: ['Posts'],
  responses: generateOpenApiResponses([
    {
      success: true,
      statusCode: StatusCodes.OK,
      description: 'Posts fetched successfully',
      schema: getPostSchema,
    },
  ]),
});
