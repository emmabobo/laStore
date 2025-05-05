'use client'

import { signIn } from '@/auth'
import { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordLogin, setIsPasswordLogin] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isPasswordLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (res?.error) {
        alert('incorrect Email or password')
      }else {
        alert('registration successful')
      }
    }else {
      const res = await signIn('email', { email, redirect: false })
      if (res?.error) {
        alert('Error sending email, try again with password')
      } else {
        alert('Check your email for the sign-in link!')
      }

    }
  }

  return (
    <main className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded bg-black text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded bg-black text-white"
        />

        {/* CAPTCHA or checkbox can be added here */}

        <button className="w-full bg-white text-black py-2 rounded">Create account</button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">OR</div>

      <div className="mt-4 space-y-2">
        <button className="w-full bg-gray-800 text-white py-2 rounded">Sign up with GitHub</button>
        <button className="w-full bg-gray-800 text-white py-2 rounded">Sign up with Google</button>
        <button className="w-full bg-gray-800 text-white py-2 rounded">Sign up with SSO</button>
      </div>
    </main>
  )
}
