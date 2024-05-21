'use client';

import { Person } from "@mui/icons-material";
import { LoginButton } from "./Login";
import { RegisterButton } from "./Register";

export const AuthenticationButton = () => (
  <div className="dropdown dropdown-end flex align-center justify-center">
    <button tabIndex={0} className="btn btn-square" type="button">
      <Person />
    </button>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box">
      <li className="my-1"><LoginButton /></li>
      <li className="my-1"><RegisterButton /></li>
    </ul>
  </div>
)
