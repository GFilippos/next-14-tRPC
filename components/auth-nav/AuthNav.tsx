'use client';

import { LogOut } from 'lucide-react';
import useAuthStore from '@/store/auth';
import Link from 'next/link';

const AuthNav = () => {
  const { token, clearAuth } = useAuthStore();
  const session = token !== null;

  const AuthLink = session ? (
    <button
      onClick={() => {
        clearAuth();
      }}
      className="text-white"
    >
      <div className="flex gap-2">
        <LogOut />
        <span>Logout</span>
      </div>
    </button>
  ) : (
    <Link href={'/login'} className="underline">
      Login Admin (for CRUD)
    </Link>
  );

  return <div>{AuthLink}</div>;
};

export default AuthNav;
