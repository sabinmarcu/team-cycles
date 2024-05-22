'use client';

import { logout } from '@/auth/v2/login';

export const LogoutButton = () => (
  <>
    <button
      className="btn justify-start"
      onClick={logout}
      type="button"
    >
      Logout
    </button>
  </>
);
