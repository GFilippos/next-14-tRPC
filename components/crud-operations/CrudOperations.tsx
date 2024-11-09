'use client';

import useAuthStore from '@/store/auth';
import ActionButton from '../reusable/ActionButton';
import useUserAction from '@/hooks/useUserAction';

const CrudOperations = () => {
  const { token, role } = useAuthStore();
  const { handleCreateUser, handleEditUser, handleDeleteUser, isLoading } = useUserAction();

  if (!token || role !== 'admin') return null;

  return (
    <div className="flex justify-end space-x-4 mt-8">
      <ActionButton variant="create" isLoading={isLoading.create} onClick={handleCreateUser} />
      <ActionButton variant="update" isLoading={isLoading.update} onClick={handleEditUser} />
      <ActionButton variant="delete" isLoading={isLoading.delete} onClick={handleDeleteUser} />
    </div>
  );
};

export default CrudOperations;
