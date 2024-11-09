import { z } from 'zod';

export const getUserByIdSchema = z.object({
  id: z.string().uuid(),
});

export const createUserSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().default('user'),
});

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().uuid(),
});

export const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
