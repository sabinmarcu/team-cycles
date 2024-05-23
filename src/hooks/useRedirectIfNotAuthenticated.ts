import { getSession } from '@/auth/session';
import { redirect } from 'next/navigation';
import { use } from 'react';

export const useRedirectIfNotAuthenticated = (
  path = '/',
) => {
  const authSession = use(getSession('auth').catch(() => undefined));
  if (!authSession) {
    return redirect(path);
  }

  return undefined;
};
