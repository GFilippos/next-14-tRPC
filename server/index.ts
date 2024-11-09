import { User } from '@/types';
import { publicProcedure, router } from './trpc';
import { authUser, createUser, deleteUser, getUserById, getUsers, updateUser } from './user-service/userService';
import {
  authenticateUserSchema,
  createUserSchema,
  deleteUserSchema,
  getUserByIdSchema,
  updateUserSchema,
} from '@/schemas/userSchemas';
import jwt from 'jsonwebtoken';

export interface RouterResponse {
  status: number;
  message: string;
  user?: User;
}

export const appRouter = router({
  getUserById: publicProcedure.input(getUserByIdSchema).query(async ({ input }): Promise<RouterResponse> => {
    const user = await getUserById(input.id);
    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return {
      status: 200,
      message: 'User found',
      user,
    };
  }),
  getUsers: publicProcedure.query(async () => {
    const users = await getUsers();
    return users;
  }),
  authenticateUser: publicProcedure
    .input(authenticateUserSchema)
    .mutation(async ({ input }): Promise<RouterResponse & { token?: string; user?: User }> => {
      const { email, password } = input;

      try {
        const user = await authUser(email, password);
        if (!user) {
          throw new Error('User not found');
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
          throw new Error('JWT_SECRET environment variable is not set');
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
          expiresIn: '3h',
        });
        return { status: 200, message: 'Authenticated successfully', token, user };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return { status: 401, message: `Error authenticating user: ${errorMessage}` };
      }
    }),
  createUser: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
    const { name, email, password, role } = input;
    await createUser(name || null, email, password, role);
    return { status: 201, message: 'User created' };
  }),
  updateUser: publicProcedure.input(updateUserSchema).mutation(async ({ input }): Promise<RouterResponse> => {
    const { id, ...updateData } = input;
    await updateUser(id, updateData);
    return { status: 200, message: 'User updated' };
  }),
  deleteUser: publicProcedure.input(deleteUserSchema).mutation(async ({ input }): Promise<RouterResponse> => {
    await deleteUser(input.id);
    return { status: 204, message: 'User deleted' };
  }),
});

export type AppRouter = typeof appRouter;
