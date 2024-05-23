import { OneMoreButton } from '@/components/users/OneMoreButton';
import { UsersList } from '@/components/users/UsersList';

export default function UsersListPage() {
  return (
    <>
      <div className="page-title">
        <h2>Users List:</h2>
      </div>
      <div className="flex flex-col gap-4">
        <UsersList />
        <div className="flex flex-row justify-end">
          <OneMoreButton />
        </div>
      </div>
    </>
  );
}
