import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

//adds the openapi methods to zod schemas
extendZodWithOpenApi(z);

export const createPostSchema = z
  .object({
    title: z.string().min(1),
    content: z.string().min(1),
  })
  .openapi('CreatePost');

export type CreatePostDTO = z.infer<typeof createPostSchema>;

export const getPostSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  })
  .openapi('Post');

export type GetPostDTO = z.infer<typeof getPostSchema>;
