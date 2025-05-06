import NextAuth from "next-auth"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"


 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers:[Google,],

    callbacks: {
        authorized: async ({ auth }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          return !!auth;
        },
      },

    pages: {
        signIn: "/login",
        error: "/login",
      },
})
