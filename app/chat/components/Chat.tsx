'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Pusher from 'pusher-js';
import { deleteMessage } from '@/app/actions/action';

interface Props {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
    id: string;
  }[];
}

function Chat({ data }: Props) {
  const [messages, setMessages] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  const handleDelete = (arg: string) => {
    setMessages(
      messages.filter((msg) => {
        return msg.id !== arg;
      }),
    );
  };

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: 'us2',
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', function (data: any) {
      const parsedMessages = JSON.parse(data.message);

      setMessages((prev) => [...prev, parsedMessages]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-zinc-100 p-3 min-h-[65vh] rounded-sm shadow-sm">
      {messages.map((msg, index) => (
        <div key={index}>
          <div className="flex items-center gap-5 bg-orange-300 p-3 rounded-sm shadow-sm w-fit">
            <Image
              src={msg.User?.image as string}
              alt="user profile phot"
              width={25}
              height={25}
              style={{ width: 'auto', height: 'auto' }}
            />
            <p>{msg.message}</p>
          </div>
          <form
            action={async (formData) => {
              await deleteMessage(formData);
              handleDelete(msg.id);
            }}
          >
            <input type="hidden" value={msg.id} name="message" />
            <button>Delete</button>
          </form>
        </div>
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
}

export default Chat;
