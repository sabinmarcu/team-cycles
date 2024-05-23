'use client';

import { registerNewDevice } from '@/auth/register';
import type {
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export interface AddCredentialToAccountProperties {
  userId: string,
}

export default function AddCredentialToAccount({ userId }: AddCredentialToAccountProperties) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [deviceName, setDeviceName] = useState('');
  const changeName = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setDeviceName(value);
  };
  const startRegistration = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await registerNewDevice(userId, deviceName);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    } finally {
      setDeviceName('');
      modalRef.current?.close();
    }
  };
  const openModal = () => modalRef.current?.showModal();
  return (
    <>
      <button
        className="btn btn-primary btn-outline"
        type="button"
        onClick={openModal}
      >
        Add Another Device
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
                We&apos;ll just need to name your new device.
              </p>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="input input-bordered flex items-center gap-2 my-4"
                htmlFor="account-name-input"
                aria-controls="account-name-input"
              >
                <input
                  id="account-name-input"
                  type="text"
                  className="grow"
                  placeholder="My Awesome YubiKey"
                  value={deviceName}
                  onChange={changeName}
                />
              </label>
              <div className="modal-action items-center justify-between">
                <p>When ready, press the button to the right</p>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!deviceName}
                >
                  Start!
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button type="button">Close</button>
          </form>
        </dialog>
      ),
      document && document.body)}
    </>
  );
}
