import { getSession } from '@/auth/session';
import AddCredentialToAccount from '@/components/account/AddCredentialToAccount';
import { CredentialList } from '@/components/account/CredentialList';
import { use } from 'react';

export default function AccountPage() {
  const user = use(getSession('auth'));
  if (!user) {
    return <h1>403</h1>;
  }

  return (
    <>
      <div className="page-root">
        <div className="page-title">
          <h2>Credentials list:</h2>
          <AddCredentialToAccount userId={user.id} />
        </div>
      </div>
      <CredentialList userId={user.id} />
    </>
  );
}
