'use client';

import { useGetItemList } from '@/hooks/useGetItemList';
import {
  Suspense,
  useMemo,
} from 'react';
import { UserCard } from './UserCard';

export function UsersList() {
  const users = useGetItemList('user');
  const sortedUsers = useMemo(
    () => users?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
    [users],
  );

  return (
    <div className="flex w-full flex-col bg-base-100 shadow-lg rounded-box py-2">
      <Suspense fallback={<div className="skeleton w-full h-32" />}>
        {sortedUsers?.map(({ id }) => (
          <UserCard id={id} key={id} />
        ))}
      </Suspense>
    </div>
  );
}
