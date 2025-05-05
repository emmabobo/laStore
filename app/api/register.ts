// pages/api/register.ts

import { prisma } from '@/lib/prisma' // ✅ use shared Prisma instance
import { hash } from 'bcryptjs'
import { Resend } from 'resend'
import type { NextApiRequest, NextApiResponse } from 'next'

const resend = new Resend(process.env.RESEND_API_KEY!)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email : email  } })

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // 🔁 &*&*&&&&&&&&&&& *** Make sure your schema has `password` field, not `hashedPassword`
      },
    })

    // ✅ Send email with Resend
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: email,
      subject: 'Welcome to MyShop!',
      html: `<p>Hi ${email}, thanks for signing up!</p>`,
    })

    return res.status(201).json({ message: 'User created', user })
  } catch (error) {
    console.error('[REGISTER ERROR]', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
