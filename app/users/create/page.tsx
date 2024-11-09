'use client';

import React, { useState } from 'react';
import { createUserSchema } from '@/schemas/userSchemas';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { trpc } from '@/app/_trpc/client';
import { Button } from '@/components/ui/button';

type UserFormValues = z.infer<typeof createUserSchema>;
type FormErrors = Partial<Record<keyof UserFormValues, string>> & { general?: string };

const CreateUserForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<UserFormValues>({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const createUserMutation = trpc.createUser.useMutation({
    onSuccess: (data) => {
      if (data.status === 201) {
        router.push('/users');
      } else {
        setErrors({ general: data.message || 'Creation failed' });
      }
    },
    onError: () => {
      setErrors({ general: 'An error occurred during user creation' });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      createUserSchema.parse(formValues);
      await createUserMutation.mutateAsync(formValues);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const formErrors: Partial<Record<keyof UserFormValues, string>> = {};
        err.errors.forEach((error) => {
          const key = error.path[0] as keyof UserFormValues;
          formErrors[key] = error.message;
        });
        setErrors(formErrors);
      } else {
        console.error('Creation failed:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center justify-center w-full h-full">
      <div className="flex flex-col">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formValues.name || ''}
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
          Create User
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
