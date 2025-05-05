import NextAuth from "next-auth"

console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID)

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),

    providers:[
            Google({
                clientId: process.env.AUTH_GOOGLE_ID!,
                clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            }),
            Github({
                clientId: process.env.AUTH_GITHUB_ID!,
                clientSecret: process.env.AUTH_GITHUB_SECRET!,
            }),
        
            Credentials({   
            name   :Credentials.name,
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                },
            async authorize(credentials) {
                const { email, password } = credentials as any
                const user = await prisma.user.findUnique({
                    where: { email: email },
                })
                if (!user) {
                    throw new Error("No user found")
                }
                if (user.password !== password) {
                    throw new Error("Invalid password")
                }
                return user
            }
        }),
        ],
    })
