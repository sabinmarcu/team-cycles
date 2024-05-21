'use client';

import { createRef } from "react";
import { createPortal } from 'react-dom';

export const LoginButton = () => {
  const modalRef = createRef<HTMLDialogElement>();
  const openModal = () => modalRef.current?.showModal();
  return (
    <>
      <button
        className="btn justify-start"
        onClick={openModal}
        type="button"
      >
        Login
      </button>
      {/* Login Modal */} 
      {createPortal((
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Login Modal!</h3>
            <p className="py-4">Press ESC key or click the x button or outside the modal to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        ),
      document.body
      )}
    </>
  );
};
