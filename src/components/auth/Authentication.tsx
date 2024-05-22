/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Person } from '@mui/icons-material';
import { getSession } from '@/auth/v2/session';
import type { FC } from 'react';
import {
  use,
} from 'react';
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
      <li className="my-1">Admin</li>
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
