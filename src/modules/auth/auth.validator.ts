import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequestDTO = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  userId: z.string(),
  isEmailVerified: z.boolean(),
  token: z.string(),
});

export type LoginResponseDTO = z.infer<typeof loginResponseSchema>;
