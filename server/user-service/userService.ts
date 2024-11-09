import prisma from '@/prisma/prismaClient';
import { User } from '@/types';
import bcrypt from 'bcrypt';

export type UserResponse = Omit<User, 'password'>;

export const getUserById = async (id: string): Promise<UserResponse | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) return null;
  const userResponse: UserResponse = {
    ...user,
    role: user.role as 'user' | 'admin',
  };

  return userResponse;
};

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export async function createUser(name: string | null, email: string, password: string, role: string = 'user') {
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
}

export async function updateUser(id: string, updateData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function authUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return {
    ...userWithoutPassword,
    role: user.role as 'user' | 'admin',
  };
}
