'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { JSX, useState } from 'react'

import { useAuth } from '@src/context/AuthContext'
import { TextInput } from '@src/components/ui/TextInput'
import { useAuthGuard } from '@src/hooks/useAuthGuard'

// Zod schema for form validation
const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

type LoginFormData = z.infer<typeof schema>

export default function LoginPage(): JSX.Element {
  useAuthGuard({ requireAuth: false })
  const { login } = useAuth()
  const router = useRouter()
  const [formError, setFormError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setFormError('')
    try {
      await login(data.email, data.password)
      router.push('/notes')
    } catch (err) {
      console.error('Login failed', err)
      setFormError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1F22] px-4 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-[#2C2E31] shadow-xl rounded-xl p-6 space-y-6">
        {formError && <div className="bg-red-500 text-white p-2 rounded text-sm text-center">{formError}</div>}

        <div className="space-y-1">
          <TextInput
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
            className="bg-[#1E1F22] border border-[#3a3b3e] text-white placeholder-gray-400"
          />
        </div>

        <div className="space-y-1">
          <TextInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password}
            className="bg-[#1E1F22] border border-[#3a3b3e] text-white placeholder-gray-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white dark:text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
