'use client';

import { useGetItemList } from '@/hooks/useGetItemList';
import CredentialCard from './CredentialCard';

export interface CredentialListProperties {
  userId: string,
}

export function CredentialList({ userId }: CredentialListProperties) {
  const credentials = useGetItemList('credential', ['owner', '==', userId]);

  const canRemove = (credentials?.length ?? 0) > 0;

  return (
    <div className="flex flex-row gap-2">
      {credentials
        ? credentials.map((credential) => (
          <CredentialCard
            canRemove={canRemove}
            credential={credential}
            key={credential.id}
          />
        ))
        : (<div className="skeleton w-full" />)}
    </div>
  );
}
