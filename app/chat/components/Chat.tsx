'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Pusher from 'pusher-js';
import DeleteBtn from './DeleteBtn';

interface Props {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
    id: string;
    email: string;
  }[];
}

function Chat({ data }: Props) {
  const [messages, setMessages] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);
  console.log(messages);

  const handleDelete = (arg1: string, arg2: string) => {
    // console.log(arg1, arg2);
    setMessages(
      messages.filter((msg) => {
        return msg.id !== arg1;
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
    <div className="bg-zinc-100 p-3 min-h-[65vh] rounded-sm shadow-sm flex flex-col gap-5">
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center">
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
          <DeleteBtn
            msgId={msg.id}
            msgEmail={msg.email}
            handleDelete={handleDelete}
          />
        </div>
      ))}
      <div ref={messageEndRef}></div>
    </div>
  );
}

export default Chat;
