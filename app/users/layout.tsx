import { useRedirectIfNotAuthenticated } from '@/hooks/useRedirectIfNotAuthenticated';
import type { PropsWithChildren } from 'react';

export default function UsersListLayout({ children }: PropsWithChildren) {
  useRedirectIfNotAuthenticated();
  return (
    <main className="page-root">
      {children}
    </main>
  );
}
