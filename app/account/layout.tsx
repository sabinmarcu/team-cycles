import { useRedirectIfNotAuthenticated } from '@/hooks/useRedirectIfNotAuthenticated';
import {
  type PropsWithChildren,
} from 'react';

export default function AccountDetailsLayout({ children }: PropsWithChildren) {
  useRedirectIfNotAuthenticated();
  return (
    children
  );
}
