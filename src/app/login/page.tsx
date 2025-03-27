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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {formError && <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">{formError}</div>}

        <div className="space-y-1">
          <TextInput label="Email" type="email" {...register('email')} error={errors.email} />
        </div>

        <div className="space-y-1">
          <TextInput label="Password" type="password" {...register('password')} error={errors.password} />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
