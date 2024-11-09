import { useState } from 'react';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';
import { useRouter } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';

const useUserAction = () => {
  const { token } = useAuthStore();
  const { selectedUserId } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = useState({ create: false, update: false, delete: false });
  const [errors, setErrors] = useState<{ general: string | null }>({ general: null });
  const { refetch } = trpc.getUsers.useQuery();
  const router = useRouter();
  const { clearSelectedUserId } = useUserStore();

  const handleCreateUser = async () => {
    setIsLoading((prev) => ({ ...prev, create: true }));
    console.log('Add User Clicked');
    router.push('/users/create');
    setIsLoading((prev) => ({ ...prev, create: false }));
  };

  const handleEditUser = async () => {
    if (!selectedUserId) return;
    setIsLoading((prev) => ({ ...prev, update: true }));
    router.push(`/users/${selectedUserId}/edit`);
    setIsLoading((prev) => ({ ...prev, update: false }));
  };

  const deleteUserMutation = trpc.deleteUser.useMutation({
    onSuccess: (data) => {
      if (data.status === 200) {
        clearSelectedUserId();
      } else {
        setErrors({ general: data.message || 'Delete failed' });
      }
    },
    onError: () => {
      setErrors({ general: 'An error occurred during deletion' });
    },
  });

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    setIsLoading((prev) => ({ ...prev, delete: true }));
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        // Call the delete user mutation
        const response = await deleteUserMutation.mutateAsync({ id: selectedUserId });

        if (response.status === 204) {
          console.log('deleted');
          clearSelectedUserId();
          await refetch();
        } else {
          setErrors({ general: response.message || 'Failed to delete user.' });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrors({ general: 'An error occurred during deletion: ' + error.message });
        } else {
          setErrors({ general: 'An unknown error occurred.' });
        }
      } finally {
        // Ensure loading state is reset in all cases
        setIsLoading((prev) => ({ ...prev, delete: false }));
      }
    }
    setIsLoading((prev) => ({ ...prev, delete: false }));
  };

  return {
    token,
    isLoading,
    selectedUserId,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    errors,
  };
};

export default useUserAction;
