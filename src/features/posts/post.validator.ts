import { z } from "@/libs/openapi/zod-extend";

export const postParamSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .openapi({
    param: {
      description: "The id of the post",
    },
  });

export const postQuerySchema = z.object({
  search: z.string().optional(),
  limit: z.coerce.number().int().positive().min(1).max(100).default(50),
  page: z.coerce.number().int().positive().min(1).default(1),
});

export type PostQueryDTO = z.infer<typeof postQuerySchema>;

export const postCreateSchema = z
  .object({
    title: z.string().min(1).openapi({ example: "This is a sample post" }),
    content: z.string().min(1).openapi({ example: "Some sample post content" }),
  })
  .openapi("CreatePost");

export type PostCreateDTO = z.infer<typeof postCreateSchema>;

export const postSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .openapi("Post");

export type PostDTO = z.infer<typeof postSchema>;
