"use server"

import { getServerSession } from "next-auth"
import prisma from "../lib/db"
import { authOptions } from "../lib/auth"
import { revalidatePath } from "next/cache"

const Pusher = require('pusher')

export async function postData(formData: FormData) {
  const session = await getServerSession(authOptions)
  const message = formData.get('message')
  // console.log(message)
  const data = await prisma.message.create({
    data: {
      message: message as string,
      email: session?.user?.email
    },
    include: {
      User: {
        select: {
          name: true, 
          image: true
        }
      }
    }
  })

  // console.log(data)
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us2',
    useTLS: true
  })

  pusher.trigger('chat', 'message', {
    message: `${JSON.stringify(data)}\n\n`
  })
}

export async function deleteMessage(formData: FormData) {

try {
  const messageId = formData.get('message')
  await prisma.message.delete({
    where: {
       // @ts-ignore 
      id: messageId
    }
  })
  revalidatePath('/chat')
} catch (error) {
  console.error(error)
}
}