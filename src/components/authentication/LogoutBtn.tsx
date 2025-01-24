'use client';

import { logout } from '@/app/actions/auth-actions';

export default function LogoutBtn() {
  async function handleLogout() {
    await logout();
  }

  return (
    <span
      onClick={handleLogout}
      className='inline-block w-full cursor-pointer text-destructive'
    >
      Logout
    </span>
  );
}
