'use client';

import { registerAccount } from '@/auth/register';
import { Person } from '@mui/icons-material';
import type {
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const RegisterButton = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const changeName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setName(value);
  };
  const startRegistration = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!name) { return; }
    try {
      await registerAccount(name);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    } finally {
      setName('');
      modalRef.current?.close();
    }
  };
  const openModal = () => modalRef.current?.showModal();
  return (
    <>
      <button
        className="btn justify-start"
        onClick={openModal}
        type="button"
      >
        Register
      </button>
      {createPortal((
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </form>
            <form onSubmit={startRegistration}>
              <p>
                We&apos;ll just need your name to get things started,
                and a YubiKey, TouchID, Passkey, etc.
              </p>
              <label
                className="input input-bordered flex items-center gap-2 my-4"
                htmlFor="account-name-input"
                aria-controls="account-name-input"
              >
                <Person />
                <input
                  id="account-name-input"
                  type="text"
                  className="grow"
                  placeholder="John Doe"
                  value={name}
                  onChange={changeName}
                />
              </label>
              <div className="modal-action items-center justify-between">
                <p>When ready, press the button to the right</p>
                <button className="btn btn-primary" type="submit">
                  Start!
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button disabled={!name} type="button">Close</button>
          </form>
        </dialog>
      ),
      document && document.body)}
    </>
  );
};
