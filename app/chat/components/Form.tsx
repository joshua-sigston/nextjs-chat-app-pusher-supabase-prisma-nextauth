'use client';
import { postData } from '@/app/actions/action';
import React, { useRef } from 'react';

function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await postData(formData);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="justify-self-stretch"
    >
      <div>
        <input
          type="text"
          name="message"
          placeholder="Type your message...."
          className="rounded-md bg-teal-200 shadow-md w-[100%] p-2"
        />
      </div>
      <button
        type="submit"
        className="mt-3 bg-emerald-300 shadow-lg rounded-md px-3 py-1 font-semibold hover:bg-emerald-500"
      >
        Send
      </button>
    </form>
  );
}

export default Form;
