/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Person } from '@mui/icons-material';
import { getSession } from '@/auth/session';
import type { FC } from 'react';
import {
  use,
} from 'react';
import Link from 'next/link';
import { LoginButton } from './Login';
import { RegisterButton } from './Register';
import { LogoutButton } from './Logout';

export const Authenticated: FC<{ name: string }> = ({ name }) => (
  <div className="dropdown dropdown-end flex align-center justify-center">
    <div className="btn" tabIndex={0}>
      <Person />
      {name}
    </div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box">
      <li className="my-1">
        <Link href="/account" className="btn btn-ghost justify-start">Account</Link>
        <Link href="/users" className="btn btn-ghost justify-start">Users</Link>
      </li>
      <li className="my-1"><LogoutButton /></li>
    </ul>
  </div>
);

export const Anonymous: FC = () => (
  <div className="dropdown dropdown-end flex align-center justify-center">
    <button tabIndex={0} className="btn btn-square" type="button" aria-label="Authenticate">
      <Person />
    </button>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box">
      <li className="my-1"><LoginButton /></li>
      <li className="my-1"><RegisterButton /></li>
    </ul>
  </div>
);

export const AuthenticationButton = () => {
  const authSession = use(getSession('auth').catch(() => undefined));
  return authSession
    ? (<Authenticated name={authSession.name} />)
    : (<Anonymous />);
};
