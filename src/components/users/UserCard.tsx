'use client';

import { useGetItem } from '@/hooks/useGetItem';
import { Delete } from '@mui/icons-material';
import type { FC } from 'react';

export interface UserCardProperties {
  id: string,
}

export const UserCard: FC<UserCardProperties> = ({
  id,
}) => {
  const [user,, remove] = useGetItem('user', id);
  return (
    <div className="flex flex-row items-center justify-between py-2 px-4  border-base-300 border-b last-of-type:border-b-0">
      <p>{ user?.name }</p>
      <button
        className="btn btn-md btn-circle btn-error btn-outline hover:!text-base-content"
        onClick={remove}
        type="button"
        aria-label="Remove User"
      >
        <Delete />
      </button>
    </div>
  );
};
