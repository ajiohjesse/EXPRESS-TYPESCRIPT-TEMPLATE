import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreatePostDTO = z.infer<typeof createPostSchema>;

export const getPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export type GetPostDTO = z.infer<typeof getPostSchema>;
