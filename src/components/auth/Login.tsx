'use client';

import { login } from '@/auth/v2/login';

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
