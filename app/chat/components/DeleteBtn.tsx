import React from 'react';
import { deleteMessage } from '@/app/actions/action';

interface Props {
  msgId: string;
  msgEmail: string;
  handleDelete: (msgId: string, msgEmail: string) => void;
}

function DeleteBtn({ msgId, msgEmail, handleDelete }: Props) {
  const deleteInfo = (arg1: string, arg2: string) => {
    // console.log(arg1, arg2);
    handleDelete(msgId, msgEmail);
  };

  return (
    <form
      action={async (formData) => {
        await deleteMessage(formData);
        deleteInfo(msgId, msgEmail);
      }}
      className="self-end"
    >
      <input type="hidden" value={msgId} name="messageId" />
      <input type="hidden" value={msgEmail} name="messageEmail" />
      <button className="rounded-full bg-rose-400 w-[20px] h-[20px] flex items-center justify-center">
        <span className="text-sm font-semibold">X</span>
      </button>
    </form>
  );
}

export default DeleteBtn;
