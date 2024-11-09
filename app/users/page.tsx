'use client';

import CrudOperations from '@/components/crud-operations/CrudOperations';
import UsersTable from '@/components/user/UsersTable';

const Users = () => {
  return (
    <div className="flex-1 bg-gray-100 p-4 lg:p-16">
      <header className="text-gray-700 font-bold text-2xl mb-4">Users Overview</header>
      <UsersTable />
      <CrudOperations />
    </div>
  );
};

export default Users;
