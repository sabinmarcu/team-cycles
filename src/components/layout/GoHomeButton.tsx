'use client';

import { Home } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const GoHomeButton = () => {
  const pathname = usePathname();
  if (pathname === '/') {
    return undefined;
  }
  return (
    <Link href="/" className="btn btn-square btn-ghost" aria-label="Go home">
      <Home />
    </Link>
  );
};
