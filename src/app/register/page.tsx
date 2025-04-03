'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { JSX, useState } from 'react'

import { TextInput } from '@src/components/ui/TextInput'
import { api } from '@src/lib/axios'
import { useAuthGuard } from '@src/hooks/useAuthGuard'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type RegisterFormData = z.infer<typeof schema>

export default function RegisterPage(): JSX.Element {
  useAuthGuard({ requireAuth: false })
  const router = useRouter()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setFormError('')
    try {
      await api.post('/users', data)
      router.push('/login')
    } catch (err) {
      console.error('Register failed', err)
      setFormError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1F22] px-4 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-[#2C2E31] shadow-xl rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {formError && <div className="bg-red-500 text-white p-2 rounded text-sm text-center">{formError}</div>}

        <TextInput
          label="Name"
          type="text"
          {...register('name')}
          error={errors.name}
          className="bg-[#1E1F22] border border-[#3a3b3e] text-white placeholder-gray-400"
        />

        <TextInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email}
          className="bg-[#1E1F22] border border-[#3a3b3e] text-white placeholder-gray-400"
        />

        <TextInput
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password}
          className="bg-[#1E1F22] border border-[#3a3b3e] text-white placeholder-gray-400"
        />

        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition">
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
