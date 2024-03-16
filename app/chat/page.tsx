import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';
import Form from './components/Form';
import prisma from '../lib/db';
import Chat from './components/Chat';

async function getData() {
  const data = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      email: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 50,
  });

  return data;
}

async function ChatPage() {
  const session = await getServerSession(authOptions);
  const data = await getData();
  // console.log('server');
  // console.log(data);
  if (!session) {
    redirect('/');
  }

  return (
    <main className="p-3 flex flex-col gap-5">
      <Chat data={data as any} />
      <Form />
    </main>
  );
}

export default ChatPage;
