'use client';

import { signIn, signOut } from 'next-auth/react';

export function SignIn() {
  return (
    <button
      onClick={() => signIn()}
      className="btn bg-cyan-500 hover:bg-cyan-400 border-cyan-700 hover:border-cyan-500"
    >
      SignIn
    </button>
  );
}

export function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="btn bg-red-500 hover:bg-red-400 border-red-700 hover:border-red-500"
    >
      SignOut
    </button>
  );
}
