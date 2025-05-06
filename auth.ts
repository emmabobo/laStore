import NextAuth from "next-auth"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"


export const config = {
    providers: [Github, Google],
    pages: {signIn: "/login",}, 
    adapter: PrismaAdapter(prisma),

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        authorized: async ({ auth }: { auth: any }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          return !!auth;
        },
      },
    
}
 
export const { handlers, signIn, signOut, auth } = NextAuth(config)
