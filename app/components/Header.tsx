import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../lib/auth';
import Image from 'next/image';
import { SignIn, SignOut } from './Button';

export default async function Header() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <header className="bg-emerald-400 p-5 flex items-center justify-between">
      <h1 className="font-semibold text-white">
        Next<span className="text-rose-500">Chat</span>
      </h1>
      {session && (
        <div>
          <Image
            src={session.user?.image as string}
            alt="user profile phot"
            width={50}
            height={50}
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      )}
      {session && <SignOut />}
      {!session && <SignIn />}
    </header>
  );
}
