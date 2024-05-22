'use client';

import { login } from '@/auth/login';

export const LoginButton = () => (
  <>
    <button
      className="btn justify-start"
      onClick={login}
      type="button"
    >
      Login
    </button>
  </>
);
