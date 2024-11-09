'use client';

import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../ui/table';
import Loader from '../reusable/Loader';
import { Checkbox } from '../ui/checkbox';
import useUserStore from '@/store/user';

const UsersTable = () => {
  const [uniqueSelectedUserId, setUniqueSelectedUserId] = useState<string | null>(null);
  const setSelectedUserId = useUserStore((state) => state.setSelectedUserId);

  const { data: users, isLoading, error } = trpc.getUsers.useQuery();
  if (!users && !isLoading) {
    return <h1 className="flex items-center justify-center p-16">No users in database!</h1>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-32">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <h1 className="flex items-center justify-center p-16">Error loading users: {error.message}</h1>;
  }

  const handleSelectUser = (userId: string) => {
    const newSelectedUserId = uniqueSelectedUserId === userId ? null : userId;
    setUniqueSelectedUserId(newSelectedUserId);
    setSelectedUserId(newSelectedUserId);
  };

  const headers = Object.keys(users[0] || {});

  return (
    <Table className="table-fixed">
      <TableCaption>A list of all users in the database.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="p-2 md:p-0">Select</TableHead>
          {headers.map((header, i) => (
            <TableHead
              key={i}
              className={i === headers.length - 3 ? 'text-center' : i >= headers.length - 2 ? 'text-right' : ''}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="break-words">
            <TableCell className="p-0">
              <Checkbox
                id={`user-${user.id}`}
                checked={uniqueSelectedUserId === user.id}
                onCheckedChange={() => handleSelectUser(user.id)}
              />
            </TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-center">{user.role}</TableCell>
            <TableCell className="text-center lg:text-right">{user.createdAt}</TableCell>
            <TableCell className="text-right">{user.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="text-gray-500">
          <TableCell colSpan={headers.length} className="text-right">
            Total Users
          </TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UsersTable;
