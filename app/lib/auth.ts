import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_Secret as string,
    })
  ]
}