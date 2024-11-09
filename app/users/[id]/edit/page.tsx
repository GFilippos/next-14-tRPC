'use client';

import React, { useEffect, useState } from 'react';
import { updateUserSchema } from '@/schemas/userSchemas';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { trpc } from '@/app/_trpc/client';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user';

type EditUserProps = {
  params: {
    id: string;
  };
};

type UserFormValues = z.infer<typeof updateUserSchema>;
type FormErrors = Partial<Record<keyof UserFormValues, string>> & { general?: string };

const EditUserForm = ({ params }: EditUserProps) => {
  const router = useRouter();
  const { clearSelectedUserId } = useUserStore();
  const [formValues, setFormValues] = useState<UserFormValues>({
    id: params.id,
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const { data, isLoading, error } = trpc.getUserById.useQuery({ id: params.id });
  const foundUser = data?.user;

  const updateUserMutation = trpc.updateUser.useMutation({
    onSuccess: (data) => {
      if (data.status === 200) {
        clearSelectedUserId();
        router.push('/users');
      } else {
        setErrors({ general: data.message || 'Update failed' });
      }
    },
    onError: () => {
      setErrors({ general: 'An error occurred during update' });
    },
  });

  useEffect(() => {
    if (foundUser) {
      setFormValues({
        id: foundUser.id,
        name: foundUser.name || '',
        email: foundUser.email,
        password: '',
        role: foundUser.role,
      });
    }
  }, [foundUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      updateUserSchema.parse(formValues);
      await updateUserMutation.mutateAsync(formValues);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof UserFormValues, string>> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            const key = error.path[0] as keyof UserFormValues;
            formErrors[key] = error.message;
          }
        });
        setErrors(formErrors);
      } else {
        console.error('Update failed:', err);
      }
    }
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center justify-center w-full h-full">
      <div className="flex flex-col">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div className="flex flex-col">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div className="flex flex-col">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          className="border rounded-md p-2"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <div className="flex justify-center items-end gap-4">
        <div className="flex flex-col">
          <label>Role:</label>
          <select name="role" value={formValues.role} onChange={handleChange} className="border rounded-md p-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}
        </div>
        <Button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Update User
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;
